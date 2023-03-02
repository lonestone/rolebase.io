import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type CircleSearchFragment = { __typename?: 'circle', id: string, orgId: string, role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string } } | null } | null };

export type DecisionSearchFragment = { __typename?: 'decision', id: string, orgId: string, title: string };

export type MeetingSearchFragment = { __typename?: 'meeting', id: string, orgId: string, title: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string } }, steps: Array<{ __typename?: 'meeting_step', notes: string }> };

export type MemberSearchFragment = { __typename?: 'member', id: string, orgId: string, name: string, picture?: string | null };

export type TaskSearchFragment = { __typename?: 'task', id: string, orgId: string, title: string };

export type ThreadSearchFragment = { __typename?: 'thread', id: string, orgId: string, title: string };

export type OrgGuardQueryVariables = Exact<{
  id: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type OrgGuardQuery = { __typename?: 'query_root', org_by_pk?: { __typename?: 'org', id: string, name: string, members: Array<{ __typename?: 'member', role?: Member_Role_Enum | null }> } | null };

export type GetCircleForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCircleForSearchQuery = { __typename?: 'query_root', circle_by_pk?: { __typename?: 'circle', id: string, orgId: string, role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string } } | null } | null } | null };

export type GetCirclesForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCirclesForSearchQuery = { __typename?: 'query_root', circle: Array<{ __typename?: 'circle', id: string, orgId: string, role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string } } | null } | null }> };

export type GetRoleCirclesForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetRoleCirclesForSearchQuery = { __typename?: 'query_root', role: Array<{ __typename?: 'role', circles: Array<{ __typename?: 'circle', id: string, orgId: string, role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string } } | null } | null }> }> };

export type GetDecisionForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetDecisionForSearchQuery = { __typename?: 'query_root', decision_by_pk?: { __typename?: 'decision', id: string, orgId: string, title: string } | null };

export type GetDecisionsForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDecisionsForSearchQuery = { __typename?: 'query_root', decision: Array<{ __typename?: 'decision', id: string, orgId: string, title: string }> };

export type GetMeetingForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetMeetingForSearchQuery = { __typename?: 'query_root', meeting_by_pk?: { __typename?: 'meeting', id: string, orgId: string, title: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string } }, steps: Array<{ __typename?: 'meeting_step', notes: string }> } | null };

export type GetMeetingsForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeetingsForSearchQuery = { __typename?: 'query_root', meeting: Array<{ __typename?: 'meeting', id: string, orgId: string, title: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string } }, steps: Array<{ __typename?: 'meeting_step', notes: string }> }> };

export type GetMemberForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetMemberForSearchQuery = { __typename?: 'query_root', member_by_pk?: { __typename?: 'member', id: string, orgId: string, name: string, picture?: string | null } | null };

export type GetMembersForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersForSearchQuery = { __typename?: 'query_root', member: Array<{ __typename?: 'member', id: string, orgId: string, name: string, picture?: string | null }> };

export type GetTaskForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetTaskForSearchQuery = { __typename?: 'query_root', task_by_pk?: { __typename?: 'task', id: string, orgId: string, title: string } | null };

export type GetTasksForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksForSearchQuery = { __typename?: 'query_root', task: Array<{ __typename?: 'task', id: string, orgId: string, title: string }> };

export type GetThreadForSearchQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetThreadForSearchQuery = { __typename?: 'query_root', thread_by_pk?: { __typename?: 'thread', id: string, orgId: string, title: string } | null };

export type GetThreadsForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsForSearchQuery = { __typename?: 'query_root', thread: Array<{ __typename?: 'thread', id: string, orgId: string, title: string }> };

export type GetMemberQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetMemberQuery = { __typename?: 'query_root', member_by_pk?: { __typename?: 'member', id: string, orgId: string, userId?: string | null, name: string, role?: Member_Role_Enum | null, inviteDate?: string | null } | null };

export type GetRecipientsQueryVariables = Exact<{
  memberIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type GetRecipientsQuery = { __typename?: 'query_root', member: Array<{ __typename?: 'member', id: string, name: string, user?: { __typename?: 'users', id: string, email?: string | null, locale: string } | null }> };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Member_Set_Input;
}>;


