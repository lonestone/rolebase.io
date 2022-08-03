import {
  Button,
  Collapse,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Markdown from '@components/atoms/Markdown'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
import useCircle from '@hooks/useCircle'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { ParticipantMember } from '@shared/model/member'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Props {
  circle: CircleWithRoleEntry
  participants: ParticipantMember[]
}

export default function CircleRoleFormControl({ circle, participants }: Props) {
  const { t } = useTranslation()
  const role = circle.role

  // Parent circles and linked circle
  const parentCircle = useCircle(circle.parentId || undefined)
  const linkedCircle = useCircle(
    (role?.link === true ? parentCircle?.parentId : role?.link) || undefined
  )

  // Role info toggle
  const { isOpen: isRoleInfoOpen, onToggle: onRoleInfoToggle } = useDisclosure()

  return (
    <VStack spacing={5} align="stretch">
      {role.purpose && (
        <FormControl>
          <FormLabel>{t('organisms.CircleContent.purpose')}</FormLabel>
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
                  <FormLabel>{t('organisms.CircleContent.domain')}</FormLabel>
                  <Markdown>{role.domain}</Markdown>
                </FormControl>
              )}

              {role.accountabilities && (
                <FormControl>
                  <FormLabel>
                    {t('organisms.CircleContent.accountabilities')}
                  </FormLabel>
                  <Markdown>{role.accountabilities}</Markdown>
                </FormControl>
              )}

              {role.checklist && (
                <FormControl>
                  <FormLabel>
                    {t('organisms.CircleContent.checklist')}
                  </FormLabel>
                  <Markdown>{role.checklist}</Markdown>
                </FormControl>
              )}

              {role.indicators && (
                <FormControl>
                  <FormLabel>
                    {t('organisms.CircleContent.indicators')}
                  </FormLabel>
                  <Markdown>{role.indicators}</Markdown>
                </FormControl>
              )}

              {role.notes && (
                <FormControl>
                  <FormLabel>{t('organisms.CircleContent.notes')}</FormLabel>
                  <Markdown>{role.notes}</Markdown>
                </FormControl>
              )}
            </VStack>
          </Collapse>
        </>
      )}

      <CircleMemberFormControl circleId={circle.id} />

      {!role.singleMember ? (
        <SubCirclesFormControl circle={circle} participants={participants} />
      ) : null}

      {parentCircle && linkedCircle && (
        <Text>
          <Trans
            i18nKey="organisms.CircleContent.representCircle"
            components={{
              link: <CircleButton circle={parentCircle} />,
            }}
          />
          <br />
          <Trans
            i18nKey="organisms.CircleContent.representInCircle"
            components={{
              link: <CircleButton circle={linkedCircle} />,
            }}
          />
        </Text>
      )}
    </VStack>
  )
}
