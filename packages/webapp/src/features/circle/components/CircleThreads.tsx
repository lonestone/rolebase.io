import Loading from '@/common/atoms/Loading'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import ThreadsList from '@/thread/components/ThreadsList'
import useThreads from '@/thread/hooks/useThreads'
import ThreadEditModal from '@/thread/modals/ThreadEditModal'
import { AspectRatio, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'

interface Props {
  circleId: string
}

export default function CircleThreads({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()

  // Subscribe to threads
  const { threads, loading, error } = useThreads({ circleId })

  // Thread create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <>
      {isMember && (
        <Button
          size="sm"
          mb={4}
          leftIcon={<CreateIcon size={20} />}
          onClick={onCreateOpen}
        >
          {t('CircleThreads.create')}
        </Button>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {threads && <ThreadsList threads={threads} showIcon showMember />}

      {isAdmin && threads?.length === 0 && (
        // Video: Comment utiliser les sujets et tâches
        // https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/view
        <AspectRatio ratio={16 / 9} mt={10}>
          <iframe
            src="https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </AspectRatio>
      )}

      {isCreateOpen && (
        <ThreadEditModal
          defaults={{
            circleId,
          }}
          isOpen
          onClose={onCreateClose}
        />
      )}
    </>
  )
}
