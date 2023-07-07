import { Card, CardBody, CardHeader, Heading, Link } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'
import { Link as ReachLink } from 'react-router-dom'

export type DashboardMyInfosItemProps = PropsWithChildren<{
  title: string
  path: string
  actions?: ReactNode
}>

const DashboardMyInfosItem = ({
  title,
  children,
  path,
  actions,
}: DashboardMyInfosItemProps) => {
  return (
    <Card w="inherit">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="md">
          <Link as={ReachLink} to={path}>
            {title}
          </Link>
        </Heading>

        {actions && actions}
      </CardHeader>

      <CardBody p={4}>{children}</CardBody>
    </Card>
  )
}

export default DashboardMyInfosItem
