import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import { Card, CardBody, CardHeader, Heading, Link } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'
import { Link as ReachLink } from 'react-router-dom'

type Props = PropsWithChildren<{
  title: string
  path: string
  actions?: ReactNode
}>

export default function DashboardMyInfosItem({
  title,
  children,
  path,
  actions,
}: Props) {
  const pathInOrg = usePathInOrg(path)

  return (
    <Card>
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={0}
      >
        <Heading as="h2" size="md">
          <Link as={ReachLink} to={pathInOrg}>
            {title}
          </Link>
        </Heading>

        {actions}
      </CardHeader>

      <CardBody p={4}>{children}</CardBody>
    </Card>
  )
}
