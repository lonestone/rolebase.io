import CircleAndParentsLinks from '@/circle/components/CircleAndParentsLinks'
import CircleMemberDeleteModal from '@/circle/modals/CircleMemberDeleteModal'
import DurationSelect from '@/common/atoms/DurationSelect'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CircleFullFragment, useUpdateCircleMemberMutation } from '@gql'
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRightIcon } from 'src/icons'
import useOrgMember from '../hooks/useOrgMember'

interface Props {
  memberId: string
  circle: CircleFullFragment
  iconRightArrow?: boolean
}

export default function MemberRoleItem({
  memberId,
  circle,
  iconRightArrow,
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const [updateCircleMember] = useUpdateCircleMemberMutation()

  // Circle member data
  const circleMember = useMemo(
    () => circle.members.find((m) => m.member.id === memberId),
    [memberId, circle]
  )
  const role = circle.role

  // Form state
  const [avgMinPerWeek, setAvgMinPerWeek] = useState<number | null>(
    circleMember?.avgMinPerWeek ?? null
  )
  const [saving, setSaving] = useState(false)
  const isDirty = avgMinPerWeek !== (circleMember?.avgMinPerWeek ?? null)

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      if (!circleMember) return
      setSaving(true)
      updateCircleMember({
        variables: { id: circleMember.id, values: { avgMinPerWeek } },
      })
    },
    [circle, avgMinPerWeek]
  )

  // Reset saving state when circleMember changes after save
  useEffect(() => {
    if (saving) {
      setSaving(false)
    }
  }, [circleMember])

  const deleteModal = useDisclosure()

  if (!circleMember) return null

  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <Box
          borderWidth="1px"
          borderColor={isExpanded ? undefined : 'transparent'}
          borderRadius="md"
          boxShadow={isExpanded ? 'md' : undefined}
          bg={isExpanded ? 'whiteAlpha.500' : 'transparent'}
          _dark={{ bg: isExpanded ? 'whiteAlpha.100' : 'transparent' }}
        >
          <AccordionButton
            as={Box}
            cursor="pointer"
            _hover={{ bg: 'blackAlpha.50' }}
            _dark={{ _hover: { bg: 'whiteAlpha.100' } }}
          >
            <CircleAndParentsLinks circle={circle} flex={1} />
            {iconRightArrow ? (
              <ChevronRightIcon size={18} />
            ) : (
              <AccordionIcon />
            )}
          </AccordionButton>
          <AccordionPanel
            pt={3}
            pb={5}
            pl={10}
            display={!isMember ? 'none' : undefined}
          >
            <form onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                {isMember && (
                  <>
                    <FormControl>
                      <FormLabel>{t(`MemberRoleItem.workingTime`)}</FormLabel>
                      <DurationSelect
                        size="sm"
                        placeholderValue={role?.defaultMinPerWeek ?? undefined}
                        value={avgMinPerWeek}
                        onChange={setAvgMinPerWeek}
                      />
                    </FormControl>

                    <HStack justifyContent="end">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={deleteModal.onOpen}
                      >
                        {t(`common.delete`)}
                      </Button>

                      {isDirty && (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          type="submit"
                          isLoading={saving}
                        >
                          {t(`common.save`)}
                        </Button>
                      )}
                    </HStack>
                  </>
                )}
              </VStack>
            </form>
          </AccordionPanel>

          {deleteModal.isOpen && (
            <CircleMemberDeleteModal
              circleId={circle.id}
              memberId={memberId}
              isOpen
              onClose={deleteModal.onClose}
            />
          )}
        </Box>
      )}
    </AccordionItem>
  )
}
