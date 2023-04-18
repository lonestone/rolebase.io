import { BoxProps, Tag } from '@chakra-ui/react'

interface Props extends BoxProps {
  index: number
  current: boolean
  onStepClick?(): void
}

export default function MeetingStepNumber({
  index,
  current,
  onStepClick,
  ...boxProps
}: Props) {
  return (
    <Tag
      variant="solid"
      size="lg"
      fontFamily="heading"
      fontWeight="bold"
      borderRadius="full"
      cursor={!current && onStepClick ? 'pointer' : 'default'}
      color={current ? 'white' : 'black'}
      bg={current ? 'green.600' : 'gray.100'}
      _dark={{
        color: current ? 'white' : 'gray.300',
        bg: current ? 'green.600' : 'whiteAlpha.200',
      }}
      _hover={
        current || !onStepClick
          ? undefined
          : {
              bg: 'gray.200',
              _dark: {
                bg: 'whiteAlpha.300',
              },
            }
      }
      onClick={onStepClick}
      {...boxProps}
    >
      {index + 1}
    </Tag>
  )
}
