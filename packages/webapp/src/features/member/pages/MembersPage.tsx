import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import { Title } from '@/common/atoms/Title'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import { useOrgId } from '@/org/hooks/useOrgId'
import { useAlgoliaSearch } from '@/search/hooks/useAlgoliaSearch'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  LinkBox,
  Spacer,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Subscription_Payment_Status_Enum } from '@gql'
import { truthy } from '@rolebase/shared/helpers/truthy'
import { SearchTypes } from '@rolebase/shared/model/search'
import {
  Subscription,
  SubscriptionLimits,
} from '@rolebase/shared/model/subscription'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { EmailIcon } from 'src/icons'
import { trpc } from 'src/trpc'
import MemberLinkOverlay from '../components/MemberLinkOverlay'
import MemberOrgRoleSelect from '../components/MemberOrgRoleSelect'
import useOrgAdmin from '../hooks/useOrgAdmin'
import MembersInviteModal from '../modals/MembersInviteModal'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import useOrgOwner from '../hooks/useOrgOwner'

export default function MembersPage() {
  const { t } = useTranslation()
  const isAdmin = useOrgAdmin()
  const isOwner = useOrgOwner()
  const orgId = useOrgId()
  const members = useStoreState((state) => state.org.members)
  const hover = useHoverItemStyle()
  const subscriptionPath = usePathInOrg('subscription')

  // Subscription state
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)

  // Invite modal
  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onClose: onInviteClose,
  } = useDisclosure()

  // Search
  const { items, search, loading } = useAlgoliaSearch()
  const [searchText, setSearchText] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    if (searchText.length !== 0) {
      search(searchText, SearchTypes.Member)
    }
  }, [searchText])

  // Fetch subscription data
  useEffect(() => {
    if (orgId) {
      getSubscriptionData()
    }
  }, [orgId])

  const getSubscriptionData = async () => {
    setSubscriptionLoading(true)
    try {
      const res = await trpc.orgSubscription.getSubscription.query({
        orgId: orgId!,
      })
      setSubscription(res)
    } catch (e) {
      // Silently fail - subscription is optional
    } finally {
      setSubscriptionLoading(false)
    }
  }

  // Calculate member statistics
  const memberStats = useMemo(() => {
    if (!members) {
      return { active: 0, invited: 0, inactive: 0 }
    }
    const active = members.filter((m) => !!m.userId).length
    const invited = members.filter((m) => !m.userId && m.inviteEmail).length
    const inactive = members.filter((m) => !m.userId && !m.inviteEmail).length
    return { active, invited, inactive }
  }, [members])

  // Check subscription status
  const hasActiveSubscription = useMemo(() => {
    return (
      subscription?.status === Subscription_Payment_Status_Enum.Active ||
      subscription?.status === Subscription_Payment_Status_Enum.Trialing
    )
  }, [subscription])

  // Get member limit
  const memberLimit = useMemo(() => {
    if (!subscription?.type) {
      return SubscriptionLimits.free
    }
    return SubscriptionLimits[subscription.type] || SubscriptionLimits.free
  }, [subscription])

  // Filter members
  const filteredMembers = useMemo(() => {
    if (searchText.length === 0 || !members) {
      return members
    }
    return items
      .map((item) => members.find((member) => member.id === item.id))
      .filter(truthy)
  }, [members, searchText, items])

  return (
    <>
      <Title>{t('MembersPage.heading')}</Title>

      <ScrollableLayout
        header={
          <Flex ml={5} w="100%" alignItems="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              {t('MembersPage.heading')}
            </Heading>
            <Spacer />

            <InputGroup size="sm" w="auto" my={2}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder={t('MembersPage.searchPlaceholder')}
                borderRadius="md"
                transition="width 0.2s"
                w={isSearchFocused ? '200px' : '130px'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchText && (
                <InputRightElement _groupFocus={{ display: 'block' }}>
                  <CloseButton
                    colorScheme="gray"
                    size="sm"
                    onClick={() => setSearchText('')}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {isAdmin && (
              <Button
                size="md"
                colorScheme="blue"
                leftIcon={<EmailIcon size={20} />}
                ml={3}
                onClick={onInviteOpen}
              >
                {t('MembersPage.invite')}
              </Button>
            )}
          </Flex>
        }
      >
        <Box maxW="2xl" my={10} px={{ base: 5, sm: 10 }}>
          {/* Member List */}
          {filteredMembers?.map((member) => (
            <LinkBox key={member.id} px={2} py={1} _hover={hover}>
              <HStack>
                <MemberLinkOverlay member={member} />
                <MemberOrgRoleSelect member={member} size="sm" />
              </HStack>
            </LinkBox>
          ))}

          {/* Member Statistics */}
          {!subscriptionLoading && (
            <HStack spacing={4} mt={6} ml={2} fontSize="sm">
              <Flex gap={2}>
                <Tag size="sm" colorScheme="gray">
                  {memberStats.active}
                </Tag>
                <Text color="gray.500">{t('MembersPage.stats.active')}</Text>
              </Flex>
              <Flex gap={2}>
                <Tag size="sm" colorScheme="gray">
                  {memberStats.invited}
                </Tag>
                <Text color="gray.500">{t('MembersPage.stats.invited')}</Text>
              </Flex>
              <Flex gap={2}>
                <Tag size="sm" colorScheme="gray">
                  {memberStats.inactive}
                </Tag>
                <Text color="gray.500">{t('MembersPage.stats.inactive')}</Text>
              </Flex>
            </HStack>
          )}

          {/* Subscription info */}
          {isOwner && !hasActiveSubscription && memberLimit && (
            <Alert
              status="info"
              bg="yellow.50"
              _dark={{ bg: 'yellow.900' }}
              mt={6}
            >
              <AlertDescription>
                {!hasActiveSubscription && memberLimit && (
                  <Text>
                    {t('MembersPage.encouragement.limitWarning', {
                      limit: memberLimit,
                    })}{' '}
                    <Link
                      as={RouterLink}
                      to={subscriptionPath}
                      color="blue.500"
                      fontWeight="semibold"
                    >
                      {t('MembersPage.encouragement.upgradePlan')}
                    </Link>
                  </Text>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Encouragement Message */}
          {isAdmin && memberStats.active < 3 && (
            <Alert status="info" mt={3}>
              <AlertIcon />
              <AlertDescription>
                <Text>{t('MembersPage.encouragement.message')}</Text>
              </AlertDescription>
            </Alert>
          )}
        </Box>

        <Loading active={loading} size="md" />
      </ScrollableLayout>

      {isInviteOpen && <MembersInviteModal isOpen onClose={onInviteClose} />}
    </>
  )
}
