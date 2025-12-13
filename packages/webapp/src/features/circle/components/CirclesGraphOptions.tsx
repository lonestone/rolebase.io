import { CirclesGraphViews } from '@/graph/types'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import useOrgMember from '@/member/hooks/useOrgMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import BaseRolesModal from '@/role/modals/BaseRolesModal'
import VacantRolesModal from '@/role/modals/VacantRolesModal'
import { Button, HStack, StyleProps, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LogsIcon, RoleIcon, ShareIcon, VacantCircle } from 'src/icons'
import CirclesShareModal from '../modals/CirclesShareModal'
import GraphViewsSelect from './GraphViewsSelect'

interface CirclesGraphOptionsProps extends StyleProps {
  view: CirclesGraphViews
  onViewChange: (view: CirclesGraphViews) => void
}

const buttonsProps = {
  variant: 'outline',
  size: 'sm',
  fontWeight: 'normal',
  border: 0,
  bg: 'white',
  _hover: {
    bg: 'gray.100',
  },
  _active: {
    bg: 'gray.200',
  },
  _dark: {
    bg: 'gray.700',
    _hover: {
      bg: 'gray.600',
    },
    _active: {
      bg: 'gray.550',
    },
  },
}

export default function CirclesGraphOptions({
  view,
  onViewChange,
  ...styleProps
}: CirclesGraphOptionsProps) {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const isOwner = useOrgOwner()

  // Modals
  const baseRolesModal = useDisclosure()
  const vacantRolesModal = useDisclosure()
  const shareModal = useDisclosure()

  return (
    <HStack spacing={2} flexWrap="wrap" {...styleProps}>
      <GraphViewsSelect
        value={view}
        onChange={onViewChange}
        {...buttonsProps}
        fontWeight="bold"
      />
      {isMember && (
        <>
          {isOwner && (
            <Button
              leftIcon={<RoleIcon size={20} />}
              onClick={baseRolesModal.onOpen}
              {...buttonsProps}
            >
              {t('CirclesGraphOptions.baseRoles')}
            </Button>
          )}

          <Button
            leftIcon={<VacantCircle size={20} />}
            onClick={vacantRolesModal.onOpen}
            {...buttonsProps}
          >
            {t('CirclesGraphOptions.vacantRoles')}
          </Button>

          <Button
            leftIcon={<LogsIcon size={20} />}
            onClick={() => navigateOrg('logs')}
            {...buttonsProps}
          >
            {t('CirclesGraphOptions.logs')}
          </Button>

          {isAdmin && (
            <Button
              leftIcon={<ShareIcon size={20} />}
              onClick={shareModal.onOpen}
              {...buttonsProps}
            >
              {t('CirclesGraphOptions.share')}
            </Button>
          )}
        </>
      )}

      {baseRolesModal.isOpen && (
        <BaseRolesModal isOpen onClose={baseRolesModal.onClose} />
      )}

      {vacantRolesModal.isOpen && (
        <VacantRolesModal isOpen onClose={vacantRolesModal.onClose} />
      )}

      {shareModal.isOpen && (
        <CirclesShareModal isOpen onClose={shareModal.onClose} />
      )}
    </HStack>
  )
}
