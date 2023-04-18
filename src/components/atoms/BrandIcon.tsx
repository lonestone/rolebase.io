import Logo from 'src/images/logo.svg'

const logoWidth = 430
const logoHeight = 79

const sizes = {
  sm: 0.22,
  md: 0.4,
  lg: 0.7,
}

interface Props {
  size?: keyof typeof sizes
}

export default function BrandIcon({ size = 'md' }: Props) {
  const ratio = sizes[size]
  return (
    <Logo width={`${logoWidth * ratio}px`} height={`${logoHeight * ratio}px`} />
  )
}
