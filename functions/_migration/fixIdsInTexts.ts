import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { replaceIdsInText, replaceIdsInTexts } from './oldIds'

export async function fixIdsInTexts() {
  await fixIdsInDecisions()
  await fixIdsInMeetingsSteps()
  await fixIdsInRoles()
  await fixIdsInTasks()
  await fixIdsInThreadsActivities()
}

async function fixIdsInDecisions() {
  console.log('Fixing ids in decisions texts...')

  const result = await adminRequest(
    gql(`
      query GetDecisionsTexts {
        decision {
          id
          description
        }
      }
    `)
  )

  for (const { id, description } of result.decision) {
    const newDescription = replaceIdsInText(description)
    if (newDescription !== description) {
      await adminRequest(
        gql(`
          mutation UpdateDecisionTexts($id: uuid!, $values: decision_set_input!) {
            update_decision_by_pk(pk_columns: { id: $id }, _set: $values) {
              id
            }
          }
        `),
        { id, values: { description: newDescription } }
      )
    }
  }

  console.log(`Fixed id in ${result.decision.length} decisions texts.`)
}

async function fixIdsInMeetingsSteps() {
  console.log('Fixing ids in meetings steps texts...')

  const result = await adminRequest(
    gql(`
      query GetMeetingsStepsTexts {
        meeting_step {
          id
          notes
        }
      }
    `)
  )

  for (const { id, notes } of result.meeting_step) {
    const newNotes = replaceIdsInText(notes)
    if (newNotes !== notes) {
      await adminRequest(
        gql(`
          mutation UpdateMeetingStepsTexts($id: uuid!, $values: meeting_step_set_input!) {
            update_meeting_step_by_pk(pk_columns: { id: $id }, _set: $values) {
              id
            }
          }
        `),
        { id, values: { notes: newNotes } }
      )
    }
  }

  console.log(`Fixed id in ${result.meeting_step.length} meetings steps texts.`)
}

async function fixIdsInRoles() {
  console.log('Fixing ids in roles texts...')

  const result = await adminRequest(
    gql(`
      query GetRolesTexts {
        role {
          id
          purpose
          domain
          accountabilities
          checklist
          indicators
          notes
        }
      }
    `)
  )

  for (const {
    id,
    purpose,
    domain,
    accountabilities,
    checklist,
    indicators,
    notes,
  } of result.role) {
    const newPurpose = replaceIdsInText(purpose)
    const newDomain = replaceIdsInText(domain)
    const newAccountabilities = replaceIdsInText(accountabilities)
    const newChecklist = replaceIdsInText(checklist)
    const newIndicators = replaceIdsInText(indicators)
    const newNotes = replaceIdsInText(notes)
    if (
      newPurpose !== purpose ||
      newDomain !== domain ||
      newAccountabilities !== accountabilities ||
      newChecklist !== checklist ||
      newIndicators !== indicators ||
      newNotes !== notes
    ) {
      await adminRequest(
        gql(`
          mutation UpdateRoleTexts($id: uuid!, $values: role_set_input!) {
            update_role_by_pk(pk_columns: { id: $id }, _set: $values) {
              id
            }
          }
        `),
        {
          id,
          values: {
            purpose: newPurpose,
            domain: newDomain,
            accountabilities: newAccountabilities,
            checklist: newChecklist,
            indicators: newIndicators,
            notes: newNotes,
          },
        }
      )
    }
  }

  console.log(`Fixed id in ${result.role.length} roles texts.`)
}

async function fixIdsInTasks() {
  console.log('Fixing ids in tasks texts...')

  const result = await adminRequest(
    gql(`
      query GetTasksTexts {
        task {
          id
          description
        }
      }
    `)
  )

  for (const { id, description } of result.task) {
    const newDescription = replaceIdsInText(description)
    if (newDescription !== description) {
      await adminRequest(
        gql(`
          mutation UpdateTaskTexts($id: uuid!, $values: task_set_input!) {
            update_task_by_pk(pk_columns: { id: $id }, _set: $values) {
              id
            }
          }
        `),
        { id, values: { description: newDescription } }
      )
    }
  }

  console.log(`Fixed id in ${result.task.length} tasks texts.`)
}

async function fixIdsInThreadsActivities() {
  console.log('Fixing ids in threads activities texts...')

  const result = await adminRequest(
    gql(`
      query GetThreadsActivitiesTexts {
        thread_activity(where: { type: { _eq: "Message" } }) {
          id
          data
        }
      }
    `)
  )

  for (const { id, data } of result.thread_activity) {
    const newData = replaceIdsInTexts(data)
    if (newData !== data) {
      await adminRequest(
        gql(`
          mutation UpdateThreadsActivitiesTexts($id: uuid!, $values: thread_activity_set_input!) {
            update_thread_activity_by_pk(pk_columns: { id: $id }, _set: $values) {
              id
            }
          }
        `),
        { id, values: { data: newData } }
      )
    }
  }

  console.log(
    `Fixed id in ${result.thread_activity.length} threads activities texts.`
  )
}
