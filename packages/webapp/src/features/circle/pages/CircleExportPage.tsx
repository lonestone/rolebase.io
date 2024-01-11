import NumberInput from '@/common/atoms/NumberInput'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import { Title } from '@/common/atoms/Title'
import { Graph } from '@/graph/Graph'
import { GraphProvider } from '@/graph/contexts/GraphContext'
import { GraphViews } from '@/graph/types'
import { useOrgId } from '@/org/hooks/useOrgId'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react'
import { getCircleChildren } from '@shared/helpers/getCircleChildren'
import { useStoreState } from '@store/hooks'
import { downloadSvgAsPng } from '@utils/downloadSvgAsPng'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CenterIcon, DownloadIcon } from 'src/icons'
import CircleByIdButton from '../components/CircleByIdButton'
import CirclesGraph from '../components/CirclesGraph'
import GraphViewsSelect from '../components/GraphViewsSelect'

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
    graphRef.current.focusNodeId(undefined, true)
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
    <GraphProvider>
      <ScrollableLayout
        header={
          <Flex ml={5} my={2} w="100%" alignItems="center" flexWrap="wrap">
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
              leftIcon={<DownloadIcon />}
              isLoading={downloading}
              ml={5}
              onClick={handleDownload}
            >
              {t('CircleExportPage.download')}
            </Button>
          </Flex>
        }
      >
        <Title>{t('CircleExportPage.heading')}</Title>

        <Container maxW={`${defaultWidth}px`} display="flex" my={10}>
          <GraphViewsSelect
            variant="outline"
            size="sm"
            value={view}
            onChange={setView}
          />
          <Spacer />
          <Button
            size="sm"
            leftIcon={<CenterIcon size={20} />}
            onClick={handleCenter}
          >
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
              width={width}
              height={width}
              focusCircleScale={(node) => node.r * 1.01}
              onReady={() => setReady(true)}
            />
          )}
        </Box>
      </ScrollableLayout>
    </GraphProvider>
  )
}
