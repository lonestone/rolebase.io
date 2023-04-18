import { Link, LinkProps } from '@chakra-ui/react'
import CircleMemberLink from './CircleMemberLink'

interface Props extends LinkProps {
  id: string
  name: string
}

export default function CircleLink({ id, name, ...linkProps }: Props) {
  return (
    <Link as={CircleMemberLink} circleId={id} {...linkProps}>
      {name}
    </Link>
  )
}
