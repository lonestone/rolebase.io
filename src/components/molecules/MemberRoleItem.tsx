import { updateCircle } from '@api/entities/circles'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import RoleEditModal from '@components/organisms/modals/RoleEditModal'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { FormEvent, useCallback, useState } from 'react'

interface Props {
  memberId: string
  circlesWithRole: CircleWithRoleEntry[]
}

export default function MemberRoleItem({ memberId, circlesWithRole }: Props) {
  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

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
        <Box boxShadow={isExpanded ? 'lg' : 'sm'}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {circlesWithRole.map((circle, i) => {
                const last = i === circlesWithRole.length - 1
                return (
                  <Text
                    display="inline"
                    whiteSpace="nowrap"
                    fontWeight={last ? 600 : 400}
                    key={circle.id}
                  >
                    {i !== 0 && <ChevronRightIcon margin="0 0.2em" />}
                    {circle.role?.name || '?'}
                  </Text>
                )
              })}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pt={3} pb={5}>
            <form onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                <FormControl>
                  <FormLabel htmlFor="avgMinPerWeek">
                    Temps de travail
                  </FormLabel>
                  <DurationSelect
                    placeholderValue={roleCircle.role?.defaultMinPerWeek ?? 0}
                    value={avgMinPerWeek}
                    onChange={setAvgMinPerWeek}
                  />
                </FormControl>

                <Box textAlign="right">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={onEditOpen}
                  >
                    Modifier
                  </Button>
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
          {roleCircle.role && (
            <RoleEditModal
              id={roleCircle.role.id}
              isOpen={isEditOpen}
              onClose={onEditClose}
            />
          )}
          <CircleMemberDeleteModal
            memberId={memberId}
            circleId={roleCircle.id}
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
          />
        </Box>
      )}
    </AccordionItem>
  )
}
