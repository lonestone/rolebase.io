import {
  Circle_Insert_Input,
  Circle_Member_Insert_Input,
  Decision_Insert_Input,
  Member_Insert_Input,
  Member_Role_Enum,
  RoleFragment,
  Task_Insert_Input,
  Task_Status_Enum,
} from '@gql'
import { getSeedRoles } from '@shared/seeds/roles'
import { adminRequest } from '@utils/adminRequest'
import { RouteError } from '@utils/route'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import xlsx from 'xlsx'
import { Importer } from '../utils/Importer'
import {
  CREATE_CIRCLES,
  CREATE_CIRCLES_MEMBERS,
  CREATE_DECISIONS,
  CREATE_MEMBERS,
  CREATE_ORG,
  CREATE_ROLES,
  CREATE_TASKS,
  GET_USER,
} from '../utils/graphql'
import { importFileUpload } from '../utils/importFileUpload'
import { importFilesFromText } from '../utils/importFilesFromText'
import {
  HolaspiritCirclesRole,
  HolaspiritSheets,
  holaspiritSheetsNames,
} from './types'

export class HolaspiritImporter extends Importer {
  private data: HolaspiritSheets
  private orgId: string
  private orgName: string
  private orgCircleId: string
  private defaultMemberId: string
  private mapCircleNameToId = new Map<string, string>() // <circleName>#<roleName> => circleId
  private mapMemberEmailToId = new Map<string, string>() // <email> => memberId
  private mapCircleMembersIds = new Map<string, string[]>() // <circleId> => [memberId]
  private baseRoles: RoleFragment[]