export type UpdateMemberMutation = { __typename?: 'mutation_root', update_member_by_pk?: { __typename?: 'member', id: string } | null };

export type GetOrgRoleQueryVariables = Exact<{
  orgId: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type GetOrgRoleQuery = { __typename?: 'query_root', org_by_pk?: { __typename?: 'org', id: string, name: string, members: Array<{ __typename?: 'member', role?: Member_Role_Enum | null }> } | null };

export const CircleSearchFragmentDoc = gql`
    fragment CircleSearch on circle {
  id
  orgId
  role {
    name
  }
  parent {
    role {
      name
    }
    parent {
      role {
        name
      }
    }
    parent {
      role {
        name
      }
    }
  }
}
    `;
export const DecisionSearchFragmentDoc = gql`
    fragment DecisionSearch on decision {
  id
  orgId
  title
}
    `;
export const MeetingSearchFragmentDoc = gql`
    fragment MeetingSearch on meeting {
  id
  orgId
  title
  circle {
    role {
      name
    }
  }
  steps {
    notes
  }
}
    `;
export const MemberSearchFragmentDoc = gql`
    fragment MemberSearch on member {
  id
  orgId
  name
  picture
}
    `;
export const TaskSearchFragmentDoc = gql`
    fragment TaskSearch on task {
  id
  orgId
  title
}
    `;
export const ThreadSearchFragmentDoc = gql`
    fragment ThreadSearch on thread {
  id
  orgId
  title
}
    `;
export const OrgGuardDocument = gql`
    query OrgGuard($id: uuid!, $userId: uuid!) {
  org_by_pk(id: $id) {
    id
    name
    members(where: {userId: {_eq: $userId}}) {
      role
    }
  }
}
    `;
export const GetCircleForSearchDocument = gql`
    query GetCircleForSearch($id: uuid!) {
  circle_by_pk(id: $id) {
    ...CircleSearch
  }
}
    ${CircleSearchFragmentDoc}`;
export const GetCirclesForSearchDocument = gql`
    query GetCirclesForSearch {
  circle(where: {archived: {_eq: false}}) {
    ...CircleSearch
  }
}
    ${CircleSearchFragmentDoc}`;
export const GetRoleCirclesForSearchDocument = gql`
    query GetRoleCirclesForSearch($id: uuid!) {
  role(where: {id: {_eq: $id}}) {
    circles(where: {archived: {_eq: false}}) {
      ...CircleSearch
    }
  }
}
    ${CircleSearchFragmentDoc}`;
export const GetDecisionForSearchDocument = gql`
    query GetDecisionForSearch($id: uuid!) {
  decision_by_pk(id: $id) {
    ...DecisionSearch
  }
}
    ${DecisionSearchFragmentDoc}`;
export const GetDecisionsForSearchDocument = gql`
    query GetDecisionsForSearch {
  decision(where: {archived: {_eq: false}}) {
    ...DecisionSearch
  }
}
    ${DecisionSearchFragmentDoc}`;
export const GetMeetingForSearchDocument = gql`
    query GetMeetingForSearch($id: uuid!) {
  meeting_by_pk(id: $id) {
    ...MeetingSearch
  }
}
    ${MeetingSearchFragmentDoc}`;
export const GetMeetingsForSearchDocument = gql`
    query GetMeetingsForSearch {
  meeting(where: {archived: {_eq: false}}) {
    ...MeetingSearch
  }
}
    ${MeetingSearchFragmentDoc}`;
export const GetMemberForSearchDocument = gql`
    query GetMemberForSearch($id: uuid!) {
  member_by_pk(id: $id) {
    ...MemberSearch
  }
}
    ${MemberSearchFragmentDoc}`;
export const GetMembersForSearchDocument = gql`
    query GetMembersForSearch {
  member(where: {archived: {_eq: false}}) {
    ...MemberSearch
  }
}
    ${MemberSearchFragmentDoc}`;
export const GetTaskForSearchDocument = gql`
    query GetTaskForSearch($id: uuid!) {
  task_by_pk(id: $id) {
    ...TaskSearch
  }
}
    ${TaskSearchFragmentDoc}`;
export const GetTasksForSearchDocument = gql`
    query GetTasksForSearch {
  task(where: {archived: {_eq: false}}) {
    ...TaskSearch
  }
}
    ${TaskSearchFragmentDoc}`;
export const GetThreadForSearchDocument = gql`
    query GetThreadForSearch($id: uuid!) {
  thread_by_pk(id: $id) {
    ...ThreadSearch
  }
}
    ${ThreadSearchFragmentDoc}`;
export const GetThreadsForSearchDocument = gql`
    query GetThreadsForSearch {
  thread(where: {archived: {_eq: false}}) {
    ...ThreadSearch
  }
}
    ${ThreadSearchFragmentDoc}`;
export const GetMemberDocument = gql`
    query getMember($id: uuid!) {
  member_by_pk(id: $id) {
    id
    orgId
    userId
    name
    role
    inviteDate
  }
}
    `;
export const GetRecipientsDocument = gql`
    query getRecipients($memberIds: [uuid!]!) {
  member(where: {id: {_in: $memberIds}}) {
    id
    name
    user {
      id
      email
      locale
    }
  }
}
    `;
export const UpdateMemberDocument = gql`
    mutation updateMember($id: uuid!, $values: member_set_input!) {
  update_member_by_pk(pk_columns: {id: $id}, _set: $values) {
    id
  }
}
    `;
export const GetOrgRoleDocument = gql`
    query getOrgRole($orgId: uuid!, $userId: uuid!) {
  org_by_pk(id: $orgId) {
    id
    name
    members(where: {userId: {_eq: $userId}}) {
      role
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    OrgGuard(variables: OrgGuardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OrgGuardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrgGuardQuery>(OrgGuardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OrgGuard', 'query');
    },
    GetCircleForSearch(variables: GetCircleForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCircleForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCircleForSearchQuery>(GetCircleForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCircleForSearch', 'query');
    },
    GetCirclesForSearch(variables?: GetCirclesForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCirclesForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCirclesForSearchQuery>(GetCirclesForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCirclesForSearch', 'query');
    },
    GetRoleCirclesForSearch(variables: GetRoleCirclesForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRoleCirclesForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRoleCirclesForSearchQuery>(GetRoleCirclesForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRoleCirclesForSearch', 'query');
    },
    GetDecisionForSearch(variables: GetDecisionForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDecisionForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDecisionForSearchQuery>(GetDecisionForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDecisionForSearch', 'query');
    },
    GetDecisionsForSearch(variables?: GetDecisionsForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDecisionsForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDecisionsForSearchQuery>(GetDecisionsForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDecisionsForSearch', 'query');
    },
    GetMeetingForSearch(variables: GetMeetingForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMeetingForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeetingForSearchQuery>(GetMeetingForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMeetingForSearch', 'query');
    },
    GetMeetingsForSearch(variables?: GetMeetingsForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMeetingsForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeetingsForSearchQuery>(GetMeetingsForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMeetingsForSearch', 'query');
    },
    GetMemberForSearch(variables: GetMemberForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMemberForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMemberForSearchQuery>(GetMemberForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMemberForSearch', 'query');
    },
    GetMembersForSearch(variables?: GetMembersForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMembersForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMembersForSearchQuery>(GetMembersForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMembersForSearch', 'query');
    },
    GetTaskForSearch(variables: GetTaskForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskForSearchQuery>(GetTaskForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTaskForSearch', 'query');
    },
    GetTasksForSearch(variables?: GetTasksForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksForSearchQuery>(GetTasksForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTasksForSearch', 'query');
    },
    GetThreadForSearch(variables: GetThreadForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetThreadForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetThreadForSearchQuery>(GetThreadForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetThreadForSearch', 'query');
    },
    GetThreadsForSearch(variables?: GetThreadsForSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetThreadsForSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetThreadsForSearchQuery>(GetThreadsForSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetThreadsForSearch', 'query');
    },
    getMember(variables: GetMemberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMemberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMemberQuery>(GetMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMember', 'query');
    },
    getRecipients(variables: GetRecipientsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRecipientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRecipientsQuery>(GetRecipientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRecipients', 'query');
    },
    updateMember(variables: UpdateMemberMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMemberMutation>(UpdateMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateMember', 'mutation');
    },
    getOrgRole(variables: GetOrgRoleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrgRoleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrgRoleQuery>(GetOrgRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrgRole', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;