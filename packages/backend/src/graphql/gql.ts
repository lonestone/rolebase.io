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
    "\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }": types.GetRoleAiDocument,
    "\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }": types.InsertRoleAiDocument,
    "\n  mutation updateUserApp($id: uuid!, $values: user_app_set_input!) {\n    update_user_app_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateUserAppDocument,
    "\n  mutation deleteUserApp($id: uuid!) {\n    delete_user_app_by_pk(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserAppDocument,
    "\n  query getOrgMeetingsForCalendarApp(\n    $orgId: uuid!\n    $userId: uuid!\n    $afterDate: timestamptz!\n  ) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: { userId: { _eq: $userId }, archived: { _eq: false } }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n          meeting_attendees: { member: { userId: { _eq: $userId } } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n\n": types.GetOrgMeetingsForCalendarAppDocument,
    "\n  query getMeetingForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_by_pk(id: $meetingId) {\n      ...Meeting\n      circle {\n        role {\n          name\n        }\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetMeetingForCalendarAppDocument,
    "\n  query getMeetingRecurringForCalendarApp($meetingId: uuid!, $userId: uuid!) {\n    meeting_recurring_by_pk(id: $meetingId) {\n      ...MeetingRecurring\n      meetings {\n        recurringDate\n      }\n      org {\n        id\n        name\n        slug\n        members(where: {\n          userId: { _eq: $userId }\n          archived: { _eq: false }\n        }) {\n          id\n          name\n        }\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n": types.GetMeetingRecurringForCalendarAppDocument,
    "\n  mutation createMeetingForCalendarApp($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n": types.CreateMeetingForCalendarAppDocument,
    "\n  mutation updateMeetingForCalendarApp($meetingId: uuid!, $values: meeting_set_input!) {\n    update_meeting_by_pk(pk_columns: { id: $meetingId }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateMeetingForCalendarAppDocument,
    "\n  mutation deleteMeetingForCalendarApp($meetingId: uuid!) {\n    delete_meeting_by_pk(id: $meetingId) {\n      id\n    }\n  }\n": types.DeleteMeetingForCalendarAppDocument,
    "\n  query getUserApp($id: uuid!) {\n    user_app_by_pk(id: $id) {\n      ...UserAppFull\n    }\n  }\n": types.GetUserAppDocument,
    "\n  mutation createUserApp($values: user_app_insert_input!) {\n    insert_user_app_one(object: $values) {\n      id\n    }\n  }\n": types.CreateUserAppDocument,
    "\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      rrule\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n": types.GetRecurringMeetingsDocument,
    "\n  query GetRecurringMeeting($id: uuid!) {\n    meeting_recurring_by_pk(id: $id) {\n      orgId\n      circleId\n      scope\n      template {\n        title\n        stepsConfig\n      }\n      duration\n      videoConf\n      org {\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n      }\n    }\n  }\n": types.GetRecurringMeetingDocument,
    "\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n": types.CreateMeetingDocument,
    "\n  mutation endOldMeetings($before: timestamptz!) {\n    update_meeting(\n      where: {\n        endDate: { _lt: $before }\n        ended: { _eq: false }\n        currentStepId: { _is_null: false }\n      }\n      _set: { ended: true, currentStepId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n": types.EndOldMeetingsDocument,
    "\n  query getUsersForDigest {\n    users(where: { disabled: { _eq: false }}) {\n      id\n      createdAt\n      displayName\n      email\n      locale\n      metadata\n    }\n  }\n": types.GetUsersForDigestDocument,
    "\n  mutation updateUserMetadata($userId: uuid!, $metadata: jsonb!) {\n    updateUser(pk_columns: { id: $userId }, _set: { metadata: $metadata }) {\n      id\n    }\n  }\n": types.UpdateUserMetadataDocument,
    "\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _and: [\n              {\n                _or: [\n                  # New threads\n                  { createdAt: { _gt: $date } }\n                  # New activities in threads\n                  { activities: { createdAt: { _gt: $date } } }\n                ]\n              }\n              {\n                _or: [\n                  {\n                    circle: { participants: { member: { id: { _eq: $userId } } } }\n                  }\n                  { extra_members: { member: { id: { _eq: $userId } } } }\n                ]\n              }\n              { archived: { _eq: false } }\n            ]\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            _or: [\n              { private: { _eq: false } }\n              { circle: { participants: { member: { id: { _eq: $userId } } } } }\n              { meeting_attendees: { member: { id: { _eq: $userId } } } }\n            ]\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetUserDigestDataDocument,
    "\n  query getOrgMeetingsForIcal($orgId: uuid!, $memberId: uuid) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: {\n          archived: { _eq: false }\n          meeting_attendees: { memberId: { _eq: $memberId } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n": types.GetOrgMeetingsForIcalDocument,
    "\n        query getAllParticipantsForRecompute {\n          circle_participant(where: {\n            circle: {\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n    ": types.GetAllParticipantsForRecomputeDocument,
    "\n        query getOrgParticipantsForRecompute($orgId: uuid!) {\n          circle_participant(where: {\n            circle: {\n              orgId: { _eq: $orgId },\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n      ": types.GetOrgParticipantsForRecomputeDocument,
    "\n        query getOrgIdForRecompute($circleId: uuid!) {\n          circle_by_pk(id: $circleId) {\n            orgId\n          }\n        }\n      ": types.GetOrgIdForRecomputeDocument,
    "\n        mutation replaceParticipantsForRecompute(\n          $participants: [circle_participant_cache_insert_input!]!\n          $deleteWhere: circle_participant_cache_bool_exp!\n        ) {\n          delete_circle_participant_cache(where: $deleteWhere) {\n            returning {\n              id\n            }\n          }\n          insert_circle_participant_cache(objects: $participants) {\n            returning {\n              id\n            }\n          }\n        }\n    ": types.ReplaceParticipantsForRecomputeDocument,
    "\n  fragment CircleSearch on circle {\n    id\n    orgId\n    role {\n      name\n    }\n    parent {\n      role {\n        name\n      }\n      parent {\n        role {\n          name\n        }\n        parent {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CircleSearchFragmentDoc,
    "\n        query GetCircleForSearch($id: uuid!) {\n          circle_by_pk(id: $id) {\n            ...CircleSearch\n          }\n        }\n      ": types.GetCircleForSearchDocument,
    "\n        query GetCirclesForSearch {\n          circle(where: { archived: { _eq: false } }) {\n            ...CircleSearch\n          }\n        }\n      ": types.GetCirclesForSearchDocument,
    "\n  fragment DecisionSearch on decision {\n    id\n    orgId\n    title\n    createdAt\n  }\n": types.DecisionSearchFragmentDoc,
    "\n        query GetDecisionForSearch($id: uuid!) {\n          decision_by_pk(id: $id) {\n            ...DecisionSearch\n          }\n        }\n      ": types.GetDecisionForSearchDocument,
    "\n        query GetDecisionsForSearch {\n          decision(where: { archived: { _eq: false } }) {\n            ...DecisionSearch\n          }\n        }\n      ": types.GetDecisionsForSearchDocument,
    "\n  fragment MeetingSearch on meeting {\n    id\n    orgId\n    title\n    circle {\n      role {\n        name\n      }\n    }\n    steps {\n      notes\n    }\n    createdAt\n    startDate\n  }\n": types.MeetingSearchFragmentDoc,
    "\n        query GetMeetingForSearch($id: uuid!) {\n          meeting_by_pk(id: $id) {\n            ...MeetingSearch\n          }\n        }\n      ": types.GetMeetingForSearchDocument,
    "\n        query GetMeetingsForSearch {\n          meeting(where: { archived: { _eq: false } }) {\n            ...MeetingSearch\n          }\n        }\n      ": types.GetMeetingsForSearchDocument,
    "\n        query GetMeetingDataForSearch($meetingId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n            meeting_attendees {\n              id\n              present\n              startNotified\n              member {\n                id\n                name\n                archived\n                user {\n                  email\n                  locale\n                  metadata\n                  apps {\n                    ...UserAppFull\n                  }\n                }\n              }\n            }\n          }\n        }\n      ": types.GetMeetingDataForSearchDocument,
    "\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    ": types.ResetLastUpdateSourceDocument,
    "\n  mutation updateAttendeesStartNotified($ids: [uuid!]!) {\n    update_meeting_attendee(\n      where: { id: { _in: $ids } }\n      _set: { startNotified: true }\n    ) {\n      returning {\n        id\n      }\n    }\n  }": types.UpdateAttendeesStartNotifiedDocument,
    "\n        query GetMeetingAttendeeForSearch($meetingId: uuid!, $memberId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            ...Meeting\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          member_by_pk(id: $memberId) {\n            id\n            name\n            archived\n            user {\n              email\n              locale\n              metadata\n              apps {\n                ...UserAppFull\n              }\n            }\n          }\n        }\n    ": types.GetMeetingAttendeeForSearchDocument,
    "\n  mutation updateAttendeeStartNotified($id: uuid!) {\n    update_meeting_attendee_by_pk(\n      pk_columns: { id: $id }\n      _set: { startNotified: true }\n    ) {\n      id\n    }\n  }": types.UpdateAttendeeStartNotifiedDocument,
    "\n        query GetMeetingRecurringDataForSearch($meetingId: uuid!, $orgId: uuid!) {\n          meeting_recurring_by_pk(id: $meetingId) {\n            ...MeetingRecurring\n            meetings {\n              id\n              recurringDate\n            }\n          }\n          org_by_pk(id: $orgId) {\n            id\n            slug\n            circles(where: { archived: { _eq: false } }) {\n              ...CircleFull\n            }\n            members(where: { archived: { _eq: false } }) {\n              ...Member\n              user {\n                apps {\n                  ...UserAppFull\n                }\n              }\n            }\n          }\n        }\n      ": types.GetMeetingRecurringDataForSearchDocument,
    "\n  fragment MemberSearch on member {\n    id\n    orgId\n    name\n    description\n    picture\n  }\n": types.MemberSearchFragmentDoc,
    "\n        query GetMemberForSearch($id: uuid!) {\n          member_by_pk(id: $id) {\n            ...MemberSearch\n          }\n        }\n      ": types.GetMemberForSearchDocument,
    "\n        query GetMembersForSearch {\n          member(where: { archived: { _eq: false } }) {\n            ...MemberSearch\n          }\n        }\n      ": types.GetMembersForSearchDocument,
    "\n          query GetRoleCirclesForSearch($id: uuid!) {\n            circle(where: {\n              roleId: { _eq: $id },\n              archived: { _eq: false }\n            }) {\n              ...CircleSearch\n            }\n          }\n        ": types.GetRoleCirclesForSearchDocument,
    "\n  fragment TaskSearch on task {\n    id\n    orgId\n    title\n    createdAt\n  }\n": types.TaskSearchFragmentDoc,
    "\n        query GetTaskForSearch($id: uuid!) {\n          task_by_pk(id: $id) {\n            ...TaskSearch\n          }\n        }\n      ": types.GetTaskForSearchDocument,
    "\n        query GetTasksForSearch {\n          task(where: { archived: { _eq: false } }) {\n            ...TaskSearch\n          }\n        }\n      ": types.GetTasksForSearchDocument,
    "\n  fragment ThreadSearch on thread {\n    id\n    orgId\n    title\n    createdAt\n    activities {\n      type\n      data\n    }\n  }\n": types.ThreadSearchFragmentDoc,
    "\n        query GetThreadForSearch($id: uuid!) {\n          thread_by_pk(id: $id) {\n            ...ThreadSearch\n          }\n        }\n      ": types.GetThreadForSearchDocument,
    "\n        query GetThreadsForSearch {\n          thread(where: { archived: { _eq: false } }) {\n            ...ThreadSearch\n          }\n        }\n      ": types.GetThreadsForSearchDocument,
    "\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}": types.GetOrgMembersDocument,
    "\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }": types.GetUserRoleInOrgDocument,
    "\n  query getMember($id: uuid!) {\n    member_by_pk(id: $id) {\n      id\n      orgId\n      userId\n      name\n      role\n      inviteDate\n    }\n  }\n": types.GetMemberDocument,
    "\n  query getOrgSubscriptionAndActiveMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n      org_subscription {\n        id\n        stripeSubscriptionId\n        status\n        type\n      }\n      members_aggregate(where: {\n        archived: { _eq: false },\n        userId: { _is_null: false }\n      }) {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n": types.GetOrgSubscriptionAndActiveMembersDocument,
    "\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n": types.UpdateMemberDocument,
    "fragment Circle on circle {\n  id\n  orgId\n  roleId\n  parentId\n  archived\n}\n\nfragment CircleSummary on circle {\n  ...Circle\n  role {\n    ...RoleSummary\n  }\n}\n\nfragment CircleFull on circle {\n  ...CircleSummary\n  members(where: {archived: {_eq: false}, member: {archived: {_eq: false}}}) {\n    id\n    avgMinPerWeek\n    member {\n      ...MemberSummary\n    }\n  }\n  invitedCircleLinks {\n    invitedCircle {\n      id\n    }\n  }\n}": types.CircleFragmentDoc,
    "fragment CircleLink on circle_link {\n  id\n  parentId\n  circleId\n  createdAt\n}": types.CircleLinkFragmentDoc,
    "fragment CircleMember on circle_member {\n  id\n  circleId\n  memberId\n  avgMinPerWeek\n  createdAt\n  archived\n}": types.CircleMemberFragmentDoc,
    "fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  private\n}": types.DecisionFragmentDoc,
    "fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}": types.LogFragmentDoc,
    "fragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n  summary\n  private\n  meeting_attendees {\n    ...MeetingAttendee\n  }\n}\n\nfragment Meeting on meeting {\n  ...MeetingSummary\n  createdAt\n  stepsConfig\n  archived\n  videoConf\n  recurringId\n  recurringDate\n  invitedReadonly\n}": types.MeetingSummaryFragmentDoc,
    "fragment MeetingAttendee on meeting_attendee {\n  id\n  meetingId\n  memberId\n  present\n  startNotified\n}": types.MeetingAttendeeFragmentDoc,
    "fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  scope\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}": types.MeetingRecurringFragmentDoc,
    "fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}": types.MeetingStepFragmentDoc,
    "fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}": types.MemberFragmentDoc,
    "fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...MeetingSummary\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}": types.NewsFragmentDoc,
    "fragment Org on org {\n  id\n  name\n  archived\n  createdAt\n  defaultWorkedMinPerWeek\n  slug\n  shareOrg\n  shareMembers\n  protectGovernance\n}\n\nfragment OrgFull on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...CircleFull\n  }\n  roles(where: {archived: {_eq: false}, base: {_eq: true}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}\n\nfragment OrgFullLight on org {\n  ...Org\n  circles(where: {archived: {_eq: false}}) {\n    ...Circle\n    members(where: {archived: {_eq: false}}) {\n      id\n      memberId\n      avgMinPerWeek\n    }\n    invitedCircleLinks {\n      invitedCircle {\n        id\n      }\n    }\n  }\n  roles(where: {archived: {_eq: false}}) {\n    ...RoleSummary\n  }\n  members(where: {archived: {_eq: false}}) {\n    ...Member\n  }\n}": types.OrgFragmentDoc,
    "fragment Role on role {\n  id\n  orgId\n  archived\n  base\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}\n\nfragment RoleSummary on role {\n  id\n  base\n  name\n  singleMember\n  parentLink\n  defaultMinPerWeek\n  colorHue\n}": types.RoleFragmentDoc,
    "fragment RoleAI on role_ai {\n  id\n  name\n  purpose\n  domain\n  accountabilities\n  checklist\n  indicators\n  notes\n}": types.RoleAiFragmentDoc,
    "fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n  private\n}": types.TaskFragmentDoc,
    "fragment Thread on thread {\n  id\n  orgId\n  circleId\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n  private\n  extra_members {\n    ...ThreadExtraMember\n  }\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}": types.ThreadFragmentDoc,
    "fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}": types.ThreadActivityFragmentDoc,
    "fragment ThreadExtraMember on thread_extra_member {\n  id\n  threadId\n  memberId\n}": types.ThreadExtraMemberFragmentDoc,
    "fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  tmpData\n  createdAt\n  user {\n    metadata\n  }\n}": types.UserAppFragmentDoc,
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
export function gql(source: "\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }"): (typeof documents)["\n  query getRoleAI($name: String!, $lang: String!) {\n    role_ai(where: { name: { _eq: $name }, lang: { _eq: $lang } }, limit: 1) {\n      ...RoleAI\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }"): (typeof documents)["\n  mutation insertRoleAI($role: role_ai_insert_input!) {\n    insert_role_ai_one(object: $role) {\n      ...RoleAI\n    }\n  }"];
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
export function gql(source: "\n  query getOrgMeetingsForCalendarApp(\n    $orgId: uuid!\n    $userId: uuid!\n    $afterDate: timestamptz!\n  ) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: { userId: { _eq: $userId }, archived: { _eq: false } }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n          meeting_attendees: { member: { userId: { _eq: $userId } } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n\n"): (typeof documents)["\n  query getOrgMeetingsForCalendarApp(\n    $orgId: uuid!\n    $userId: uuid!\n    $afterDate: timestamptz!\n  ) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      members(where: { userId: { _eq: $userId }, archived: { _eq: false } }) {\n        id\n        name\n      }\n      meetings(\n        where: {\n          startDate: { _gt: $afterDate }\n          archived: { _eq: false }\n          meeting_attendees: { member: { userId: { _eq: $userId } } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n\n"];
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
export function gql(source: "\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      rrule\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecurringMeetings {\n    meeting_recurring {\n      id\n      rrule\n      meetings(where: { recurringDate: { _gt: \"now()\" } }) {\n        recurringDate\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRecurringMeeting($id: uuid!) {\n    meeting_recurring_by_pk(id: $id) {\n      orgId\n      circleId\n      scope\n      template {\n        title\n        stepsConfig\n      }\n      duration\n      videoConf\n      org {\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecurringMeeting($id: uuid!) {\n    meeting_recurring_by_pk(id: $id) {\n      orgId\n      circleId\n      scope\n      template {\n        title\n        stepsConfig\n      }\n      duration\n      videoConf\n      org {\n        circles(where: { archived: { _eq: false } }) {\n          ...CircleFull\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMeeting($meeting: meeting_insert_input!) {\n    insert_meeting_one(object: $meeting) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation endOldMeetings($before: timestamptz!) {\n    update_meeting(\n      where: {\n        endDate: { _lt: $before }\n        ended: { _eq: false }\n        currentStepId: { _is_null: false }\n      }\n      _set: { ended: true, currentStepId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation endOldMeetings($before: timestamptz!) {\n    update_meeting(\n      where: {\n        endDate: { _lt: $before }\n        ended: { _eq: false }\n        currentStepId: { _is_null: false }\n      }\n      _set: { ended: true, currentStepId: null }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _and: [\n              {\n                _or: [\n                  # New threads\n                  { createdAt: { _gt: $date } }\n                  # New activities in threads\n                  { activities: { createdAt: { _gt: $date } } }\n                ]\n              }\n              {\n                _or: [\n                  {\n                    circle: { participants: { member: { id: { _eq: $userId } } } }\n                  }\n                  { extra_members: { member: { id: { _eq: $userId } } } }\n                ]\n              }\n              { archived: { _eq: false } }\n            ]\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            _or: [\n              { private: { _eq: false } }\n              { circle: { participants: { member: { id: { _eq: $userId } } } } }\n              { meeting_attendees: { member: { id: { _eq: $userId } } } }\n            ]\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserDigestData($userId: uuid!, $date: timestamptz!) {\n    user(id: $userId) {\n      metadata\n    }\n    member(\n      where: {\n        userId: { _eq: $userId }\n        archived: { _eq: false }\n        org: { archived: { _eq: false } }\n      }\n    ) {\n      id\n      org {\n        ...Org\n\n        # Threads to include in the digest\n        threads(\n          where: {\n            _and: [\n              {\n                _or: [\n                  # New threads\n                  { createdAt: { _gt: $date } }\n                  # New activities in threads\n                  { activities: { createdAt: { _gt: $date } } }\n                ]\n              }\n              {\n                _or: [\n                  {\n                    circle: { participants: { member: { id: { _eq: $userId } } } }\n                  }\n                  { extra_members: { member: { id: { _eq: $userId } } } }\n                ]\n              }\n              { archived: { _eq: false } }\n            ]\n          }\n        ) {\n          ...Thread\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n          activities(where: { createdAt: { _gt: $date } }) {\n            ...ThreadActivity\n          }\n        }\n\n        # Meetings to include in the digest\n        meetings(\n          where: {\n            endDate: { _gt: $date }\n            ended: { _eq: true }\n            _or: [\n              { private: { _eq: false } }\n              { circle: { participants: { member: { id: { _eq: $userId } } } } }\n              { meeting_attendees: { member: { id: { _eq: $userId } } } }\n            ]\n            archived: { _eq: false }\n          }\n          order_by: { endDate: desc }\n        ) {\n          ...MeetingSummary\n          circle {\n            id\n            role {\n              name\n              colorHue\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrgMeetingsForIcal($orgId: uuid!, $memberId: uuid) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: {\n          archived: { _eq: false }\n          meeting_attendees: { memberId: { _eq: $memberId } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrgMeetingsForIcal($orgId: uuid!, $memberId: uuid) {\n    org_by_pk(id: $orgId) {\n      id\n      name\n      slug\n      circles(where: { archived: { _eq: false } }) {\n        ...CircleFull\n      }\n      meetings(\n        where: {\n          archived: { _eq: false }\n          meeting_attendees: { memberId: { _eq: $memberId } }\n        }\n        order_by: { startDate: asc }\n      ) {\n        ...Meeting\n        circle {\n          role {\n            name\n          }\n        }\n      }\n      meetings_recurring {\n        ...MeetingRecurring\n        meetings {\n          recurringDate\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query getAllParticipantsForRecompute {\n          circle_participant(where: {\n            circle: {\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n    "): (typeof documents)["\n        query getAllParticipantsForRecompute {\n          circle_participant(where: {\n            circle: {\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query getOrgParticipantsForRecompute($orgId: uuid!) {\n          circle_participant(where: {\n            circle: {\n              orgId: { _eq: $orgId },\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n      "): (typeof documents)["\n        query getOrgParticipantsForRecompute($orgId: uuid!) {\n          circle_participant(where: {\n            circle: {\n              orgId: { _eq: $orgId },\n              archived: { _eq: false }\n            }\n          }) {\n            circleId\n            memberId\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query getOrgIdForRecompute($circleId: uuid!) {\n          circle_by_pk(id: $circleId) {\n            orgId\n          }\n        }\n      "): (typeof documents)["\n        query getOrgIdForRecompute($circleId: uuid!) {\n          circle_by_pk(id: $circleId) {\n            orgId\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation replaceParticipantsForRecompute(\n          $participants: [circle_participant_cache_insert_input!]!\n          $deleteWhere: circle_participant_cache_bool_exp!\n        ) {\n          delete_circle_participant_cache(where: $deleteWhere) {\n            returning {\n              id\n            }\n          }\n          insert_circle_participant_cache(objects: $participants) {\n            returning {\n              id\n            }\n          }\n        }\n    "): (typeof documents)["\n        mutation replaceParticipantsForRecompute(\n          $participants: [circle_participant_cache_insert_input!]!\n          $deleteWhere: circle_participant_cache_bool_exp!\n        ) {\n          delete_circle_participant_cache(where: $deleteWhere) {\n            returning {\n              id\n            }\n          }\n          insert_circle_participant_cache(objects: $participants) {\n            returning {\n              id\n            }\n          }\n        }\n    "];
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
export function gql(source: "\n        query GetMeetingDataForSearch($meetingId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n            meeting_attendees {\n              id\n              present\n              startNotified\n              member {\n                id\n                name\n                archived\n                user {\n                  email\n                  locale\n                  metadata\n                  apps {\n                    ...UserAppFull\n                  }\n                }\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetMeetingDataForSearch($meetingId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n            meeting_attendees {\n              id\n              present\n              startNotified\n              member {\n                id\n                name\n                archived\n                user {\n                  email\n                  locale\n                  metadata\n                  apps {\n                    ...UserAppFull\n                  }\n                }\n              }\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ResetLastUpdateSource($id: uuid!) {\n        update_meeting_by_pk(\n          pk_columns: { id: $id }\n          _set: { lastUpdateSource: null }\n        ) {\n          id\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateAttendeesStartNotified($ids: [uuid!]!) {\n    update_meeting_attendee(\n      where: { id: { _in: $ids } }\n      _set: { startNotified: true }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"): (typeof documents)["\n  mutation updateAttendeesStartNotified($ids: [uuid!]!) {\n    update_meeting_attendee(\n      where: { id: { _in: $ids } }\n      _set: { startNotified: true }\n    ) {\n      returning {\n        id\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetMeetingAttendeeForSearch($meetingId: uuid!, $memberId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            ...Meeting\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          member_by_pk(id: $memberId) {\n            id\n            name\n            archived\n            user {\n              email\n              locale\n              metadata\n              apps {\n                ...UserAppFull\n              }\n            }\n          }\n        }\n    "): (typeof documents)["\n        query GetMeetingAttendeeForSearch($meetingId: uuid!, $memberId: uuid!) {\n          meeting_by_pk(id: $meetingId) {\n            ...Meeting\n            org {\n              id\n              slug\n            }\n            circle {\n              role {\n                name\n              }\n            }\n          }\n          member_by_pk(id: $memberId) {\n            id\n            name\n            archived\n            user {\n              email\n              locale\n              metadata\n              apps {\n                ...UserAppFull\n              }\n            }\n          }\n        }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateAttendeeStartNotified($id: uuid!) {\n    update_meeting_attendee_by_pk(\n      pk_columns: { id: $id }\n      _set: { startNotified: true }\n    ) {\n      id\n    }\n  }"): (typeof documents)["\n  mutation updateAttendeeStartNotified($id: uuid!) {\n    update_meeting_attendee_by_pk(\n      pk_columns: { id: $id }\n      _set: { startNotified: true }\n    ) {\n      id\n    }\n  }"];
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
export function gql(source: "\n          query GetRoleCirclesForSearch($id: uuid!) {\n            circle(where: {\n              roleId: { _eq: $id },\n              archived: { _eq: false }\n            }) {\n              ...CircleSearch\n            }\n          }\n        "): (typeof documents)["\n          query GetRoleCirclesForSearch($id: uuid!) {\n            circle(where: {\n              roleId: { _eq: $id },\n              archived: { _eq: false }\n            }) {\n              ...CircleSearch\n            }\n          }\n        "];
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
export function gql(source: "\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}"): (typeof documents)["\n  query getOrgMembers($orgId: uuid!) {\n    org_by_pk(id: $orgId) {\n    id\n    members(where: {role: {_eq: Owner}}) {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }"): (typeof documents)["\n  query getUserRoleInOrg($orgId: uuid!, $userId: uuid!) {\n    org_by_pk(id: $orgId) {\n      members(where: {userId: {_eq: $userId}}) {\n        role\n      }\n    }\n  }"];
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
export function gql(source: "\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMember($id: uuid!, $values: member_set_input!) {\n    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {\n      id\n    }\n  }\n"];
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
export function gql(source: "fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  private\n}"): (typeof documents)["fragment Decision on decision {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  private\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}"): (typeof documents)["fragment Log on log {\n  id\n  orgId\n  userId\n  memberId\n  memberName\n  meetingId\n  createdAt\n  display\n  changes\n  cancelLogId\n  cancelMemberId\n  cancelMemberName\n  canceled\n  threadId\n  taskId\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n  summary\n  private\n  meeting_attendees {\n    ...MeetingAttendee\n  }\n}\n\nfragment Meeting on meeting {\n  ...MeetingSummary\n  createdAt\n  stepsConfig\n  archived\n  videoConf\n  recurringId\n  recurringDate\n  invitedReadonly\n}"): (typeof documents)["fragment MeetingSummary on meeting {\n  id\n  orgId\n  circleId\n  startDate\n  endDate\n  ended\n  title\n  currentStepId\n  summary\n  private\n  meeting_attendees {\n    ...MeetingAttendee\n  }\n}\n\nfragment Meeting on meeting {\n  ...MeetingSummary\n  createdAt\n  stepsConfig\n  archived\n  videoConf\n  recurringId\n  recurringDate\n  invitedReadonly\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingAttendee on meeting_attendee {\n  id\n  meetingId\n  memberId\n  present\n  startNotified\n}"): (typeof documents)["fragment MeetingAttendee on meeting_attendee {\n  id\n  meetingId\n  memberId\n  present\n  startNotified\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  scope\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}"): (typeof documents)["fragment MeetingRecurring on meeting_recurring {\n  id\n  orgId\n  circleId\n  circle {\n    role {\n      name\n      colorHue\n    }\n  }\n  scope\n  templateId\n  template {\n    title\n    stepsConfig\n  }\n  rrule\n  duration\n  videoConf\n  createdAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}"): (typeof documents)["fragment MeetingStep on meeting_step {\n  id\n  meetingId\n  stepConfigId\n  notes\n  type\n  data\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}"): (typeof documents)["fragment Member on member {\n  id\n  orgId\n  archived\n  name\n  description\n  pictureFileId\n  picture\n  userId\n  inviteEmail\n  inviteDate\n  workedMinPerWeek\n  role\n}\n\nfragment MemberSummary on member {\n  id\n  userId\n  name\n  picture\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...MeetingSummary\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}"): (typeof documents)["fragment News on news {\n  id\n  createdAt\n  decision {\n    ...Decision\n  }\n  meeting {\n    ...MeetingSummary\n  }\n  thread {\n    ...ThreadWithFirstActivity\n  }\n}"];
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
export function gql(source: "fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n  private\n}"): (typeof documents)["fragment Task on task {\n  id\n  orgId\n  circleId\n  memberId\n  title\n  description\n  archived\n  createdAt\n  dueDate\n  status\n  private\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Thread on thread {\n  id\n  orgId\n  circleId\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n  private\n  extra_members {\n    ...ThreadExtraMember\n  }\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}"): (typeof documents)["fragment Thread on thread {\n  id\n  orgId\n  circleId\n  initiatorMemberId\n  title\n  createdAt\n  archived\n  status\n  private\n  extra_members {\n    ...ThreadExtraMember\n  }\n}\n\nfragment ThreadMemberStatus on thread_member_status {\n  lastReadActivityId\n  lastReadDate\n}\n\nfragment ThreadWithFirstActivity on thread {\n  ...Thread\n  activities(where: {type: {_eq: Message}}, order_by: {createdAt: asc}, limit: 1) {\n    ...ThreadActivity\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}"): (typeof documents)["fragment ThreadActivity on thread_activity {\n  id\n  threadId\n  userId\n  createdAt\n  type\n  data\n  refThread {\n    ...Thread\n  }\n  refMeeting {\n    ...MeetingSummary\n  }\n  refTask {\n    ...Task\n  }\n  refDecision {\n    ...Decision\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ThreadExtraMember on thread_extra_member {\n  id\n  threadId\n  memberId\n}"): (typeof documents)["fragment ThreadExtraMember on thread_extra_member {\n  id\n  threadId\n  memberId\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  tmpData\n  createdAt\n  user {\n    metadata\n  }\n}"): (typeof documents)["fragment UserApp on user_app {\n  id\n  userId\n  type\n  config\n}\n\nfragment UserAppFull on user_app {\n  id\n  userId\n  type\n  secretConfig\n  config\n  tmpData\n  createdAt\n  user {\n    metadata\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;