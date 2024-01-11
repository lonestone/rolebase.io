import Switch from '@/common/atoms/Switch'
import {
  BoxProps,
  Collapse,
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { VideoConfTypes } from '@shared/model/meeting'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export interface VideoConfValues {
  videoConfType: VideoConfTypes | null
  videoConfUrl: string
}

export const videoConfSchema = yup.object().shape({
  videoConfUrl: yup.string().url(),
})

export default function VideoConfFormControl(boxProps: BoxProps) {
  const { t } = useTranslation()
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<VideoConfValues>()

  const videoConfType = watch('videoConfType')

  // Reset url when disabling url option
  useEffect(() => {
    if (videoConfType === VideoConfTypes.Url) return
    setValue('videoConfUrl', '')
    clearErrors()
  }, [videoConfType])

  return (
    <FormControl
      isInvalid={!!errors.videoConfType || !!errors.videoConfUrl}
      {...boxProps}
    >
      <Stack spacing={1}>
        <Switch
          isChecked={!!videoConfType}
          onChange={() =>
            setValue(
              'videoConfType',
              videoConfType ? null : VideoConfTypes.Jitsi
            )
          }
        >
          {t('VideoConfFormControl.enable')}
        </Switch>

        <Collapse in={!!videoConfType}>
          <RadioGroup
            value={videoConfType || VideoConfTypes.Jitsi}
            onChange={(value) =>
              setValue('videoConfType', value as VideoConfTypes)
            }
          >
            <Stack pl={6} mt={3} spacing={1} direction="column">
              <Radio value={VideoConfTypes.Jitsi}>
                {t('VideoConfFormControl.jitsi')}
              </Radio>
              <Radio value={VideoConfTypes.Url}>
                {t('VideoConfFormControl.url')}
              </Radio>
              {videoConfType === VideoConfTypes.Url && (
                <Input
                  pl={6}
                  placeholder="https://"
                  {...register('videoConfUrl')}
                />
              )}
              {errors.videoConfUrl && (
                <FormErrorMessage>
                  {t('VideoConfFormControl.urlError')}
                </FormErrorMessage>
              )}
            </Stack>
          </RadioGroup>
        </Collapse>
      </Stack>
    </FormControl>
  )
}
