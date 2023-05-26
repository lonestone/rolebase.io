import CircleByIdButton from '@atoms/CircleByIdButton'
import NumberInput from '@atoms/NumberInput'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react'
import { GraphZoomProvider } from '@contexts/GraphZoomContext'
import { useOrgId } from '@hooks/useOrgId'
import GraphViewsSelect from '@molecules/circle/GraphViewsSelect'
import CirclesGraph from '@organisms/circle/CirclesGraph'
import { getCircleChildren } from '@shared/helpers/getCircleChildren'
import { useStoreState } from '@store/hooks'
import { downloadSvgAsPng } from '@utils/downloadSvgAsPng'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiDownload, FiTarget } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { Graph } from 'src/circles-viz/Graph'
import { GraphViews } from 'src/circles-viz/types'

type CircleExportParams = {
  circleId: string
}

const defaultWidth = 600

export default function CircleExportPage() {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const queryParams = useParams<CircleExportParams>()
  const circleId = queryParams.circleId
  const orgId = useOrgId()
  const [downloading, setDownloading] = useState(false)
  const [ready, setReady] = useState(false)
  const graphRef = useRef<Graph>(null)

  // Settings
  const [view, setView] = useState(GraphViews.AllCircles)
  const [width, setWidth] = useState(defaultWidth)

  // Data
  const circles = useStoreState((state) => state.org.circles)

  const selectedCircles = useMemo(() => {
    if (!circles || !circleId) return undefined

    const circle = circles.find((c) => c.id === circleId)
    if (!circle) return undefined

    return [
      { ...circle, parentId: null },
      ...getCircleChildren(circles, circleId),
    ]
  }, [circles, circleId])

  // Center graph
  const handleCenter = () => {
    if (!circleId || !graphRef.current) return
    graphRef.current.zoom.focusCircle?.(undefined, true)
  }

  // Center graph and adapt scale on width change
  useEffect(() => {
    if (!ready) return
    setTimeout(handleCenter, 100)
  }, [circleId, ready, width, view])

  // Download as PNG
  const handleDownload = () => {
    const svgElement = graphRef.current?.svg
    if (!orgId || !svgElement) return
    setDownloading(true)
    setTimeout(async () => {
      await downloadSvgAsPng(svgElement)
      setDownloading(false)
    }, 0)
  }

  return (
    <GraphZoomProvider>
      <Box p={5}>
        <Title>{t('CircleExportPage.heading')}</Title>

        <Flex mb={12} alignItems="center" flexWrap="wrap">
          <Heading as="h1" size="md">
            {t('CircleExportPage.heading')}
          </Heading>
          {circleId && <CircleByIdButton id={circleId} size="md" ml={2} />}
          <Spacer />
          <NumberInput
            value={width}
            step={50}
            min={100}
            size="sm"
            w="80px"
            textAlign="center"
            mr={1}
            onChange={setWidth}
          />
          px
          <Button
            colorScheme="blue"
            leftIcon={<FiDownload />}
            isLoading={downloading}
            ml={5}
            onClick={handleDownload}
          >
            {t('CircleExportPage.download')}
          </Button>
        </Flex>

        <Container maxW={`${defaultWidth}px`} display="flex" mb={3} p={0}>
          <GraphViewsSelect
            variant="outline"
            size="sm"
            value={view}
            onChange={setView}
          />
          <Spacer />
          <Button size="sm" leftIcon={<FiTarget />} onClick={handleCenter}>
            {t('CircleExportPage.center')}
          </Button>
        </Container>

        <Box
          width={`${width}px`}
          height={`${width}px`}
          margin="0 auto"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
          cursor="move"
          _dark={{
            bg: 'black',
            borderColor: 'gray.550',
          }}
          sx={{
            '.type-Member text': {
              opacity: '1 !important',
            },
          }}
        >
          {orgId && selectedCircles && (
            <CirclesGraph
              ref={graphRef}
              key={view + colorMode}
              view={view}
              id={`graph-${orgId}`}
              circles={selectedCircles}
              events={{}}
              width={width}
              height={width}
              focusCircleScale={(node) => node.r * 1.01}
              onReady={() => setReady(true)}
            />
          )}
        </Box>
      </Box>
    </GraphZoomProvider>
  )
}
