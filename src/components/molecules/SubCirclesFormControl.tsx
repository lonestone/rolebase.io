import {
  Button,
  FormControl,
  FormLabel,
  StackItem,
  useDisclosure,
  VStack,
  WrapItem,
} from '@chakra-ui/react'
import CircleCreateModal from '@components/organisms/modals/CircleCreateModal'
import { ParticipantMember } from '@hooks/useParticipants'
import { getCircleChildrenAndRoles } from '@shared/helpers/getCircleChildren'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import CircleWithLeaderItem from './CircleWithLeaderItem'

interface Props {
  circleId: string
  participants: ParticipantMember[]
}

export default function SubCirclesFormControl({
  circleId,
  participants,
}: Props) {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Get direct circles children and their roles
  const childrenAndRoles = useMemo(
    () =>
      circles && roles && getCircleChildrenAndRoles(circles, roles, circleId),
    [circles, roles, circleId]
  )

  // CreateCircle modal for multiple members
  const {
    isOpen: isCreateCircleOpen,
    onOpen: onCreateCircleOpen,
    onClose: onCreateCircleClose,
  } = useDisclosure()

  // CreateCircle modal for single member
  const {
    isOpen: isCreateCircleSingleMemberOpen,
    onOpen: onCreateCircleSingleMemberOpen,
    onClose: onCreateCircleSingleMemberClose,
  } = useDisclosure()

  return (
    <>
      <FormControl>
        <FormLabel>Rôles :</FormLabel>
        <VStack spacing={2} align="stretch">
          {childrenAndRoles
            ?.filter((circle) => circle.role.singleMember)
            .map((circle) => (
              <CircleWithLeaderItem
                key={circle.id}
                circle={circle}
                participants={participants}
              />
            ))}
          <StackItem>
            <Button
              size="sm"
              variant="ghost"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onClick={onCreateCircleSingleMemberOpen}
            >
              Ajouter un rôle
            </Button>
          </StackItem>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>Cercles :</FormLabel>
        <VStack spacing={2} align="stretch">
          {childrenAndRoles
            ?.filter((circle) => !circle.role.singleMember)
            .map((circle) => (
              <CircleWithLeaderItem
                key={circle.id}
                circle={circle}
                participants={participants}
              />
            ))}
          <WrapItem>
            <Button
              size="sm"
              variant="ghost"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onClick={onCreateCircleOpen}
            >
              Ajouter un cercle
            </Button>
          </WrapItem>
        </VStack>
      </FormControl>

      {isCreateCircleOpen && (
        <CircleCreateModal
          parentId={circleId}
          singleMember={false}
          isOpen
          onClose={onCreateCircleClose}
        />
      )}
      {isCreateCircleSingleMemberOpen && (
        <CircleCreateModal
          parentId={circleId}
          singleMember={true}
          isOpen
          onClose={onCreateCircleSingleMemberClose}
        />
      )}
    </>
  )
}
