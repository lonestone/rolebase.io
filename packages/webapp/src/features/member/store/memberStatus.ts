import { Action, action } from 'easy-peasy'

interface MemberStatusModel {
  currentMeetingId: string | null | undefined
  setCurrentMeetingId: Action<MemberStatusModel, string | null>
}

const model: MemberStatusModel = {
  currentMeetingId: undefined,

  setCurrentMeetingId: action((state, id) => {
    state.currentMeetingId = id
  }),
}

export default model
