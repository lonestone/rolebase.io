import CircleAndParentsLinks from '@/circle/components/CircleAndParentsLinks'
import CircleMemberDeleteModal from '@/circle/modals/CircleMemberDeleteModal'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import React, { useMemo } from 'react'
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

  // Circle member data
  const circleMember = useMemo(
    () => circle.members.find((m) => m.member.id === memberId),
    [memberId, circle]
  )

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
            <VStack spacing={3} align="stretch">
              {isMember && (
                <HStack justifyContent="end">
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    onClick={deleteModal.onOpen}
                  >
                    {t(`common.delete`)}
                  </Button>
                </HStack>
              )}
            </VStack>
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
