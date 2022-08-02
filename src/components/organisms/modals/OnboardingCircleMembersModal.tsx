import { createCircle, updateCircle } from '@api/entities/circles'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  UseModalProps,
} from '@chakra-ui/react'
import TextError from '@components/atoms/TextError'
import MembersMultiSelect from '@components/molecules/MembersMultiSelect'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import useItemsArray from '@hooks/useItemsArray'
import useMember from '@hooks/useMember'
import { useOrgId } from '@hooks/useOrgId'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
import { nanoid } from 'nanoid'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends UseModalProps {
  circle: CircleWithRoleEntry
  onSubmit(): void
}

export default function OnboardingCircleMembersModal({
  circle,
  onSubmit,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const roles = useStoreState((state) => state.roles.entries)
  const leaderRole = useMemo(
    () => roles?.find((role) => role.autoCreate),
    [roles]
  )

  const [loading, setLoading] = useState(false)
  const [singleMember, setSingleMember] = useState(true)

  const [leaderId, setLeaderId] = useState<string | undefined>()
  const leaderMember = useMember(leaderId || '')

  const {
    items: membersIds,
    add: addMember,
    removeItem: removeMember,
  } = useItemsArray<string>([])

  // Add members to circle
  const handleSubmit = async () => {
    if (!orgId || !leaderRole || !leaderId) return
    setLoading(true)
    try {
      if (singleMember) {
        // Set member
        await updateCircle(circle.id, {
          members: [{ id: nanoid(10), memberId: leaderId }],
        })
      } else {
        // Set members
        await updateCircle(circle.id, {
          members: membersIds.map((id) => ({ id: nanoid(10), memberId: id })),
        })

        // Add leader circle
        await createCircle({
          orgId,
          roleId: leaderRole.id,
          parentId: circle.id,
          members: [{ id: nanoid(10), memberId: leaderId }],
        })
      }
      onSubmit()
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('organisms.modals.OnboardingCircleMembersModal.heading', {
            role: circle.role.name,
          })}
        </ModalHeader>

        <ModalBody>
          <Stack spacing={7} align="stretch">
            <FormControl>
              <FormLabel>
                {t('organisms.modals.OnboardingCircleMembersModal.leader', {
                  role: circle.role.name,
                })}
              </FormLabel>
              <MemberSearchInput
                value={leaderId}
                placeholder={t(
                  'organisms.modals.OnboardingCircleMembersModal.memberPlaceholder'
                )}
                onChange={setLeaderId}
              />
            </FormControl>

            <FormControl>
              <RadioGroup
                value={singleMember ? '1' : '0'}
                onChange={(value) => setSingleMember(value === '1')}
              >
                <Stack spacing={1}>
                  <Radio value="1">
                    {t(
                      'organisms.modals.OnboardingCircleMembersModal.choiceSingle',
                      { member: leaderMember?.name }
                    )}
                  </Radio>
                  <Radio value="0">
                    {t(
                      'organisms.modals.OnboardingCircleMembersModal.choiceCircle'
                    )}
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {leaderId && !singleMember && (
              <MembersMultiSelect
                circleId={circle.id}
                membersIds={membersIds}
                excludeMembersIds={leaderId ? [leaderId] : undefined}
                onAdd={addMember}
                onRemove={removeMember}
              />
            )}
          </Stack>

          {roles && !leaderRole && (
            <TextError
              error={new Error('No role found with autoCreate=true')}
            />
          )}
        </ModalBody>

        <ModalFooter>
          {leaderId && (singleMember || membersIds.length > 0) && (
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading}
              onClick={handleSubmit}
            >
              {t('common.save')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
