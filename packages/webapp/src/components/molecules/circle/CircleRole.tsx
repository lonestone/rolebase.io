import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { Button, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { CircleSummaryFragment, RoleFragment, useGetRoleQuery } from '@gql'
import useCircle from '@hooks/useCircle'
import useOrgMember from '@hooks/useOrgMember'
import SubCirclesFormControl from '@molecules/circle/SubCirclesFormControl'
import RoleGeneratorModal from '@organisms/role/RoleGeneratorModal'
import { ParticipantMember } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import React, { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MagicIcon } from 'src/icons'
import CircleMemberFormControl from './CircleMemberFormControl'
import { RoleEditableField } from './RoleEditableField'

interface Props {
  circle: CircleSummaryFragment
  participants: ParticipantMember[]
}

const editableFields = [
  { field: 'domain' },
  { field: 'accountabilities' },
  { field: 'checklist', initValue: '[] ' },
  { field: 'indicators', initValue: '- ' },
  { field: 'notes' },
] satisfies Array<{
  field: keyof RoleFragment
  initValue?: string
}>

export const fieldsGap = 10

export default function CircleRole({ circle, participants }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  const { data, loading, error } = useGetRoleQuery({
    variables: { id: circle.roleId },
  })
  const role = data?.role_by_pk

  // Parent circles and linked circle
  const parentCircle = useCircle(circle.parentId || undefined)
  const linkedCircle = useCircle(
    (role?.link === RoleLink.Parent ? parentCircle?.parentId : role?.link) ||
      undefined
  )

  const sortedFields = useMemo(() => {
    if (!role) return editableFields
    return [...editableFields].sort((a, b) => {
      if (role[a.field] && !role[b.field]) return -1
      if (!role[a.field] && role[b.field]) return 1
      return 0
    })
  }, [role])

  const generatorModal = useDisclosure()

  if (loading) {
    return <Loading active size="md" />
  }
  if (error || !role) {
    return <TextError error={error || new Error('Role not found')} />
  }

  return (
    <>
      <RoleEditableField
        label={t('CircleRole.purpose')}
        placeholder={t('CircleRole.purposePlaceholder')}
        role={role}
        field="purpose"
        mt={0}
        mb={fieldsGap}
      />

      <VStack spacing={fieldsGap} align="stretch" mb={isMember ? fieldsGap : 0}>
        {!role.singleMember ? (
          <SubCirclesFormControl circle={circle} participants={participants} />
        ) : null}

        <CircleMemberFormControl circleId={circle.id} />

        {parentCircle && linkedCircle && (
          <Text>
            <Trans
              i18nKey="CircleRole.representCircle"
              components={{
                link: <CircleButton circle={parentCircle} />,
              }}
            />
            <br />
            <Trans
              i18nKey="CircleRole.representInCircle"
              components={{
                link: <CircleButton circle={linkedCircle} />,
              }}
            />
          </Text>
        )}
      </VStack>

      {sortedFields.map(({ field, initValue }) => (
        <RoleEditableField
          key={field}
          label={t(`CircleRole.${field}`)}
          placeholder={t(`CircleRole.${field}Placeholder`)}
          role={role}
          field={field}
          initValue={initValue}
        />
      ))}

      {role.purpose === '' &&
        isMember &&
        editableFields.every(({ field }) => role[field] === '') && (
          <Button
            leftIcon={<MagicIcon />}
            variant="outline"
            colorScheme="blue"
            onClick={generatorModal.onOpen}
          >
            {t('CircleRole.generate')}
          </Button>
        )}

      {generatorModal.isOpen && (
        <RoleGeneratorModal
          isOpen
          role={role}
          onClose={generatorModal.onClose}
        />
      )}
    </>
  )
}
