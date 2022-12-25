import { useStoreState } from '@store/hooks'
import { MentionEntities } from '../editor2/nodes/MentionNode'
import { Mentionable } from '../editor2/plugins/MentionsPlugin'

export default function useMentionables(): Mentionable[] {
  const members = useStoreState((state) => state.members.entries)
  return (
    members?.map((member) => ({
      entity: MentionEntities.Member,
      id: member.id,
      name: member.name,
    })) || []
  )
}
