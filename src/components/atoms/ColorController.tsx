import { TriangleDownIcon } from '@chakra-ui/icons'
import {
  Checkbox,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { defaultCircleColorHue } from 'src/theme'

interface Props<Values extends FieldValues> {
  name: Path<Values>
  control: Control<Values>
  children: string
}

const hueToColor = (hue: number) => `hsl(${hue} 97% 75%)`

export default function ColorController<Values extends FieldValues>({
  name,
  control,
  children,
}: Props<Values>) {
  const circles = useStoreState((state) => state.org.circles)

  // Determines colors palette from circles colors
  const palette = useMemo(
    () =>
      circles &&
      [
        ...new Set(
          circles
            .map((circle) => circle.role.colorHue)
            .filter(Boolean) as number[]
        ),
      ].sort((a, b) => a - b),
    [circles]
  )

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
            <Flex alignItems="center">
              <Slider
                aria-label=""
                min={0}
                max={360}
                step={1}
                defaultValue={defaultCircleColorHue}
                value={field.value as number}
                my={3}
                onChange={(value) => field.onChange(value)}
              >
                <SliderTrack bgGradient="linear(to-r, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)">
                  <SliderFilledTrack bg="transparent" />
                </SliderTrack>
                <SliderThumb boxSize="1.8rem" bg={hueToColor(field.value)} />
              </Slider>

              {palette && palette.length !== 0 && (
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    aria-label="Palette"
                    variant="ghost"
                    size="sm"
                    icon={<TriangleDownIcon />}
                    ml={2}
                  />
                  <MenuList px={2}>
                    <Grid
                      gap={2}
                      templateColumns={`repeat(${Math.min(
                        6,
                        palette.length
                      )}, 1fr)`}
                    >
                      {palette?.map((hue) => (
                        <IconButton
                          key={hue}
                          aria-label=""
                          icon={<></>}
                          bg={hueToColor(hue)}
                          _hover={{ bg: hueToColor(hue), borderWidth: 2 }}
                          onClick={() => field.onChange(hue)}
                        />
                      ))}
                    </Grid>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          )}
        </>
      )}
    />
  )
}
