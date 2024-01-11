import { useStoreState } from '@store/hooks'
import { MentionEntities } from '../lib/nodes/MentionNode'
import { Mentionable } from '../lib/plugins/MentionsPlugin'

export default function useMentionables(): Mentionable[] {
  const members = useStoreState((state) => state.org.members)
  return (
    members?.map((member) => ({
      entity: MentionEntities.Member,
      id: member.id,
      name: member.name,
    })) || []
  )
}
