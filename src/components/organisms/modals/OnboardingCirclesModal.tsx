import { createCircle } from '@api/entities/circles'
import { createRole } from '@api/entities/roles'
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  UseModalProps,
} from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useItemsArray from '@hooks/useItemsArray'
import { useOrgId } from '@hooks/useOrgId'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useStoreState } from '@store/hooks'
import React, { ChangeEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'

interface Props extends UseModalProps {
  onSubmit(circles: CircleWithRoleEntry[]): void
}

const defaultRolesNames = [
  'Product',
  'Business',
  'Communication',
  'Marketing',
  '',
]

export default function OnboardingCirclesModal({
  onSubmit,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const orgId = useOrgId()
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)
  const createLog = useCreateLog()

  const { items, add, update, remove } =
    useItemsArray<string>(defaultRolesNames)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    const index = parseInt(event.target.getAttribute('data-index') || '-1', 10)
    if (index === -1 || items[index] === undefined) return

    let checkBlank = false
    if (value === '' && index !== items.length - 1) {
      // Delete input if empty
      remove(index)
      checkBlank = true
    } else {
      // Update input
      update(index, value)
      if (items[index] === '') {
        checkBlank = true
      }
    }

    // Add empty input if there is none left
    if (checkBlank && !items.some((item, i) => item === '' && i !== index)) {
      add('')
    }
  }

  const [loading, setLoading] = useState(false)

  // Create roles and circles
  const handleSubmit = async () => {
    const names = items.filter((name) => name !== '')
    if (!orgId || !circles || !roles || names.length === 0) return

    const parentCircle = circles[0]
    const parentRole = roles.find((role) => role.id === parentCircle.roleId)
    if (!parentRole) return

    setLoading(true)
    const newCircles: CircleWithRoleEntry[] = []

    try {
      for (const name of names) {
        // Create role
        const newRole = await createRole({
          orgId,
          base: false,
          name,
          singleMember: true,
        })

        // Create circle
        const newCircle = await createCircle({
          orgId,
          roleId: newRole.id,
          parentId: parentCircle.id,
        })

        newCircles.push({ ...newCircle, role: newRole })

        createLog({
          display: {
            type: LogType.CircleCreate,
            id: newCircle.id,
            name: newRole.name,
            parentId: parentCircle.id || null,
            parentName: parentRole.name || null,
          },
          changes: {
            circles: [
              {
                type: EntityChangeType.Create,
                id: newCircle.id,
                data: newCircle,
              },
            ],
            roles: [
              { type: EntityChangeType.Create, id: newRole.id, data: newRole },
            ],
          },
        })
      }
    } catch (error) {
      console.error(error)
    }

    onSubmit(newCircles)
  }

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('organisms.modals.OnboardingCirclesModal.heading', {
            org: org?.name,
          })}
        </ModalHeader>

        <ModalBody>
          <Box>
            <FormLabel>
              {t('organisms.modals.OnboardingCirclesModal.info')}
            </FormLabel>
            <Stack spacing={2} mt={6}>
              {items.map((name, index) => (
                <InputGroup key={index}>
                  <Input
                    data-index={index}
                    value={name}
                    onChange={handleInputChange}
                  />
                  {name !== '' && (
                    <InputRightElement>
                      <IconButton
                        aria-label={t('common.remove')}
                        variant="ghost"
                        icon={<FiX />}
                        onClick={() => remove(index)}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              ))}
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            onClick={handleSubmit}
          >
            {t('common.create')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
