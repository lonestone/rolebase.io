import { getSubscriptionInvoices } from '@api/functions'
import { Flex, FlexProps } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import InvoiceTabLayout from '@organisms/subscription/InvoiceTabLayout'
import { Invoice } from '@shared/model/subscription'
import React, { useEffect, useState } from 'react'

export default function InvoiceTab({ ...rest }: FlexProps) {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orgId && currentMember) {
      getData()
    }
  }, [orgId, currentMember])

  const getData = async () => {
    setLoading(true)
    try {
      const res = await getSubscriptionInvoices({
        memberId: currentMember?.id!,
        orgId: orgId!,
      })

      setInvoices(res)
    } catch (e) {
      // TODO: handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex p="5" flexDir="row" {...rest}>
      <InvoiceTabLayout invoices={invoices} loading={loading} />
    </Flex>
  )
}
