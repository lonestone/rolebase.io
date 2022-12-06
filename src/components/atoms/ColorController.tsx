import {
  Checkbox,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { defaultCircleColorHue } from 'src/theme'

interface Props<Values extends FieldValues> {
  name: Path<Values>
  control: Control<Values>
  children: string
}

export default function ColorController<Values extends FieldValues>({
  name,
  control,
  children,
}: Props<Values>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Checkbox
            isChecked={typeof field.value === 'number'}
            onChange={() =>
              field.onChange(field.value ? null : defaultCircleColorHue)
            }
          >
            {children}
          </Checkbox>
          {typeof field.value === 'number' && (
            <Slider
              aria-label=""
              min={0}
              max={360}
              step={1}
              defaultValue={defaultCircleColorHue}
              value={field.value as number}
              mt={3}
              onChange={(value) => field.onChange(value)}
            >
              <SliderTrack bgGradient="linear(to-r, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)">
                <SliderFilledTrack bg="transparent" />
              </SliderTrack>
              <SliderThumb
                boxSize="1.8rem"
                bg={`hsl(${field.value} 97% 75%)`}
              />
            </Slider>
          )}
        </>
      )}
    />
  )
}
