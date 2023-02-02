import { Box } from '@chakra-ui/layout'
import React, { useMemo } from 'react'
import {
  Amex,
  CartesBancaires,
  Diners,
  Discover,
  Jcb,
  Mastercard,
  UnionPay,
  Visa
} from 'react-pay-icons'

type CreditCardIconProps = {
  name: string
  style?: object
}

export default function CreditCardIcon({ name, style }: CreditCardIconProps) {
  const Icon = useMemo(() => {
    console.log('name:', name)
    switch (name.toLocaleLowerCase()) {
      case 'american express':
        return Amex
      case 'diners club':
        return Diners
      case 'discover':
        return Discover
      case 'jcb':
        return Jcb
      case 'mastercard':
        return Mastercard
      case 'unionPay':
        return UnionPay
      case 'visa':
        return Visa
      default:
        return CartesBancaires
    }
  }, [name])

  return (
    <Box borderRadius="5px">
      <Icon style={style} />
    </Box>
  )
}
