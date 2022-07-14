import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Spacer,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import OrgCreateModal from '@components/organisms/modals/OrgCreateModal'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import { orgIdKey } from '@store/orgs'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link as ReachLink, useHistory } from 'react-router-dom'

export default function OrgsPage() {
  const { t } = useTranslation()
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)
  const hover = useHoverItemStyle()
  const history = useHistory()

  // Set orgId in localStorage
  const handleOrgClick = (orgId: string) => {
    localStorage.setItem(orgIdKey, orgId)
  }

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Redirect to org page if orgId is set in localStorage
  useEffect(() => {
    const orgId = localStorage.getItem(orgIdKey)
    if (!orgId) return
    const org = orgs?.find((org) => org.id === orgId)
    if (!org) return
    history.replace(getOrgPath(org))
  }, [orgs])

  return (
    <Container maxW="3xl" py={10}>
      <Title>{t('pages.OrgsPage.heading')}</Title>

      <HStack mb={5}>
        <Heading as="h1" size="md">
          {t('pages.OrgsPage.heading')}
        </Heading>
        <Spacer />
        {orgs?.length && (
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={onCreateOpen}
          >
            {t('common.create')}
          </Button>
        )}
      </HStack>

      <Loading center active={loading} />
      <TextErrors errors={[error]} />

      {orgs?.length === 0 && (
        <Alert
          status="info"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          py={7}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} fontSize="lg">
            {t('pages.OrgsPage.empty.title')}
          </AlertTitle>
          <AlertDescription mt={5}>
            <List textAlign="left">
              <ListItem my={2}>
                <ListIcon as={FiArrowRight} color="gray.500" />
                {t('pages.OrgsPage.empty.info1')}
              </ListItem>
              <ListItem my={2}>
                <ListIcon as={FiArrowRight} color="gray.500" />
                {t('pages.OrgsPage.empty.info2')}
              </ListItem>
            </List>
            <Button
              colorScheme="blue"
              leftIcon={<FiPlus />}
              mt={5}
              onClick={onCreateOpen}
            >
              {t('pages.OrgsPage.empty.create')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Wrap spacing={5}>
        {orgs?.map((org) => (
          <WrapItem key={org.id}>
            <LinkBox
              w="xs"
              p="5"
              borderWidth="1px"
              rounded="md"
              role="group"
              _hover={hover}
            >
              <Heading size="md" my="2">
                <LinkOverlay
                  flex={1}
                  as={ReachLink}
                  to={org.slug ? `/${org.slug}` : `/orgs/${org.id}`}
                  onClick={() => handleOrgClick(org.id)}
                >
                  {org.name}
                </LinkOverlay>
              </Heading>
            </LinkBox>
          </WrapItem>
        ))}
      </Wrap>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
