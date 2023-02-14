import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { circlesFull } from '@shared/mocks/circles'
import { describe, expect, it } from 'vitest'

describe('Participants', () => {
  it('Alice Invited', () => {
    const currentMemberId = 'member-alice'
    const memberCircles = getParticipantCircles(
      currentMemberId,
      circlesFull
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
      circlesFull
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
      circlesFull
    ).map((circle) => circle.id)

    expect(memberCircles).includes('circle-super')
    expect(memberCircles).includes('circle-studio')
    expect(memberCircles).includes('circle-studio-leader')
    expect(memberCircles).includes('circle-agence-dev')
  })

  it('All participants of a circle', () => {
    const participantMemberIds = getAllCircleMembersParticipants(
      'circle-agence-dev',
      circlesFull
    ).map((participant) => participant.memberId)

    expect(participantMemberIds).includes('member-alice')
    expect(participantMemberIds).includes('member-jean-kevin')
    expect(participantMemberIds).includes('member-pam')
  })
})
