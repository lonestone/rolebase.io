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
import React, { FormEvent, useCallback, useState } from 'react'
import { CircleWithRoleEntry, updateCircle } from '../../api/entities/circles'
import CircleMemberDeleteModal from '../circles/CircleMemberDeleteModal'
import DurationSelect from '../common/DurationSelect'
import RoleEditModal from '../roles/RoleEditModal'

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
        <Box boxShadow={isExpanded ? 'md' : undefined}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {circlesWithRole.map((circle, i) => {
                const last = i === circlesWithRole.length - 1
                return (
                  <Text
                    display="inline"
                    whiteSpace="nowrap"
                    textIndent="0"
                    fontWeight={last ? 500 : 400}
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
              <VStack spacing={3}>
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

                <Box w="100%" textAlign="right">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={onEditOpen}
                  >
                    Editer
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
