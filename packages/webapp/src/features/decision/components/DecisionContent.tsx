import CircleByIdButton from '@/circle/components/CircleByIdButton'
import useCircle from '@/circle/hooks/useCircle'
import ActionsMenu from '@/common/atoms/ActionsMenu'
import Loading from '@/common/atoms/Loading'
import Markdown from '@/common/atoms/Markdown'
import { Title } from '@/common/atoms/Title'
import useDateLocale from '@/common/hooks/useDateLocale'
import Page404 from '@/common/pages/Page404'
import useOrgMember from '@/member/hooks/useOrgMember'
import {
  Box,
  BoxProps,
  Center,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useDecisionSubscription } from '@gql'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PrivacyIcon } from 'src/icons'
import DecisionDeleteModal from '../modals/DecisionDeleteModal '
import DecisionEditModal from '../modals/DecisionEditModal'

interface Props extends BoxProps {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
  onClose(): void
}

export default function DecisionContent({
  id,
  changeTitle,
  headerIcons,
  onClose,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()
  const isMember = useOrgMember()
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()

  // Subscribe decision
  const { data, loading, error } = useDecisionSubscription({
    variables: { id },
  })
  const decision = data?.decision_by_pk || undefined

  const circle = useCircle(decision?.circleId)

  if (error || (!decision && !loading)) {
    console.error(error || new Error('Decision not found'))
    return <Page404 />
  }

  return (
    <Box mb={3} {...boxProps}>
      {changeTitle && <Title>{decision?.title || '…'}</Title>}

      <Flex align="center" mb={5}>
        <Heading as="h1" size="md">
          {t('DecisionContent.heading')}
        </Heading>

        {decision && <CircleByIdButton id={decision.circleId} ml={3} />}

        {decision?.archived && <Tag ml={2}>{t('common.archived')}</Tag>}

        <Spacer />

        {decision?.private && (
          <Tooltip
            label={t('DecisionContent.private', {
              role: circle?.role.name,
            })}
            hasArrow
          >
            <Center mr={2}>
              <PrivacyIcon size={20} />
            </Center>
          </Tooltip>
        )}

        {isMember && (
          <Flex mr={headerIcons ? -3 : 0}>
            <ActionsMenu
              ml={3}
              onEdit={editModal.onOpen}
              onDelete={deleteModal.onOpen}
            />
            {headerIcons}
          </Flex>
        )}
      </Flex>

      {id && loading && <Loading active size="md" />}

      <Text fontSize="lg" fontWeight="bold" mt={2} mb={1}>
        {decision?.title}
      </Text>

      {decision && (
        <Text fontSize="sm" fontWeight="normal" color="gray.400" mb={5}>
          {capitalizeFirstLetter(
            format(new Date(decision.createdAt), 'PPPP', {
              locale: dateLocale,
            })
          )}
        </Text>
      )}

      <Markdown>{decision?.description || ''}</Markdown>

      {editModal.isOpen && (
        <DecisionEditModal
          decision={decision}
          isOpen
          onClose={editModal.onClose}
        />
      )}

      {deleteModal.isOpen && decision && (
        <DecisionDeleteModal
          decision={decision}
          isOpen
          onClose={deleteModal.onClose}
          onDelete={onClose}
        />
      )}
    </Box>
  )
}
