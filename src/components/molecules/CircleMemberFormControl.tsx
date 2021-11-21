import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import MemberButton from '@components/atoms/MemberButton'
import CircleMemberCreateModal from '@components/organisms/modals/CircleMemberCreateModal'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import useCircleAndParents from '@hooks/useCircleAndParents'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'

interface Props {
  circleId: string
}

export default function CircleMemberFormControl({ circleId }: Props) {
  const circleAndParents = useCircleAndParents(circleId)
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
  const [memberId, setMemberId] = useState<string | undefined>()

  const handleDeleteMember = (memberId: string) => {
    setMemberId(memberId)
    onDeleteCircleMemberOpen()
  }

  // CircleMemberCreateModal
  const {
    isOpen: isCreateCircleMemberOpen,
    onOpen: onCreateCircleMemberOpen,
    onClose: onCreateCircleMemberClose,
  } = useDisclosure()

  // CircleMemberDeleteModal
  const {
    isOpen: isDeleteCircleMemberOpen,
    onOpen: onDeleteCircleMemberOpen,
    onClose: onDeleteCircleMemberClose,
  } = useDisclosure()

  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircleMember = useCallback(
    (circleId: string, memberId: string) => {
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`)
    },
    []
  )

  return (
    <FormControl>
      <FormLabel>{role?.singleMember ? 'Occupé par :' : 'Membres :'}</FormLabel>
      <Wrap spacing={2}>
        {circleMembers?.map((m) => (
          <WrapItem key={m.id}>
            <ButtonGroup size="sm" isAttached>
              <MemberButton
                member={m}
                onClick={() => navigateToCircleMember(circleId, m.id)}
              />
              <IconButton
                aria-label=""
                icon={<CloseIcon />}
                onClick={() => handleDeleteMember(m.id)}
              />
            </ButtonGroup>
          </WrapItem>
        ))}
        {!role?.singleMember || !circleMembers?.length ? (
          <WrapItem>
            <Button
              size="sm"
              leftIcon={<AddIcon />}
              onClick={onCreateCircleMemberOpen}
            >
              Ajouter un membre
            </Button>
          </WrapItem>
        ) : null}
      </Wrap>

      <CircleMemberCreateModal
        parentId={circleId}
        isOpen={isCreateCircleMemberOpen}
        onClose={onCreateCircleMemberClose}
      />

      {memberId && (
        <CircleMemberDeleteModal
          memberId={memberId}
          circleId={circleId}
          isOpen={isDeleteCircleMemberOpen}
          onClose={onDeleteCircleMemberClose}
        />
      )}
    </FormControl>
  )
}
