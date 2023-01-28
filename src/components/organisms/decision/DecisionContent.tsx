import CircleByIdButton from '@atoms/CircleByIdButton'
import Loading from '@atoms/Loading'
import Markdown from '@atoms/Markdown'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useDecisionSubscription } from '@gql'
import useOrgMember from '@hooks/useOrgMember'
import ActionsMenu from '@molecules/ActionsMenu'
import DateInfo from '@molecules/DateInfo'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DecisionDeleteModal from './DecisionDeleteModal '
import DecisionEditModal from './DecisionEditModal'

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
  const isMember = useOrgMember()
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()

  // Subscribe decision
  const { data, loading, error } = useDecisionSubscription({
    variables: { id },
  })
  const decision = data?.decision_by_pk || undefined

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
      <TextErrors errors={[error]} />

      {decision && <DateInfo date={decision.createdAt} />}

      <Text fontSize="lg" fontWeight="bold" mt={2} mb={5}>
        {decision?.title}
      </Text>

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
