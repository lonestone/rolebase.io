import { SkillCategoryFragment } from '@gql'
import { SearchItem } from '@molecules/search/searchTypes'
import { SearchTypes } from '@shared/model/search'
import { useMemo } from 'react'

export function useSkillSearchItems(
  skills: SkillCategoryFragment[],
  excludeIds?: string[]
): SearchItem[] {
  return useMemo(
    () =>
      skills
        .map((skill): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(skill.id)) return

          return {
            id: skill.id,
            text: skill.name.toLowerCase(),
            type: SearchTypes.Skill,
            title: skill.name,
          }
        })
        .filter(Boolean) as SearchItem[],
    [skills, excludeIds]
  )
}
