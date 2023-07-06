import { SkillCategoryFragment } from '@gql'
import SearchButton, { SearchButtonProps } from '@molecules/search/SearchButton'
import { useSkillSearchItems } from '@molecules/search/entities/skills/useSkillSearchItems'
import React from 'react'

interface Props extends Omit<SearchButtonProps, 'items'> {
  skillByCategories: SkillCategoryFragment[]
  excludeIds?: string[]
}

export default function SkillsSearchButton({
  skillByCategories,
  excludeIds,
  ...props
}: Props) {
  const items = useSkillSearchItems(skillByCategories, excludeIds)

  console.log(items)

  return <SearchButton {...props} items={items} />
}
