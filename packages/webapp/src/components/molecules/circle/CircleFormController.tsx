import { FormControl, FormLabel } from '@chakra-ui/react'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
  singleMember?: boolean
}

export default function CircleFormController({ singleMember }: Props) {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors.circleId}>
      <FormLabel>{t('CircleFormController.label')}</FormLabel>
      <Controller
        name="circleId"
        control={control}
        render={({ field }) => (
          <CircleSearchInput
            singleMember={singleMember}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </FormControl>
  )
}
