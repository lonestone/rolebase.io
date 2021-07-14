import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
  Select,
  Spacer,
  StackItem,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { CircleUpdate, updateCircle } from '../../api/entities/circles'
import { MemberEntry } from '../../api/entities/members'
import useCircleAndParents from '../../hooks/useCircleAndParents'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import Markdown from '../common/Markdown'
import MemberButton from '../common/MemberButton'
import Panel from '../common/Panel'
import RoleEditModal from '../roles/RoleEditModal'
import { useStoreState } from '../store/hooks'
import CircleCreateModal from './CircleCreateModal'
import CircleDeleteModal from './CircleDeleteModal'

interface Props {
  id: string
  onClose(): void
}

export default function CirclePanel({ id, onClose }: Props) {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)
  const circleAndParents = useCircleAndParents(id)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  // Get members
  const members = useStoreState((state) => state.members.entries)
  const circleMembers = useMemo(
    () =>
      circle?.members
        .map((e) => members?.find((m) => m.id === e.memberId))
        .filter(Boolean) as MemberEntry[] | undefined,
    [circle?.members, members]
  )

  // Get direct circles children and their roles
  const childrenCirclesAndRoles = useMemo(
    () =>
      circles
        ?.filter((c) => c.parentId === id)
        .map((c) => ({ ...c, role: roles?.find((r) => r.id === c.roleId) })),
    [circles, roles, id]
  )

  // Role edit modal
  const {
    isOpen: isEditRoleOpen,
    onOpen: onEditRoleOpen,
    onClose: onEditRoleClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  // Add circle modal
  const {
    isOpen: isCreateCircleOpen,
    onOpen: onCreateCircleOpen,
    onClose: onCreateCircleClose,
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<CircleUpdate>()

  const roleId = watch('roleId')

  const handleReset = () => circle && reset({ roleId: circle.roleId })

  // Init form data
  useEffect(() => {
    if (circle) {
      handleReset()
    }
  }, [circle])

  const onSubmit = handleSubmit(({ roleId }) => {
    updateCircle(id, { roleId })
    // onClose()
  })

  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircle = useCallback((circleId: string) => {
    navigateOrg(`?circleId=${circleId}`)
  }, [])
  const navigateToCircleMember = useCallback(
    (circleId: string, memberId: string) => {
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`)
    },
    []
  )

  if (!circle) return null

  return (
    <Panel>
      <form onSubmit={onSubmit}>
        <HStack spacing={5} mb={5}>
          <StackItem
            maxW="80%"
            style={{ textIndent: '-1em', marginLeft: '0.4em' }}
          >
            {circleAndParents?.map((c, i) => {
              const last = i === circleAndParents.length - 1
              return (
                <span key={c.id}>
                  <Button
                    variant={last ? 'solid' : 'ghost'}
                    size={last ? 'md' : 'sm'}
                    borderRadius="full"
                    fontWeight={last ? 600 : 400}
                    ml={last ? '0.3em' : 0}
                    onClick={() => navigateToCircle(c.id)}
                  >
                    {c.role?.name || '?'}
                  </Button>
                  {!last && <ChevronRightIcon margin="0 -0.3em" />}
                </span>
              )
            }) || null}
          </StackItem>
          <Spacer />
          <CloseButton onClick={onClose} />
        </HStack>

        <VStack spacing={5}>
          {role?.purpose && (
            <FormControl>
              <FormLabel>Raison d'être :</FormLabel>
              <Markdown fontSize="xl">{role.purpose}</Markdown>
            </FormControl>
          )}

          {role?.domain && (
            <FormControl>
              <FormLabel>Domaine :</FormLabel>
              <Markdown>{role.domain}</Markdown>
            </FormControl>
          )}

          {role?.accountabilities && (
            <FormControl>
              <FormLabel>Redevabilités :</FormLabel>
              <Markdown>{role.accountabilities}</Markdown>
            </FormControl>
          )}

          {role?.notes && (
            <FormControl>
              <FormLabel>Notes :</FormLabel>
              <Markdown>{role.notes}</Markdown>
            </FormControl>
          )}

          <FormControl>
            <FormLabel htmlFor="roleId">Rôle :</FormLabel>
            <InputGroup>
              <Select name="roleId" ref={register()} autoFocus>
                {roles?.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    style={{
                      fontWeight: r.id === role?.id ? 'bold' : 'normal',
                    }}
                  >
                    {r.name}
                  </option>
                ))}
              </Select>
              <Button onClick={onEditRoleOpen}>Editer</Button>
            </InputGroup>
            {isDirty && (
              <>
                <Button colorScheme="blue" mt={2} type="submit">
                  Enregistrer
                </Button>
                <Button variant="ghost" mt={2} onClick={handleReset}>
                  Annuler
                </Button>
              </>
            )}
          </FormControl>

          <Center>
            <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
              Supprimer le cercle
            </Button>
          </Center>

          <FormControl>
            <FormLabel>Sous-Cercles :</FormLabel>
            <Wrap spacing={2}>
              {childrenCirclesAndRoles?.map((c) => (
                <WrapItem key={c.id}>
                  <Button
                    key={c.id}
                    variant="solid"
                    size="sm"
                    borderRadius="full"
                    onClick={() => navigateToCircle(c.id)}
                  >
                    {c.role?.name || '?'}
                  </Button>
                </WrapItem>
              ))}
              <WrapItem>
                <Button
                  variant="solid"
                  size="sm"
                  borderRadius="full"
                  leftIcon={<AddIcon />}
                  onClick={onCreateCircleOpen}
                >
                  Ajouter un cercle
                </Button>
              </WrapItem>
            </Wrap>
          </FormControl>

          {circleMembers && circleMembers.length !== 0 && (
            <FormControl>
              <FormLabel>Membres :</FormLabel>
              <Wrap spacing={2}>
                {circleMembers?.map((m) => (
                  <WrapItem key={m.id}>
                    <MemberButton
                      member={m}
                      onClick={() => navigateToCircleMember(circle.id, m.id)}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>
          )}
        </VStack>
      </form>

      {roleId && (
        <RoleEditModal
          id={roleId}
          isOpen={isEditRoleOpen}
          onClose={onEditRoleClose}
        />
      )}

      <CircleDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />

      <CircleCreateModal
        parentId={id}
        isOpen={isCreateCircleOpen}
        onClose={onCreateCircleClose}
      />
    </Panel>
  )
}
