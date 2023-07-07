import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  useColorMode,
} from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useElementSize } from '@hooks/useElementSize'
import useCirclesEvents from '@hooks/useGraphEvents'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useQueryParams from '@hooks/useQueryParams'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GraphViews } from 'src/circles-viz/types'
import { Link as ReachLink } from 'react-router-dom'

export type DashboardOrgChartProps = {
  path: string
}

type CirclesPageParams = {
  circleId: string
  memberId: string
}

const DashboardOrgChart = ({ path }: DashboardOrgChartProps) => {
  useOverflowHidden()
  const { t } = useTranslation()

  const queryParams = useQueryParams<CirclesPageParams>()
  const org = useCurrentOrg()
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  const [circleId, setCircleId] = useState<string | undefined>()

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const { onCircleClick, onMemberClick, onCircleMemberClick } =
    useCirclesEvents()

  // URL params
  useEffect(() => {
    if (!ready) return

    // Focus circle
    setCircleId(queryParams.circleId)
  }, [ready, JSON.stringify(queryParams)])

  // Color mode
  const { colorMode } = useColorMode()

  return (
    <Card w="inherit" h="300px">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="md">
          <Link as={ReachLink} to={path}>
            {t('DashboardOrgChart.title')}
          </Link>
        </Heading>
      </CardHeader>

      <CardBody p={4} position="relative">
        <Box
          ref={boxRef}
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          overflow="hidden"
        >
          {org && circles && boxSize && (
            <CirclesGraph
              key={GraphViews.AllCircles + colorMode}
              view={GraphViews.AllCircles}
              id={`dashboard-graph-${org.id}`}
              circles={circles}
              events={{ onCircleClick, onMemberClick, onCircleMemberClick }}
              width={boxSize.width}
              height={boxSize.height}
              focusCrop={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              selectedCircleId={circleId}
              onReady={() => setReady(true)}
            />
          )}
        </Box>
      </CardBody>
    </Card>
  )
}

export default DashboardOrgChart
