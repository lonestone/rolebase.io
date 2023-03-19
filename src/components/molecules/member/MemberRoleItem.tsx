import DurationSelect from '@atoms/DurationSelect'
import Markdown from '@atoms/Markdown'
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
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CircleFullFragment, useUpdateCircleMemberMutation } from '@gql'
import useOrgMember from '@hooks/useOrgMember'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleMemberDeleteModal from '@organisms/circle/CircleMemberDeleteModal'
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  memberId: string
  circleAndParents: CircleFullFragment[]
}

export default function MemberRoleItem({ memberId, circleAndParents }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const [updateCircleMember] = useUpdateCircleMemberMutation()

  const { colorMode } = useColorMode()
  const hoverColor = colorMode === 'light' ? 'gray.50' : 'whiteAlpha.100'
  const expandedColor = colorMode === 'light' ? 'gray.200' : 'gray.500'

  const circle = circleAndParents[circleAndParents.length - 1]
  const circleMember = useMemo(
    () => circle.members.find((m) => m.member.id === memberId),
    [memberId, circle]
  )
  const role = circle.role

  const [avgMinPerWeek, setAvgMinPerWeek] = useState<number | null>(
    circleMember?.avgMinPerWeek ?? null
  )

  const [saving, setSaving] = useState(false)
  const isDirty = avgMinPerWeek !== circleMember?.avgMinPerWeek ?? null

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
          boxShadow={isExpanded ? 'lg' : 'sm'}
          ml="-3px"
          borderLeft="3px solid"
          borderLeftColor={isExpanded ? expandedColor : 'transparent'}
        >
          <AccordionButton
            as={Box}
            cursor="pointer"
            _hover={{ bg: hoverColor }}
          >
            <CircleAndParentsLinks id={circle.id} flex={1} />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pt={3} pb={5} pl={10}>
            <form onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                {role?.purpose && (
                  <FormControl>
                    <FormLabel>{t(`MemberRoleItem.purpose`)}</FormLabel>
                    <Markdown>{role?.purpose}</Markdown>
                  </FormControl>
                )}
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
