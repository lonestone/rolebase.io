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
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import DurationSelect from '@components/atoms/DurationSelect'
import Markdown from '@components/atoms/Markdown'
import CircleMemberDeleteModal from '@components/organisms/modals/CircleMemberDeleteModal'
import RoleEditModal from '@components/organisms/modals/RoleEditModal'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { FormEvent, useCallback, useState } from 'react'

interface Props {
  memberId: string
  circlesWithRole: CircleWithRoleEntry[]
}

export default function MemberRoleItem({ memberId, circlesWithRole }: Props) {
  const { colorMode } = useColorMode()

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
        <Box
          boxShadow={isExpanded ? 'lg' : 'sm'}
          borderLeft={isExpanded ? '3px solid' : undefined}
          borderLeftColor={colorMode === 'light' ? 'gray.100' : 'gray.600'}
        >
          <AccordionButton
            _expanded={{
              bg: colorMode === 'light' ? 'gray.100' : 'gray.600',
            }}
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'gray.600',
            }}
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
                    placeholderValue={
                      roleCircle.role?.defaultMinPerWeek ?? undefined
                    }
                    value={avgMinPerWeek}
                    onChange={setAvgMinPerWeek}
                  />
                </FormControl>

                <Box textAlign="right">
                  <CircleMemberLink circleId={roleCircle.id}>
                    <Button size="sm" colorScheme="blue" variant="ghost">
                      Voir
                    </Button>
                  </CircleMemberLink>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={onEditOpen}
                  >
                    Éditer
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

          {isEditOpen && (
            <RoleEditModal
              id={roleCircle.role.id}
              isOpen
              onClose={onEditClose}
            />
          )}

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
