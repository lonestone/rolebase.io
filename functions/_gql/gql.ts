/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

const documents = {
  '\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n      }\n      parent {\n        role {\n          name\n        }\n      }\n    }\n  }\n':
    types.CircleSearchFragmentDoc,
  '\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      ':
    types.GetCircleForSearchDocument,
  '\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      ':
    types.GetCirclesForSearchDocument,
  '\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        ':
    types.GetRoleCirclesForSearchDocument,
  '\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n':
    types.DecisionSearchFragmentDoc,
  '\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      ':
    types.GetDecisionForSearchDocument,
  '\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      ':
    types.GetDecisionsForSearchDocument,
  '\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n':
    types.MeetingSearchFragmentDoc,
  '\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      ':
    types.GetMeetingForSearchDocument,
  '\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      ':
    types.GetMeetingsForSearchDocument,
  '\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    picture\n  }\n':
    types.MemberSearchFragmentDoc,
  '\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      ':
    types.GetMemberForSearchDocument,
  '\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      ':
    types.GetMembersForSearchDocument,
  '\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n':
    types.TaskSearchFragmentDoc,
  '\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      ':
    types.GetTaskForSearchDocument,
  '\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      ':
    types.GetTasksForSearchDocument,
  '\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n  }\n':
    types.ThreadSearchFragmentDoc,
  '\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      ':
    types.GetThreadForSearchDocument,
  '\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      ':
    types.GetThreadsForSearchDocument,
  'fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleWithRole on circle {\n  ...Circle\n  role {\n    ...Role\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleWithRole\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n}':
    types.CircleFragmentDoc,
  'fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}':
    types.CircleMemberFragmentDoc,
  'fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}':
    types.DecisionFragmentDoc,
  'fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n}':
    types.LogFragmentDoc,
  'fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n}':
    types.MeetingFragmentDoc,
  'fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}':
    types.MeetingStepFragmentDoc,
  'fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n  preferences\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}':
    types.MemberFragmentDoc,
  'fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}':
    types.OrgFragmentDoc,
  'fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  autoCreate\n  link\n  defaultMinPerWeek\n  colorHue\n}':
    types.RoleFragmentDoc,
  'fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}\n\nfragment TaskNotificationData on task {\n  ...Task\n  org {\n    ...Org\n    members(where: {id: {_eq: $memberId}}) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n  circle {\n    id\n    role {\n      name\n    }\n  }\n}':
    types.TaskFragmentDoc,
  'fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n}':
    types.ThreadFragmentDoc,
  'fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}':
    types.ThreadActivityFragmentDoc,
  '\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n':
    types.GetMemberDocument,
  '\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}':
    types.GetOrgMembersDocument,
  '\n  query getOrgRole($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: {userId: {_eq: $userId}}) {\n        id\n        role\n        userId\n      }\n    }\n  }':
    types.GetOrgRoleDocument,
  '\n  query getOrg($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members {\n        id\n        userId\n        archived\n      }\n      org_subscription {\n        id\n        stripeCustomerId\n        stripeSubscriptionId\n        type\n        status\n      }\n    }\n  }':
    types.GetOrgDocument,
  '\n  query getRecipients($memberIds: [uuid!]!) {\n    member(where: { id: { _in: $memberIds } }) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n':
    types.GetRecipientsDocument,
  '\n  query getTaskData($id: uuid!, $memberId: uuid!) {\n    task_by_pk(id: $id) {\n      ...TaskNotificationData\n    }\n  }\n':
    types.GetTaskDataDocument,
  '\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n':
    types.UpdateMemberDocument,
  '\n  query getOrgActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }\n  }\n':
    types.GetOrgActiveMembersDocument,
  '\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n':
    types.CheckOrgUserDocument,
  '\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }':
    types.GetOrgSubscriptionStripeStatusDocument,
  '\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }':
    types.ArchiveOrgDocument,
  '\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings {\n        recurringDate\n      }\n    }\n  }\n':
    types.GetRecurringMeetingsDocument,
  '\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n':
    types.CreateMeetingDocument,
  '\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }':
    types.GetUserDocument,
  '\n  mutation createOrg($name: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      archived: false\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }':
    types.CreateOrgDocument,
  '\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }':
    types.CreateRoleDocument,
  '\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }':
    types.CreateRolesDocument,
  '\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }':
    types.CreateCircleDocument,
  '\n  query getQuantity($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n    }\n  }\n':
    types.GetQuantityDocument,
  '\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }':
    types.GetOrgSubscriptionDetailsDocument,
  '\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }':
    types.GetOrgSubscriptionStripeIdsDocument,
  '\n  query getMemberByUserId($orgId: uuid!, $userId: uuid!) {\n    member(where: { orgId: { _eq: $orgId }, userId: { _eq: $userId } }) {\n      id\n      name\n    }\n  }\n':
    types.GetMemberByUserIdDocument,
  '\n  query getOrgAndCircles($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        id\n        orgId\n        circleId\n        circle {\n          role {\n            name\n          }\n        }\n        participantsScope\n        participantsMembersIds\n        template {\n          title\n        }\n        rrule\n        duration\n      }\n    }\n  }\n':
    types.GetOrgAndCirclesDocument,
  '\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n':
    types.GetOldIdsDocument,
  '\n  query getMeetingData($id: uuid!, $userId:uuid!) {\n    meeting_by_pk(id: $id) {\n      id\n      org {\n        ...Org\n        members(where: { userId: { _eq: $userId }}) {\n          id\n        }\n      }\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      attendees\n    }\n  }\n':
    types.GetMeetingDataDocument,
  '\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }':
    types.StartMembersMeetingDocument,
  '\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }':
    types.StopMembersMeetingDocument,
  '\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }':
    types.UpdateOrgSubscriptionStatusByStripeSubIdDocument,
  '\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n':
    types.UpdateActiveMembersToMembersDocument,
  '\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n':
    types.GetOrgMembersWithRolesFromSubscriptionIdDocument,
  '\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }':
    types.GetUserEmailDocument,
  '\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }':
    types.GetOrgIdDocument,
  '\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }':
    types.CreateOrgSubscriptionDocument,
  '\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }':
    types.UpdateOrgSubscriptionStripeSubIdDocument,
  '\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }':
    types.GetOrgSubscriptionStatusDocument,
  '\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }':
    types.GetOrgSubscriptionStripeIdDocument,
  '\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }':
    types.UpdateOrgSlugDocument,
  '\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }':
    types.GetOrgSubscriptionStripeCustomerIdDocument,
}

