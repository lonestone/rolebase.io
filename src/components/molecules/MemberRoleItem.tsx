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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import Markdown from '@components/atoms/Markdown'
import CircleAndParentsButton from '@components/molecules/CircleAndParentsButton'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { FormEvent, useCallback, useState } from 'react'

interface Props {
  memberId: string
  circlesWithRole: CircleWithRoleEntry[]
}

export default function MemberRoleItem({ memberId, circlesWithRole }: Props) {
  const { colorMode } = useColorMode()
  const hoverColor = colorMode === 'light' ? 'gray.100' : 'gray.600'

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const roleCircle = circlesWithRole[circlesWithRole.length - 1]
  const circleMember = roleCircle.members.find((m) => m.memberId === memberId)

  const [avgMinPerWeek, setAvgMinPerWeek] = useState<number | null>(
    circleMember?.avgMinPerWeek ?? null
  )

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
          borderLeftColor={isExpanded ? hoverColor : 'transparent'}
        >
          <AccordionButton
            as={Box}
            cursor="pointer"
            _expanded={{ bg: hoverColor }}
            _hover={{ bg: hoverColor }}
          >
            <CircleAndParentsButton
              id={roleCircle.id}
              flex={1}
              textAlign="left"
            />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pt={3} pb={5}>
            <form onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                {roleCircle.role.purpose && (
                  <FormControl>
                    <FormLabel>Raison d'être</FormLabel>
                    <Markdown>{roleCircle.role.purpose}</Markdown>
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>Temps de travail</FormLabel>
                  <DurationSelect
                    size="sm"
                    placeholderValue={
                      roleCircle.role.defaultMinPerWeek ?? undefined
                    }
                    value={avgMinPerWeek}
                    onChange={setAvgMinPerWeek}
                  />
                </FormControl>

                <Box textAlign="right">
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={onDeleteOpen}
                  >
                    Retirer
                  </Button>
                  <Button size="sm" colorScheme="blue" type="submit">
                    Enregistrer
                  </Button>
                </Box>
              </VStack>
            </form>
          </AccordionPanel>

          {isDeleteOpen && (
            <CircleMemberDeleteModal
              memberId={memberId}
              circleId={roleCircle.id}
              isOpen
              onClose={onDeleteClose}
            />
          )}
        </Box>
      )}
    </AccordionItem>
  )
}
