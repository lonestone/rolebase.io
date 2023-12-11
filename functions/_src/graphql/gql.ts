/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUserImport($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n      displayName\n    }\n  }": types.GetUserImportDocument,
    "\n  mutation createOrgImport($name: String!) {\n    insert_org_one(object: {\n      name: $name\n      defaultWorkedMinPerWeek: 2100\n    }) {\n      id\n    }\n  }": types.CreateOrgImportDocument,
    "\n  mutation createMembersImport( $members: [member_insert_input!]!) {\n    insert_member(objects: $members) {\n      returning {\n        id\n        inviteEmail\n      }\n    }\n  }": types.CreateMembersImportDocument,
    "\n  mutation createRolesImport($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        ...Role\n      }\n    }\n  }": types.CreateRolesImportDocument,
    "\n  mutation createCirclesImport($circles: [circle_insert_input!]!) {\n    insert_circle(objects: $circles) {\n      returning {\n        id\n      }\n    }\n  }": types.CreateCirclesImportDocument,
    "\n  mutation createCirclesMembersImport($circleMembers: [circle_member_insert_input!]!) {\n    insert_circle_member(objects: $circleMembers) {\n      returning {\n        id\n      }\n    }\n  }": types.CreateCirclesMembersImportDocument,
    "\n  mutation createDecisionsImport($decisions: [decision_insert_input!]!) {\n    insert_decision(objects: $decisions) {\n      returning {\n        id\n      }\n    }\n  }": types.CreateDecisionsImportDocument,
    "\n  mutation createTasksImport($tasks: [task_insert_input!]!) {\n    insert_task(objects: $tasks) {\n      returning {\n        id\n      }\n    }\n  }": types.CreateTasksImportDocument,
    "\n      query GetFileByName($name: String!) {\n        files(where: { name: { _eq: $name } }) {\n          id\n        }\n      }\n    ": types.GetFileByNameDocument,
    "\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n        parent {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CircleSearchFragmentDoc,
    "\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      ": types.GetCircleForSearchDocument,
    "\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      ": types.GetCirclesForSearchDocument,
    "\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        ": types.GetRoleCirclesForSearchDocument,
    "\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n": types.DecisionSearchFragmentDoc,
    "\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      ": types.GetDecisionForSearchDocument,
    "\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      ": types.GetDecisionsForSearchDocument,
    "\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n": types.MeetingSearchFragmentDoc,
    "\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      ": types.GetMeetingForSearchDocument,
    "\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      ": types.GetMeetingsForSearchDocument,
    "\n        query GetMeetingDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      ": types.GetMeetingDataForSearchDocument,
    "\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    ": types.ResetLastUpdateSourceDocument,
    "\n        query GetMeetingRecurringDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_recurring_by_pk(id: $meetingId) {\n            ...MeetingRecurring\n            meetings {\n              id\n              recurringDate\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      ": types.GetMeetingRecurringDataForSearchDocument,
    "\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    description\n    picture\n  }\n": types.MemberSearchFragmentDoc,
    "\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      ": types.GetMemberForSearchDocument,
    "\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      ": types.GetMembersForSearchDocument,
    "\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n": types.TaskSearchFragmentDoc,
    "\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      ": types.GetTaskForSearchDocument,
    "\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      ": types.GetTasksForSearchDocument,
    "\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n    activities {\n      type\n      data\n    }\n  }\n": types.ThreadSearchFragmentDoc,
    "\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      ": types.GetThreadForSearchDocument,
    "\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      ": types.GetThreadsForSearchDocument,
    "fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleSummary on circle {\n  ...Circle\n  role {\n    ...RoleSummary\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleSummary\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n  invitedCircleLinks {\n    invitedCircle {\n      id\n    }\n  }\n}": types.CircleFragmentDoc,
    "fragment CircleLink on circle_link {\n  id\n  parentId\n  circleId\n  createdAt\n}": types.CircleLinkFragmentDoc,
    "fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}": types.CircleMemberFragmentDoc,
    "fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}": types.DecisionFragmentDoc,
    "fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}": types.LogFragmentDoc,
    "fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  summary\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  currentStepId\n}": types.MeetingFragmentDoc,
    "fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  participantsScope\n  participantsMembersIds\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}": types.MeetingRecurringFragmentDoc,
    "fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}": types.MeetingStepFragmentDoc,
    "fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}": types.MemberFragmentDoc,
    "fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...Meeting\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}": types.NewsFragmentDoc,
    "fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n  shareOrg\n  shareMembers\n  protectGovernance\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n    invitedCircleLinks {\n      invitedCircle {\n        id\n      }\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}": types.OrgFragmentDoc,
    "fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}\n\nfragment RoleSummary on role {\n  id\n  base\n  name\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}": types.RoleFragmentDoc,
    "fragment RoleAI on role_ai {\n  id\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n}": types.RoleAiFragmentDoc,
    "fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}": types.TaskFragmentDoc,
    "fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}": types.ThreadFragmentDoc,
    "fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}": types.ThreadActivityFragmentDoc,
    "fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  createdAt\n  user {\n    metadata\n  }\n}": types.UserAppFragmentDoc,
    "\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n": types.GetMemberDocument,
    "\n  query getOrgSubscriptionAndActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n        type\n      }\n      members_aggregate(where: {\n        archived: { _eq: false },\n        userId: { _is_null: false }\n      }) {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n": types.GetOrgSubscriptionAndActiveMembersDocument,
    "\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}": types.GetOrgMembersDocument,
    "\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }": types.GetUserRoleInOrgDocument,
    "\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateMemberDocument,
    "\n  mutation updateUserApp($id: uuid!, $values: user_app_set_input!) {\n    update_user_app_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateUserAppDocument,
    "\n  mutation deleteUserApp($id: uuid!) {\n    delete_user_app_by_pk(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserAppDocument,
    "\n  query getOrgMeetingsForCalendarApp($orgId: uuid!, $userId: uuid!, $afterDate: timestamptz!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n      }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n": types.GetOrgMeetingsForCalendarAppDocument,
    "\n  query getMeetingForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      ...Meeting\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetMeetingForCalendarAppDocument,
    "\n  query getMeetingRecurringForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_recurring_by_pk(id: $meetingId) {\n      ...MeetingRecurring\n      meetings {\n        recurringDate\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n": types.GetMeetingRecurringForCalendarAppDocument,
    "\n  mutation createMeetingForCalendarApp($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n": types.CreateMeetingForCalendarAppDocument,
    "\n  mutation updateMeetingForCalendarApp($meetingId: uuid!, $values: meeting_set_input!) {\n    update_meeting_by_pk(pk_columns: { id: $meetingId }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateMeetingForCalendarAppDocument,
    "\n  mutation deleteMeetingForCalendarApp($meetingId: uuid!) {\n    delete_meeting_by_pk(id: $meetingId) {\n      id\n    }\n  }\n": types.DeleteMeetingForCalendarAppDocument,
    "\n  query getUserApp($id: uuid!) {\n    user_app_by_pk(id: $id) {\n      ...UserAppFull\n    }\n  }\n": types.GetUserAppDocument,
    "\n  mutation createUserApp($values: user_app_insert_input!) {\n    insert_user_app_one(object: $values) {\n      id\n    }\n  }\n": types.CreateUserAppDocument,
    "\n      query getUserApps($id: uuid!) {\n        user_app_by_pk(id: $id) {\n          ...UserAppFull\n        }\n      }\n    ": types.GetUserAppsDocument,
    "\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n": types.GetRecurringMeetingsDocument,
    "\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n": types.CreateMeetingDocument,
    "\n  query getUsersForDigest {\n    users(where: { disabled: { _eq: false }}) {\n      id\n      createdAt\n      displayName\n      email\n      locale\n      metadata\n    }\n  }\n": types.GetUsersForDigestDocument,
    "\n  mutation updateUserMetadata($userId: uuid!, $metadata: jsonb!) {\n    updateUser(pk_columns: { id: $userId }, _set: { metadata: $metadata }) {\n      id\n    }\n  }\n": types.UpdateUserMetadataDocument,
    "\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Circles to compute participations\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _or: [\n              # New threads\n              { createdAt: { _gt: $date } }\n              # New activities in threads\n              { activities: { createdAt: { _gt: $date } } }\n            ]\n            archived: { _eq: false }\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetUserDigestDataDocument,
    "\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }": types.GetRoleAiDocument,
    "\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }": types.InsertRoleAiDocument,
    "\n  query getMeetingContent($meetingId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      orgId\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      stepsConfig\n      steps {\n        stepConfigId\n        type\n        data\n        notes\n      }\n    }\n  }": types.GetMeetingContentDocument,
    "\n  query getThreadsWithMeetingNotes($meetingId: uuid!, $threadsIds: [uuid!]!) {\n    thread(where:{id: {_in: $threadsIds}}) {\n      title\n      activities(\n        where: {\n          _and: { type: { _eq: MeetingNote }, refMeetingId: { _eq: $meetingId } }\n        }\n      ) {\n        type\n        data\n      }\n    }\n  }": types.GetThreadsWithMeetingNotesDocument,
    "\n  query getMeetingInvitedNotificationData(\n    $userId: uuid!\n    $meetingId: uuid!\n    $recipientMemberIds: [uuid!]!\n  ) {\n    meeting_by_pk(id: $meetingId) {\n      id\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        slug\n        members(where: { id: { _in: $recipientMemberIds } }) {\n          name\n          user {\n            email\n          }\n        }\n        sender: members(where: { user: { id: { _eq: $userId } } }) {\n          name\n          picture\n          user {\n            locale\n          }\n        }\n      }\n    }\n  }\n\n": types.GetMeetingInvitedNotificationDataDocument,
    "\n  query getOrgMeetingsForIcal($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n": types.GetOrgMeetingsForIcalDocument,
    "\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n": types.CheckOrgUserDocument,
    "\n  query getOrgAndMember($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: { userId: { _eq: $userId } }) {\n        id\n        name\n        picture\n        user {\n          locale\n        }\n      }\n    }\n  }\n": types.GetOrgAndMemberDocument,
    "\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }": types.StartMembersMeetingDocument,
    "\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }": types.StopMembersMeetingDocument,
    "\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }": types.GetOrgSubscriptionStripeStatusDocument,
    "\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }": types.ArchiveOrgDocument,
    "\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }": types.GetUserDocument,
    "\n  mutation createOrg($name: String!, $slug: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      slug: $slug\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }": types.CreateOrgDocument,
    "\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }": types.CreateRoleDocument,
    "\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }": types.CreateRolesDocument,
    "\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }": types.CreateCircleDocument,
    "\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }": types.UpdateOrgSlugDocument,
    "\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n": types.GetOldIdsDocument,
    "\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }": types.GetOrgSubscriptionDetailsDocument,
    "\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }": types.GetOrgSubscriptionStripeIdsDocument,
    "\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }": types.UpdateOrgSubscriptionStatusByStripeSubIdDocument,
    "\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n": types.UpdateActiveMembersToMembersDocument,
    "\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n": types.GetOrgMembersWithRolesFromSubscriptionIdDocument,
    "\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }": types.GetUserEmailDocument,
    "\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }": types.GetOrgIdDocument,
    "\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }": types.CreateOrgSubscriptionDocument,
    "\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }": types.UpdateOrgSubscriptionStripeSubIdDocument,
    "\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }": types.GetOrgSubscriptionStatusDocument,
    "\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }": types.GetOrgSubscriptionStripeIdDocument,
    "\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }": types.GetOrgSubscriptionStripeCustomerIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserImport($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n      displayName\n    }\n  }"): (typeof documents)["\n  query getUserImport($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n      displayName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createOrgImport($name: String!) {\n    insert_org_one(object: {\n      name: $name\n      defaultWorkedMinPerWeek: 2100\n    }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation createOrgImport($name: String!) {\n    insert_org_one(object: {\n      name: $name\n      defaultWorkedMinPerWeek: 2100\n    }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createMembersImport( $members: [member_insert_input!]!) {\n    insert_member(objects: $members) {\n      returning {\n        id\n        inviteEmail\n      }\n    }\n  }"): (typeof documents)["\n  mutation createMembersImport( $members: [member_insert_input!]!) {\n    insert_member(objects: $members) {\n      returning {\n        id\n        inviteEmail\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRolesImport($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        ...Role\n      }\n    }\n  }"): (typeof documents)["\n  mutation createRolesImport($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        ...Role\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCirclesImport($circles: [circle_insert_input!]!) {\n    insert_circle(objects: $circles) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation createCirclesImport($circles: [circle_insert_input!]!) {\n    insert_circle(objects: $circles) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCirclesMembersImport($circleMembers: [circle_member_insert_input!]!) {\n    insert_circle_member(objects: $circleMembers) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation createCirclesMembersImport($circleMembers: [circle_member_insert_input!]!) {\n    insert_circle_member(objects: $circleMembers) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createDecisionsImport($decisions: [decision_insert_input!]!) {\n    insert_decision(objects: $decisions) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation createDecisionsImport($decisions: [decision_insert_input!]!) {\n    insert_decision(objects: $decisions) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createTasksImport($tasks: [task_insert_input!]!) {\n    insert_task(objects: $tasks) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation createTasksImport($tasks: [task_insert_input!]!) {\n    insert_task(objects: $tasks) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetFileByName($name: String!) {\n        files(where: { name: { _eq: $name } }) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query GetFileByName($name: String!) {\n        files(where: { name: { _eq: $name } }) {\n          id\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n        parent {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n        parent {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        "): (typeof documents)["\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n"): (typeof documents)["\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n"): (typeof documents)["\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMeetingDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetMeetingDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMeetingRecurringDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_recurring_by_pk(id: $meetingId) {\n            ...MeetingRecurring\n            meetings {\n              id\n              recurringDate\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetMeetingRecurringDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_recurring_by_pk(id: $meetingId) {\n            ...MeetingRecurring\n            meetings {\n              id\n              recurringDate\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    description\n    picture\n  }\n"): (typeof documents)["\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    description\n    picture\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n"): (typeof documents)["\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n    activities {\n      type\n      data\n    }\n  }\n"): (typeof documents)["\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n    activities {\n      type\n      data\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      "): (typeof documents)["\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleSummary on circle {\n  ...Circle\n  role {\n    ...RoleSummary\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleSummary\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n  invitedCircleLinks {\n    invitedCircle {\n      id\n    }\n  }\n}"): (typeof documents)["fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleSummary on circle {\n  ...Circle\n  role {\n    ...RoleSummary\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleSummary\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n  invitedCircleLinks {\n    invitedCircle {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CircleLink on circle_link {\n  id\n  parentId\n  circleId\n  createdAt\n}"): (typeof documents)["fragment CircleLink on circle_link {\n  id\n  parentId\n  circleId\n  createdAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}"): (typeof documents)["fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}"): (typeof documents)["fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}"): (typeof documents)["fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  summary\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  currentStepId\n}"): (typeof documents)["fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  summary\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  currentStepId\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  participantsScope\n  participantsMembersIds\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}"): (typeof documents)["fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  participantsScope\n  participantsMembersIds\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}"): (typeof documents)["fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}"): (typeof documents)["fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...Meeting\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}"): (typeof documents)["fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...Meeting\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n  shareOrg\n  shareMembers\n  protectGovernance\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n    invitedCircleLinks {\n      invitedCircle {\n        id\n      }\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}"): (typeof documents)["fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n  shareOrg\n  shareMembers\n  protectGovernance\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n    invitedCircleLinks {\n      invitedCircle {\n        id\n      }\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}\n\nfragment RoleSummary on role {\n  id\n  base\n  name\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}"): (typeof documents)["fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}\n\nfragment RoleSummary on role {\n  id\n  base\n  name\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RoleAI on role_ai {\n  id\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n}"): (typeof documents)["fragment RoleAI on role_ai {\n  id\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}"): (typeof documents)["fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}"): (typeof documents)["fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}"): (typeof documents)["fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  createdAt\n  user {\n    metadata\n  }\n}"): (typeof documents)["fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  createdAt\n  user {\n    metadata\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n"): (typeof documents)["\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgSubscriptionAndActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n        type\n      }\n      members_aggregate(where: {\n        archived: { _eq: false },\n        userId: { _is_null: false }\n      }) {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgSubscriptionAndActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n        type\n      }\n      members_aggregate(where: {\n        archived: { _eq: false },\n        userId: { _is_null: false }\n      }) {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}"): (typeof documents)["\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }"): (typeof documents)["\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUserApp($id: uuid!, $values: user_app_set_input!) {\n    update_user_app_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserApp($id: uuid!, $values: user_app_set_input!) {\n    update_user_app_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteUserApp($id: uuid!) {\n    delete_user_app_by_pk(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteUserApp($id: uuid!) {\n    delete_user_app_by_pk(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgMeetingsForCalendarApp($orgId: uuid!, $userId: uuid!, $afterDate: timestamptz!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n      }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgMeetingsForCalendarApp($orgId: uuid!, $userId: uuid!, $afterDate: timestamptz!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n      }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMeetingForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      ...Meeting\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMeetingForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      ...Meeting\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMeetingRecurringForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_recurring_by_pk(id: $meetingId) {\n      ...MeetingRecurring\n      meetings {\n        recurringDate\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMeetingRecurringForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_recurring_by_pk(id: $meetingId) {\n      ...MeetingRecurring\n      meetings {\n        recurringDate\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createMeetingForCalendarApp($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createMeetingForCalendarApp($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateMeetingForCalendarApp($meetingId: uuid!, $values: meeting_set_input!) {\n    update_meeting_by_pk(pk_columns: { id: $meetingId }, _set: $values) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMeetingForCalendarApp($meetingId: uuid!, $values: meeting_set_input!) {\n    update_meeting_by_pk(pk_columns: { id: $meetingId }, _set: $values) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteMeetingForCalendarApp($meetingId: uuid!) {\n    delete_meeting_by_pk(id: $meetingId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMeetingForCalendarApp($meetingId: uuid!) {\n    delete_meeting_by_pk(id: $meetingId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserApp($id: uuid!) {\n    user_app_by_pk(id: $id) {\n      ...UserAppFull\n    }\n  }\n"): (typeof documents)["\n  query getUserApp($id: uuid!) {\n    user_app_by_pk(id: $id) {\n      ...UserAppFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUserApp($values: user_app_insert_input!) {\n    insert_user_app_one(object: $values) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createUserApp($values: user_app_insert_input!) {\n    insert_user_app_one(object: $values) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query getUserApps($id: uuid!) {\n        user_app_by_pk(id: $id) {\n          ...UserAppFull\n        }\n      }\n    "): (typeof documents)["\n      query getUserApps($id: uuid!) {\n        user_app_by_pk(id: $id) {\n          ...UserAppFull\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUsersForDigest {\n    users(where: { disabled: { _eq: false }}) {\n      id\n      createdAt\n      displayName\n      email\n      locale\n      metadata\n    }\n  }\n"): (typeof documents)["\n  query getUsersForDigest {\n    users(where: { disabled: { _eq: false }}) {\n      id\n      createdAt\n      displayName\n      email\n      locale\n      metadata\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUserMetadata($userId: uuid!, $metadata: jsonb!) {\n    updateUser(pk_columns: { id: $userId }, _set: { metadata: $metadata }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserMetadata($userId: uuid!, $metadata: jsonb!) {\n    updateUser(pk_columns: { id: $userId }, _set: { metadata: $metadata }) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Circles to compute participations\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _or: [\n              # New threads\n              { createdAt: { _gt: $date } }\n              # New activities in threads\n              { activities: { createdAt: { _gt: $date } } }\n            ]\n            archived: { _eq: false }\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Circles to compute participations\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _or: [\n              # New threads\n              { createdAt: { _gt: $date } }\n              # New activities in threads\n              { activities: { createdAt: { _gt: $date } } }\n            ]\n            archived: { _eq: false }\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }"): (typeof documents)["\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }"): (typeof documents)["\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMeetingContent($meetingId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      orgId\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      stepsConfig\n      steps {\n        stepConfigId\n        type\n        data\n        notes\n      }\n    }\n  }"): (typeof documents)["\n  query getMeetingContent($meetingId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      orgId\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      stepsConfig\n      steps {\n        stepConfigId\n        type\n        data\n        notes\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getThreadsWithMeetingNotes($meetingId: uuid!, $threadsIds: [uuid!]!) {\n    thread(where:{id: {_in: $threadsIds}}) {\n      title\n      activities(\n        where: {\n          _and: { type: { _eq: MeetingNote }, refMeetingId: { _eq: $meetingId } }\n        }\n      ) {\n        type\n        data\n      }\n    }\n  }"): (typeof documents)["\n  query getThreadsWithMeetingNotes($meetingId: uuid!, $threadsIds: [uuid!]!) {\n    thread(where:{id: {_in: $threadsIds}}) {\n      title\n      activities(\n        where: {\n          _and: { type: { _eq: MeetingNote }, refMeetingId: { _eq: $meetingId } }\n        }\n      ) {\n        type\n        data\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMeetingInvitedNotificationData(\n    $userId: uuid!\n    $meetingId: uuid!\n    $recipientMemberIds: [uuid!]!\n  ) {\n    meeting_by_pk(id: $meetingId) {\n      id\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        slug\n        members(where: { id: { _in: $recipientMemberIds } }) {\n          name\n          user {\n            email\n          }\n        }\n        sender: members(where: { user: { id: { _eq: $userId } } }) {\n          name\n          picture\n          user {\n            locale\n          }\n        }\n      }\n    }\n  }\n\n"): (typeof documents)["\n  query getMeetingInvitedNotificationData(\n    $userId: uuid!\n    $meetingId: uuid!\n    $recipientMemberIds: [uuid!]!\n  ) {\n    meeting_by_pk(id: $meetingId) {\n      id\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        slug\n        members(where: { id: { _in: $recipientMemberIds } }) {\n          name\n          user {\n            email\n          }\n        }\n        sender: members(where: { user: { id: { _eq: $userId } } }) {\n          name\n          picture\n          user {\n            locale\n          }\n        }\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgMeetingsForIcal($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgMeetingsForIcal($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgAndMember($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: { userId: { _eq: $userId } }) {\n        id\n        name\n        picture\n        user {\n          locale\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgAndMember($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: { userId: { _eq: $userId } }) {\n        id\n        name\n        picture\n        user {\n          locale\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }"): (typeof documents)["\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }"): (typeof documents)["\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createOrg($name: String!, $slug: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      slug: $slug\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation createOrg($name: String!, $slug: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      slug: $slug\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }"): (typeof documents)["\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }"): (typeof documents)["\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }"): (typeof documents)["\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }"): (typeof documents)["\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }"): (typeof documents)["\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }"): (typeof documents)["\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }"): (typeof documents)["\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;