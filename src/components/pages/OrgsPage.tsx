import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import OrgCreateModal from '@organisms/org/OrgCreateModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import { Link as ReachLink, useNavigate } from 'react-router-dom'

export default function OrgsPage() {
  const { t } = useTranslation()
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)
  const navigate = useNavigate()

  // Create modal
  const createModal = useDisclosure()

  useEffect(() => {
    if (orgs?.length === 0) {
      createModal.onOpen()
      return
    }

    // Redirect to org when there is only one org
    if (orgs?.length === 1) {
      navigate(getOrgPath(orgs[0]))
      return
    }
  }, [orgs])

  return (
    <Container maxW="3xl" py={10}>
      <Title>{t('OrgsPage.heading')}</Title>

      <HStack mb={5}>
        <Heading as="h1" size="md">
          {t('OrgsPage.heading')}
        </Heading>
        <Spacer />
        <Button
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={createModal.onOpen}
        >
          {t('common.create')}
        </Button>
      </HStack>

      <Loading center active={loading} />
      <TextErrors errors={[error]} />

      <SimpleGrid columns={2} spacing={5}>
        {orgs?.map((org) => (
          <LinkBox
            key={org.id}
            px={5}
            py={7}
            borderWidth="1px"
            rounded="md"
            role="group"
            bg="white"
            _dark={{
              bg: 'gray.700',
            }}
            _hover={{
              boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
              _dark: {
                boxShadow: '0 1px 10px 0 rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            <Heading size="md" my="2">
              <LinkOverlay flex={1} as={ReachLink} to={getOrgPath(org)}>
                {org.name}
              </LinkOverlay>
            </Heading>
          </LinkBox>
        ))}
      </SimpleGrid>

      {createModal.isOpen && (
        <OrgCreateModal isOpen onClose={createModal.onClose} />
      )}
    </Container>
  )
}
