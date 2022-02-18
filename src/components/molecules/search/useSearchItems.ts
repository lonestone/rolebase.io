import { CircleEntry } from '@shared/circle'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { MemberEntry } from '@shared/member'
import { TaskEntry } from '@shared/task'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from './searchItems'

export interface SearchOptions {
  members?: boolean // Search members
  circles?: boolean // Search circles
  circleMembers?: true // Search circle members
  threads?: boolean // Search threads
  circlesSingleMember?: boolean // Exclude circles whose role has opposite singleMember value
  excludeIds?: string[] // Exclude entities with these ids
  membersOverride?: MemberEntry[] // Override members. Otherwise use store
  circlesOverride?: CircleEntry[] // Override circles. Otherwise use store
  threadsOverride?: ThreadEntry[] // Override threads
  tasks?: boolean
  tasksOverride?: TaskEntry[]
}

export function useSearchItems(options: SearchOptions): SearchItem[] {
  // Circles data
  const circlesInStore = useStoreState((state) => state.circles.entries)
  const circles = useMemo(
    () => options.circlesOverride || circlesInStore,
    [circlesInStore, options.circlesOverride]
  )

  // Members data
  const membersInStore = useStoreState((state) => state.members.entries)
  const members = useMemo(
    () => options.membersOverride || membersInStore,
    [membersInStore, options.membersOverride]
  )

  // Roles data
  const roles = useStoreState((state) => state.roles.entries)

  // Threads data
  const threads = options.threadsOverride

  // tasks data
  const tasks = options.tasksOverride

  // Circles items
  const circleItems: SearchItem[] = useMemo(
    () =>
      circles && roles && options.circles
        ? (circles
            .map((circle) => {
              // Exclude by id
              if (options.excludeIds?.includes(circle.id)) return

              // Get roles and ancestors
              const circleRoles = enrichCirclesWithRoles(
                getCircleAndParents(circles, circle.id),
                roles
              )

              // Exclude by singleMember property
              if (
                options.circlesSingleMember !== undefined &&
                (circleRoles[circleRoles.length - 1].role.singleMember ||
                  false) !== options.circlesSingleMember
              ) {
                return
              }

              return {
                text: circleRoles
                  .map((cr) => cr.role?.name || '?')
                  .join(' > ')
                  .toLowerCase(),
                type: SearchItemTypes.Circle,
                circle,
                circleRoles,
              }
            })
            .filter(Boolean) as SearchItem[])
        : [],
    [
      circles,
      roles,
      options.circles,
      options.excludeIds,
      options.circlesSingleMember,
    ]
  )

  // Members items
  const memberItems: SearchItem[] = useMemo(
    () =>
      members && options.members
        ? (members
            .map((member) => {
              // Exclude by id
              if (options.excludeIds?.includes(member.id)) return

              return {
                text: member.name.toLowerCase(),
                type: SearchItemTypes.Member,
                member,
              }
            })
            .filter(Boolean) as SearchItem[])
        : [],
    [members, options.members, options.excludeIds]
  )

  // Circle members items
  const circleMemberItems: SearchItem[] = useMemo(
    () =>
      members && circles && roles && options.circleMembers
        ? circles.flatMap((circle) => {
            const circleRoles = enrichCirclesWithRoles(
              getCircleAndParents(circles, circle.id),
              roles
            )

            const circleRolesText =
              circleRoles
                .map((cr) => cr.role?.name || '?')
                .join(' > ')
                .toLowerCase() + ' '

            return circle.members
              .map((circleMember): SearchItem | undefined => {
                // Exclude by id
                if (options.excludeIds?.includes(circleMember.id)) return

                const member = members.find(
                  (m) => m.id === circleMember.memberId
                )
                if (!member) return
                return {
                  text: circleRolesText + member?.name.toLowerCase() || '?',
                  type: SearchItemTypes.CircleMember,
                  circle,
                  member,
                  circleMember,
                  circleRoles,
                }
              })
              .filter(Boolean) as SearchItem[]
          })
        : [],
    [members, circles, roles, options.circleMembers, options.excludeIds]
  )

  // thread items
  const threadItems: SearchItem[] = useMemo(
    () =>
      threads && options.threads
        ? (threads
            .map((thread) => {
              // Exclude by id
              if (options.excludeIds?.includes(thread.id)) return

              return {
                text: thread.title.toLowerCase(),
                type: SearchItemTypes.Thread,
                thread,
              }
            })
            .filter(Boolean) as SearchItem[])
        : [],
    [threads, options.threads, options.excludeIds]
  )

  // tasks items
  const taskItems: SearchItem[] = useMemo(
    () =>
      tasks && options.tasks
        ? (tasks
            .map((task) => {
              // Exclude by id
              if (options.excludeIds?.includes(task.id)) return

              return {
                text: task.title.toLowerCase(),
                type: SearchItemTypes.Task,
                task,
              }
            })
            .filter(Boolean) as SearchItem[])
        : [],
    [tasks, options.tasks, options.excludeIds]
  )

  return useMemo(
    () => [
      ...memberItems,
      ...circleItems,
      ...circleMemberItems,
      ...threadItems,
      ...taskItems,
    ],
    [memberItems, circleItems, circleMemberItems, threadItems, taskItems]
  )
}