export function gql(
  source: '\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n      }\n      parent {\n        role {\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n      }\n      parent {\n        role {\n          name\n        }\n      }\n    }\n  }\n']
export function gql(
  source: '\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      ']
export function gql(
  source: '\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query GetRoleCirclesForSearch($id: uuid!) {\n            role(where: { id: { _eq: $id } }) {\n              circles(where: { archived: { _eq: false } }) {\n                ...CircleSearch\n              }\n            }\n          }\n        ']
export function gql(
  source: '\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n'
): (typeof documents)['\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n']
export function gql(
  source: '\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      ']
export function gql(
  source: '\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n'
): (typeof documents)['\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n']
export function gql(
  source: '\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      ']
export function gql(
  source: '\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    picture\n  }\n'
): (typeof documents)['\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    picture\n  }\n']
export function gql(
  source: '\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      ']
export function gql(
  source: '\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n'
): (typeof documents)['\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n']
export function gql(
  source: '\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      ']
export function gql(
  source: '\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n  }\n'
): (typeof documents)['\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n  }\n']
export function gql(
  source: '\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      ']
export function gql(
  source: '\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      '
): (typeof documents)['\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      ']
export function gql(
  source: 'fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleWithRole on circle {\n  ...Circle\n  role {\n    ...Role\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleWithRole\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n}'
): (typeof documents)['fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleWithRole on circle {\n  ...Circle\n  role {\n    ...Role\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleWithRole\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n}']
export function gql(
  source: 'fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}'
): (typeof documents)['fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}']
export function gql(
  source: 'fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}'
): (typeof documents)['fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n}']
export function gql(
  source: 'fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n}'
): (typeof documents)['fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n}']
export function gql(
  source: 'fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n}'
): (typeof documents)['fragment Meeting on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  createdAt\n  startDate\n  endDate\n  ended\n  title\n  attendees\n  stepsConfig\n  currentStepId\n  archived\n  videoConf\n  recurringId\n  recurringDate\n}\n\nfragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n}']
export function gql(
  source: 'fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}'
): (typeof documents)['fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}']
export function gql(
  source: 'fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n  preferences\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}'
): (typeof documents)['fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n  meetingId\n  preferences\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}']
export function gql(
  source: 'fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}'
): (typeof documents)['fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...Role\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}']
export function gql(
  source: 'fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  autoCreate\n  link\n  defaultMinPerWeek\n  colorHue\n}'
): (typeof documents)['fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  autoCreate\n  link\n  defaultMinPerWeek\n  colorHue\n}']
export function gql(
  source: 'fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}\n\nfragment TaskNotificationData on task {\n  ...Task\n  org {\n    ...Org\n    members(where: {id: {_eq: $memberId}}) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n  circle {\n    id\n    role {\n      name\n    }\n  }\n}'
): (typeof documents)['fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n}\n\nfragment TaskNotificationData on task {\n  ...Task\n  org {\n    ...Org\n    members(where: {id: {_eq: $memberId}}) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n  circle {\n    id\n    role {\n      name\n    }\n  }\n}']
export function gql(
  source: 'fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n}'
): (typeof documents)['fragment Thread on thread {\n  id\n  orgId\n  circleId\n  participantsScope\n  participantsMembersIds\n  initiatorMemberId\n  title\n  createdAt\n  archived\n}']
export function gql(
  source: 'fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}'
): (typeof documents)['fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}']
export function gql(
  source: '\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n'
): (typeof documents)['\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n']
export function gql(
  source: '\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}'
): (typeof documents)['\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}']
export function gql(
  source: '\n  query getOrgRole($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: {userId: {_eq: $userId}}) {\n        id\n        role\n        userId\n      }\n    }\n  }'
): (typeof documents)['\n  query getOrgRole($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members(where: {userId: {_eq: $userId}}) {\n        id\n        role\n        userId\n      }\n    }\n  }']
export function gql(
  source: '\n  query getOrg($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members {\n        id\n        userId\n        archived\n      }\n      org_subscription {\n        id\n        stripeCustomerId\n        stripeSubscriptionId\n        type\n        status\n      }\n    }\n  }'
): (typeof documents)['\n  query getOrg($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members {\n        id\n        userId\n        archived\n      }\n      org_subscription {\n        id\n        stripeCustomerId\n        stripeSubscriptionId\n        type\n        status\n      }\n    }\n  }']
export function gql(
  source: '\n  query getRecipients($memberIds: [uuid!]!) {\n    member(where: { id: { _in: $memberIds } }) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getRecipients($memberIds: [uuid!]!) {\n    member(where: { id: { _in: $memberIds } }) {\n      id\n      name\n      user {\n        id\n        email\n        locale\n      }\n    }\n  }\n']
