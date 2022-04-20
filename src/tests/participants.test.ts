import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { describe, expect, it } from 'vitest'
import { circles } from './mockData/circles'
import { roles } from './mockData/roles'

describe('Participants', () => {
  it('Alice Invited', () => {
    const currentMemberId = 'member-alice'
    const memberCircles = getParticipantCircles(
      currentMemberId,
      circles,
      roles
    ).map((circle) => circle.id)

    expect(memberCircles).includes('circle-super')
    expect(memberCircles).includes('circle-agence')
    expect(memberCircles).includes('circle-agence-leader')
    expect(memberCircles).includes('circle-agence-dev')
    expect(memberCircles).includes('circle-agence-dev-leader')
  })

  it('Bob Invited', () => {
    const currentMemberId = 'member-bob'
    const memberCircles = getParticipantCircles(
      currentMemberId,
      circles,
      roles
    ).map((circle) => circle.id)

    expect(memberCircles).includes('circle-agence')
    expect(memberCircles).includes('circle-agence-am')
    expect(memberCircles).includes('circle-agence-am-leader')
    expect(memberCircles).includes('circle-agence-dev')
    expect(memberCircles).includes('circle-agence-dev-facilitator')
  })

  it('Jean-Kévin Invited', () => {
    const currentMemberId = 'member-jean-kevin'
    const memberCircles = getParticipantCircles(
      currentMemberId,
      circles,
      roles
    ).map((circle) => circle.id)

    expect(memberCircles).includes('circle-super')
    expect(memberCircles).includes('circle-studio')
    expect(memberCircles).includes('circle-studio-leader')
    expect(memberCircles).includes('circle-agence-dev')
  })
})
