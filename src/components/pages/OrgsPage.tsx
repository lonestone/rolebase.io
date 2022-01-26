import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spacer,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import OrgCreateModal from '@components/organisms/modals/OrgCreateModal'
import OrgEditModal from '@components/organisms/modals/OrgEditModal'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { FiEdit3, FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

export default function OrgsPage() {
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)
  const hover = useHoverItemStyle()

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Edit modal
  const [editOrgId, setEditOrgId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleOpenEdit = (id: string) => {
    setEditOrgId(id)
    onEditOpen()
  }

  return (
    <Container maxW="3xl" mt={10}>
      <Title>Organisations</Title>

      <HStack mb={5}>
        <Heading as="h1" size="md">
          Organisations
        </Heading>
        <Spacer />
        <Button leftIcon={<FiPlus />} onClick={onCreateOpen}>
          Créer
        </Button>
      </HStack>

      <Loading center active={loading} />
      <TextErrors errors={[error]} />

      {!orgs?.length && <i>Vous n'avez aucune organisation</i>}

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
                <Flex>
                  <LinkOverlay flex={1} as={ReachLink} to={`/orgs/${org.id}`}>
                    {org.name}
                  </LinkOverlay>
                  <IconButton
                    aria-label=""
                    size="sm"
                    onClick={() => handleOpenEdit(org.id)}
                    icon={<FiEdit3 />}
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                  />
                </Flex>
              </Heading>
            </LinkBox>
          </WrapItem>
        ))}
      </Wrap>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}

      {isEditOpen && editOrgId && (
        <OrgEditModal id={editOrgId} isOpen onClose={onEditClose} />
      )}
    </Container>
  )
}
