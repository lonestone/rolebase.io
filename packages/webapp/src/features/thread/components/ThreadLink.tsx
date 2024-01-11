import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import { Link, LinkProps } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  name: string
  id: string
}

export default function ThreadLink({ id, name, ...linkProps }: Props) {
  const path = usePathInOrg(`threads/${id}`)

  return (
    <Link as={ReachLink} to={path} tabIndex={-1} {...linkProps}>
      {name}
    </Link>
  )
}
