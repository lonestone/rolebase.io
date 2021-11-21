import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import CircleCreateModal from '@components/organisms/modals/CircleCreateModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import getCircleChildrenAndRoles from '@shared/getCircleChildren'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'

interface Props {
  circleId: string
}

export default function SubCirclesFormControl({ circleId }: Props) {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Get direct circles children and their roles
  const childrenAndRoles = useMemo(
    () =>
      circles && roles && getCircleChildrenAndRoles(circles, roles, circleId),
    [circles, roles, circleId]
  )

  // CreateCircle modal
  const {
    isOpen: isCreateCircleOpen,
    onOpen: onCreateCircleOpen,
    onClose: onCreateCircleClose,
  } = useDisclosure()

  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircle = useCallback((circleId: string) => {
    navigateOrg(`?circleId=${circleId}`)
  }, [])

  return (
    <FormControl>
      <FormLabel>Sous-Cercles :</FormLabel>
      <Wrap spacing={2}>
        {childrenAndRoles?.map((c) => (
          <WrapItem key={c.id}>
            <Button
              key={c.id}
              size="sm"
              borderRadius="full"
              onClick={() => navigateToCircle(c.id)}
            >
              {c.role?.name || '?'}
            </Button>
          </WrapItem>
        ))}
        <WrapItem>
          <Button
            size="sm"
            borderRadius="full"
            leftIcon={<AddIcon />}
            onClick={onCreateCircleOpen}
          >
            Ajouter un cercle
          </Button>
        </WrapItem>
      </Wrap>

      <CircleCreateModal
        parentId={circleId}
        isOpen={isCreateCircleOpen}
        onClose={onCreateCircleClose}
      />
    </FormControl>
  )
}
