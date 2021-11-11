import { Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import useOverflowHidden from '../../hooks/useOverflowHidden'
import useQueryParams from '../../hooks/useQueryParams'
import useWindowSize from '../../hooks/useWindowSize'
import CirclePanel from '../circles/CirclePanel'
import CirclesDefaultPanel from '../circles/CirclesDefaultPanel'
import MemberPanel from '../members/MemberPanel'
import BaseRolesPanel from '../roles/BaseRolesPanel'
import VacantRolesPanel from '../roles/VacantRolesPanel'
import { useStoreState } from '../store/hooks'
import CirclesGraph from './CirclesGraph'

type CirclesPageParams = {
  circleId: string
  memberId: string
  baseRoles: string
  vacantRoles: string
}

enum Panels {
  Circle,
  Member,
  BaseRoles,
  VacantRoles,
}

export default function CirclesPage() {
  useOverflowHidden()

  const queryParams = useQueryParams<CirclesPageParams>()
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const [ready, setReady] = useState(false)

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWindowSize(boxRef)

  // Panels
  const [panel, setPanel] = useState<Panels | undefined>()
  const [circleId, setCircleId] = useState<string | undefined>()
  const [memberId, setMemberId] = useState<string | null | undefined>()

  const handleClosePanel = useCallback(() => navigateOrg(), [])

  // URL params
  useEffect(() => {
    if (!ready) return

    // Focus circle
    if (queryParams.circleId) {
      setCircleId(queryParams.circleId)
    }

    // Open panel
    if (queryParams.baseRoles !== undefined) {
      setPanel(Panels.BaseRoles)
    } else if (queryParams.vacantRoles !== undefined) {
      setPanel(Panels.VacantRoles)
    } else if (queryParams.memberId) {
      setMemberId(queryParams.memberId)
      setPanel(Panels.Member)
    } else if (queryParams.circleId) {
      setPanel(Panels.Circle)
    } else {
      setPanel(undefined)
    }
  }, [ready, JSON.stringify(queryParams)])

  return (
    <Box flex={1} ref={boxRef} position="relative" overflow="hidden">
      {orgId && (
        <CirclesGraph
          width={width}
          height={height}
          focusCircleId={circleId}
          onReady={() => setReady(true)}
        />
      )}

      {panel === undefined && <CirclesDefaultPanel />}

      {panel === Panels.Circle && circleId && (
        <CirclePanel id={circleId} onClose={handleClosePanel} />
      )}

      {panel === Panels.Member && memberId && (
        <MemberPanel
          id={memberId}
          highlightCircleId={circleId || undefined}
          onClose={handleClosePanel}
        />
      )}

      {panel === Panels.BaseRoles && (
        <BaseRolesPanel onClose={handleClosePanel} />
      )}

      {panel === Panels.VacantRoles && (
        <VacantRolesPanel onClose={handleClosePanel} />
      )}
    </Box>
  )
}
