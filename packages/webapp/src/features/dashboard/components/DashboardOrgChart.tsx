import { useElementSize } from '@/common/hooks/useElementSize'
import CirclesSVGGraph from '@/graph/CirclesSVGGraph'
import useCirclesEvents from '@/graph/hooks/useGraphEvents'
import { CirclesGraphViews } from '@/graph/types'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function DashboardOrgChart(boxProps: BoxProps) {
  const { t } = useTranslation()
  const org = useCurrentOrg()

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)
  const size = boxSize?.width // Square

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const { onCircleClick, onMemberClick } = useCirclesEvents()
  const events = useMemo(() => ({ onCircleClick, onMemberClick }), [])

  // Color mode
  const { colorMode } = useColorMode()

  if (circles?.length === 1 && org) {
    return (
      <Alert status="info">
        <AlertIcon />
        <AlertDescription>{t('DashboardOrgChart.empty')}</AlertDescription>
        <Link to={`${getOrgPath(org)}/roles`}>
          <Button colorScheme="blue">{t('DashboardOrgChart.edit')}</Button>
        </Link>
      </Alert>
    )
  }

  return (
    <Box ref={boxRef} h={size} {...boxProps}>
      {org && circles && size && (
        <CirclesSVGGraph
          key={colorMode}
          view={CirclesGraphViews.AllCircles}
          circles={circles}
          events={events}
          width={size}
          height={size}
          panzoomDisabled
        />
      )}
    </Box>
  )
}