export function gql(
  source: '\n  query getTaskData($id: uuid!, $memberId: uuid!) {\n    task_by_pk(id: $id) {\n      ...TaskNotificationData\n    }\n  }\n'
): (typeof documents)['\n  query getTaskData($id: uuid!, $memberId: uuid!) {\n    task_by_pk(id: $id) {\n      ...TaskNotificationData\n    }\n  }\n']
export function gql(
  source: '\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n']
export function gql(
  source: '\n  query getOrgActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getOrgActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }\n  }\n']
export function gql(
  source: '\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query checkOrgUser($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: { userId: { _eq: $userId } }) {\n        id\n      }\n    }\n  }\n']
export function gql(
  source: '\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }'
): (typeof documents)['\n    query getOrgSubscriptionStripeStatus($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }']
export function gql(
  source: '\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation archiveOrg($orgId: uuid!) {\n    update_org_by_pk(pk_columns: {id: $orgId}, _set: {archived: true}) {\n      id\n    }\n  }']
export function gql(
  source: '\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings {\n        recurringDate\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      orgId\n      circleId\n      circle {\n        role {\n          name\n        }\n      }\n      participantsScope\n      participantsMembersIds\n      templateId\n      template {\n        title\n        stepsConfig\n      }\n      rrule\n      duration\n      videoConf\n      meetings {\n        recurringDate\n      }\n    }\n  }\n']
