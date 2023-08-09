import BrandIcon from '@atoms/BrandIcon'
import Loading from '@atoms/Loading'
import { Box } from '@chakra-ui/react'
import { CircleMemberContext } from '@contexts/CircleMemberContext'
import { GraphProvider } from '@contexts/GraphContext'
import { useGetPublicCirclesQuery } from '@gql'
import { useElementSize } from '@hooks/useElementSize'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useQueryParams from '@hooks/useQueryParams'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import Page404 from '@pages/Page404'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { GraphEvents, GraphViews } from 'src/circles-viz/types'
import settings from 'src/settings'
import CircleCard from './CircleCard'
import MemberCard from './MemberCard'
import ModalPanel from './ModalPanel'

type Params = {
  orgId: string
  view: GraphViews
  zoom: string
}

export default function OrgPage() {
  useOverflowHidden()
  const queryParams = useQueryParams<Params>()

  const { data, loading, error } = useGetPublicCirclesQuery({
    skip: !queryParams.orgId,
    variables: {
      orgId: queryParams.orgId!,
    },
  })

  if (error) {
    // Don't display error for user, only in console
    console.error(error)
  }

  // Fetch public data of organization
  const actions = useStoreActions((actions) => ({
    setCurrentId: actions.org.setCurrentId,
    setSubscriptionResult: actions.org.setSubscriptionResult,
  }))

  useEffect(() => {
    if (!queryParams.orgId || !data?.circle[0]) return

    actions.setCurrentId(queryParams.orgId)

    actions.setSubscriptionResult({
      // Enrich data with empty values to match interfaces
      result: data
        ? {
            id: queryParams.orgId,
            archived: false,
            createdAt: new Date().toISOString(),
            name: 'Org',
            defaultWorkedMinPerWeek: 0,
            shareMembers: true,
            shareOrg: true,
            circles: data.circle.map((c) => ({
              ...c,
              archived: false,
              members: c.members.map((m) => ({
                ...m,
                archived: false,
                avgMinPerWeek: 0,
              })),
            })),
            roles: data.role.map((r) => ({
              ...r,
              archived: false,
              accountabilities: '',
              domain: '',
              indicators: '',
              checklist: '',
              notes: '',
              defaultMinPerWeek: 0,
            })),
            members: data.member.map((m) => ({
              ...m,
              archived: false,
              description: '',
            })),
          }
        : undefined,
      loading: false,
      error,
    })
  }, [queryParams.orgId, data])

  // Graph view
  const view =
    queryParams.view && GraphViews[queryParams.view]
      ? queryParams.view
      : GraphViews.AllCircles

  // Selected circle & member
  const { circleId, memberId, goTo } = useContext(CircleMemberContext)!

  // Data
  const circles = useStoreState((state) => state.org.circles)
  const events: GraphEvents = useMemo(
    () => ({
      onCircleClick: goTo,
      onMemberClick: goTo,
      onClickOutside: () => goTo(),
    }),
    []
  )

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  return (
    <GraphProvider>
      <Box
        ref={boxRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="100vh"
        overflow="hidden"
      >
        <Box position="absolute" zIndex={1} top={5} left={5}>
          <a href={settings.websiteUrl} target="_blank" rel="noreferrer">
            <BrandIcon size="sm" />
          </a>
        </Box>

        {loading ? <Loading center active /> : !data?.circle[0] && <Page404 />}

        {circles && boxSize && (
          <CirclesGraph
            view={view}
            id="graph"
            circles={circles}
            events={events}
            width={boxSize.width}
            height={boxSize.height}
            selectedCircleId={circleId}
            panzoomDisabled={queryParams.zoom === undefined}
          />
        )}

        {memberId ? (
          <ModalPanel isOpen onClose={goTo}>
            <MemberCard id={memberId} selectedCircleId={circleId} />
          </ModalPanel>
        ) : (
          circleId && (
            <ModalPanel isOpen onClose={goTo}>
              <CircleCard id={circleId} />
            </ModalPanel>
          )
        )}
      </Box>
    </GraphProvider>
  )
}
