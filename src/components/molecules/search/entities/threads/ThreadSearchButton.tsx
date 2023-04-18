import {
  Member_Scope_Enum,
  ThreadFragment,
  useCreateThreadMutation,
} from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { useCallback } from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useThreadSearchItems } from './useThreadSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  threads: ThreadFragment[]
  excludeIds?: string[]
  createCircleId?: string
}

export default function ThreadSearchButton({
  threads,
  excludeIds,
  createCircleId,
  ...props
}: Props) {
  const items = useThreadSearchItems(threads, excludeIds)
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [createThread] = useCreateThreadMutation()

  const handleCreate = useCallback(
    async (title: string) => {
      if (!orgId || !createCircleId || !currentMember) {
        throw new Error()
      }

      // Create member
      const { data } = await createThread({
        variables: {
          values: {
            orgId,
            title,
            circleId: createCircleId,
            participantsScope: Member_Scope_Enum.CircleLeaders,
            participantsMembersIds: [],
            initiatorMemberId: currentMember.id,
          },
        },
      })
      return data?.insert_thread_one?.id
    },
    [orgId, createCircleId, currentMember]
  )

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={createCircleId !== undefined ? handleCreate : undefined}
    />
  )
}