export function gql(
  source: '\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n']
export function gql(
  source: '\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }'
): (typeof documents)['\n  query getUser($id: uuid!) {\n    user(id: $id) {\n      id\n      displayName\n    }\n  }']
export function gql(
  source: '\n  mutation createOrg($name: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      archived: false\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation createOrg($name: String!, $userId: uuid!, $memberName: String!) {\n    insert_org_one(object: {\n      name: $name\n      archived: false\n      defaultWorkedMinPerWeek: 2100\n      members: {\n        data: [\n          {\n            userId: $userId\n            name: $memberName\n            role: Owner\n          }\n        ]\n      }\n    }) {\n      id\n    }\n  }']
export function gql(
  source: '\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation createRole($orgId: uuid!, $name: String!) {\n    insert_role_one(object: {\n      orgId: $orgId\n      name: $name\n    }) {\n      id\n    }\n  }']
export function gql(
  source: '\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }'
): (typeof documents)['\n  mutation createRoles($roles: [role_insert_input!]!) {\n    insert_role(objects: $roles) {\n      returning {\n        id\n      }\n    }\n  }']
export function gql(
  source: '\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation createCircle($orgId: uuid!, $roleId: uuid!) {\n    insert_circle_one(object: {\n      orgId: $orgId\n      roleId: $roleId\n    }) {\n      id\n    }\n  }']
export function gql(
  source: '\n  query getQuantity($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getQuantity($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      members(where: {userId: {_is_null: false}}) {\n        id\n      }\n    }\n  }\n']
export function gql(
  source: '\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }'
): (typeof documents)['\n    query getOrgSubscriptionDetails($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n        status\n        type\n      }\n    }']
export function gql(
  source: '\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }'
): (typeof documents)['\n    query getOrgSubscriptionStripeIds($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        stripeCustomerId\n      }\n    }']
export function gql(
  source: '\n  query getMemberByUserId($orgId: uuid!, $userId: uuid!) {\n    member(where: { orgId: { _eq: $orgId }, userId: { _eq: $userId } }) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query getMemberByUserId($orgId: uuid!, $userId: uuid!) {\n    member(where: { orgId: { _eq: $orgId }, userId: { _eq: $userId } }) {\n      id\n      name\n    }\n  }\n']
export function gql(
  source: '\n  query getOrgAndCircles($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        id\n        orgId\n        circleId\n        circle {\n          role {\n            name\n          }\n        }\n        participantsScope\n        participantsMembersIds\n        template {\n          title\n        }\n        rrule\n        duration\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getOrgAndCircles($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: { archived: { _eq: false } }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        id\n        orgId\n        circleId\n        circle {\n          role {\n            name\n          }\n        }\n        participantsScope\n        participantsMembersIds\n        template {\n          title\n        }\n        rrule\n        duration\n      }\n    }\n  }\n']
