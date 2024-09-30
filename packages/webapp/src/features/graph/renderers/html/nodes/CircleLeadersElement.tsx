import { NodeData } from '@/graph/types'
import { Circle, Text } from '@chakra-ui/react'
import { Participant } from '@rolebase/shared/model/member'
import React, { useMemo } from 'react'
import { getDarkColor, getLightColor } from '../utils/colors'

interface Props {
  node: NodeData
}

const radiusRatio = 0.4
const padding2Ratio = 0.2
const padding3Ratio = 0.03

export default function leadersElement({ node }: Props) {
  if (!node.data.participants?.length) return null

  const depth = node.depth + 1
  const hue = node.data.colorHue

  // Get participants leaders
  const leaders = useMemo(
    () =>
      node.data.participants
        ?.reduce((acc, p) => {
          if (p.leader && !acc.find((p2) => p2.member.id === p.member.id)) {
            acc.push(p)
          }
          return acc
        }, [] as Participant[])
        .reverse(),
    [node.data.participants]
  )

  const radius = node.r * radiusRatio
  const padding =
    node.r * ((leaders?.length || 0) > 2 ? padding3Ratio : padding2Ratio)
  const xRange = 2 * (node.r - padding - radius)

  return (
    leaders?.map((leader, i) => {
      const reverseI = leaders.length - 1 - i
      const x =
        !leaders || leaders.length === 1
          ? node.r - radius
          : padding + (reverseI / (leaders.length - 1)) * xRange

      const y = node.r - radius

      return (
        <Circle
          key={leader.member.id}
          display="var(--display-members, flex)"
          position="absolute"
          top={`${y}px`}
          left={`${x}px`}
          size={`${radius * 2}px`}
          bgImg={`url(${leader.member.picture})`}
          bgPos="center"
          bgSize="cover"
          bgColor={getLightColor(94, depth, hue)}
          _dark={{
            bg: getDarkColor(16, depth, hue),
          }}
        >
          {!leader.member.picture && (
            <Text color="white" fontSize="10px">
              {leader.member.name[0].toUpperCase()}
            </Text>
          )}
        </Circle>
      )
    }) || null
  )
}
