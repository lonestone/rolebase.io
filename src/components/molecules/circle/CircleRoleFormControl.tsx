import CircleButton from '@atoms/CircleButton'
import { Text, VStack } from '@chakra-ui/react'
import { CircleWithRoleFragment, RoleFragment } from '@gql'
import useCircle from '@hooks/useCircle'
import SubCirclesFormControl from '@molecules/circle/SubCirclesFormControl'
import { ParticipantMember } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import React, { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import CircleMemberFormControl from './CircleMemberFormControl'
import { RoleEditableField } from './RoleEditableField'

interface Props {
  circle: CircleWithRoleFragment
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

export default function CircleRoleFormControl({ circle, participants }: Props) {
  const { t } = useTranslation()
  const role = circle.role

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

  return (
    <>
      <RoleEditableField
        label={t('CircleRoleFormControl.purpose')}
        placeholder={t('CircleRoleFormControl.purposePlaceholder')}
        role={role}
        field="purpose"
        mt={0}
        mb={fieldsGap}
      />

      <VStack spacing={fieldsGap} mb={fieldsGap} align="stretch">
        {!role.singleMember ? (
          <SubCirclesFormControl circle={circle} participants={participants} />
        ) : null}

        <CircleMemberFormControl circleId={circle.id} />

        {parentCircle && linkedCircle && (
          <Text>
            <Trans
              i18nKey="CircleRoleFormControl.representCircle"
              components={{
                link: <CircleButton circle={parentCircle} />,
              }}
            />
            <br />
            <Trans
              i18nKey="CircleRoleFormControl.representInCircle"
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
          label={t(`CircleRoleFormControl.${field}`)}
          placeholder={t(`CircleRoleFormControl.${field}Placeholder`)}
          role={role}
          field={field}
          initValue={initValue}
        />
      ))}
    </>
  )
}
