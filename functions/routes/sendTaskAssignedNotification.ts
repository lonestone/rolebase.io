import { Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'
import { guardOrg } from '@utils/guardOrg'
import { taskAssignedSend } from '@utils/notification/taskAssignedSend'
import { getNotificationTaskData } from '@utils/notification/getNotificationTaskData'

const yupSchema = yup.object({
  memberId: yup.string().required(),
  taskId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { memberId, taskId } = guardBodyParams(context, yupSchema)

  // Get task data
  const task = await getNotificationTaskData(taskId, memberId)

  // Check if user can access org data
  const orgId = task.orgId
  await guardOrg(context, orgId, Member_Role_Enum.Member)

  await taskAssignedSend(context?.userId!, task)
})
