import { AddIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import OrgCreateModal from '../orgs/OrgCreateModal'
import OrgEditModal from '../orgs/OrgEditModal'
import { useStoreState } from '../store/hooks'

export default function OrgsPage() {
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)

  // Add modal
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
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
      <HStack spacing={10} margin="30px 0">
        <Heading as="h2" size="md">
          Organisations
        </Heading>
        <IconButton
          aria-label="Ajouter une organisation"
          icon={<AddIcon />}
          onClick={onAddOpen}
        />
        <Spacer />
        <InputGroup>
          <Input
            type="text"
            placeholder="Rechercher..."
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

      <Loading active={loading} />
      <TextErrors errors={[error]} />

      {filteredOrgs && (
        <Wrap spacing={5}>
          {filteredOrgs.map((org) => (
            <WrapItem key={org.id}>
              <LinkBox w="xs" p="5" borderWidth="1px" rounded="md">
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
                <Text>X membres</Text>
              </LinkBox>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <OrgCreateModal isOpen={isAddOpen} onClose={onAddClose} />

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
