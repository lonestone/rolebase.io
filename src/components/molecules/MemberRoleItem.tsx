import { updateCircle } from '@api/entities/circles'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import Markdown from '@components/atoms/Markdown'
import CircleAndParents from '@components/molecules/CircleAndParentsLinks'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { FormEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  memberId: string
  circlesWithRole: CircleWithRoleEntry[]
}

export default function MemberRoleItem({ memberId, circlesWithRole }: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const hoverColor = colorMode === 'light' ? 'gray.50' : 'whiteAlpha.100'
  const expandedColor = colorMode === 'light' ? 'gray.100' : 'gray.550'

  const roleCircle = circlesWithRole[circlesWithRole.length - 1]
  const circleMember = useMemo(
    () => roleCircle.members.find((m) => m.memberId === memberId),
    [memberId, roleCircle]
  )

  const [avgMinPerWeek, setAvgMinPerWeek] = useState<number | null>(
    circleMember?.avgMinPerWeek ?? null
  )

  const isDirty = avgMinPerWeek !== circleMember?.avgMinPerWeek ?? null

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      updateCircle(roleCircle.id, {
        members: roleCircle.members.map((m) =>
          m.memberId === memberId ? { ...m, avgMinPerWeek } : m
        ),
      })
    },
    [roleCircle, avgMinPerWeek]
  )

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
            _expanded={{ bg: expandedColor }}
            _hover={{ bg: hoverColor }}
          >
            <CircleAndParents id={roleCircle.id} flex={1} textAlign="left" />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pt={3} pb={5}>
            <form onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                {roleCircle.role.purpose && (
                  <FormControl>
                    <FormLabel>
                      {t(`molecules.MemberRoleItem.purpose`)}
                    </FormLabel>
                    <Markdown>{roleCircle.role.purpose}</Markdown>
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>
                    {t(`molecules.MemberRoleItem.workingTime`)}
                  </FormLabel>
                  <DurationSelect
                    size="sm"
                    placeholderValue={
                      roleCircle.role.defaultMinPerWeek ?? undefined
                    }
                    value={avgMinPerWeek}
                    onChange={setAvgMinPerWeek}
                  />
                </FormControl>

                {isDirty && (
                  <Box textAlign="right">
                    <Button size="sm" colorScheme="blue" type="submit">
                      {t(`common.save`)}
                    </Button>
                  </Box>
                )}
              </VStack>
            </form>
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  )
}
