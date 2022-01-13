import {
  Avatar,
  LinkOverlay,
  LinkOverlayProps,
  useDisclosure,
} from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  member: MemberEntry
}

export default function MemberLinkOverlay({
  member,
  ...linkOverlayProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <LinkOverlay
        as={ReachLink}
        flex={1}
        display="flex"
        alignItems="center"
        to={`/orgs/${orgId}?memberId=${member.id}`}
        onClick={handleOpen}
        {...linkOverlayProps}
      >
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          size={'sm'}
          mr={3}
        />
        {member.name}
      </LinkOverlay>

      {isOpen && <MemberModal id={member.id} isOpen onClose={onClose} />}
    </>
  )
}
