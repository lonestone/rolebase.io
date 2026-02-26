import { AspectRatio, StyleProps } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export enum OnboardingVideoType {
  AddMembers = 'AddMembers',
  CreateMeeting = 'CreateMeeting',
  CreateOrg = 'CreateOrg',
  CreateOrgChart = 'CreateOrgChart',
  ThreadsAndTasks = 'ThreadsAndTasks',
}

const videoIds: Record<OnboardingVideoType, { fr: string; en: string }> = {
  [OnboardingVideoType.AddMembers]: {
    fr: 'cmg6c473600070cjr3cwrb4sx',
    en: 'cmipreil2001f04l5962s6qdd',
  },
  [OnboardingVideoType.CreateMeeting]: {
    fr: 'cmg6cu7of00350bl48k57cpu8',
    en: 'cmipt7mu100aj04l5g5ph9a9f',
  },
  [OnboardingVideoType.CreateOrg]: {
    fr: 'cmg6c2zvv000s0bl53mjwehhy',
    en: 'cmiocumka007304jrh76i33mh',
  },
  [OnboardingVideoType.CreateOrgChart]: {
    fr: 'cmg6c3p7c00bt0bkzglpzgdfl',
    en: 'cmiodmcic001904l4f0ew4s3i',
  },
  [OnboardingVideoType.ThreadsAndTasks]: {
    fr: 'cmg6ckxqh006f0blagzaw70w1',
    en: 'cmips7u4w002604kzaye3hna2',
  },
}

interface Props extends StyleProps {
  type: OnboardingVideoType
}

export default function OnboardingVideo({ type, ...styleProps }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'fr' ? 'fr' : 'en'
  const videoId = videoIds[type][lang]

  return (
    <AspectRatio ratio={16 / 9} {...styleProps}>
      <iframe
        src={`https://www.tella.tv/video/${videoId}/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
      />
    </AspectRatio>
  )
}
