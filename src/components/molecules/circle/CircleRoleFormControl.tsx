import CircleButton from '@atoms/CircleButton'
import Markdown from '@atoms/Markdown'
import {
  Button,
  Collapse,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CircleWithRoleFragment } from '@gql'
import useCircle from '@hooks/useCircle'
import SubCirclesFormControl from '@molecules/circle/SubCirclesFormControl'
import { ParticipantMember } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import CircleMemberFormControl from './CircleMemberFormControl'

interface Props {
  circle: CircleWithRoleFragment
  participants: ParticipantMember[]
}

export default function CircleRoleFormControl({ circle, participants }: Props) {
  const { t } = useTranslation()
  const role = circle.role

  // Parent circles and linked circle
  const parentCircle = useCircle(circle.parentId || undefined)
  const linkedCircle = useCircle(
    (role?.link === RoleLink.Parent ? parentCircle?.parentId : role?.link) ||
      undefined
  )

  // Role info toggle
  const { isOpen: isRoleInfoOpen, onToggle: onRoleInfoToggle } = useDisclosure()

  return (
    <VStack spacing={5} align="stretch">
      {role.purpose && (
        <FormControl>
          <FormLabel>{t('CircleRoleFormControl.purpose')}</FormLabel>
          <Markdown>{role.purpose}</Markdown>
        </FormControl>
      )}

      {(role.domain ||
        role.accountabilities ||
        role.checklist ||
        role.indicators ||
        role.notes) && (
        <>
          <Button
            variant="link"
            rightIcon={isRoleInfoOpen ? <FiChevronUp /> : <FiChevronDown />}
            onClick={onRoleInfoToggle}
          >
            {t(isRoleInfoOpen ? 'common.seeLess' : 'common.seeMore')}
          </Button>
          <Collapse in={isRoleInfoOpen} animateOpacity>
            <VStack spacing={5} align="stretch">
              {role.domain && (
                <FormControl>
                  <FormLabel>{t('CircleRoleFormControl.domain')}</FormLabel>
                  <Markdown>{role.domain}</Markdown>
                </FormControl>
              )}

              {role.accountabilities && (
                <FormControl>
                  <FormLabel>
                    {t('CircleRoleFormControl.accountabilities')}
                  </FormLabel>
                  <Markdown>{role.accountabilities}</Markdown>
                </FormControl>
              )}

              {role.checklist && (
                <FormControl>
                  <FormLabel>{t('CircleRoleFormControl.checklist')}</FormLabel>
                  <Markdown>{role.checklist}</Markdown>
                </FormControl>
              )}

              {role.indicators && (
                <FormControl>
                  <FormLabel>{t('CircleRoleFormControl.indicators')}</FormLabel>
                  <Markdown>{role.indicators}</Markdown>
                </FormControl>
              )}

              {role.notes && (
                <FormControl>
                  <FormLabel>{t('CircleRoleFormControl.notes')}</FormLabel>
                  <Markdown>{role.notes}</Markdown>
                </FormControl>
              )}
            </VStack>
          </Collapse>
        </>
      )}

      {!role.singleMember ? (
        <SubCirclesFormControl circle={circle} participants={participants} />
      ) : null}

      <CircleMemberFormControl circleId={circle.id} />

      {parentCircle && linkedCircle && (
        <Text>
          <Trans
            i18nKey="CircleRoleFormControl.representCircle"
            components={{
              link: <CircleButton circle={parentCircle} />,
            }}
          />
          <br />
          <Trans
            i18nKey="CircleRoleFormControl.representInCircle"
            components={{
              link: <CircleButton circle={linkedCircle} />,
            }}
          />
        </Text>
      )}
    </VStack>
  )
}
