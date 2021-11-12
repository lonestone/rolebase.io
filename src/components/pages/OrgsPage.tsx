import { AddIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  LinkOverlay,
  Spacer,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { useStoreState } from '../../store/hooks'
import Loading from '../atoms/Loading'
import TextErrors from '../atoms/TextErrors'
import OrgCreateModal from '../organisms/modals/OrgCreateModal'
import OrgEditModal from '../organisms/modals/OrgEditModal'

export default function OrgsPage() {
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)

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

  // Search
  const [searchText, setSearchText] = useState('')

  // Filter orgs
  const filteredOrgs = useMemo(() => {
    const text = searchText.toLowerCase()
    return orgs?.filter((org) => org.name.toLowerCase().indexOf(text) !== -1)
  }, [orgs, searchText])

  return (
    <Container maxW="3xl" marginTop="60px">
      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Organisations
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
          Créer
        </Button>
        <Spacer />
        <InputGroup w="auto">
          <Input
            type="text"
            placeholder="Rechercher..."
            w="200px"
            _focus={{ width: '250px' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputRightElement
            children={
              <CloseButton
                colorScheme="gray"
                size="sm"
                onClick={() => setSearchText('')}
              />
            }
          />
        </InputGroup>
      </HStack>

      <Loading center active={loading} />
      <TextErrors errors={[error]} />

      {filteredOrgs && (
        <Wrap spacing={5}>
          {filteredOrgs.map((org) => (
            <WrapItem key={org.id}>
              <LinkBox
                w="xs"
                p="5"
                borderWidth="1px"
                rounded="md"
                _hover={{ background: '#fafafa' }}
              >
                <Heading size="md" my="2">
                  <HStack>
                    <LinkOverlay as={ReachLink} to={`/orgs/${org.id}`}>
                      {org.name}
                    </LinkOverlay>
                    <Spacer />
                    <Button onClick={() => handleOpenEdit(org.id)}>
                      <EditIcon />
                    </Button>
                  </HStack>
                </Heading>
              </LinkBox>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <OrgCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />

      {editOrgId && (
        <OrgEditModal
          id={editOrgId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Container>
  )
}
