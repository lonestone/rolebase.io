import { NodeData } from '@/graph/types'
import { Box, Circle, Text } from '@chakra-ui/react'
import { Participant } from '@rolebase/shared/model/member'
import React, { useMemo } from 'react'
import { getDarkColor, getLightColor } from '../utils/colors'

interface Props {
  node: NodeData
}

const width = 30
const container1Width = width
const container2Width = 62
const container3Width = 70

export default function CircleLeadersElement({ node }: Props) {
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

  if (!leaders) return null

  const depth = node.depth + 1
  const hue = node.data.colorHue
  const containerWidth =
    leaders.length === 1
      ? container1Width
      : leaders.length === 2
      ? container2Width
      : container3Width

  return (
    <Box
      position="relative"
      width={`${containerWidth}px`}
      height={`${width}px`}
    >
      {leaders?.map((leader, i) => {
        const reverseI = leaders.length - 1 - i
        const x = (reverseI / (leaders.length - 1)) * (containerWidth - width)
        return (
          <Circle
            key={leader.member.id}
            display="var(--display-members, flex)"
            position="absolute"
            top={0}
            left={`${x}px`}
            size={`${width}px`}
            bgImg={`url(${leader.member.picture})`}
            bgPos="center"
            bgSize="cover"
            bgColor={getLightColor(94, depth, hue)}
            _dark={{
              bgColor: getDarkColor(16, depth, hue),
            }}
          >
            {!leader.member.picture && (
              <Text color="white" fontSize="10px">
                {leader.member.name[0].toUpperCase()}
              </Text>
            )}
          </Circle>
        )
      })}
    </Box>
  )
}