  async importFile(fileData: Buffer) {
    const data: Partial<HolaspiritSheets> = {}

    try {
      // Read Excel file
      const workbook = xlsx.read(fileData, {
        cellDates: true,
      })

      // Read sheets and lines
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName]
        const sheetData = xlsx.utils.sheet_to_json(sheet, {})

        data[sheetName] = sheetData
      }
    } catch (error: any) {
      throw new RouteError(400, error.message)
    }

    // Check that all sheets are present
    const missingSheets = holaspiritSheetsNames.filter(
      (sheetName) => !data[sheetName]
    )
    if (missingSheets.length !== 0) {
      throw new RouteError(400, 'Missing sheets: ' + missingSheets.join(', '))
    }

    this.data = data as HolaspiritSheets

    await this.importOrg()
    await this.importMembers()
    await this.importCircles()
    await this.importAssginations()
    await this.importPolicies()
    await this.importActions()
    await this.importProjects()

    return this.orgId
  }

  private async importOrg() {
    const orgName = this.data['Circles & Roles'].find((c) => !c['Circle ID'])
      ?.Role
    if (!orgName) {
      throw new RouteError(400, 'No org name found')
    }

    // Create org
    const orgResult = await adminRequest(CREATE_ORG, { name: orgName })

    this.orgId = orgResult.insert_org_one!.id
    this.orgName = orgName
  }

  private async importMembers() {
    const { userId } = this.context
    if (!userId) return

    // Get user
    const { user } = await adminRequest(GET_USER, { id: userId })

    if (!user) throw new RouteError(400, 'User not found')

    const newMembers: Member_Insert_Input[] = []
    let includedUser = false

    for (const member of this.data.Members) {
      const name = member['First name'] + ' ' + member['Last name']
      const role =
        member.Privilege === 'owner'
          ? Member_Role_Enum.Owner
          : member.Privilege === 'admin'
          ? Member_Role_Enum.Admin
          : member.Privilege === 'member'
          ? Member_Role_Enum.Member
          : Member_Role_Enum.Readonly

      const picture =
        // Try to import avatar file
        (member.Avatar &&
          (await importFileUpload(member.Avatar, this.orgId))?.url) ||
        // If import fails, use origin URL
        member.Avatar

      const newMember: Member_Insert_Input = {
        orgId: this.orgId,
        name,
        inviteEmail: member.Email,
        picture,
        role,
        description: member.Phone,
        archived: member.Suspended,
      }

      if (member.Email === user.email) {
        includedUser = true
        newMember.userId = userId
        newMember.role = Member_Role_Enum.Owner
      }

      newMembers.push(newMember)
    }

    if (!includedUser) {
      newMembers.push({
        orgId: this.orgId,
        name: user.displayName,
        userId,
        inviteEmail: user.email,
        role: Member_Role_Enum.Owner,
      })
    }

    // Create members
    const membersResult = await adminRequest(CREATE_MEMBERS, {
      members: newMembers,
    })

    // Map members emails to ids
    for (const member of membersResult.insert_member!.returning) {
      if (!member.inviteEmail) continue
      this.mapMemberEmailToId.set(member.inviteEmail, member.id)

      if (member.inviteEmail === user.email) {
        this.defaultMemberId = member.id
      }
    }
  }

  private async importCircles() {
    // Create seed roles
    const roles = getSeedRoles(this.orgId)
    const rolesResult = await adminRequest(CREATE_ROLES, { roles })

    // Keep base roles for later
    this.baseRoles = rolesResult.insert_role!.returning

    // Org role is the only row with no circle ID & Name
    const orgRole = this.data['Circles & Roles'].filter(
      (c) => !c['Circle ID'] && c['Role ID']
    )[0]
    if (!orgRole) throw new RouteError(400, 'No role found for org')

    // Create org circle and role
    const orgCircleResult = await adminRequest(CREATE_CIRCLES, {
      circles: [
        {
          orgId: this.orgId,
          role: {
            data: await this.prepareRole(orgRole),
          },
        },
      ],
    })
    const orgCircleId = orgCircleResult.insert_circle!.returning[0].id
    this.orgCircleId = orgCircleId
    this.setMapCircleId(orgRole.Circle, orgRole.Role, orgCircleId)

    // Import circles recursively, starting by circles contained directly in org circle
    await this.importCircleChildren(this.orgName, orgCircleId)
  }

  private async importCircleChildren(
    // Holaspirit export misses relationships by ID between circles,
    // so we match by name
    name: string,
    circleId: string
  ) {
    const rows = this.data['Circles & Roles'].filter(
      (c) =>
        c.Circle === name && c.Role && !this.hasMapCircleId(c.Circle, c.Role)
    )
    if (rows.length === 0) return

    // Create org circle and role
    const newCircles: Circle_Insert_Input[] = []
    for (const row of rows) {
      const newCircle: Circle_Insert_Input = {
        orgId: this.orgId,
        parentId: circleId,
      }

      // Get role
      const role = this.findBaseRole(row.Role)
      if (role) {
        newCircle.roleId = role.id
      } else {
        newCircle.role = {
          data: await this.prepareRole(row),
        }
      }

      newCircles.push(newCircle)
    }

    const result = await adminRequest(CREATE_CIRCLES, { circles: newCircles })
    const circleIds = result.insert_circle!.returning.map((c) => c.id)

    // Map names to ids
    for (let i = 0; i < rows.length && i < circleIds.length; i++) {
      this.setMapCircleId(rows[i].Circle, rows[i].Role, circleIds[i])
    }

    // Import children circles
    // Note: we need another for statement to map names to ids before importing anything else
    for (let i = 0; i < rows.length && i < circleIds.length; i++) {
      await this.importCircleChildren(rows[i].Role, circleIds[i])
    }
  }

  private async importAssginations() {
    const circleMembers: Circle_Member_Insert_Input[] = []

    for (const row of this.data['Assignations']) {
      // Get circleId
      const circleId = await this.findAssignationCircleId(row.Circle, row.Role)
      if (!circleId) {
        console.error(
          '[Holaspirit import] Circle not found:',
          row.Circle,
          row.Role
        )
        continue
      }

      // Get memberId
      const memberId = this.mapMemberEmailToId.get(row.Email)
      if (!memberId) {
        console.error('[Holaspirit import] Member not found:', row.Email)
        continue
      }

      // Role is expired
      if (row.Until && new Date(row.Until).getTime() < Date.now()) {
        continue
      }

      // Already exists?
      // There can be duplicates with notations likes "<circle> (Leader de Cercle)"
      const circleMembersIds = this.mapCircleMembersIds.get(circleId)
      if (circleMembersIds?.includes(memberId)) {
        continue
      }

      circleMembers.push({
        circleId,
        memberId,
        createdAt: row.Since ? new Date(row.Since).toISOString() : undefined,
      })

      // Cached circle members ids
      if (circleMembersIds) {
        circleMembersIds.push(memberId)
      } else {
        this.mapCircleMembersIds.set(circleId, [memberId])
      }
    }

    // Create circles members
    await adminRequest(CREATE_CIRCLES_MEMBERS, { circleMembers })
  }

  private async findAssignationCircleId(
    circleName: string,
    roleName?: string
  ): Promise<string | undefined> {
    // Try to find "<circle> (<role>)" pattern in Row column
    const baseRoleMatch = roleName?.match(/(.+) \((.+)\)/)
    const baseRole = baseRoleMatch && this.findBaseRole(baseRoleMatch[2])

    if (baseRole && roleName) {
      // Already exists?
      const circleId = this.getMapCircleId(baseRoleMatch[1], baseRoleMatch[2])
      if (circleId) return circleId

      // Create circle with base role
      const parentId = this.getMapCircleId(circleName, baseRoleMatch[1])
      if (!parentId) return
      const newCircle = await adminRequest(CREATE_CIRCLES, {
        circles: [
          {
            orgId: this.orgId,
            parentId,
            roleId: baseRole.id,
          },
        ],
      })

      const newCircleId = newCircle.insert_circle?.returning[0].id
      if (newCircleId) {
        this.setMapCircleId(baseRoleMatch[1], baseRoleMatch[2], newCircleId)
      }
      return circleId
    } else {
      // Find already existing circle by role or circle name
      return roleName
        ? this.getMapCircleId(circleName, roleName)
        : this.getMapCircleId(undefined, circleName)
    }
  }

  private async importPolicies() {
    const decisions: Decision_Insert_Input[] = []

    for (const row of this.data['Policies']) {
      // Get circleId
      const circleId = this.getMapCircleId(row.Circle, row.Role)
      if (!circleId) {
        console.error(
          '[Holaspirit import] Circle not found:',
          row.Circle,
          row.Role
        )
        continue
      }
      decisions.push({
        orgId: this.orgId,
        circleId,
        memberId: this.defaultMemberId,
        title: row.Policy,
        description: await this.importHTMLContent(row.Description),
      })
    }

    // Create circles members
    await adminRequest(CREATE_DECISIONS, { decisions })
  }

  private async importActions() {
    const tasks: Task_Insert_Input[] = []

    for (const row of this.data['Actions']) {
      // Get circleId
      const circleId =
        this.getMapCircleId(row.Circle, row.Role) || this.orgCircleId

      // Get memberId
      // TODO: Handle multiple members
      const membersEmails = row.Members?.split('\n') || []
      const memberId =
        membersEmails[0] && this.mapMemberEmailToId.get(membersEmails[0])

      // Prepare status
      const status =
        row.Status === 'done' ? Task_Status_Enum.Done : Task_Status_Enum.Open
      if (row.Status !== 'done' && row.Status !== 'current') {
        console.error('[Holaspirit import] Task status not found:', row.Status)
      }

      tasks.push({
        orgId: this.orgId,
        circleId,
        memberId,
        title: row.Title,
        description: await this.importHTMLContent(row.Description),
        status,
        createdAt: row.Created
          ? new Date(row.Created).toISOString()
          : undefined,
      })
    }

    // Create circles members
    await adminRequest(CREATE_TASKS, { tasks })
  }

  private async importProjects() {
    const tasks: Task_Insert_Input[] = []

    for (const row of this.data['Projects']) {
      // Get circleId
      const circleId = this.getMapCircleId(row.Circle, row.Role)
      if (!circleId) {
        console.error(
          '[Holaspirit import] Circle not found:',
          row.Circle,
          row.Role
        )
        continue
      }

      // Get memberId
      // TODO: Handle multiple members
      const membersEmails = row.Members?.split('\n') || []
      const memberId =
        membersEmails[0] && this.mapMemberEmailToId.get(membersEmails[0])

      // Prepare status
      let status = Task_Status_Enum.Open
      if (
        row.Status === 'archived' ||
        /^(Done|Fini|Cancel|Annulé)$/.test(row.Column)
      ) {
        status = Task_Status_Enum.Done
      } else if (/^(Current|En cours)$/.test(row.Column)) {
        status = Task_Status_Enum.InProgress
      } else if (/^(Waiting|En attente)$/.test(row.Column)) {
        status = Task_Status_Enum.Blocked
      }

      // Get Todo lists
      const todos = new Map<string, Array<{ item: string; checked: boolean }>>()
      for (const todoRow of this.data['Projects To-do lists']) {
        if (
          todoRow.Project !== row.Title ||
          todoRow['Circle ID'] !== row['Circle ID']
        ) {
          continue
        }

        const todoTitle = todoRow['To-do list'] || 'Todo'
        const todoItem = {
          item: todoRow['Item'],
          checked: todoRow['Checked'],
        }
        const todo = todos.get(todoTitle)
        if (todo) {
          todo.push(todoItem)
        } else {
          todos.set(todoTitle, [todoItem])
        }
      }

      // Prepare description
      let description = await this.importHTMLContent(row.Description)
      for (const [todoTitle, todoItems] of todos) {
        const todoItemsText = todoItems
          .map(
            (todoItem) => (todoItem.checked ? '[x] ' : '[ ] ') + todoItem.item
          )
          .join('\n')
        description += `\n### ${todoTitle}\n${todoItemsText}`
      }

      tasks.push({
        orgId: this.orgId,
        circleId,
        memberId,
        title: row.Title,
        description,
        status,
        createdAt: row.Created
          ? new Date(row.Created).toISOString()
          : undefined,
      })
    }

    // Create circles members
    await adminRequest(CREATE_TASKS, { tasks })
  }

  private async importHTMLContent(text: string | undefined): Promise<string> {
    if (!text) return ''
    return importFilesFromText(NodeHtmlMarkdown.translate(text), this.orgId)
  }

  private async prepareRole(roleData: HolaspiritCirclesRole) {
    let notes = ''

    if (roleData.NOTES) {
      notes += await this.importHTMLContent(roleData.NOTES)
    }
    if (roleData['OBJECTIFS CLES']) {
      const goals = await this.importHTMLContent(roleData['OBJECTIFS CLES'])
      notes += `\n### Objectifs :\n${goals}`
    }
    if (roleData['Strategy']) {
      const strategy = await this.importHTMLContent(roleData['Strategy'])
      notes += `\n### Stratégie :\n${strategy}`
    }

    // Get indicators from Metrics sheet
    const indicators = this.data['Metrics']
      .filter((m) =>
        m['Role ID']
          ? m['Role ID'] === roleData['Role ID']
          : m['Circle'] === roleData['Role']
      )
      .map((m) => `* ${m['Title']} (${m['Recurrence']})`)
      .join('\n')

    // Get checklist from Checklists sheet
    const checklist = this.data['Checklists']
      .filter((c) =>
        c['Role ID']
          ? c['Role ID'] === roleData['Role ID']
          : c['Circle'] === roleData['Role']
      )
      .map((c) => `[ ] ${c['Title']} (${c['Recurrence']})`)
      .join('\n')

    return {
      orgId: this.orgId,
      name: await this.importHTMLContent(roleData.Role),
      purpose: await this.importHTMLContent(roleData.Purpose),
      domain: await this.importHTMLContent(roleData.Domains),
      accountabilities: await this.importHTMLContent(roleData.Accountabilities),
      indicators,
      checklist,
      notes,
    }
  }

  // Match Holaspirit role names to Rolebase seed roles names
  // and return seed role
  private findBaseRole(holaspiritName: string): RoleFragment | undefined {
    const name = this.transformBaseRoleName(holaspiritName)
    return this.baseRoles.find((r) => r.name === name)
  }

  private transformBaseRoleName(holaspiritName: string): string | undefined {
    const name = holaspiritName.toLowerCase()
    if (/^(leader (de|du) cercle|circle lead)$/.test(name)) {
      return 'Leader'
    } else if (/^(représentant (de|du) cercle|circle rep)$/.test(name)) {
      return 'Représentant'
    } else if (/^(facilitateur|facilitator)$/.test(name)) {
      return 'Facilitateur'
    } else if (/^(secrétaire|secretary)$/.test(name)) {
      return 'Secrétaire'
    }
  }

  private setMapCircleId(
    circleName: string | undefined,
    roleName: string,
    circleId: string
  ) {
    this.mapCircleNameToId.set(roleName, circleId)
    if (circleName) {
      this.mapCircleNameToId.set(`${circleName}#${roleName}`, circleId)
    }
  }

  private getMapCircleId(
    circleName: string | undefined,
    roleName: string | undefined
  ): string | undefined {
    if (circleName && roleName) {
      return this.mapCircleNameToId.get(`${circleName}#${roleName}`)
    }
    const name = circleName || roleName
    if (name) {
      return this.mapCircleNameToId.get(name)
    }
  }

  private hasMapCircleId(
    circleName: string,
    roleName: string
  ): string | undefined {
    return this.mapCircleNameToId.get(`${circleName}#${roleName}`)
  }
}
