import TextError from '@atoms/TextError'
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
import { useCreateCircleMemberMutation, useCreateCircleMutation } from '@gql'
import useItemsArray from '@hooks/useItemsArray'
import useMember from '@hooks/useMember'
import { useOrgId } from '@hooks/useOrgId'
import MembersMultiSelect from '@molecules/member/MembersMultiSelect'
import MemberSearchInput from '@molecules/search/entities/members/MemberSearchInput'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
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

  const [createCircleMember] = useCreateCircleMemberMutation()
  const [createCircle] = useCreateCircleMutation()

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
        await createCircleMember({
          variables: {
            circleId: circle.id,
            memberId: leaderId,
          },
        })
      } else {
        // Set members
        for (const memberId of membersIds) {
          await createCircleMember({
            variables: {
              circleId: circle.id,
              memberId,
            },
          })
        }

        // Add leader circle
        const circleResult = await createCircle({
          variables: {
            orgId,
            roleId: leaderRole.id,
            parentId: circle.id,
          },
        })
        const leaderCircleId = circleResult.data?.insert_circle_one?.id
        if (leaderCircleId) {
          await createCircleMember({
            variables: {
              circleId: leaderCircleId,
              memberId: leaderId,
            },
          })
        }
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
          {t('OnboardingCircleMembersModal.heading', {
            role: circle.role.name,
          })}
        </ModalHeader>

        <ModalBody>
          <Stack spacing={7} align="stretch">
            <FormControl>
              <FormLabel>
                {t('OnboardingCircleMembersModal.leader', {
                  role: circle.role.name,
                })}
              </FormLabel>
              <MemberSearchInput
                value={leaderId}
                placeholder={t(
                  'OnboardingCircleMembersModal.memberPlaceholder'
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
                    {t('OnboardingCircleMembersModal.choiceSingle', {
                      member: leaderMember?.name,
                    })}
                  </Radio>
                  <Radio value="0">
                    {t('OnboardingCircleMembersModal.choiceCircle')}
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
