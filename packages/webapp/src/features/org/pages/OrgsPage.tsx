import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import TextErrors from '@/common/atoms/TextErrors'
import { Title } from '@/common/atoms/Title'
import { useElementSize } from '@/common/hooks/useElementSize'
import CirclesGraph from '@/graph/CirclesGraph'
import { GraphEvents, GraphViews } from '@/graph/types'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CreateIcon } from 'src/icons'
import OrgCreateModal from '../modals/OrgCreateModal'

export default function OrgsPage() {
  const { t } = useTranslation()
  const orgs = useStoreState((state) => state.orgs.entries)
  const loading = useStoreState((state) => state.orgs.loading)
  const error = useStoreState((state) => state.orgs.error)
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  // Content size
  const boxRef = useRef<HTMLDivElement>(null)
  const boxSize = useElementSize(boxRef)

  // Circles of orgs
  const circles = useMemo(
    () =>
      orgs?.map(
        (org): CircleFullFragment => ({ ...org.circles[0], members: [] })
      ),
    [orgs]
  )

  // Graph events
  const events: GraphEvents = useMemo(
    () => ({
      onCircleClick: (circleId) => {
        const org = orgs?.find((org) => org.circles[0]?.id === circleId)
        if (!org) return
        navigate(`${getOrgPath(org)}/`)
      },
      onMemberClick: () => {},
    }),
    [orgs]
  )

  // Create modal
  const createModal = useDisclosure()

  useEffect(() => {
    if (orgs?.length === 0) {
      createModal.onOpen()
      return
    }

    // Redirect to org when there is only one org
    if (orgs?.length === 1) {
      navigate(`${getOrgPath(orgs[0])}/`)
      return
    }
  }, [orgs])

  return (
    <ScrollableLayout
      header={
        <Flex ml={5} w="100%" alignItems="center" flexWrap="wrap">
          <Heading as="h1" size="lg">
            {t('OrgsPage.heading')}
          </Heading>
          <Spacer />
          <Button
            colorScheme="blue"
            leftIcon={<CreateIcon size={20} />}
            my={2}
            size="sm"
            onClick={createModal.onOpen}
          >
            {t('common.create')}
          </Button>
        </Flex>
      }
    >
      <Title>{t('OrgsPage.heading')}</Title>

      <Container maxW="3xl" py={10}>
        <Loading center active={loading} />
        <TextErrors errors={[error]} />

        <Box
          ref={boxRef}
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          overflow="hidden"
        >
          {circles && boxSize && (
            <CirclesGraph
              key={colorMode}
              view={GraphViews.AllCircles}
              circles={circles}
              events={events}
              width={boxSize.width}
              height={boxSize.height}
            />
          )}
        </Box>

        {createModal.isOpen && (
          <OrgCreateModal isOpen onClose={createModal.onClose} />
        )}
      </Container>
    </ScrollableLayout>
  )
}