export function gql(
  source: '\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n'
): (typeof documents)['\n  query GetOldIds {\n    old_id {\n      id\n      oldId\n      type\n    }\n  }\n']
export function gql(
  source: '\n  query getMeetingData($id: uuid!, $userId:uuid!) {\n    meeting_by_pk(id: $id) {\n      id\n      org {\n        ...Org\n        members(where: { userId: { _eq: $userId }}) {\n          id\n        }\n      }\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      attendees\n    }\n  }\n'
): (typeof documents)['\n  query getMeetingData($id: uuid!, $userId:uuid!) {\n    meeting_by_pk(id: $id) {\n      id\n      org {\n        ...Org\n        members(where: { userId: { _eq: $userId }}) {\n          id\n        }\n      }\n      title\n      circle {\n        role {\n          name\n        }\n      }\n      attendees\n    }\n  }\n']
export function gql(
  source: '\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }'
): (typeof documents)['\n  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {\n    update_member(\n      where: { id: { _in: $membersIds } }\n      _set: { meetingId: $meetingId }\n    ) {\n      returning {\n        id\n      }\n    }\n  }']
export function gql(
  source: '\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }'
): (typeof documents)['\n  mutation stopMembersMeeting($meetingId: uuid!) {\n    update_member(\n      where: { meetingId: { _eq: $meetingId } }\n      _set: { meetingId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }']
export function gql(
  source: '\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }'
): (typeof documents)['\n  mutation updateOrgSubscriptionStatusByStripeSubId($stripeSubscriptionId: String!, $status: subscription_payment_status_enum!) {\n    update_org_subscription(where: {stripeSubscriptionId: {_eq: $stripeSubscriptionId}}, _set: {status: $status}) {\n      returning {\n        id\n      }\n    }\n  }']
export function gql(
  source: '\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation updateActiveMembersToMembers ($ids: [uuid!]){\n    update_member_many(updates: {where: {id: {_in: $ids}}, _set: {userId: null}}) {\n      returning {\n        id\n      }\n    }\n  }\n']
export function gql(
  source: '\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getOrgMembersWithRolesFromSubscriptionId($subscriptionId: String!) {\n    org(where: {org_subscription: {stripeSubscriptionId: {_eq: $subscriptionId}}}) {\n      id\n      members {\n        id\n        userId\n        role\n      }\n    }\n  }\n']
export function gql(
  source: '\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }'
): (typeof documents)['\n  query getUserEmail($id: uuid!) {\n    user(id: $id) {\n      id\n      email\n    }\n  }']
export function gql(
  source: '\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }'
): (typeof documents)['\n  query getOrgId($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      members {\n        id\n        userId\n      }\n    }\n  }']
export function gql(
  source: '\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation createOrgSubscription($orgId: uuid!, $customerId: String!, $subscriptionId: String!, $type: subscription_plan_type_enum!) {\n    insert_org_subscription_one(object: {\n      orgId: $orgId\n      stripeCustomerId: $customerId\n      stripeSubscriptionId: $subscriptionId\n      type: $type\n    }) {\n      id\n    }\n  }']
export function gql(
  source: '\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }'
): (typeof documents)['\n  mutation updateOrgSubscriptionStripeSubId($orgId: uuid!, $stripeSubscriptionId: String!, $type: subscription_plan_type_enum!) {\n    update_org_subscription(where: {orgId: {_eq: $orgId}}, _set: {stripeSubscriptionId: $stripeSubscriptionId, type: $type}) {\n      returning {\n        id\n      }\n    }\n  }']
export function gql(
  source: '\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }'
): (typeof documents)['\n  query getOrgSubscriptionStatus($orgId: uuid!) {\n    org_subscription(where: {orgId: {_eq: $orgId}}) {\n      id\n      status\n      stripeCustomerId\n      stripeSubscriptionId\n      type\n    }\n  }']
export function gql(
  source: '\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }'
): (typeof documents)['\n    query getOrgSubscriptionStripeId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeSubscriptionId\n        status\n      }\n    }']
export function gql(
  source: '\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }'
): (typeof documents)['\n  mutation updateOrgSlug($id: uuid!, $slug: String!) {\n    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {\n      id\n    }\n  }']
export function gql(
  source: '\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }'
): (typeof documents)['\n    query getOrgSubscriptionStripeCustomerId($orgId: uuid!) {\n      org_subscription(where: {orgId: {_eq: $orgId}}) {\n        id\n        stripeCustomerId\n      }\n    }']

export function gql(source: string): unknown
export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
