import Loading from '@atoms/Loading'
import { Title } from '@atoms/Title'
import { BoxProps } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import useMeetingState from '@hooks/useMeetingState'
import ScrollableLayout from '@molecules/ScrollableLayout'
import MeetingHeader from '@molecules/meeting/MeetingHeader'
import MeetingPanelEnded from '@molecules/meeting/MeetingPanelEnded'
import MeetingPanelStarted from '@molecules/meeting/MeetingPanelStarted'
import Page404 from '@pages/Page404'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MeetingContent from '../../molecules/meeting/MeetingContent'

interface Props extends BoxProps {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function MeetingContainer({
  id,
  changeTitle,
  headerIcons,
  ...boxProps
}: Props) {
  const { t } = useTranslation()

  // Load meeting and steps
  const meetingState = useMeetingState(id)

  const { meeting, loading, error, circle, isStarted, isEnded } = meetingState

  if (error) {
    console.error(error)
    return <Page404 />
  }

  return (
    <MeetingContext.Provider value={meetingState}>
      {changeTitle && (
        <Title>
          {t('MeetingContainer.title', {
            circle: circle?.role.name || '',
            title: meeting?.title || '…',
          })}
        </Title>
      )}

      <ScrollableLayout
        {...boxProps}
        header={<MeetingHeader headerIcons={headerIcons} />}
        content={
          loading ? <Loading active size="md" mt={10} /> : <MeetingContent />
        }
        footer={
          isStarted ? (
            <MeetingPanelStarted />
          ) : isEnded ? (
            <MeetingPanelEnded />
          ) : undefined
        }
      />
    </MeetingContext.Provider>
  )
}
