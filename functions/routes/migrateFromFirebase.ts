import { route } from '@utils/route'
import { fixIdsInTexts } from '_migration/fixIdsInTexts'
import { importCircles } from '_migration/importCircles'
import { importDecisions } from '_migration/importDecisions'
import { importLogs } from '_migration/importLogs'
import { importMeetings } from '_migration/importMeetings'
import { importMeetingsCurrentStep } from '_migration/importMeetingsCurrentStep'
import { importMeetingsSteps } from '_migration/importMeetingsSteps'
import { importMeetingTemplates } from '_migration/importMeetingTemplates'
import { importMembers } from '_migration/importMembers'
import { importOrgs } from '_migration/importOrgs'
import { importRoles } from '_migration/importRoles'
import { importTasks } from '_migration/importTasks'
import { importTaskViews } from '_migration/importTasksViews'
import { importThreads } from '_migration/importThreads'
import { importThreadsActivities } from '_migration/importThreadsActivities'
import { importThreadsLastActivity } from '_migration/importThreadsLastActivity'
import { importThreadsMembersStatus } from '_migration/importThreadsMembersStatus'
import { importUsers } from '_migration/importUsers'
import { retrieveOldIds } from '_migration/oldIds'

export default route(async () => {
  await retrieveOldIds()
  await importUsers()
  await importOrgs()
  await importMembers()
  await importRoles()
  await importCircles()
  await importDecisions()
  await importTasks()
  await importTaskViews()
  await importThreads()

  // Meetings
  await importMeetings()
  await importMeetingsSteps()
  await importMeetingsCurrentStep()
  await importMeetingTemplates()

  // Activities must be imported after meetings
  await importThreadsActivities()
  await importThreadsLastActivity()
  await importThreadsMembersStatus()

  await importLogs()
  await fixIdsInTexts()
})
