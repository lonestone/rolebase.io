import { NodeData } from '@/graph/types'
import { SystemStyleObject, useColorMode } from '@chakra-ui/react'
import { Participant } from '@rolebase/shared/model/member'
import React, { useMemo } from 'react'
import { getColor } from '../utils/colors'

interface Props {
  node: NodeData
}

const width = 30
const container1Width = width
const container2Width = 62
const container3Width = 70

export default function CircleLeadersElement({ node }: Props) {
  const { colorMode } = useColorMode()

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
    <div
      style={{
        position: 'relative',
        width: `${containerWidth}px`,
        height: `${width}px`,
      }}
    >
      {leaders?.map((leader, i) => {
        const reverseI = leaders.length - 1 - i
        const x = (reverseI / (leaders.length - 1)) * (containerWidth - width)
        const bgColor = getColor(colorMode, 94, 16, depth, hue)

        return (
          <div
            key={leader.member.id}
            className="circle-leader"
            style={{
              left: `${x}px`,
              width: `${width}px`,
              height: `${width}px`,
              backgroundImage: leader.member.picture
                ? `url(${leader.member.picture})`
                : undefined,
              backgroundColor: bgColor,
            }}
          >
            {!leader.member.picture && (
              <span
                style={{
                  color: 'white',
                  fontSize: '10px',
                }}
              >
                {leader.member.name[0].toUpperCase()}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const circleLeadersStyles: SystemStyleObject = {
  '.circle-leader': {
    display: 'var(--display-members, flex)',
    position: 'absolute',
    top: 0,
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
