import { CircleFragment } from '@gql'
import React from 'react'
import useCirclePicker from '../hooks/useCirclePicker'
import { useCircleSearchItems } from '../hooks/useCircleSearchItems'
import SearchInput, { SearchInputProps } from './SearchInput'

interface Props extends Omit<SearchInputProps, 'items'> {
  circles?: CircleFragment[] // If not provided, use store
  excludeIds?: string[]
  singleMember?: boolean
}

export default function CircleSearchInput({
  circles,
  excludeIds,
  singleMember,
  ...props
}: Props) {
  const items = useCircleSearchItems(circles, excludeIds, singleMember)
  const { pickerModal, additionalTopItems, handleChange } = useCirclePicker(
    props.onChange
  )

  return (
    <>
      <SearchInput
        {...props}
        items={items}
        onChange={handleChange}
        additionalTopItems={additionalTopItems}
      />
      {pickerModal}
    </>
  )
}
