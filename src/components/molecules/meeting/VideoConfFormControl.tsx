import {
  Checkbox,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { VideoConfTypes } from '@shared/model/meeting'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function VideoConfFormControl() {
  const { t } = useTranslation()
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  const videoConfType = watch('videoConfType')

  return (
    <FormControl isInvalid={!!errors.videoConfType || !!errors.videoConfUrl}>
      <Stack spacing={1}>
        <Checkbox
          isChecked={!!videoConfType}
          onChange={() =>
            setValue(
              'videoConfType',
              videoConfType ? null : VideoConfTypes.Jitsi
            )
          }
        >
          {t('VideoConfFormControl.enable')}
        </Checkbox>

        <RadioGroup
          display={videoConfType ? '' : 'none'}
          value={videoConfType || VideoConfTypes.Jitsi}
          onChange={(value) =>
            setValue('videoConfType', value as VideoConfTypes)
          }
        >
          <Stack pl={6} mt={1} spacing={1} direction="column">
            <Radio value={VideoConfTypes.Jitsi}>
              {t('VideoConfFormControl.jitsi')}
            </Radio>
            <Radio value={VideoConfTypes.Url}>
              {t('VideoConfFormControl.url')}
            </Radio>
            {videoConfType === VideoConfTypes.Url && (
              <Input pl={6} {...register('videoConfUrl')} />
            )}
          </Stack>
        </RadioGroup>
      </Stack>
    </FormControl>
  )
}
