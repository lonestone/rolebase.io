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
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import Loading from '@components/atoms/Loading'
import Markdown from '@components/atoms/Markdown'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import DateInfo from '@components/molecules/DateInfo'
import useOrgMember from '@hooks/useOrgMember'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSubscribeDecisionSubscription } from 'src/graphql.generated'
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
  const { data, loading, error } = useSubscribeDecisionSubscription({
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
