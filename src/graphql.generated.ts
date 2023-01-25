import { MeetingAttendee, MeetingStepConfig, VideoConf } from '@shared/model/meeting'
import { MeetingStepData } from '@shared/model/meeting_step'
import { ThreadActivityData } from '@shared/model/thread_activity'

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  attendee: MeetingAttendee;
  bigint: number;
  bytea: any;
  citext: string;
  json: any;
  jsonb: any;
  meeting_step_config: MeetingStepConfig;
  meeting_step_data: MeetingStepData;
  smallint: number;
  strings: any;
  thread_activity_data: ThreadActivityData;
  timestamptz: string;
  uuid: string;
  videoconf: VideoConf;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequests = {
  __typename?: 'authProviderRequests';
  id: Scalars['uuid'];
  options?: Maybe<Scalars['jsonb']>;
};


/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequestsOptionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate = {
  __typename?: 'authProviderRequests_aggregate';
  aggregate?: Maybe<AuthProviderRequests_Aggregate_Fields>;
  nodes: Array<AuthProviderRequests>;
};

/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_Fields = {
  __typename?: 'authProviderRequests_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthProviderRequests_Max_Fields>;
  min?: Maybe<AuthProviderRequests_Min_Fields>;
};


/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequests_Append_Input = {
  options?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "auth.provider_requests". All fields are combined with a logical 'AND'. */
export type AuthProviderRequests_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  _not?: InputMaybe<AuthProviderRequests_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  options?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.provider_requests" */
export enum AuthProviderRequests_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProviderRequestsPkey = 'provider_requests_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AuthProviderRequests_Delete_At_Path_Input = {
  options?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthProviderRequests_Delete_Elem_Input = {
  options?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthProviderRequests_Delete_Key_Input = {
  options?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.provider_requests" */
export type AuthProviderRequests_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  options?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type AuthProviderRequests_Max_Fields = {
  __typename?: 'authProviderRequests_max_fields';
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthProviderRequests_Min_Fields = {
  __typename?: 'authProviderRequests_min_fields';
  id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.provider_requests" */
export type AuthProviderRequests_Mutation_Response = {
  __typename?: 'authProviderRequests_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviderRequests>;
};

/** on_conflict condition type for table "auth.provider_requests" */
export type AuthProviderRequests_On_Conflict = {
  constraint: AuthProviderRequests_Constraint;
  update_columns?: Array<AuthProviderRequests_Update_Column>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.provider_requests". */
export type AuthProviderRequests_Order_By = {
  id?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.provider_requests */
export type AuthProviderRequests_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequests_Prepend_Input = {
  options?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

/** input type for updating data in table "auth.provider_requests" */
export type AuthProviderRequests_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  options?: InputMaybe<Scalars['jsonb']>;
};

/** Streaming cursor of the table "authProviderRequests" */
export type AuthProviderRequests_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthProviderRequests_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviderRequests_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  options?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

export type AuthProviderRequests_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  where: AuthProviderRequests_Bool_Exp;
};

/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviders = {
  __typename?: 'authProviders';
  id: Scalars['String'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** aggregated selection of "auth.providers" */
export type AuthProviders_Aggregate = {
  __typename?: 'authProviders_aggregate';
  aggregate?: Maybe<AuthProviders_Aggregate_Fields>;
  nodes: Array<AuthProviders>;
};

/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_Fields = {
  __typename?: 'authProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthProviders_Max_Fields>;
  min?: Maybe<AuthProviders_Min_Fields>;
};


/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type AuthProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.providers" */
export enum AuthProviders_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type AuthProviders_Insert_Input = {
  id?: InputMaybe<Scalars['String']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthProviders_Max_Fields = {
  __typename?: 'authProviders_max_fields';
  id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthProviders_Min_Fields = {
  __typename?: 'authProviders_min_fields';
  id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.providers" */
export type AuthProviders_Mutation_Response = {
  __typename?: 'authProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviders>;
};

/** input type for inserting object relation for remote table "auth.providers" */
export type AuthProviders_Obj_Rel_Insert_Input = {
  data: AuthProviders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};

/** on_conflict condition type for table "auth.providers" */
export type AuthProviders_On_Conflict = {
  constraint: AuthProviders_Constraint;
  update_columns?: Array<AuthProviders_Update_Column>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.providers". */
export type AuthProviders_Order_By = {
  id?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.providers */
export type AuthProviders_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "auth.providers" */
export enum AuthProviders_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "auth.providers" */
export type AuthProviders_Set_Input = {
  id?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "authProviders" */
export type AuthProviders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthProviders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviders_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.providers" */
export enum AuthProviders_Update_Column {
  /** column name */
  Id = 'id'
}

export type AuthProviders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthProviders_Set_Input>;
  where: AuthProviders_Bool_Exp;
};

/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokens = {
  __typename?: 'authRefreshTokens';
  createdAt: Scalars['timestamptz'];
  expiresAt: Scalars['timestamptz'];
  refreshToken: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate = {
  __typename?: 'authRefreshTokens_aggregate';
  aggregate?: Maybe<AuthRefreshTokens_Aggregate_Fields>;
  nodes: Array<AuthRefreshTokens>;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp_Count>;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Fields = {
  __typename?: 'authRefreshTokens_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthRefreshTokens_Max_Fields>;
  min?: Maybe<AuthRefreshTokens_Min_Fields>;
};


/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthRefreshTokens_Max_Order_By>;
  min?: InputMaybe<AuthRefreshTokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokens_Arr_Rel_Insert_Input = {
  data: Array<AuthRefreshTokens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokens_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  _not?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  expiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  refreshToken?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Constraint {
  /** unique or primary key constraint on columns "refresh_token" */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokens_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  refreshToken?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthRefreshTokens_Max_Fields = {
  __typename?: 'authRefreshTokens_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  refreshToken?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthRefreshTokens_Min_Fields = {
  __typename?: 'authRefreshTokens_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  refreshToken?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.refresh_tokens" */
export type AuthRefreshTokens_Mutation_Response = {
  __typename?: 'authRefreshTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokens>;
};

/** on_conflict condition type for table "auth.refresh_tokens" */
export type AuthRefreshTokens_On_Conflict = {
  constraint: AuthRefreshTokens_Constraint;
  update_columns?: Array<AuthRefreshTokens_Update_Column>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type AuthRefreshTokens_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_tokens */
export type AuthRefreshTokens_Pk_Columns_Input = {
  refreshToken: Scalars['uuid'];
};

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type AuthRefreshTokens_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  refreshToken?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "authRefreshTokens" */
export type AuthRefreshTokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRefreshTokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRefreshTokens_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  refreshToken?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UserId = 'userId'
}

export type AuthRefreshTokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  where: AuthRefreshTokens_Bool_Exp;
};

/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRoles = {
  __typename?: 'authRoles';
  role: Scalars['String'];
  /** An array relationship */
  userRoles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  userRoles_aggregate: AuthUserRoles_Aggregate;
  /** An array relationship */
  usersByDefaultRole: Array<Users>;
  /** An aggregate relationship */
  usersByDefaultRole_aggregate: Users_Aggregate;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRoleArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "auth.roles" */
export type AuthRoles_Aggregate = {
  __typename?: 'authRoles_aggregate';
  aggregate?: Maybe<AuthRoles_Aggregate_Fields>;
  nodes: Array<AuthRoles>;
};

/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_Fields = {
  __typename?: 'authRoles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthRoles_Max_Fields>;
  min?: Maybe<AuthRoles_Min_Fields>;
};


/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type AuthRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  role?: InputMaybe<String_Comparison_Exp>;
  userRoles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  userRoles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  usersByDefaultRole?: InputMaybe<Users_Bool_Exp>;
  usersByDefaultRole_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.roles" */
export enum AuthRoles_Constraint {
  /** unique or primary key constraint on columns "role" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type AuthRoles_Insert_Input = {
  role?: InputMaybe<Scalars['String']>;
  userRoles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  usersByDefaultRole?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthRoles_Max_Fields = {
  __typename?: 'authRoles_max_fields';
  role?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthRoles_Min_Fields = {
  __typename?: 'authRoles_min_fields';
  role?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.roles" */
export type AuthRoles_Mutation_Response = {
  __typename?: 'authRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRoles>;
};

/** input type for inserting object relation for remote table "auth.roles" */
export type AuthRoles_Obj_Rel_Insert_Input = {
  data: AuthRoles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};

/** on_conflict condition type for table "auth.roles" */
export type AuthRoles_On_Conflict = {
  constraint: AuthRoles_Constraint;
  update_columns?: Array<AuthRoles_Update_Column>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.roles". */
export type AuthRoles_Order_By = {
  role?: InputMaybe<Order_By>;
  userRoles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  usersByDefaultRole_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.roles */
export type AuthRoles_Pk_Columns_Input = {
  role: Scalars['String'];
};

/** select columns of table "auth.roles" */
export enum AuthRoles_Select_Column {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type AuthRoles_Set_Input = {
  role?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "authRoles" */
export type AuthRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRoles_Stream_Cursor_Value_Input = {
  role?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.roles" */
export enum AuthRoles_Update_Column {
  /** column name */
  Role = 'role'
}

export type AuthRoles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRoles_Set_Input>;
  where: AuthRoles_Bool_Exp;
};

/** Active providers for a given user. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserProviders = {
  __typename?: 'authUserProviders';
  accessToken: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  provider: AuthProviders;
  providerId: Scalars['String'];
  providerUserId: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_providers" */
export type AuthUserProviders_Aggregate = {
  __typename?: 'authUserProviders_aggregate';
  aggregate?: Maybe<AuthUserProviders_Aggregate_Fields>;
  nodes: Array<AuthUserProviders>;
};

export type AuthUserProviders_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp_Count>;
};

export type AuthUserProviders_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AuthUserProviders_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_Fields = {
  __typename?: 'authUserProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthUserProviders_Max_Fields>;
  min?: Maybe<AuthUserProviders_Min_Fields>;
};


/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_providers" */
export type AuthUserProviders_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserProviders_Max_Order_By>;
  min?: InputMaybe<AuthUserProviders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_providers" */
export type AuthUserProviders_Arr_Rel_Insert_Input = {
  data: Array<AuthUserProviders_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_providers". All fields are combined with a logical 'AND'. */
export type AuthUserProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthUserProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  accessToken?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider?: InputMaybe<AuthProviders_Bool_Exp>;
  providerId?: InputMaybe<String_Comparison_Exp>;
  providerUserId?: InputMaybe<String_Comparison_Exp>;
  refreshToken?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_providers" */
export enum AuthUserProviders_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserProvidersPkey = 'user_providers_pkey',
  /** unique or primary key constraint on columns "provider_id", "provider_user_id" */
  UserProvidersProviderIdProviderUserIdKey = 'user_providers_provider_id_provider_user_id_key',
  /** unique or primary key constraint on columns "provider_id", "user_id" */
  UserProvidersUserIdProviderIdKey = 'user_providers_user_id_provider_id_key'
}

/** input type for inserting data into table "auth.user_providers" */
export type AuthUserProviders_Insert_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  provider?: InputMaybe<AuthProviders_Obj_Rel_Insert_Input>;
  providerId?: InputMaybe<Scalars['String']>;
  providerUserId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserProviders_Max_Fields = {
  __typename?: 'authUserProviders_max_fields';
  accessToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerId?: Maybe<Scalars['String']>;
  providerUserId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.user_providers" */
export type AuthUserProviders_Max_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserProviders_Min_Fields = {
  __typename?: 'authUserProviders_min_fields';
  accessToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerId?: Maybe<Scalars['String']>;
  providerUserId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.user_providers" */
export type AuthUserProviders_Min_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_providers" */
export type AuthUserProviders_Mutation_Response = {
  __typename?: 'authUserProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserProviders>;
};

/** on_conflict condition type for table "auth.user_providers" */
export type AuthUserProviders_On_Conflict = {
  constraint: AuthUserProviders_Constraint;
  update_columns?: Array<AuthUserProviders_Update_Column>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_providers". */
export type AuthUserProviders_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider?: InputMaybe<AuthProviders_Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_providers */
export type AuthUserProviders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_providers" */
export enum AuthUserProviders_Select_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_providers" */
export type AuthUserProviders_Set_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  providerId?: InputMaybe<Scalars['String']>;
  providerUserId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "authUserProviders" */
export type AuthUserProviders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserProviders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserProviders_Stream_Cursor_Value_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  providerId?: InputMaybe<Scalars['String']>;
  providerUserId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_providers" */
export enum AuthUserProviders_Update_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type AuthUserProviders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  where: AuthUserProviders_Bool_Exp;
};

/** Roles of users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserRoles = {
  __typename?: 'authUserRoles';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Scalars['String'];
  /** An object relationship */
  roleByRole: AuthRoles;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_roles" */
export type AuthUserRoles_Aggregate = {
  __typename?: 'authUserRoles_aggregate';
  aggregate?: Maybe<AuthUserRoles_Aggregate_Fields>;
  nodes: Array<AuthUserRoles>;
};

export type AuthUserRoles_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp_Count>;
};

export type AuthUserRoles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AuthUserRoles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_Fields = {
  __typename?: 'authUserRoles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthUserRoles_Max_Fields>;
  min?: Maybe<AuthUserRoles_Min_Fields>;
};


/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_roles" */
export type AuthUserRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserRoles_Max_Order_By>;
  min?: InputMaybe<AuthUserRoles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_roles" */
export type AuthUserRoles_Arr_Rel_Insert_Input = {
  data: Array<AuthUserRoles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_roles". All fields are combined with a logical 'AND'. */
export type AuthUserRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthUserRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  roleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_roles" */
export enum AuthUserRoles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserRolesPkey = 'user_roles_pkey',
  /** unique or primary key constraint on columns "user_id", "role" */
  UserRolesUserIdRoleKey = 'user_roles_user_id_role_key'
}

/** input type for inserting data into table "auth.user_roles" */
export type AuthUserRoles_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  roleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserRoles_Max_Fields = {
  __typename?: 'authUserRoles_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.user_roles" */
export type AuthUserRoles_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserRoles_Min_Fields = {
  __typename?: 'authUserRoles_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.user_roles" */
export type AuthUserRoles_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_roles" */
export type AuthUserRoles_Mutation_Response = {
  __typename?: 'authUserRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserRoles>;
};

/** on_conflict condition type for table "auth.user_roles" */
export type AuthUserRoles_On_Conflict = {
  constraint: AuthUserRoles_Constraint;
  update_columns?: Array<AuthUserRoles_Update_Column>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_roles". */
export type AuthUserRoles_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roleByRole?: InputMaybe<AuthRoles_Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_roles */
export type AuthUserRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_roles" */
export enum AuthUserRoles_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_roles" */
export type AuthUserRoles_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "authUserRoles" */
export type AuthUserRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserRoles_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_roles" */
export enum AuthUserRoles_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

export type AuthUserRoles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  where: AuthUserRoles_Bool_Exp;
};

/** User webauthn security keys. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserSecurityKeys = {
  __typename?: 'authUserSecurityKeys';
  counter: Scalars['bigint'];
  credentialId: Scalars['String'];
  credentialPublicKey?: Maybe<Scalars['bytea']>;
  id: Scalars['uuid'];
  nickname?: Maybe<Scalars['String']>;
  transports: Scalars['String'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate = {
  __typename?: 'authUserSecurityKeys_aggregate';
  aggregate?: Maybe<AuthUserSecurityKeys_Aggregate_Fields>;
  nodes: Array<AuthUserSecurityKeys>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp_Count>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_Fields = {
  __typename?: 'authUserSecurityKeys_aggregate_fields';
  avg?: Maybe<AuthUserSecurityKeys_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<AuthUserSecurityKeys_Max_Fields>;
  min?: Maybe<AuthUserSecurityKeys_Min_Fields>;
  stddev?: Maybe<AuthUserSecurityKeys_Stddev_Fields>;
  stddev_pop?: Maybe<AuthUserSecurityKeys_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<AuthUserSecurityKeys_Stddev_Samp_Fields>;
  sum?: Maybe<AuthUserSecurityKeys_Sum_Fields>;
  var_pop?: Maybe<AuthUserSecurityKeys_Var_Pop_Fields>;
  var_samp?: Maybe<AuthUserSecurityKeys_Var_Samp_Fields>;
  variance?: Maybe<AuthUserSecurityKeys_Variance_Fields>;
};


/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_Order_By = {
  avg?: InputMaybe<AuthUserSecurityKeys_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserSecurityKeys_Max_Order_By>;
  min?: InputMaybe<AuthUserSecurityKeys_Min_Order_By>;
  stddev?: InputMaybe<AuthUserSecurityKeys_Stddev_Order_By>;
  stddev_pop?: InputMaybe<AuthUserSecurityKeys_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<AuthUserSecurityKeys_Stddev_Samp_Order_By>;
  sum?: InputMaybe<AuthUserSecurityKeys_Sum_Order_By>;
  var_pop?: InputMaybe<AuthUserSecurityKeys_Var_Pop_Order_By>;
  var_samp?: InputMaybe<AuthUserSecurityKeys_Var_Samp_Order_By>;
  variance?: InputMaybe<AuthUserSecurityKeys_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Arr_Rel_Insert_Input = {
  data: Array<AuthUserSecurityKeys_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};

/** aggregate avg on columns */
export type AuthUserSecurityKeys_Avg_Fields = {
  __typename?: 'authUserSecurityKeys_avg_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Avg_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "auth.user_security_keys". All fields are combined with a logical 'AND'. */
export type AuthUserSecurityKeys_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserSecurityKeys_Bool_Exp>>;
  _not?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserSecurityKeys_Bool_Exp>>;
  counter?: InputMaybe<Bigint_Comparison_Exp>;
  credentialId?: InputMaybe<String_Comparison_Exp>;
  credentialPublicKey?: InputMaybe<Bytea_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  transports?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Constraint {
  /** unique or primary key constraint on columns "credential_id" */
  UserSecurityKeyCredentialIdKey = 'user_security_key_credential_id_key',
  /** unique or primary key constraint on columns "id" */
  UserSecurityKeysPkey = 'user_security_keys_pkey'
}

/** input type for incrementing numeric columns in table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Inc_Input = {
  counter?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Insert_Input = {
  counter?: InputMaybe<Scalars['bigint']>;
  credentialId?: InputMaybe<Scalars['String']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']>;
  id?: InputMaybe<Scalars['uuid']>;
  nickname?: InputMaybe<Scalars['String']>;
  transports?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserSecurityKeys_Max_Fields = {
  __typename?: 'authUserSecurityKeys_max_fields';
  counter?: Maybe<Scalars['bigint']>;
  credentialId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  transports?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Max_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserSecurityKeys_Min_Fields = {
  __typename?: 'authUserSecurityKeys_min_fields';
  counter?: Maybe<Scalars['bigint']>;
  credentialId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  transports?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Min_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Mutation_Response = {
  __typename?: 'authUserSecurityKeys_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserSecurityKeys>;
};

/** on_conflict condition type for table "auth.user_security_keys" */
export type AuthUserSecurityKeys_On_Conflict = {
  constraint: AuthUserSecurityKeys_Constraint;
  update_columns?: Array<AuthUserSecurityKeys_Update_Column>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_security_keys". */
export type AuthUserSecurityKeys_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  credentialPublicKey?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_security_keys */
export type AuthUserSecurityKeys_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Select_Column {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Set_Input = {
  counter?: InputMaybe<Scalars['bigint']>;
  credentialId?: InputMaybe<Scalars['String']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']>;
  id?: InputMaybe<Scalars['uuid']>;
  nickname?: InputMaybe<Scalars['String']>;
  transports?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type AuthUserSecurityKeys_Stddev_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type AuthUserSecurityKeys_Stddev_Pop_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_pop_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Pop_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type AuthUserSecurityKeys_Stddev_Samp_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_samp_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Samp_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "authUserSecurityKeys" */
export type AuthUserSecurityKeys_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserSecurityKeys_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserSecurityKeys_Stream_Cursor_Value_Input = {
  counter?: InputMaybe<Scalars['bigint']>;
  credentialId?: InputMaybe<Scalars['String']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']>;
  id?: InputMaybe<Scalars['uuid']>;
  nickname?: InputMaybe<Scalars['String']>;
  transports?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type AuthUserSecurityKeys_Sum_Fields = {
  __typename?: 'authUserSecurityKeys_sum_fields';
  counter?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Sum_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** update columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Update_Column {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

export type AuthUserSecurityKeys_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  where: AuthUserSecurityKeys_Bool_Exp;
};

/** aggregate var_pop on columns */
export type AuthUserSecurityKeys_Var_Pop_Fields = {
  __typename?: 'authUserSecurityKeys_var_pop_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Pop_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type AuthUserSecurityKeys_Var_Samp_Fields = {
  __typename?: 'authUserSecurityKeys_var_samp_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Samp_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type AuthUserSecurityKeys_Variance_Fields = {
  __typename?: 'authUserSecurityKeys_variance_fields';
  counter?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Variance_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "storage.buckets" */
export type Buckets = {
  __typename?: 'buckets';
  cacheControl?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  downloadExpiration: Scalars['Int'];
  /** An array relationship */
  files: Array<Files>;
  /** An aggregate relationship */
  files_aggregate: Files_Aggregate;
  id: Scalars['String'];
  maxUploadFileSize: Scalars['Int'];
  minUploadFileSize: Scalars['Int'];
  presignedUrlsEnabled: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "storage.buckets" */
export type BucketsFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


/** columns and relationships of "storage.buckets" */
export type BucketsFiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};

/** aggregated selection of "storage.buckets" */
export type Buckets_Aggregate = {
  __typename?: 'buckets_aggregate';
  aggregate?: Maybe<Buckets_Aggregate_Fields>;
  nodes: Array<Buckets>;
};

/** aggregate fields of "storage.buckets" */
export type Buckets_Aggregate_Fields = {
  __typename?: 'buckets_aggregate_fields';
  avg?: Maybe<Buckets_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Buckets_Max_Fields>;
  min?: Maybe<Buckets_Min_Fields>;
  stddev?: Maybe<Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Buckets_Sum_Fields>;
  var_pop?: Maybe<Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Buckets_Var_Samp_Fields>;
  variance?: Maybe<Buckets_Variance_Fields>;
};


/** aggregate fields of "storage.buckets" */
export type Buckets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Buckets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Buckets_Avg_Fields = {
  __typename?: 'buckets_avg_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "storage.buckets". All fields are combined with a logical 'AND'. */
export type Buckets_Bool_Exp = {
  _and?: InputMaybe<Array<Buckets_Bool_Exp>>;
  _not?: InputMaybe<Buckets_Bool_Exp>;
  _or?: InputMaybe<Array<Buckets_Bool_Exp>>;
  cacheControl?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  downloadExpiration?: InputMaybe<Int_Comparison_Exp>;
  files?: InputMaybe<Files_Bool_Exp>;
  files_aggregate?: InputMaybe<Files_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  maxUploadFileSize?: InputMaybe<Int_Comparison_Exp>;
  minUploadFileSize?: InputMaybe<Int_Comparison_Exp>;
  presignedUrlsEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.buckets" */
export enum Buckets_Constraint {
  /** unique or primary key constraint on columns "id" */
  BucketsPkey = 'buckets_pkey'
}

/** input type for incrementing numeric columns in table "storage.buckets" */
export type Buckets_Inc_Input = {
  downloadExpiration?: InputMaybe<Scalars['Int']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "storage.buckets" */
export type Buckets_Insert_Input = {
  cacheControl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  downloadExpiration?: InputMaybe<Scalars['Int']>;
  files?: InputMaybe<Files_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Buckets_Max_Fields = {
  __typename?: 'buckets_max_fields';
  cacheControl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  downloadExpiration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  maxUploadFileSize?: Maybe<Scalars['Int']>;
  minUploadFileSize?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Buckets_Min_Fields = {
  __typename?: 'buckets_min_fields';
  cacheControl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  downloadExpiration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  maxUploadFileSize?: Maybe<Scalars['Int']>;
  minUploadFileSize?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "storage.buckets" */
export type Buckets_Mutation_Response = {
  __typename?: 'buckets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Buckets>;
};

/** input type for inserting object relation for remote table "storage.buckets" */
export type Buckets_Obj_Rel_Insert_Input = {
  data: Buckets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};

/** on_conflict condition type for table "storage.buckets" */
export type Buckets_On_Conflict = {
  constraint: Buckets_Constraint;
  update_columns?: Array<Buckets_Update_Column>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.buckets". */
export type Buckets_Order_By = {
  cacheControl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  downloadExpiration?: InputMaybe<Order_By>;
  files_aggregate?: InputMaybe<Files_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  maxUploadFileSize?: InputMaybe<Order_By>;
  minUploadFileSize?: InputMaybe<Order_By>;
  presignedUrlsEnabled?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.buckets */
export type Buckets_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "storage.buckets" */
export enum Buckets_Select_Column {
  /** column name */
  CacheControl = 'cacheControl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DownloadExpiration = 'downloadExpiration',
  /** column name */
  Id = 'id',
  /** column name */
  MaxUploadFileSize = 'maxUploadFileSize',
  /** column name */
  MinUploadFileSize = 'minUploadFileSize',
  /** column name */
  PresignedUrlsEnabled = 'presignedUrlsEnabled',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "storage.buckets" */
export type Buckets_Set_Input = {
  cacheControl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  downloadExpiration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Buckets_Stddev_Fields = {
  __typename?: 'buckets_stddev_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Buckets_Stddev_Pop_Fields = {
  __typename?: 'buckets_stddev_pop_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Buckets_Stddev_Samp_Fields = {
  __typename?: 'buckets_stddev_samp_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "buckets" */
export type Buckets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Buckets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Buckets_Stream_Cursor_Value_Input = {
  cacheControl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  downloadExpiration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Buckets_Sum_Fields = {
  __typename?: 'buckets_sum_fields';
  downloadExpiration?: Maybe<Scalars['Int']>;
  maxUploadFileSize?: Maybe<Scalars['Int']>;
  minUploadFileSize?: Maybe<Scalars['Int']>;
};

/** update columns of table "storage.buckets" */
export enum Buckets_Update_Column {
  /** column name */
  CacheControl = 'cacheControl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DownloadExpiration = 'downloadExpiration',
  /** column name */
  Id = 'id',
  /** column name */
  MaxUploadFileSize = 'maxUploadFileSize',
  /** column name */
  MinUploadFileSize = 'minUploadFileSize',
  /** column name */
  PresignedUrlsEnabled = 'presignedUrlsEnabled',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Buckets_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Buckets_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Buckets_Set_Input>;
  where: Buckets_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Buckets_Var_Pop_Fields = {
  __typename?: 'buckets_var_pop_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Buckets_Var_Samp_Fields = {
  __typename?: 'buckets_var_samp_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Buckets_Variance_Fields = {
  __typename?: 'buckets_variance_fields';
  downloadExpiration?: Maybe<Scalars['Float']>;
  maxUploadFileSize?: Maybe<Scalars['Float']>;
  minUploadFileSize?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type Bytea_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bytea']>;
  _gt?: InputMaybe<Scalars['bytea']>;
  _gte?: InputMaybe<Scalars['bytea']>;
  _in?: InputMaybe<Array<Scalars['bytea']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bytea']>;
  _lte?: InputMaybe<Scalars['bytea']>;
  _neq?: InputMaybe<Scalars['bytea']>;
  _nin?: InputMaybe<Array<Scalars['bytea']>>;
};

/** columns and relationships of "circle" */
export type Circle = {
  __typename?: 'circle';
  archived: Scalars['Boolean'];
  /** An array relationship */
  children: Array<Circle>;
  /** An aggregate relationship */
  children_aggregate: Circle_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  members: Array<Circle_Member>;
  /** An aggregate relationship */
  members_aggregate: Circle_Member_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  /** An object relationship */
  parent?: Maybe<Circle>;
  parentId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  role: Role;
  roleId: Scalars['uuid'];
};


/** columns and relationships of "circle" */
export type CircleChildrenArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMembersArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};

/** aggregated selection of "circle" */
export type Circle_Aggregate = {
  __typename?: 'circle_aggregate';
  aggregate?: Maybe<Circle_Aggregate_Fields>;
  nodes: Array<Circle>;
};

export type Circle_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Circle_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Circle_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Circle_Aggregate_Bool_Exp_Count>;
};

export type Circle_Aggregate_Bool_Exp_Bool_And = {
  arguments: Circle_Select_Column_Circle_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Circle_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Circle_Select_Column_Circle_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Circle_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Circle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "circle" */
export type Circle_Aggregate_Fields = {
  __typename?: 'circle_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Circle_Max_Fields>;
  min?: Maybe<Circle_Min_Fields>;
};


/** aggregate fields of "circle" */
export type Circle_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "circle" */
export type Circle_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Circle_Max_Order_By>;
  min?: InputMaybe<Circle_Min_Order_By>;
};

/** input type for inserting array relation for remote table "circle" */
export type Circle_Arr_Rel_Insert_Input = {
  data: Array<Circle_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Circle_On_Conflict>;
};

/** Boolean expression to filter rows from the table "circle". All fields are combined with a logical 'AND'. */
export type Circle_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Bool_Exp>>;
  _not?: InputMaybe<Circle_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  children?: InputMaybe<Circle_Bool_Exp>;
  children_aggregate?: InputMaybe<Circle_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  members?: InputMaybe<Circle_Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Circle_Member_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Circle_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Role_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "circle" */
export enum Circle_Constraint {
  /** unique or primary key constraint on columns "id" */
  CirclePkey = 'circle_pkey'
}

/** input type for inserting data into table "circle" */
export type Circle_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  children?: InputMaybe<Circle_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  members?: InputMaybe<Circle_Member_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parent?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Role_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Circle_Max_Fields = {
  __typename?: 'circle_max_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  roleId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "circle" */
export type Circle_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
};

/** columns and relationships of "circle_member" */
export type Circle_Member = {
  __typename?: 'circle_member';
  archived: Scalars['Boolean'];
  avgMinPerWeek?: Maybe<Scalars['Int']>;
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
};

/** aggregated selection of "circle_member" */
export type Circle_Member_Aggregate = {
  __typename?: 'circle_member_aggregate';
  aggregate?: Maybe<Circle_Member_Aggregate_Fields>;
  nodes: Array<Circle_Member>;
};

export type Circle_Member_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Circle_Member_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Circle_Member_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Circle_Member_Aggregate_Bool_Exp_Count>;
};

export type Circle_Member_Aggregate_Bool_Exp_Bool_And = {
  arguments: Circle_Member_Select_Column_Circle_Member_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Member_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Circle_Member_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Circle_Member_Select_Column_Circle_Member_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Member_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Circle_Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Circle_Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Member_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "circle_member" */
export type Circle_Member_Aggregate_Fields = {
  __typename?: 'circle_member_aggregate_fields';
  avg?: Maybe<Circle_Member_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Circle_Member_Max_Fields>;
  min?: Maybe<Circle_Member_Min_Fields>;
  stddev?: Maybe<Circle_Member_Stddev_Fields>;
  stddev_pop?: Maybe<Circle_Member_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Circle_Member_Stddev_Samp_Fields>;
  sum?: Maybe<Circle_Member_Sum_Fields>;
  var_pop?: Maybe<Circle_Member_Var_Pop_Fields>;
  var_samp?: Maybe<Circle_Member_Var_Samp_Fields>;
  variance?: Maybe<Circle_Member_Variance_Fields>;
};


/** aggregate fields of "circle_member" */
export type Circle_Member_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "circle_member" */
export type Circle_Member_Aggregate_Order_By = {
  avg?: InputMaybe<Circle_Member_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Circle_Member_Max_Order_By>;
  min?: InputMaybe<Circle_Member_Min_Order_By>;
  stddev?: InputMaybe<Circle_Member_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Circle_Member_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Circle_Member_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Circle_Member_Sum_Order_By>;
  var_pop?: InputMaybe<Circle_Member_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Circle_Member_Var_Samp_Order_By>;
  variance?: InputMaybe<Circle_Member_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "circle_member" */
export type Circle_Member_Arr_Rel_Insert_Input = {
  data: Array<Circle_Member_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Circle_Member_On_Conflict>;
};

/** aggregate avg on columns */
export type Circle_Member_Avg_Fields = {
  __typename?: 'circle_member_avg_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "circle_member" */
export type Circle_Member_Avg_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "circle_member". All fields are combined with a logical 'AND'. */
export type Circle_Member_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Member_Bool_Exp>>;
  _not?: InputMaybe<Circle_Member_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Member_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  avgMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "circle_member" */
export enum Circle_Member_Constraint {
  /** unique or primary key constraint on columns "id" */
  CircleMemberPkey = 'circle_member_pkey'
}

/** input type for incrementing numeric columns in table "circle_member" */
export type Circle_Member_Inc_Input = {
  avgMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "circle_member" */
export type Circle_Member_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  avgMinPerWeek?: InputMaybe<Scalars['Int']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Circle_Member_Max_Fields = {
  __typename?: 'circle_member_max_fields';
  avgMinPerWeek?: Maybe<Scalars['Int']>;
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "circle_member" */
export type Circle_Member_Max_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Circle_Member_Min_Fields = {
  __typename?: 'circle_member_min_fields';
  avgMinPerWeek?: Maybe<Scalars['Int']>;
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "circle_member" */
export type Circle_Member_Min_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "circle_member" */
export type Circle_Member_Mutation_Response = {
  __typename?: 'circle_member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Circle_Member>;
};

/** on_conflict condition type for table "circle_member" */
export type Circle_Member_On_Conflict = {
  constraint: Circle_Member_Constraint;
  update_columns?: Array<Circle_Member_Update_Column>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};

/** Ordering options when selecting data from "circle_member". */
export type Circle_Member_Order_By = {
  archived?: InputMaybe<Order_By>;
  avgMinPerWeek?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circle_member */
export type Circle_Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "circle_member" */
export enum Circle_Member_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  AvgMinPerWeek = 'avgMinPerWeek',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId'
}

/** select "circle_member_aggregate_bool_exp_bool_and_arguments_columns" columns of table "circle_member" */
export enum Circle_Member_Select_Column_Circle_Member_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** select "circle_member_aggregate_bool_exp_bool_or_arguments_columns" columns of table "circle_member" */
export enum Circle_Member_Select_Column_Circle_Member_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** input type for updating data in table "circle_member" */
export type Circle_Member_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  avgMinPerWeek?: InputMaybe<Scalars['Int']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Circle_Member_Stddev_Fields = {
  __typename?: 'circle_member_stddev_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "circle_member" */
export type Circle_Member_Stddev_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Circle_Member_Stddev_Pop_Fields = {
  __typename?: 'circle_member_stddev_pop_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "circle_member" */
export type Circle_Member_Stddev_Pop_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Circle_Member_Stddev_Samp_Fields = {
  __typename?: 'circle_member_stddev_samp_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "circle_member" */
export type Circle_Member_Stddev_Samp_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "circle_member" */
export type Circle_Member_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Member_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Member_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  avgMinPerWeek?: InputMaybe<Scalars['Int']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Circle_Member_Sum_Fields = {
  __typename?: 'circle_member_sum_fields';
  avgMinPerWeek?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "circle_member" */
export type Circle_Member_Sum_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** update columns of table "circle_member" */
export enum Circle_Member_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  AvgMinPerWeek = 'avgMinPerWeek',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId'
}

export type Circle_Member_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Circle_Member_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circle_Member_Set_Input>;
  where: Circle_Member_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Circle_Member_Var_Pop_Fields = {
  __typename?: 'circle_member_var_pop_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "circle_member" */
export type Circle_Member_Var_Pop_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Circle_Member_Var_Samp_Fields = {
  __typename?: 'circle_member_var_samp_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "circle_member" */
export type Circle_Member_Var_Samp_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Circle_Member_Variance_Fields = {
  __typename?: 'circle_member_variance_fields';
  avgMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "circle_member" */
export type Circle_Member_Variance_Order_By = {
  avgMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Circle_Min_Fields = {
  __typename?: 'circle_min_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
  roleId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "circle" */
export type Circle_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "circle" */
export type Circle_Mutation_Response = {
  __typename?: 'circle_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Circle>;
};

/** input type for inserting object relation for remote table "circle" */
export type Circle_Obj_Rel_Insert_Input = {
  data: Circle_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Circle_On_Conflict>;
};

/** on_conflict condition type for table "circle" */
export type Circle_On_Conflict = {
  constraint: Circle_Constraint;
  update_columns?: Array<Circle_Update_Column>;
  where?: InputMaybe<Circle_Bool_Exp>;
};

/** Ordering options when selecting data from "circle". */
export type Circle_Order_By = {
  archived?: InputMaybe<Order_By>;
  children_aggregate?: InputMaybe<Circle_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Circle_Member_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  parent?: InputMaybe<Circle_Order_By>;
  parentId?: InputMaybe<Order_By>;
  role?: InputMaybe<Role_Order_By>;
  roleId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circle */
export type Circle_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "circle" */
export enum Circle_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  RoleId = 'roleId'
}

/** select "circle_aggregate_bool_exp_bool_and_arguments_columns" columns of table "circle" */
export enum Circle_Select_Column_Circle_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** select "circle_aggregate_bool_exp_bool_or_arguments_columns" columns of table "circle" */
export enum Circle_Select_Column_Circle_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** input type for updating data in table "circle" */
export type Circle_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parentId?: InputMaybe<Scalars['uuid']>;
  roleId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "circle" */
export type Circle_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parentId?: InputMaybe<Scalars['uuid']>;
  roleId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "circle" */
export enum Circle_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  RoleId = 'roleId'
}

export type Circle_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circle_Set_Input>;
  where: Circle_Bool_Exp;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['citext']>;
  _gt?: InputMaybe<Scalars['citext']>;
  _gte?: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']>;
  _in?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']>;
  _lt?: InputMaybe<Scalars['citext']>;
  _lte?: InputMaybe<Scalars['citext']>;
  _neq?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']>;
  _nin?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "decision" */
export type Decision = {
  __typename?: 'decision';
  archived: Scalars['Boolean'];
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  title: Scalars['String'];
};

/** aggregated selection of "decision" */
export type Decision_Aggregate = {
  __typename?: 'decision_aggregate';
  aggregate?: Maybe<Decision_Aggregate_Fields>;
  nodes: Array<Decision>;
};

export type Decision_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Decision_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Decision_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Decision_Aggregate_Bool_Exp_Count>;
};

export type Decision_Aggregate_Bool_Exp_Bool_And = {
  arguments: Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Decision_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Decision_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Decision_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Decision_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Decision_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Decision_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "decision" */
export type Decision_Aggregate_Fields = {
  __typename?: 'decision_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Decision_Max_Fields>;
  min?: Maybe<Decision_Min_Fields>;
};


/** aggregate fields of "decision" */
export type Decision_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Decision_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "decision" */
export type Decision_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Decision_Max_Order_By>;
  min?: InputMaybe<Decision_Min_Order_By>;
};

/** input type for inserting array relation for remote table "decision" */
export type Decision_Arr_Rel_Insert_Input = {
  data: Array<Decision_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Decision_On_Conflict>;
};

/** Boolean expression to filter rows from the table "decision". All fields are combined with a logical 'AND'. */
export type Decision_Bool_Exp = {
  _and?: InputMaybe<Array<Decision_Bool_Exp>>;
  _not?: InputMaybe<Decision_Bool_Exp>;
  _or?: InputMaybe<Array<Decision_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "decision" */
export enum Decision_Constraint {
  /** unique or primary key constraint on columns "id" */
  DecisionPkey = 'decision_pkey'
}

/** input type for inserting data into table "decision" */
export type Decision_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Decision_Max_Fields = {
  __typename?: 'decision_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "decision" */
export type Decision_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Decision_Min_Fields = {
  __typename?: 'decision_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "decision" */
export type Decision_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "decision" */
export type Decision_Mutation_Response = {
  __typename?: 'decision_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Decision>;
};

/** on_conflict condition type for table "decision" */
export type Decision_On_Conflict = {
  constraint: Decision_Constraint;
  update_columns?: Array<Decision_Update_Column>;
  where?: InputMaybe<Decision_Bool_Exp>;
};

/** Ordering options when selecting data from "decision". */
export type Decision_Order_By = {
  archived?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: decision */
export type Decision_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "decision" */
export enum Decision_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Title = 'title'
}

/** select "decision_aggregate_bool_exp_bool_and_arguments_columns" columns of table "decision" */
export enum Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** select "decision_aggregate_bool_exp_bool_or_arguments_columns" columns of table "decision" */
export enum Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** input type for updating data in table "decision" */
export type Decision_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "decision" */
export type Decision_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Decision_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Decision_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
};

/** update columns of table "decision" */
export enum Decision_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Title = 'title'
}

export type Decision_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Decision_Set_Input>;
  where: Decision_Bool_Exp;
};

/** columns and relationships of "storage.files" */
export type Files = {
  __typename?: 'files';
  /** An object relationship */
  bucket: Buckets;
  bucketId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  etag?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  isUploaded?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregate relationship */
  members_aggregate: Member_Aggregate;
  mimeType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  orgs: Array<Org_File>;
  /** An aggregate relationship */
  orgs_aggregate: Org_File_Aggregate;
  size?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['timestamptz'];
  uploadedByUserId?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "storage.files" */
export type FilesMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "storage.files" */
export type FilesMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "storage.files" */
export type FilesOrgsArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


/** columns and relationships of "storage.files" */
export type FilesOrgs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};

/** aggregated selection of "storage.files" */
export type Files_Aggregate = {
  __typename?: 'files_aggregate';
  aggregate?: Maybe<Files_Aggregate_Fields>;
  nodes: Array<Files>;
};

export type Files_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Files_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Files_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Files_Aggregate_Bool_Exp_Count>;
};

export type Files_Aggregate_Bool_Exp_Bool_And = {
  arguments: Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Files_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Files_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "storage.files" */
export type Files_Aggregate_Fields = {
  __typename?: 'files_aggregate_fields';
  avg?: Maybe<Files_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Files_Max_Fields>;
  min?: Maybe<Files_Min_Fields>;
  stddev?: Maybe<Files_Stddev_Fields>;
  stddev_pop?: Maybe<Files_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Files_Stddev_Samp_Fields>;
  sum?: Maybe<Files_Sum_Fields>;
  var_pop?: Maybe<Files_Var_Pop_Fields>;
  var_samp?: Maybe<Files_Var_Samp_Fields>;
  variance?: Maybe<Files_Variance_Fields>;
};


/** aggregate fields of "storage.files" */
export type Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "storage.files" */
export type Files_Aggregate_Order_By = {
  avg?: InputMaybe<Files_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Files_Max_Order_By>;
  min?: InputMaybe<Files_Min_Order_By>;
  stddev?: InputMaybe<Files_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Files_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Files_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Files_Sum_Order_By>;
  var_pop?: InputMaybe<Files_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Files_Var_Samp_Order_By>;
  variance?: InputMaybe<Files_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "storage.files" */
export type Files_Arr_Rel_Insert_Input = {
  data: Array<Files_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Files_On_Conflict>;
};

/** aggregate avg on columns */
export type Files_Avg_Fields = {
  __typename?: 'files_avg_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "storage.files" */
export type Files_Avg_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "storage.files". All fields are combined with a logical 'AND'. */
export type Files_Bool_Exp = {
  _and?: InputMaybe<Array<Files_Bool_Exp>>;
  _not?: InputMaybe<Files_Bool_Exp>;
  _or?: InputMaybe<Array<Files_Bool_Exp>>;
  bucket?: InputMaybe<Buckets_Bool_Exp>;
  bucketId?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  etag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isUploaded?: InputMaybe<Boolean_Comparison_Exp>;
  members?: InputMaybe<Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Member_Aggregate_Bool_Exp>;
  mimeType?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  orgs?: InputMaybe<Org_File_Bool_Exp>;
  orgs_aggregate?: InputMaybe<Org_File_Aggregate_Bool_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  uploadedByUserId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.files" */
export enum Files_Constraint {
  /** unique or primary key constraint on columns "id" */
  FilesPkey = 'files_pkey'
}

/** input type for incrementing numeric columns in table "storage.files" */
export type Files_Inc_Input = {
  size?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "storage.files" */
export type Files_Insert_Input = {
  bucket?: InputMaybe<Buckets_Obj_Rel_Insert_Input>;
  bucketId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  etag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isUploaded?: InputMaybe<Scalars['Boolean']>;
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  mimeType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgs?: InputMaybe<Org_File_Arr_Rel_Insert_Input>;
  size?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Files_Max_Fields = {
  __typename?: 'files_max_fields';
  bucketId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  etag?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  mimeType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  uploadedByUserId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "storage.files" */
export type Files_Max_Order_By = {
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Files_Min_Fields = {
  __typename?: 'files_min_fields';
  bucketId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  etag?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  mimeType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  uploadedByUserId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "storage.files" */
export type Files_Min_Order_By = {
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "storage.files" */
export type Files_Mutation_Response = {
  __typename?: 'files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Files>;
};

/** input type for inserting object relation for remote table "storage.files" */
export type Files_Obj_Rel_Insert_Input = {
  data: Files_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Files_On_Conflict>;
};

/** on_conflict condition type for table "storage.files" */
export type Files_On_Conflict = {
  constraint: Files_Constraint;
  update_columns?: Array<Files_Update_Column>;
  where?: InputMaybe<Files_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.files". */
export type Files_Order_By = {
  bucket?: InputMaybe<Buckets_Order_By>;
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isUploaded?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  orgs_aggregate?: InputMaybe<Org_File_Aggregate_Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.files */
export type Files_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "storage.files" */
export enum Files_Select_Column {
  /** column name */
  BucketId = 'bucketId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Etag = 'etag',
  /** column name */
  Id = 'id',
  /** column name */
  IsUploaded = 'isUploaded',
  /** column name */
  MimeType = 'mimeType',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UploadedByUserId = 'uploadedByUserId'
}

/** select "files_aggregate_bool_exp_bool_and_arguments_columns" columns of table "storage.files" */
export enum Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsUploaded = 'isUploaded'
}

/** select "files_aggregate_bool_exp_bool_or_arguments_columns" columns of table "storage.files" */
export enum Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsUploaded = 'isUploaded'
}

/** input type for updating data in table "storage.files" */
export type Files_Set_Input = {
  bucketId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  etag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isUploaded?: InputMaybe<Scalars['Boolean']>;
  mimeType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Files_Stddev_Fields = {
  __typename?: 'files_stddev_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "storage.files" */
export type Files_Stddev_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Files_Stddev_Pop_Fields = {
  __typename?: 'files_stddev_pop_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "storage.files" */
export type Files_Stddev_Pop_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Files_Stddev_Samp_Fields = {
  __typename?: 'files_stddev_samp_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "storage.files" */
export type Files_Stddev_Samp_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "files" */
export type Files_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Files_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Files_Stream_Cursor_Value_Input = {
  bucketId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  etag?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isUploaded?: InputMaybe<Scalars['Boolean']>;
  mimeType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Files_Sum_Fields = {
  __typename?: 'files_sum_fields';
  size?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "storage.files" */
export type Files_Sum_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** update columns of table "storage.files" */
export enum Files_Update_Column {
  /** column name */
  BucketId = 'bucketId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Etag = 'etag',
  /** column name */
  Id = 'id',
  /** column name */
  IsUploaded = 'isUploaded',
  /** column name */
  MimeType = 'mimeType',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UploadedByUserId = 'uploadedByUserId'
}

export type Files_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Files_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Files_Var_Pop_Fields = {
  __typename?: 'files_var_pop_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "storage.files" */
export type Files_Var_Pop_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Files_Var_Samp_Fields = {
  __typename?: 'files_var_samp_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "storage.files" */
export type Files_Var_Samp_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Files_Variance_Fields = {
  __typename?: 'files_variance_fields';
  size?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "storage.files" */
export type Files_Variance_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "log" */
export type Log = {
  __typename?: 'log';
  /** An object relationship */
  cancelLog?: Maybe<Log>;
  cancelLogId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  cancelMember?: Maybe<Member>;
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  canceled: Scalars['Boolean'];
  changes: Scalars['json'];
  createdAt: Scalars['timestamptz'];
  display: Scalars['json'];
  id: Scalars['uuid'];
  meetingId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  memberName: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};


/** columns and relationships of "log" */
export type LogChangesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "log" */
export type LogDisplayArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "log" */
export type Log_Aggregate = {
  __typename?: 'log_aggregate';
  aggregate?: Maybe<Log_Aggregate_Fields>;
  nodes: Array<Log>;
};

/** aggregate fields of "log" */
export type Log_Aggregate_Fields = {
  __typename?: 'log_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Log_Max_Fields>;
  min?: Maybe<Log_Min_Fields>;
};


/** aggregate fields of "log" */
export type Log_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "log". All fields are combined with a logical 'AND'. */
export type Log_Bool_Exp = {
  _and?: InputMaybe<Array<Log_Bool_Exp>>;
  _not?: InputMaybe<Log_Bool_Exp>;
  _or?: InputMaybe<Array<Log_Bool_Exp>>;
  cancelLog?: InputMaybe<Log_Bool_Exp>;
  cancelLogId?: InputMaybe<Uuid_Comparison_Exp>;
  cancelMember?: InputMaybe<Member_Bool_Exp>;
  cancelMemberId?: InputMaybe<Uuid_Comparison_Exp>;
  cancelMemberName?: InputMaybe<String_Comparison_Exp>;
  canceled?: InputMaybe<Boolean_Comparison_Exp>;
  changes?: InputMaybe<Json_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  display?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meetingId?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  memberName?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "log" */
export enum Log_Constraint {
  /** unique or primary key constraint on columns "id" */
  LogPkey = 'log_pkey'
}

/** input type for inserting data into table "log" */
export type Log_Insert_Input = {
  cancelLog?: InputMaybe<Log_Obj_Rel_Insert_Input>;
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  cancelMember?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  memberName?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Log_Max_Fields = {
  __typename?: 'log_max_fields';
  cancelLogId?: Maybe<Scalars['uuid']>;
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  memberName?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Log_Min_Fields = {
  __typename?: 'log_min_fields';
  cancelLogId?: Maybe<Scalars['uuid']>;
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  memberName?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "log" */
export type Log_Mutation_Response = {
  __typename?: 'log_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Log>;
};

/** input type for inserting object relation for remote table "log" */
export type Log_Obj_Rel_Insert_Input = {
  data: Log_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Log_On_Conflict>;
};

/** on_conflict condition type for table "log" */
export type Log_On_Conflict = {
  constraint: Log_Constraint;
  update_columns?: Array<Log_Update_Column>;
  where?: InputMaybe<Log_Bool_Exp>;
};

/** Ordering options when selecting data from "log". */
export type Log_Order_By = {
  cancelLog?: InputMaybe<Log_Order_By>;
  cancelLogId?: InputMaybe<Order_By>;
  cancelMember?: InputMaybe<Member_Order_By>;
  cancelMemberId?: InputMaybe<Order_By>;
  cancelMemberName?: InputMaybe<Order_By>;
  canceled?: InputMaybe<Order_By>;
  changes?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  display?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  memberName?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: log */
export type Log_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "log" */
export enum Log_Select_Column {
  /** column name */
  CancelLogId = 'cancelLogId',
  /** column name */
  CancelMemberId = 'cancelMemberId',
  /** column name */
  CancelMemberName = 'cancelMemberName',
  /** column name */
  Canceled = 'canceled',
  /** column name */
  Changes = 'changes',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Display = 'display',
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  MemberName = 'memberName',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "log" */
export type Log_Set_Input = {
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  memberName?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "log" */
export type Log_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Log_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Log_Stream_Cursor_Value_Input = {
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  memberName?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "log" */
export enum Log_Update_Column {
  /** column name */
  CancelLogId = 'cancelLogId',
  /** column name */
  CancelMemberId = 'cancelMemberId',
  /** column name */
  CancelMemberName = 'cancelMemberName',
  /** column name */
  Canceled = 'canceled',
  /** column name */
  Changes = 'changes',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Display = 'display',
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  MemberName = 'memberName',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  UserId = 'userId'
}

export type Log_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Log_Set_Input>;
  where: Log_Bool_Exp;
};

/** columns and relationships of "meeting" */
export type Meeting = {
  __typename?: 'meeting';
  archived: Scalars['Boolean'];
  attendees?: Maybe<Array<Scalars['attendee']>>;
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  currentStepId?: Maybe<Scalars['uuid']>;
  endDate: Scalars['timestamptz'];
  ended: Scalars['Boolean'];
  id: Scalars['uuid'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  participantsMembersIds: Array<Scalars['uuid']>;
  participantsScope: Member_Scope_Enum;
  /** An object relationship */
  recurring?: Maybe<Meeting_Recurring>;
  recurringDate?: Maybe<Scalars['timestamptz']>;
  recurringId?: Maybe<Scalars['uuid']>;
  startDate: Scalars['timestamptz'];
  /** An array relationship */
  steps: Array<Meeting_Step>;
  stepsConfig: Array<Scalars['meeting_step_config']>;
  /** An aggregate relationship */
  steps_aggregate: Meeting_Step_Aggregate;
  title: Scalars['String'];
  videoConf?: Maybe<Scalars['videoconf']>;
};


/** columns and relationships of "meeting" */
export type MeetingAttendeesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "meeting" */
export type MeetingParticipantsMembersIdsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "meeting" */
export type MeetingStepsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


/** columns and relationships of "meeting" */
export type MeetingStepsConfigArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "meeting" */
export type MeetingSteps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


/** columns and relationships of "meeting" */
export type MeetingVideoConfArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "meeting" */
export type Meeting_Aggregate = {
  __typename?: 'meeting_aggregate';
  aggregate?: Maybe<Meeting_Aggregate_Fields>;
  nodes: Array<Meeting>;
};

export type Meeting_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Meeting_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Meeting_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Meeting_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Aggregate_Bool_Exp_Bool_And = {
  arguments: Meeting_Select_Column_Meeting_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meeting_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Meeting_Select_Column_Meeting_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meeting_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meeting_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meeting" */
export type Meeting_Aggregate_Fields = {
  __typename?: 'meeting_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Meeting_Max_Fields>;
  min?: Maybe<Meeting_Min_Fields>;
};


/** aggregate fields of "meeting" */
export type Meeting_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "meeting" */
export type Meeting_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meeting_Max_Order_By>;
  min?: InputMaybe<Meeting_Min_Order_By>;
};

/** input type for inserting array relation for remote table "meeting" */
export type Meeting_Arr_Rel_Insert_Input = {
  data: Array<Meeting_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_On_Conflict>;
};

/** Boolean expression to filter rows from the table "meeting". All fields are combined with a logical 'AND'. */
export type Meeting_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  attendees?: InputMaybe<Json_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentStepId?: InputMaybe<Uuid_Comparison_Exp>;
  endDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  ended?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  participantsMembersIds?: InputMaybe<Json_Comparison_Exp>;
  participantsScope?: InputMaybe<Member_Scope_Enum_Comparison_Exp>;
  recurring?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  recurringDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  recurringId?: InputMaybe<Uuid_Comparison_Exp>;
  startDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  steps?: InputMaybe<Meeting_Step_Bool_Exp>;
  stepsConfig?: InputMaybe<Json_Comparison_Exp>;
  steps_aggregate?: InputMaybe<Meeting_Step_Aggregate_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  videoConf?: InputMaybe<Json_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting" */
export enum Meeting_Constraint {
  /** unique or primary key constraint on columns "id" */
  MeetingPkey = 'meeting_pkey'
}

/** input type for inserting data into table "meeting" */
export type Meeting_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  attendees?: InputMaybe<Scalars['json']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  recurring?: InputMaybe<Meeting_Recurring_Obj_Rel_Insert_Input>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  steps?: InputMaybe<Meeting_Step_Arr_Rel_Insert_Input>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** aggregate max on columns */
export type Meeting_Max_Fields = {
  __typename?: 'meeting_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentStepId?: Maybe<Scalars['uuid']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  recurringDate?: Maybe<Scalars['timestamptz']>;
  recurringId?: Maybe<Scalars['uuid']>;
  startDate?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "meeting" */
export type Meeting_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meeting_Min_Fields = {
  __typename?: 'meeting_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentStepId?: Maybe<Scalars['uuid']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  recurringDate?: Maybe<Scalars['timestamptz']>;
  recurringId?: Maybe<Scalars['uuid']>;
  startDate?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "meeting" */
export type Meeting_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meeting" */
export type Meeting_Mutation_Response = {
  __typename?: 'meeting_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting>;
};

/** input type for inserting object relation for remote table "meeting" */
export type Meeting_Obj_Rel_Insert_Input = {
  data: Meeting_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_On_Conflict>;
};

/** on_conflict condition type for table "meeting" */
export type Meeting_On_Conflict = {
  constraint: Meeting_Constraint;
  update_columns?: Array<Meeting_Update_Column>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting". */
export type Meeting_Order_By = {
  archived?: InputMaybe<Order_By>;
  attendees?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  ended?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  participantsMembersIds?: InputMaybe<Order_By>;
  participantsScope?: InputMaybe<Order_By>;
  recurring?: InputMaybe<Meeting_Recurring_Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  stepsConfig?: InputMaybe<Order_By>;
  steps_aggregate?: InputMaybe<Meeting_Step_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  videoConf?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting */
export type Meeting_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "meeting_recurring" */
export type Meeting_Recurring = {
  __typename?: 'meeting_recurring';
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  duration: Scalars['smallint'];
  id: Scalars['uuid'];
  /** An array relationship */
  meetings: Array<Meeting>;
  /** An aggregate relationship */
  meetings_aggregate: Meeting_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  participantsMembersIds: Array<Scalars['uuid']>;
  participantsScope: Member_Scope_Enum;
  rrule: Scalars['String'];
  /** An object relationship */
  template: Meeting_Template;
  templateId: Scalars['uuid'];
  videoConf?: Maybe<Scalars['json']>;
};


/** columns and relationships of "meeting_recurring" */
export type Meeting_RecurringMeetingsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "meeting_recurring" */
export type Meeting_RecurringMeetings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "meeting_recurring" */
export type Meeting_RecurringParticipantsMembersIdsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "meeting_recurring" */
export type Meeting_RecurringVideoConfArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "meeting_recurring" */
export type Meeting_Recurring_Aggregate = {
  __typename?: 'meeting_recurring_aggregate';
  aggregate?: Maybe<Meeting_Recurring_Aggregate_Fields>;
  nodes: Array<Meeting_Recurring>;
};

export type Meeting_Recurring_Aggregate_Bool_Exp = {
  count?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Recurring_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meeting_recurring" */
export type Meeting_Recurring_Aggregate_Fields = {
  __typename?: 'meeting_recurring_aggregate_fields';
  avg?: Maybe<Meeting_Recurring_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Meeting_Recurring_Max_Fields>;
  min?: Maybe<Meeting_Recurring_Min_Fields>;
  stddev?: Maybe<Meeting_Recurring_Stddev_Fields>;
  stddev_pop?: Maybe<Meeting_Recurring_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meeting_Recurring_Stddev_Samp_Fields>;
  sum?: Maybe<Meeting_Recurring_Sum_Fields>;
  var_pop?: Maybe<Meeting_Recurring_Var_Pop_Fields>;
  var_samp?: Maybe<Meeting_Recurring_Var_Samp_Fields>;
  variance?: Maybe<Meeting_Recurring_Variance_Fields>;
};


/** aggregate fields of "meeting_recurring" */
export type Meeting_Recurring_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "meeting_recurring" */
export type Meeting_Recurring_Aggregate_Order_By = {
  avg?: InputMaybe<Meeting_Recurring_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meeting_Recurring_Max_Order_By>;
  min?: InputMaybe<Meeting_Recurring_Min_Order_By>;
  stddev?: InputMaybe<Meeting_Recurring_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Meeting_Recurring_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Meeting_Recurring_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Meeting_Recurring_Sum_Order_By>;
  var_pop?: InputMaybe<Meeting_Recurring_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Meeting_Recurring_Var_Samp_Order_By>;
  variance?: InputMaybe<Meeting_Recurring_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "meeting_recurring" */
export type Meeting_Recurring_Arr_Rel_Insert_Input = {
  data: Array<Meeting_Recurring_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Recurring_On_Conflict>;
};

/** aggregate avg on columns */
export type Meeting_Recurring_Avg_Fields = {
  __typename?: 'meeting_recurring_avg_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "meeting_recurring". All fields are combined with a logical 'AND'. */
export type Meeting_Recurring_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Recurring_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Recurring_Bool_Exp>>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  duration?: InputMaybe<Smallint_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meetings?: InputMaybe<Meeting_Bool_Exp>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  participantsMembersIds?: InputMaybe<Json_Comparison_Exp>;
  participantsScope?: InputMaybe<Member_Scope_Enum_Comparison_Exp>;
  rrule?: InputMaybe<String_Comparison_Exp>;
  template?: InputMaybe<Meeting_Template_Bool_Exp>;
  templateId?: InputMaybe<Uuid_Comparison_Exp>;
  videoConf?: InputMaybe<Json_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting_recurring" */
export enum Meeting_Recurring_Constraint {
  /** unique or primary key constraint on columns "id" */
  MeetingRecurringPkey = 'meeting_recurring_pkey'
}

/** input type for incrementing numeric columns in table "meeting_recurring" */
export type Meeting_Recurring_Inc_Input = {
  duration?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "meeting_recurring" */
export type Meeting_Recurring_Insert_Input = {
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  duration?: InputMaybe<Scalars['smallint']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetings?: InputMaybe<Meeting_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  rrule?: InputMaybe<Scalars['String']>;
  template?: InputMaybe<Meeting_Template_Obj_Rel_Insert_Input>;
  templateId?: InputMaybe<Scalars['uuid']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** aggregate max on columns */
export type Meeting_Recurring_Max_Fields = {
  __typename?: 'meeting_recurring_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  rrule?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  rrule?: InputMaybe<Order_By>;
  templateId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meeting_Recurring_Min_Fields = {
  __typename?: 'meeting_recurring_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  rrule?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  rrule?: InputMaybe<Order_By>;
  templateId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meeting_recurring" */
export type Meeting_Recurring_Mutation_Response = {
  __typename?: 'meeting_recurring_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting_Recurring>;
};

/** input type for inserting object relation for remote table "meeting_recurring" */
export type Meeting_Recurring_Obj_Rel_Insert_Input = {
  data: Meeting_Recurring_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Recurring_On_Conflict>;
};

/** on_conflict condition type for table "meeting_recurring" */
export type Meeting_Recurring_On_Conflict = {
  constraint: Meeting_Recurring_Constraint;
  update_columns?: Array<Meeting_Recurring_Update_Column>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting_recurring". */
export type Meeting_Recurring_Order_By = {
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  participantsMembersIds?: InputMaybe<Order_By>;
  participantsScope?: InputMaybe<Order_By>;
  rrule?: InputMaybe<Order_By>;
  template?: InputMaybe<Meeting_Template_Order_By>;
  templateId?: InputMaybe<Order_By>;
  videoConf?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting_recurring */
export type Meeting_Recurring_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "meeting_recurring" */
export enum Meeting_Recurring_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  Rrule = 'rrule',
  /** column name */
  TemplateId = 'templateId',
  /** column name */
  VideoConf = 'videoConf'
}

/** input type for updating data in table "meeting_recurring" */
export type Meeting_Recurring_Set_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  duration?: InputMaybe<Scalars['smallint']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  rrule?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['uuid']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** aggregate stddev on columns */
export type Meeting_Recurring_Stddev_Fields = {
  __typename?: 'meeting_recurring_stddev_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Meeting_Recurring_Stddev_Pop_Fields = {
  __typename?: 'meeting_recurring_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Meeting_Recurring_Stddev_Samp_Fields = {
  __typename?: 'meeting_recurring_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "meeting_recurring" */
export type Meeting_Recurring_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Recurring_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Recurring_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  duration?: InputMaybe<Scalars['smallint']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  rrule?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['uuid']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** aggregate sum on columns */
export type Meeting_Recurring_Sum_Fields = {
  __typename?: 'meeting_recurring_sum_fields';
  duration?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** update columns of table "meeting_recurring" */
export enum Meeting_Recurring_Update_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  Rrule = 'rrule',
  /** column name */
  TemplateId = 'templateId',
  /** column name */
  VideoConf = 'videoConf'
}

export type Meeting_Recurring_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Meeting_Recurring_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Recurring_Set_Input>;
  where: Meeting_Recurring_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Meeting_Recurring_Var_Pop_Fields = {
  __typename?: 'meeting_recurring_var_pop_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Meeting_Recurring_Var_Samp_Fields = {
  __typename?: 'meeting_recurring_var_samp_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Meeting_Recurring_Variance_Fields = {
  __typename?: 'meeting_recurring_variance_fields';
  duration?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "meeting_recurring" */
export type Meeting_Recurring_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** select columns of table "meeting" */
export enum Meeting_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Attendees = 'attendees',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentStepId = 'currentStepId',
  /** column name */
  EndDate = 'endDate',
  /** column name */
  Ended = 'ended',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  RecurringDate = 'recurringDate',
  /** column name */
  RecurringId = 'recurringId',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Title = 'title',
  /** column name */
  VideoConf = 'videoConf'
}

/** select "meeting_aggregate_bool_exp_bool_and_arguments_columns" columns of table "meeting" */
export enum Meeting_Select_Column_Meeting_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Ended = 'ended'
}

/** select "meeting_aggregate_bool_exp_bool_or_arguments_columns" columns of table "meeting" */
export enum Meeting_Select_Column_Meeting_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Ended = 'ended'
}

/** input type for updating data in table "meeting" */
export type Meeting_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  attendees?: InputMaybe<Scalars['json']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** columns and relationships of "meeting_step" */
export type Meeting_Step = {
  __typename?: 'meeting_step';
  data: Scalars['meeting_step_data'];
  id: Scalars['uuid'];
  /** An object relationship */
  meeting: Meeting;
  meetingId: Scalars['uuid'];
  notes: Scalars['String'];
  stepConfigId: Scalars['String'];
  type: Meeting_Step_Type_Enum;
};


/** columns and relationships of "meeting_step" */
export type Meeting_StepDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "meeting_step" */
export type Meeting_Step_Aggregate = {
  __typename?: 'meeting_step_aggregate';
  aggregate?: Maybe<Meeting_Step_Aggregate_Fields>;
  nodes: Array<Meeting_Step>;
};

export type Meeting_Step_Aggregate_Bool_Exp = {
  count?: InputMaybe<Meeting_Step_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Step_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Step_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meeting_step" */
export type Meeting_Step_Aggregate_Fields = {
  __typename?: 'meeting_step_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Meeting_Step_Max_Fields>;
  min?: Maybe<Meeting_Step_Min_Fields>;
};


/** aggregate fields of "meeting_step" */
export type Meeting_Step_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "meeting_step" */
export type Meeting_Step_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meeting_Step_Max_Order_By>;
  min?: InputMaybe<Meeting_Step_Min_Order_By>;
};

/** input type for inserting array relation for remote table "meeting_step" */
export type Meeting_Step_Arr_Rel_Insert_Input = {
  data: Array<Meeting_Step_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Step_On_Conflict>;
};

/** Boolean expression to filter rows from the table "meeting_step". All fields are combined with a logical 'AND'. */
export type Meeting_Step_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Step_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Step_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Step_Bool_Exp>>;
  data?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meeting?: InputMaybe<Meeting_Bool_Exp>;
  meetingId?: InputMaybe<Uuid_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  stepConfigId?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Meeting_Step_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting_step" */
export enum Meeting_Step_Constraint {
  /** unique or primary key constraint on columns "id" */
  MeetingStepPkey = 'meeting_step_pkey'
}

/** input type for inserting data into table "meeting_step" */
export type Meeting_Step_Insert_Input = {
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meeting?: InputMaybe<Meeting_Obj_Rel_Insert_Input>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  notes?: InputMaybe<Scalars['String']>;
  stepConfigId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Meeting_Step_Type_Enum>;
};

/** aggregate max on columns */
export type Meeting_Step_Max_Fields = {
  __typename?: 'meeting_step_max_fields';
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  notes?: Maybe<Scalars['String']>;
  stepConfigId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "meeting_step" */
export type Meeting_Step_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  stepConfigId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meeting_Step_Min_Fields = {
  __typename?: 'meeting_step_min_fields';
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  notes?: Maybe<Scalars['String']>;
  stepConfigId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "meeting_step" */
export type Meeting_Step_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  stepConfigId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meeting_step" */
export type Meeting_Step_Mutation_Response = {
  __typename?: 'meeting_step_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting_Step>;
};

/** on_conflict condition type for table "meeting_step" */
export type Meeting_Step_On_Conflict = {
  constraint: Meeting_Step_Constraint;
  update_columns?: Array<Meeting_Step_Update_Column>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting_step". */
export type Meeting_Step_Order_By = {
  data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meeting?: InputMaybe<Meeting_Order_By>;
  meetingId?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  stepConfigId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting_step */
export type Meeting_Step_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "meeting_step" */
export enum Meeting_Step_Select_Column {
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  Notes = 'notes',
  /** column name */
  StepConfigId = 'stepConfigId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "meeting_step" */
export type Meeting_Step_Set_Input = {
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  notes?: InputMaybe<Scalars['String']>;
  stepConfigId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Meeting_Step_Type_Enum>;
};

/** Streaming cursor of the table "meeting_step" */
export type Meeting_Step_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Step_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Step_Stream_Cursor_Value_Input = {
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  notes?: InputMaybe<Scalars['String']>;
  stepConfigId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Meeting_Step_Type_Enum>;
};

/** columns and relationships of "meeting_step_type" */
export type Meeting_Step_Type = {
  __typename?: 'meeting_step_type';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "meeting_step_type" */
export type Meeting_Step_Type_Aggregate = {
  __typename?: 'meeting_step_type_aggregate';
  aggregate?: Maybe<Meeting_Step_Type_Aggregate_Fields>;
  nodes: Array<Meeting_Step_Type>;
};

/** aggregate fields of "meeting_step_type" */
export type Meeting_Step_Type_Aggregate_Fields = {
  __typename?: 'meeting_step_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Meeting_Step_Type_Max_Fields>;
  min?: Maybe<Meeting_Step_Type_Min_Fields>;
};


/** aggregate fields of "meeting_step_type" */
export type Meeting_Step_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Step_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "meeting_step_type". All fields are combined with a logical 'AND'. */
export type Meeting_Step_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Step_Type_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Step_Type_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting_step_type" */
export enum Meeting_Step_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  MeetingStepTypePkey = 'meeting_step_type_pkey'
}

export enum Meeting_Step_Type_Enum {
  Checklist = 'Checklist',
  Indicators = 'Indicators',
  Tasks = 'Tasks',
  Threads = 'Threads',
  Tour = 'Tour'
}

/** Boolean expression to compare columns of type "meeting_step_type_enum". All fields are combined with logical 'AND'. */
export type Meeting_Step_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Meeting_Step_Type_Enum>;
  _in?: InputMaybe<Array<Meeting_Step_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Meeting_Step_Type_Enum>;
  _nin?: InputMaybe<Array<Meeting_Step_Type_Enum>>;
};

/** input type for inserting data into table "meeting_step_type" */
export type Meeting_Step_Type_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Meeting_Step_Type_Max_Fields = {
  __typename?: 'meeting_step_type_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Meeting_Step_Type_Min_Fields = {
  __typename?: 'meeting_step_type_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "meeting_step_type" */
export type Meeting_Step_Type_Mutation_Response = {
  __typename?: 'meeting_step_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting_Step_Type>;
};

/** on_conflict condition type for table "meeting_step_type" */
export type Meeting_Step_Type_On_Conflict = {
  constraint: Meeting_Step_Type_Constraint;
  update_columns?: Array<Meeting_Step_Type_Update_Column>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting_step_type". */
export type Meeting_Step_Type_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting_step_type */
export type Meeting_Step_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "meeting_step_type" */
export enum Meeting_Step_Type_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "meeting_step_type" */
export type Meeting_Step_Type_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "meeting_step_type" */
export type Meeting_Step_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Step_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Step_Type_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "meeting_step_type" */
export enum Meeting_Step_Type_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Meeting_Step_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Step_Type_Set_Input>;
  where: Meeting_Step_Type_Bool_Exp;
};

/** update columns of table "meeting_step" */
export enum Meeting_Step_Update_Column {
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  Notes = 'notes',
  /** column name */
  StepConfigId = 'stepConfigId',
  /** column name */
  Type = 'type'
}

export type Meeting_Step_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Step_Set_Input>;
  where: Meeting_Step_Bool_Exp;
};

/** Streaming cursor of the table "meeting" */
export type Meeting_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  attendees?: InputMaybe<Scalars['json']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** columns and relationships of "meeting_template" */
export type Meeting_Template = {
  __typename?: 'meeting_template';
  id: Scalars['uuid'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  stepsConfig: Array<Scalars['meeting_step_config']>;
  title: Scalars['String'];
};


/** columns and relationships of "meeting_template" */
export type Meeting_TemplateStepsConfigArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "meeting_template" */
export type Meeting_Template_Aggregate = {
  __typename?: 'meeting_template_aggregate';
  aggregate?: Maybe<Meeting_Template_Aggregate_Fields>;
  nodes: Array<Meeting_Template>;
};

/** aggregate fields of "meeting_template" */
export type Meeting_Template_Aggregate_Fields = {
  __typename?: 'meeting_template_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Meeting_Template_Max_Fields>;
  min?: Maybe<Meeting_Template_Min_Fields>;
};


/** aggregate fields of "meeting_template" */
export type Meeting_Template_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "meeting_template". All fields are combined with a logical 'AND'. */
export type Meeting_Template_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Template_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Template_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Template_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  stepsConfig?: InputMaybe<Json_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting_template" */
export enum Meeting_Template_Constraint {
  /** unique or primary key constraint on columns "id" */
  MeetingTemplatePkey = 'meeting_template_pkey'
}

/** input type for inserting data into table "meeting_template" */
export type Meeting_Template_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Meeting_Template_Max_Fields = {
  __typename?: 'meeting_template_max_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Meeting_Template_Min_Fields = {
  __typename?: 'meeting_template_min_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "meeting_template" */
export type Meeting_Template_Mutation_Response = {
  __typename?: 'meeting_template_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting_Template>;
};

/** input type for inserting object relation for remote table "meeting_template" */
export type Meeting_Template_Obj_Rel_Insert_Input = {
  data: Meeting_Template_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Template_On_Conflict>;
};

/** on_conflict condition type for table "meeting_template" */
export type Meeting_Template_On_Conflict = {
  constraint: Meeting_Template_Constraint;
  update_columns?: Array<Meeting_Template_Update_Column>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting_template". */
export type Meeting_Template_Order_By = {
  id?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  stepsConfig?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting_template */
export type Meeting_Template_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "meeting_template" */
export enum Meeting_Template_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "meeting_template" */
export type Meeting_Template_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "meeting_template" */
export type Meeting_Template_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Template_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Template_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  title?: InputMaybe<Scalars['String']>;
};

/** update columns of table "meeting_template" */
export enum Meeting_Template_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Title = 'title'
}

export type Meeting_Template_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Template_Set_Input>;
  where: Meeting_Template_Bool_Exp;
};

/** update columns of table "meeting" */
export enum Meeting_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Attendees = 'attendees',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentStepId = 'currentStepId',
  /** column name */
  EndDate = 'endDate',
  /** column name */
  Ended = 'ended',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  RecurringDate = 'recurringDate',
  /** column name */
  RecurringId = 'recurringId',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Title = 'title',
  /** column name */
  VideoConf = 'videoConf'
}

export type Meeting_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Set_Input>;
  where: Meeting_Bool_Exp;
};

/** columns and relationships of "member" */
export type Member = {
  __typename?: 'member';
  archived: Scalars['Boolean'];
  /** An array relationship */
  circle_members: Array<Circle_Member>;
  /** An aggregate relationship */
  circle_members_aggregate: Circle_Member_Aggregate;
  description: Scalars['String'];
  id: Scalars['uuid'];
  inviteDate?: Maybe<Scalars['timestamptz']>;
  inviteEmail?: Maybe<Scalars['String']>;
  meetingId?: Maybe<Scalars['uuid']>;
  name: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  picture?: Maybe<Scalars['String']>;
  /** An object relationship */
  pictureFile?: Maybe<Files>;
  pictureFileId?: Maybe<Scalars['uuid']>;
  preferences?: Maybe<Scalars['json']>;
  role?: Maybe<Member_Role_Enum>;
  /** An object relationship */
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['uuid']>;
  workedMinPerWeek?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "member" */
export type MemberCircle_MembersArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


/** columns and relationships of "member" */
export type MemberCircle_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


/** columns and relationships of "member" */
export type MemberPreferencesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "member" */
export type Member_Aggregate = {
  __typename?: 'member_aggregate';
  aggregate?: Maybe<Member_Aggregate_Fields>;
  nodes: Array<Member>;
};

export type Member_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Member_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Member_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Member_Aggregate_Bool_Exp_Count>;
};

export type Member_Aggregate_Bool_Exp_Bool_And = {
  arguments: Member_Select_Column_Member_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Member_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Member_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Member_Select_Column_Member_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Member_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Member_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "member" */
export type Member_Aggregate_Fields = {
  __typename?: 'member_aggregate_fields';
  avg?: Maybe<Member_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Member_Max_Fields>;
  min?: Maybe<Member_Min_Fields>;
  stddev?: Maybe<Member_Stddev_Fields>;
  stddev_pop?: Maybe<Member_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Member_Stddev_Samp_Fields>;
  sum?: Maybe<Member_Sum_Fields>;
  var_pop?: Maybe<Member_Var_Pop_Fields>;
  var_samp?: Maybe<Member_Var_Samp_Fields>;
  variance?: Maybe<Member_Variance_Fields>;
};


/** aggregate fields of "member" */
export type Member_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "member" */
export type Member_Aggregate_Order_By = {
  avg?: InputMaybe<Member_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Member_Max_Order_By>;
  min?: InputMaybe<Member_Min_Order_By>;
  stddev?: InputMaybe<Member_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Member_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Member_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Member_Sum_Order_By>;
  var_pop?: InputMaybe<Member_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Member_Var_Samp_Order_By>;
  variance?: InputMaybe<Member_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "member" */
export type Member_Arr_Rel_Insert_Input = {
  data: Array<Member_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Member_On_Conflict>;
};

/** aggregate avg on columns */
export type Member_Avg_Fields = {
  __typename?: 'member_avg_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "member" */
export type Member_Avg_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "member". All fields are combined with a logical 'AND'. */
export type Member_Bool_Exp = {
  _and?: InputMaybe<Array<Member_Bool_Exp>>;
  _not?: InputMaybe<Member_Bool_Exp>;
  _or?: InputMaybe<Array<Member_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle_members?: InputMaybe<Circle_Member_Bool_Exp>;
  circle_members_aggregate?: InputMaybe<Circle_Member_Aggregate_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inviteDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  inviteEmail?: InputMaybe<String_Comparison_Exp>;
  meetingId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  pictureFile?: InputMaybe<Files_Bool_Exp>;
  pictureFileId?: InputMaybe<Uuid_Comparison_Exp>;
  preferences?: InputMaybe<Json_Comparison_Exp>;
  role?: InputMaybe<Member_Role_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
  workedMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "member" */
export enum Member_Constraint {
  /** unique or primary key constraint on columns "orgId", "userId" */
  MemberOrgIdUserIdKey = 'member_orgId_userId_key',
  /** unique or primary key constraint on columns "id" */
  MemberPkey = 'member_pkey'
}

/** input type for incrementing numeric columns in table "member" */
export type Member_Inc_Input = {
  workedMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "member" */
export type Member_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circle_members?: InputMaybe<Circle_Member_Arr_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  inviteDate?: InputMaybe<Scalars['timestamptz']>;
  inviteEmail?: InputMaybe<Scalars['String']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFile?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
  preferences?: InputMaybe<Scalars['json']>;
  role?: InputMaybe<Member_Role_Enum>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
  workedMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Member_Max_Fields = {
  __typename?: 'member_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  inviteDate?: Maybe<Scalars['timestamptz']>;
  inviteEmail?: Maybe<Scalars['String']>;
  meetingId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  pictureFileId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
  workedMinPerWeek?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "member" */
export type Member_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inviteDate?: InputMaybe<Order_By>;
  inviteEmail?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  pictureFileId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Member_Min_Fields = {
  __typename?: 'member_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  inviteDate?: Maybe<Scalars['timestamptz']>;
  inviteEmail?: Maybe<Scalars['String']>;
  meetingId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  pictureFileId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
  workedMinPerWeek?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "member" */
export type Member_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inviteDate?: InputMaybe<Order_By>;
  inviteEmail?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  pictureFileId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "member" */
export type Member_Mutation_Response = {
  __typename?: 'member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Member>;
};

/** input type for inserting object relation for remote table "member" */
export type Member_Obj_Rel_Insert_Input = {
  data: Member_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Member_On_Conflict>;
};

/** on_conflict condition type for table "member" */
export type Member_On_Conflict = {
  constraint: Member_Constraint;
  update_columns?: Array<Member_Update_Column>;
  where?: InputMaybe<Member_Bool_Exp>;
};

/** Ordering options when selecting data from "member". */
export type Member_Order_By = {
  archived?: InputMaybe<Order_By>;
  circle_members_aggregate?: InputMaybe<Circle_Member_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inviteDate?: InputMaybe<Order_By>;
  inviteEmail?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  pictureFile?: InputMaybe<Files_Order_By>;
  pictureFileId?: InputMaybe<Order_By>;
  preferences?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** primary key columns input for table: member */
export type Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "member_role" */
export type Member_Role = {
  __typename?: 'member_role';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "member_role" */
export type Member_Role_Aggregate = {
  __typename?: 'member_role_aggregate';
  aggregate?: Maybe<Member_Role_Aggregate_Fields>;
  nodes: Array<Member_Role>;
};

/** aggregate fields of "member_role" */
export type Member_Role_Aggregate_Fields = {
  __typename?: 'member_role_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Member_Role_Max_Fields>;
  min?: Maybe<Member_Role_Min_Fields>;
};


/** aggregate fields of "member_role" */
export type Member_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Member_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "member_role". All fields are combined with a logical 'AND'. */
export type Member_Role_Bool_Exp = {
  _and?: InputMaybe<Array<Member_Role_Bool_Exp>>;
  _not?: InputMaybe<Member_Role_Bool_Exp>;
  _or?: InputMaybe<Array<Member_Role_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "member_role" */
export enum Member_Role_Constraint {
  /** unique or primary key constraint on columns "value" */
  MemberRolePkey = 'member_role_pkey'
}

export enum Member_Role_Enum {
  /** Can invite members */
  Admin = 'Admin',
  /** Can participate and edit everything */
  Member = 'Member',
  /** Can subscribe */
  Owner = 'Owner',
  /** Can view but not participate */
  Readonly = 'Readonly'
}

/** Boolean expression to compare columns of type "member_role_enum". All fields are combined with logical 'AND'. */
export type Member_Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Member_Role_Enum>;
  _in?: InputMaybe<Array<Member_Role_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Member_Role_Enum>;
  _nin?: InputMaybe<Array<Member_Role_Enum>>;
};

/** input type for inserting data into table "member_role" */
export type Member_Role_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Member_Role_Max_Fields = {
  __typename?: 'member_role_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Member_Role_Min_Fields = {
  __typename?: 'member_role_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "member_role" */
export type Member_Role_Mutation_Response = {
  __typename?: 'member_role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Member_Role>;
};

/** on_conflict condition type for table "member_role" */
export type Member_Role_On_Conflict = {
  constraint: Member_Role_Constraint;
  update_columns?: Array<Member_Role_Update_Column>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};

/** Ordering options when selecting data from "member_role". */
export type Member_Role_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: member_role */
export type Member_Role_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "member_role" */
export enum Member_Role_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "member_role" */
export type Member_Role_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "member_role" */
export type Member_Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Member_Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Member_Role_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "member_role" */
export enum Member_Role_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Member_Role_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Member_Role_Set_Input>;
  where: Member_Role_Bool_Exp;
};

/** columns and relationships of "member_scope" */
export type Member_Scope = {
  __typename?: 'member_scope';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "member_scope" */
export type Member_Scope_Aggregate = {
  __typename?: 'member_scope_aggregate';
  aggregate?: Maybe<Member_Scope_Aggregate_Fields>;
  nodes: Array<Member_Scope>;
};

/** aggregate fields of "member_scope" */
export type Member_Scope_Aggregate_Fields = {
  __typename?: 'member_scope_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Member_Scope_Max_Fields>;
  min?: Maybe<Member_Scope_Min_Fields>;
};


/** aggregate fields of "member_scope" */
export type Member_Scope_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Member_Scope_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "member_scope". All fields are combined with a logical 'AND'. */
export type Member_Scope_Bool_Exp = {
  _and?: InputMaybe<Array<Member_Scope_Bool_Exp>>;
  _not?: InputMaybe<Member_Scope_Bool_Exp>;
  _or?: InputMaybe<Array<Member_Scope_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "member_scope" */
export enum Member_Scope_Constraint {
  /** unique or primary key constraint on columns "value" */
  MemberScopePkey = 'member_scope_pkey'
}

export enum Member_Scope_Enum {
  /** All Leaders of Roles and sub-Circles in Circle */
  CircleLeaders = 'CircleLeaders',
  /** All members in Circle and sub-Circles */
  CircleMembers = 'CircleMembers',
  /** None (select members manually) */
  None = 'None',
  /** All members of the organization */
  Organization = 'Organization'
}

/** Boolean expression to compare columns of type "member_scope_enum". All fields are combined with logical 'AND'. */
export type Member_Scope_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Member_Scope_Enum>;
  _in?: InputMaybe<Array<Member_Scope_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Member_Scope_Enum>;
  _nin?: InputMaybe<Array<Member_Scope_Enum>>;
};

/** input type for inserting data into table "member_scope" */
export type Member_Scope_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Member_Scope_Max_Fields = {
  __typename?: 'member_scope_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Member_Scope_Min_Fields = {
  __typename?: 'member_scope_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "member_scope" */
export type Member_Scope_Mutation_Response = {
  __typename?: 'member_scope_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Member_Scope>;
};

/** on_conflict condition type for table "member_scope" */
export type Member_Scope_On_Conflict = {
  constraint: Member_Scope_Constraint;
  update_columns?: Array<Member_Scope_Update_Column>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};

/** Ordering options when selecting data from "member_scope". */
export type Member_Scope_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: member_scope */
export type Member_Scope_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "member_scope" */
export enum Member_Scope_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "member_scope" */
export type Member_Scope_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "member_scope" */
export type Member_Scope_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Member_Scope_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Member_Scope_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "member_scope" */
export enum Member_Scope_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Member_Scope_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Member_Scope_Set_Input>;
  where: Member_Scope_Bool_Exp;
};

/** select columns of table "member" */
export enum Member_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  InviteDate = 'inviteDate',
  /** column name */
  InviteEmail = 'inviteEmail',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  Name = 'name',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Picture = 'picture',
  /** column name */
  PictureFileId = 'pictureFileId',
  /** column name */
  Preferences = 'preferences',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkedMinPerWeek = 'workedMinPerWeek'
}

/** select "member_aggregate_bool_exp_bool_and_arguments_columns" columns of table "member" */
export enum Member_Select_Column_Member_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** select "member_aggregate_bool_exp_bool_or_arguments_columns" columns of table "member" */
export enum Member_Select_Column_Member_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived'
}

/** input type for updating data in table "member" */
export type Member_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  inviteDate?: InputMaybe<Scalars['timestamptz']>;
  inviteEmail?: InputMaybe<Scalars['String']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
  preferences?: InputMaybe<Scalars['json']>;
  role?: InputMaybe<Member_Role_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
  workedMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Member_Stddev_Fields = {
  __typename?: 'member_stddev_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "member" */
export type Member_Stddev_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Member_Stddev_Pop_Fields = {
  __typename?: 'member_stddev_pop_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "member" */
export type Member_Stddev_Pop_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Member_Stddev_Samp_Fields = {
  __typename?: 'member_stddev_samp_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "member" */
export type Member_Stddev_Samp_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "member" */
export type Member_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Member_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Member_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  inviteDate?: InputMaybe<Scalars['timestamptz']>;
  inviteEmail?: InputMaybe<Scalars['String']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
  preferences?: InputMaybe<Scalars['json']>;
  role?: InputMaybe<Member_Role_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
  workedMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Member_Sum_Fields = {
  __typename?: 'member_sum_fields';
  workedMinPerWeek?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "member" */
export type Member_Sum_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** update columns of table "member" */
export enum Member_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  InviteDate = 'inviteDate',
  /** column name */
  InviteEmail = 'inviteEmail',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  Name = 'name',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Picture = 'picture',
  /** column name */
  PictureFileId = 'pictureFileId',
  /** column name */
  Preferences = 'preferences',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkedMinPerWeek = 'workedMinPerWeek'
}

export type Member_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Member_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Member_Set_Input>;
  where: Member_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Member_Var_Pop_Fields = {
  __typename?: 'member_var_pop_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "member" */
export type Member_Var_Pop_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Member_Var_Samp_Fields = {
  __typename?: 'member_var_samp_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "member" */
export type Member_Var_Samp_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Member_Variance_Fields = {
  __typename?: 'member_variance_fields';
  workedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "member" */
export type Member_Variance_Order_By = {
  workedMinPerWeek?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "auth.providers" */
  deleteAuthProvider?: Maybe<AuthProviders>;
  /** delete single row from the table: "auth.provider_requests" */
  deleteAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** delete data from the table: "auth.provider_requests" */
  deleteAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** delete data from the table: "auth.providers" */
  deleteAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** delete single row from the table: "auth.refresh_tokens" */
  deleteAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** delete data from the table: "auth.refresh_tokens" */
  deleteAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** delete single row from the table: "auth.roles" */
  deleteAuthRole?: Maybe<AuthRoles>;
  /** delete data from the table: "auth.roles" */
  deleteAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** delete single row from the table: "auth.user_providers" */
  deleteAuthUserProvider?: Maybe<AuthUserProviders>;
  /** delete data from the table: "auth.user_providers" */
  deleteAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** delete single row from the table: "auth.user_roles" */
  deleteAuthUserRole?: Maybe<AuthUserRoles>;
  /** delete data from the table: "auth.user_roles" */
  deleteAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** delete single row from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** delete data from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** delete single row from the table: "storage.buckets" */
  deleteBucket?: Maybe<Buckets>;
  /** delete data from the table: "storage.buckets" */
  deleteBuckets?: Maybe<Buckets_Mutation_Response>;
  /** delete single row from the table: "storage.files" */
  deleteFile?: Maybe<Files>;
  /** delete data from the table: "storage.files" */
  deleteFiles?: Maybe<Files_Mutation_Response>;
  /** delete single row from the table: "auth.users" */
  deleteUser?: Maybe<Users>;
  /** delete data from the table: "auth.users" */
  deleteUsers?: Maybe<Users_Mutation_Response>;
  /** delete data from the table: "circle" */
  delete_circle?: Maybe<Circle_Mutation_Response>;
  /** delete single row from the table: "circle" */
  delete_circle_by_pk?: Maybe<Circle>;
  /** delete data from the table: "circle_member" */
  delete_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** delete single row from the table: "circle_member" */
  delete_circle_member_by_pk?: Maybe<Circle_Member>;
  /** delete data from the table: "decision" */
  delete_decision?: Maybe<Decision_Mutation_Response>;
  /** delete single row from the table: "decision" */
  delete_decision_by_pk?: Maybe<Decision>;
  /** delete data from the table: "log" */
  delete_log?: Maybe<Log_Mutation_Response>;
  /** delete single row from the table: "log" */
  delete_log_by_pk?: Maybe<Log>;
  /** delete data from the table: "meeting" */
  delete_meeting?: Maybe<Meeting_Mutation_Response>;
  /** delete single row from the table: "meeting" */
  delete_meeting_by_pk?: Maybe<Meeting>;
  /** delete data from the table: "meeting_recurring" */
  delete_meeting_recurring?: Maybe<Meeting_Recurring_Mutation_Response>;
  /** delete single row from the table: "meeting_recurring" */
  delete_meeting_recurring_by_pk?: Maybe<Meeting_Recurring>;
  /** delete data from the table: "meeting_step" */
  delete_meeting_step?: Maybe<Meeting_Step_Mutation_Response>;
  /** delete single row from the table: "meeting_step" */
  delete_meeting_step_by_pk?: Maybe<Meeting_Step>;
  /** delete data from the table: "meeting_step_type" */
  delete_meeting_step_type?: Maybe<Meeting_Step_Type_Mutation_Response>;
  /** delete single row from the table: "meeting_step_type" */
  delete_meeting_step_type_by_pk?: Maybe<Meeting_Step_Type>;
  /** delete data from the table: "meeting_template" */
  delete_meeting_template?: Maybe<Meeting_Template_Mutation_Response>;
  /** delete single row from the table: "meeting_template" */
  delete_meeting_template_by_pk?: Maybe<Meeting_Template>;
  /** delete data from the table: "member" */
  delete_member?: Maybe<Member_Mutation_Response>;
  /** delete single row from the table: "member" */
  delete_member_by_pk?: Maybe<Member>;
  /** delete data from the table: "member_role" */
  delete_member_role?: Maybe<Member_Role_Mutation_Response>;
  /** delete single row from the table: "member_role" */
  delete_member_role_by_pk?: Maybe<Member_Role>;
  /** delete data from the table: "member_scope" */
  delete_member_scope?: Maybe<Member_Scope_Mutation_Response>;
  /** delete single row from the table: "member_scope" */
  delete_member_scope_by_pk?: Maybe<Member_Scope>;
  /** delete data from the table: "old_id" */
  delete_old_id?: Maybe<Old_Id_Mutation_Response>;
  /** delete single row from the table: "old_id" */
  delete_old_id_by_pk?: Maybe<Old_Id>;
  /** delete data from the table: "org" */
  delete_org?: Maybe<Org_Mutation_Response>;
  /** delete single row from the table: "org" */
  delete_org_by_pk?: Maybe<Org>;
  /** delete data from the table: "org_file" */
  delete_org_file?: Maybe<Org_File_Mutation_Response>;
  /** delete single row from the table: "org_file" */
  delete_org_file_by_pk?: Maybe<Org_File>;
  /** delete data from the table: "role" */
  delete_role?: Maybe<Role_Mutation_Response>;
  /** delete single row from the table: "role" */
  delete_role_by_pk?: Maybe<Role>;
  /** delete data from the table: "task" */
  delete_task?: Maybe<Task_Mutation_Response>;
  /** delete single row from the table: "task" */
  delete_task_by_pk?: Maybe<Task>;
  /** delete data from the table: "task_status" */
  delete_task_status?: Maybe<Task_Status_Mutation_Response>;
  /** delete single row from the table: "task_status" */
  delete_task_status_by_pk?: Maybe<Task_Status>;
  /** delete data from the table: "task_view" */
  delete_task_view?: Maybe<Task_View_Mutation_Response>;
  /** delete single row from the table: "task_view" */
  delete_task_view_by_pk?: Maybe<Task_View>;
  /** delete data from the table: "thread" */
  delete_thread?: Maybe<Thread_Mutation_Response>;
  /** delete data from the table: "thread_activity" */
  delete_thread_activity?: Maybe<Thread_Activity_Mutation_Response>;
  /** delete single row from the table: "thread_activity" */
  delete_thread_activity_by_pk?: Maybe<Thread_Activity>;
  /** delete data from the table: "thread_activity_type" */
  delete_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** delete single row from the table: "thread_activity_type" */
  delete_thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** delete single row from the table: "thread" */
  delete_thread_by_pk?: Maybe<Thread>;
  /** delete data from the table: "thread_member_status" */
  delete_thread_member_status?: Maybe<Thread_Member_Status_Mutation_Response>;
  /** delete single row from the table: "thread_member_status" */
  delete_thread_member_status_by_pk?: Maybe<Thread_Member_Status>;
  /** delete data from the table: "thread_poll_answer" */
  delete_thread_poll_answer?: Maybe<Thread_Poll_Answer_Mutation_Response>;
  /** delete single row from the table: "thread_poll_answer" */
  delete_thread_poll_answer_by_pk?: Maybe<Thread_Poll_Answer>;
  /** insert a single row into the table: "auth.providers" */
  insertAuthProvider?: Maybe<AuthProviders>;
  /** insert a single row into the table: "auth.provider_requests" */
  insertAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** insert data into the table: "auth.provider_requests" */
  insertAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** insert data into the table: "auth.providers" */
  insertAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.refresh_tokens" */
  insertAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** insert data into the table: "auth.refresh_tokens" */
  insertAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** insert a single row into the table: "auth.roles" */
  insertAuthRole?: Maybe<AuthRoles>;
  /** insert data into the table: "auth.roles" */
  insertAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.user_providers" */
  insertAuthUserProvider?: Maybe<AuthUserProviders>;
  /** insert data into the table: "auth.user_providers" */
  insertAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.user_roles" */
  insertAuthUserRole?: Maybe<AuthUserRoles>;
  /** insert data into the table: "auth.user_roles" */
  insertAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** insert data into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** insert a single row into the table: "storage.buckets" */
  insertBucket?: Maybe<Buckets>;
  /** insert data into the table: "storage.buckets" */
  insertBuckets?: Maybe<Buckets_Mutation_Response>;
  /** insert a single row into the table: "storage.files" */
  insertFile?: Maybe<Files>;
  /** insert data into the table: "storage.files" */
  insertFiles?: Maybe<Files_Mutation_Response>;
  /** insert a single row into the table: "auth.users" */
  insertUser?: Maybe<Users>;
  /** insert data into the table: "auth.users" */
  insertUsers?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "circle" */
  insert_circle?: Maybe<Circle_Mutation_Response>;
  /** insert data into the table: "circle_member" */
  insert_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** insert a single row into the table: "circle_member" */
  insert_circle_member_one?: Maybe<Circle_Member>;
  /** insert a single row into the table: "circle" */
  insert_circle_one?: Maybe<Circle>;
  /** insert data into the table: "decision" */
  insert_decision?: Maybe<Decision_Mutation_Response>;
  /** insert a single row into the table: "decision" */
  insert_decision_one?: Maybe<Decision>;
  /** insert data into the table: "log" */
  insert_log?: Maybe<Log_Mutation_Response>;
  /** insert a single row into the table: "log" */
  insert_log_one?: Maybe<Log>;
  /** insert data into the table: "meeting" */
  insert_meeting?: Maybe<Meeting_Mutation_Response>;
  /** insert a single row into the table: "meeting" */
  insert_meeting_one?: Maybe<Meeting>;
  /** insert data into the table: "meeting_recurring" */
  insert_meeting_recurring?: Maybe<Meeting_Recurring_Mutation_Response>;
  /** insert a single row into the table: "meeting_recurring" */
  insert_meeting_recurring_one?: Maybe<Meeting_Recurring>;
  /** insert data into the table: "meeting_step" */
  insert_meeting_step?: Maybe<Meeting_Step_Mutation_Response>;
  /** insert a single row into the table: "meeting_step" */
  insert_meeting_step_one?: Maybe<Meeting_Step>;
  /** insert data into the table: "meeting_step_type" */
  insert_meeting_step_type?: Maybe<Meeting_Step_Type_Mutation_Response>;
  /** insert a single row into the table: "meeting_step_type" */
  insert_meeting_step_type_one?: Maybe<Meeting_Step_Type>;
  /** insert data into the table: "meeting_template" */
  insert_meeting_template?: Maybe<Meeting_Template_Mutation_Response>;
  /** insert a single row into the table: "meeting_template" */
  insert_meeting_template_one?: Maybe<Meeting_Template>;
  /** insert data into the table: "member" */
  insert_member?: Maybe<Member_Mutation_Response>;
  /** insert a single row into the table: "member" */
  insert_member_one?: Maybe<Member>;
  /** insert data into the table: "member_role" */
  insert_member_role?: Maybe<Member_Role_Mutation_Response>;
  /** insert a single row into the table: "member_role" */
  insert_member_role_one?: Maybe<Member_Role>;
  /** insert data into the table: "member_scope" */
  insert_member_scope?: Maybe<Member_Scope_Mutation_Response>;
  /** insert a single row into the table: "member_scope" */
  insert_member_scope_one?: Maybe<Member_Scope>;
  /** insert data into the table: "old_id" */
  insert_old_id?: Maybe<Old_Id_Mutation_Response>;
  /** insert a single row into the table: "old_id" */
  insert_old_id_one?: Maybe<Old_Id>;
  /** insert data into the table: "org" */
  insert_org?: Maybe<Org_Mutation_Response>;
  /** insert data into the table: "org_file" */
  insert_org_file?: Maybe<Org_File_Mutation_Response>;
  /** insert a single row into the table: "org_file" */
  insert_org_file_one?: Maybe<Org_File>;
  /** insert a single row into the table: "org" */
  insert_org_one?: Maybe<Org>;
  /** insert data into the table: "role" */
  insert_role?: Maybe<Role_Mutation_Response>;
  /** insert a single row into the table: "role" */
  insert_role_one?: Maybe<Role>;
  /** insert data into the table: "task" */
  insert_task?: Maybe<Task_Mutation_Response>;
  /** insert a single row into the table: "task" */
  insert_task_one?: Maybe<Task>;
  /** insert data into the table: "task_status" */
  insert_task_status?: Maybe<Task_Status_Mutation_Response>;
  /** insert a single row into the table: "task_status" */
  insert_task_status_one?: Maybe<Task_Status>;
  /** insert data into the table: "task_view" */
  insert_task_view?: Maybe<Task_View_Mutation_Response>;
  /** insert a single row into the table: "task_view" */
  insert_task_view_one?: Maybe<Task_View>;
  /** insert data into the table: "thread" */
  insert_thread?: Maybe<Thread_Mutation_Response>;
  /** insert data into the table: "thread_activity" */
  insert_thread_activity?: Maybe<Thread_Activity_Mutation_Response>;
  /** insert a single row into the table: "thread_activity" */
  insert_thread_activity_one?: Maybe<Thread_Activity>;
  /** insert data into the table: "thread_activity_type" */
  insert_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** insert a single row into the table: "thread_activity_type" */
  insert_thread_activity_type_one?: Maybe<Thread_Activity_Type>;
  /** insert data into the table: "thread_member_status" */
  insert_thread_member_status?: Maybe<Thread_Member_Status_Mutation_Response>;
  /** insert a single row into the table: "thread_member_status" */
  insert_thread_member_status_one?: Maybe<Thread_Member_Status>;
  /** insert a single row into the table: "thread" */
  insert_thread_one?: Maybe<Thread>;
  /** insert data into the table: "thread_poll_answer" */
  insert_thread_poll_answer?: Maybe<Thread_Poll_Answer_Mutation_Response>;
  /** insert a single row into the table: "thread_poll_answer" */
  insert_thread_poll_answer_one?: Maybe<Thread_Poll_Answer>;
  /** update single row of the table: "auth.providers" */
  updateAuthProvider?: Maybe<AuthProviders>;
  /** update single row of the table: "auth.provider_requests" */
  updateAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** update data of the table: "auth.provider_requests" */
  updateAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** update data of the table: "auth.providers" */
  updateAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** update single row of the table: "auth.refresh_tokens" */
  updateAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** update data of the table: "auth.refresh_tokens" */
  updateAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** update single row of the table: "auth.roles" */
  updateAuthRole?: Maybe<AuthRoles>;
  /** update data of the table: "auth.roles" */
  updateAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** update single row of the table: "auth.user_providers" */
  updateAuthUserProvider?: Maybe<AuthUserProviders>;
  /** update data of the table: "auth.user_providers" */
  updateAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** update single row of the table: "auth.user_roles" */
  updateAuthUserRole?: Maybe<AuthUserRoles>;
  /** update data of the table: "auth.user_roles" */
  updateAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** update single row of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** update data of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** update single row of the table: "storage.buckets" */
  updateBucket?: Maybe<Buckets>;
  /** update data of the table: "storage.buckets" */
  updateBuckets?: Maybe<Buckets_Mutation_Response>;
  /** update single row of the table: "storage.files" */
  updateFile?: Maybe<Files>;
  /** update data of the table: "storage.files" */
  updateFiles?: Maybe<Files_Mutation_Response>;
  /** update single row of the table: "auth.users" */
  updateUser?: Maybe<Users>;
  /** update data of the table: "auth.users" */
  updateUsers?: Maybe<Users_Mutation_Response>;
  /** update multiples rows of table: "auth.provider_requests" */
  update_authProviderRequests_many?: Maybe<Array<Maybe<AuthProviderRequests_Mutation_Response>>>;
  /** update multiples rows of table: "auth.providers" */
  update_authProviders_many?: Maybe<Array<Maybe<AuthProviders_Mutation_Response>>>;
  /** update multiples rows of table: "auth.refresh_tokens" */
  update_authRefreshTokens_many?: Maybe<Array<Maybe<AuthRefreshTokens_Mutation_Response>>>;
  /** update multiples rows of table: "auth.roles" */
  update_authRoles_many?: Maybe<Array<Maybe<AuthRoles_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_providers" */
  update_authUserProviders_many?: Maybe<Array<Maybe<AuthUserProviders_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_roles" */
  update_authUserRoles_many?: Maybe<Array<Maybe<AuthUserRoles_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_security_keys" */
  update_authUserSecurityKeys_many?: Maybe<Array<Maybe<AuthUserSecurityKeys_Mutation_Response>>>;
  /** update multiples rows of table: "storage.buckets" */
  update_buckets_many?: Maybe<Array<Maybe<Buckets_Mutation_Response>>>;
  /** update data of the table: "circle" */
  update_circle?: Maybe<Circle_Mutation_Response>;
  /** update single row of the table: "circle" */
  update_circle_by_pk?: Maybe<Circle>;
  /** update multiples rows of table: "circle" */
  update_circle_many?: Maybe<Array<Maybe<Circle_Mutation_Response>>>;
  /** update data of the table: "circle_member" */
  update_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** update single row of the table: "circle_member" */
  update_circle_member_by_pk?: Maybe<Circle_Member>;
  /** update multiples rows of table: "circle_member" */
  update_circle_member_many?: Maybe<Array<Maybe<Circle_Member_Mutation_Response>>>;
  /** update data of the table: "decision" */
  update_decision?: Maybe<Decision_Mutation_Response>;
  /** update single row of the table: "decision" */
  update_decision_by_pk?: Maybe<Decision>;
  /** update multiples rows of table: "decision" */
  update_decision_many?: Maybe<Array<Maybe<Decision_Mutation_Response>>>;
  /** update multiples rows of table: "storage.files" */
  update_files_many?: Maybe<Array<Maybe<Files_Mutation_Response>>>;
  /** update data of the table: "log" */
  update_log?: Maybe<Log_Mutation_Response>;
  /** update single row of the table: "log" */
  update_log_by_pk?: Maybe<Log>;
  /** update multiples rows of table: "log" */
  update_log_many?: Maybe<Array<Maybe<Log_Mutation_Response>>>;
  /** update data of the table: "meeting" */
  update_meeting?: Maybe<Meeting_Mutation_Response>;
  /** update single row of the table: "meeting" */
  update_meeting_by_pk?: Maybe<Meeting>;
  /** update multiples rows of table: "meeting" */
  update_meeting_many?: Maybe<Array<Maybe<Meeting_Mutation_Response>>>;
  /** update data of the table: "meeting_recurring" */
  update_meeting_recurring?: Maybe<Meeting_Recurring_Mutation_Response>;
  /** update single row of the table: "meeting_recurring" */
  update_meeting_recurring_by_pk?: Maybe<Meeting_Recurring>;
  /** update multiples rows of table: "meeting_recurring" */
  update_meeting_recurring_many?: Maybe<Array<Maybe<Meeting_Recurring_Mutation_Response>>>;
  /** update data of the table: "meeting_step" */
  update_meeting_step?: Maybe<Meeting_Step_Mutation_Response>;
  /** update single row of the table: "meeting_step" */
  update_meeting_step_by_pk?: Maybe<Meeting_Step>;
  /** update multiples rows of table: "meeting_step" */
  update_meeting_step_many?: Maybe<Array<Maybe<Meeting_Step_Mutation_Response>>>;
  /** update data of the table: "meeting_step_type" */
  update_meeting_step_type?: Maybe<Meeting_Step_Type_Mutation_Response>;
  /** update single row of the table: "meeting_step_type" */
  update_meeting_step_type_by_pk?: Maybe<Meeting_Step_Type>;
  /** update multiples rows of table: "meeting_step_type" */
  update_meeting_step_type_many?: Maybe<Array<Maybe<Meeting_Step_Type_Mutation_Response>>>;
  /** update data of the table: "meeting_template" */
  update_meeting_template?: Maybe<Meeting_Template_Mutation_Response>;
  /** update single row of the table: "meeting_template" */
  update_meeting_template_by_pk?: Maybe<Meeting_Template>;
  /** update multiples rows of table: "meeting_template" */
  update_meeting_template_many?: Maybe<Array<Maybe<Meeting_Template_Mutation_Response>>>;
  /** update data of the table: "member" */
  update_member?: Maybe<Member_Mutation_Response>;
  /** update single row of the table: "member" */
  update_member_by_pk?: Maybe<Member>;
  /** update multiples rows of table: "member" */
  update_member_many?: Maybe<Array<Maybe<Member_Mutation_Response>>>;
  /** update data of the table: "member_role" */
  update_member_role?: Maybe<Member_Role_Mutation_Response>;
  /** update single row of the table: "member_role" */
  update_member_role_by_pk?: Maybe<Member_Role>;
  /** update multiples rows of table: "member_role" */
  update_member_role_many?: Maybe<Array<Maybe<Member_Role_Mutation_Response>>>;
  /** update data of the table: "member_scope" */
  update_member_scope?: Maybe<Member_Scope_Mutation_Response>;
  /** update single row of the table: "member_scope" */
  update_member_scope_by_pk?: Maybe<Member_Scope>;
  /** update multiples rows of table: "member_scope" */
  update_member_scope_many?: Maybe<Array<Maybe<Member_Scope_Mutation_Response>>>;
  /** update data of the table: "old_id" */
  update_old_id?: Maybe<Old_Id_Mutation_Response>;
  /** update single row of the table: "old_id" */
  update_old_id_by_pk?: Maybe<Old_Id>;
  /** update multiples rows of table: "old_id" */
  update_old_id_many?: Maybe<Array<Maybe<Old_Id_Mutation_Response>>>;
  /** update data of the table: "org" */
  update_org?: Maybe<Org_Mutation_Response>;
  /** update single row of the table: "org" */
  update_org_by_pk?: Maybe<Org>;
  /** update data of the table: "org_file" */
  update_org_file?: Maybe<Org_File_Mutation_Response>;
  /** update single row of the table: "org_file" */
  update_org_file_by_pk?: Maybe<Org_File>;
  /** update multiples rows of table: "org_file" */
  update_org_file_many?: Maybe<Array<Maybe<Org_File_Mutation_Response>>>;
  /** update multiples rows of table: "org" */
  update_org_many?: Maybe<Array<Maybe<Org_Mutation_Response>>>;
  /** update data of the table: "role" */
  update_role?: Maybe<Role_Mutation_Response>;
  /** update single row of the table: "role" */
  update_role_by_pk?: Maybe<Role>;
  /** update multiples rows of table: "role" */
  update_role_many?: Maybe<Array<Maybe<Role_Mutation_Response>>>;
  /** update data of the table: "task" */
  update_task?: Maybe<Task_Mutation_Response>;
  /** update single row of the table: "task" */
  update_task_by_pk?: Maybe<Task>;
  /** update multiples rows of table: "task" */
  update_task_many?: Maybe<Array<Maybe<Task_Mutation_Response>>>;
  /** update data of the table: "task_status" */
  update_task_status?: Maybe<Task_Status_Mutation_Response>;
  /** update single row of the table: "task_status" */
  update_task_status_by_pk?: Maybe<Task_Status>;
  /** update multiples rows of table: "task_status" */
  update_task_status_many?: Maybe<Array<Maybe<Task_Status_Mutation_Response>>>;
  /** update data of the table: "task_view" */
  update_task_view?: Maybe<Task_View_Mutation_Response>;
  /** update single row of the table: "task_view" */
  update_task_view_by_pk?: Maybe<Task_View>;
  /** update multiples rows of table: "task_view" */
  update_task_view_many?: Maybe<Array<Maybe<Task_View_Mutation_Response>>>;
  /** update data of the table: "thread" */
  update_thread?: Maybe<Thread_Mutation_Response>;
  /** update data of the table: "thread_activity" */
  update_thread_activity?: Maybe<Thread_Activity_Mutation_Response>;
  /** update single row of the table: "thread_activity" */
  update_thread_activity_by_pk?: Maybe<Thread_Activity>;
  /** update multiples rows of table: "thread_activity" */
  update_thread_activity_many?: Maybe<Array<Maybe<Thread_Activity_Mutation_Response>>>;
  /** update data of the table: "thread_activity_type" */
  update_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** update single row of the table: "thread_activity_type" */
  update_thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** update multiples rows of table: "thread_activity_type" */
  update_thread_activity_type_many?: Maybe<Array<Maybe<Thread_Activity_Type_Mutation_Response>>>;
  /** update single row of the table: "thread" */
  update_thread_by_pk?: Maybe<Thread>;
  /** update multiples rows of table: "thread" */
  update_thread_many?: Maybe<Array<Maybe<Thread_Mutation_Response>>>;
  /** update data of the table: "thread_member_status" */
  update_thread_member_status?: Maybe<Thread_Member_Status_Mutation_Response>;
  /** update single row of the table: "thread_member_status" */
  update_thread_member_status_by_pk?: Maybe<Thread_Member_Status>;
  /** update multiples rows of table: "thread_member_status" */
  update_thread_member_status_many?: Maybe<Array<Maybe<Thread_Member_Status_Mutation_Response>>>;
  /** update data of the table: "thread_poll_answer" */
  update_thread_poll_answer?: Maybe<Thread_Poll_Answer_Mutation_Response>;
  /** update single row of the table: "thread_poll_answer" */
  update_thread_poll_answer_by_pk?: Maybe<Thread_Poll_Answer>;
  /** update multiples rows of table: "thread_poll_answer" */
  update_thread_poll_answer_many?: Maybe<Array<Maybe<Thread_Poll_Answer_Mutation_Response>>>;
  /** update multiples rows of table: "auth.users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestsArgs = {
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthProvidersArgs = {
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokensArgs = {
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRoleArgs = {
  role: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRolesArgs = {
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProvidersArgs = {
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRolesArgs = {
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeysArgs = {
  where: AuthUserSecurityKeys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBucketArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteBucketsArgs = {
  where: Buckets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteFileArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteFilesArgs = {
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CircleArgs = {
  where: Circle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Circle_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Circle_MemberArgs = {
  where: Circle_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Circle_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DecisionArgs = {
  where: Decision_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Decision_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_LogArgs = {
  where: Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Log_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MeetingArgs = {
  where: Meeting_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Meeting_RecurringArgs = {
  where: Meeting_Recurring_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Recurring_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Meeting_StepArgs = {
  where: Meeting_Step_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Step_TypeArgs = {
  where: Meeting_Step_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Meeting_TemplateArgs = {
  where: Meeting_Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Template_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MemberArgs = {
  where: Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Member_RoleArgs = {
  where: Member_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Member_Role_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Member_ScopeArgs = {
  where: Member_Scope_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Member_Scope_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Old_IdArgs = {
  where: Old_Id_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Old_Id_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_OrgArgs = {
  where: Org_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Org_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Org_FileArgs = {
  where: Org_File_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Org_File_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_RoleArgs = {
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TaskArgs = {
  where: Task_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Task_StatusArgs = {
  where: Task_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Task_ViewArgs = {
  where: Task_View_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_View_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ThreadArgs = {
  where: Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_ActivityArgs = {
  where: Thread_Activity_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Activity_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Thread_Activity_TypeArgs = {
  where: Thread_Activity_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Activity_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Thread_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Thread_Member_StatusArgs = {
  where: Thread_Member_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Member_Status_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Thread_Poll_AnswerArgs = {
  where: Thread_Poll_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Poll_Answer_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertAuthProviderArgs = {
  object: AuthProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestArgs = {
  object: AuthProviderRequests_Insert_Input;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestsArgs = {
  objects: Array<AuthProviderRequests_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProvidersArgs = {
  objects: Array<AuthProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenArgs = {
  object: AuthRefreshTokens_Insert_Input;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokensArgs = {
  objects: Array<AuthRefreshTokens_Insert_Input>;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRoleArgs = {
  object: AuthRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRolesArgs = {
  objects: Array<AuthRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProviderArgs = {
  object: AuthUserProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProvidersArgs = {
  objects: Array<AuthUserProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRoleArgs = {
  object: AuthUserRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRolesArgs = {
  objects: Array<AuthUserRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeyArgs = {
  object: AuthUserSecurityKeys_Insert_Input;
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeysArgs = {
  objects: Array<AuthUserSecurityKeys_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBucketArgs = {
  object: Buckets_Insert_Input;
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBucketsArgs = {
  objects: Array<Buckets_Insert_Input>;
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFileArgs = {
  object: Files_Insert_Input;
  on_conflict?: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFilesArgs = {
  objects: Array<Files_Insert_Input>;
  on_conflict?: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CircleArgs = {
  objects: Array<Circle_Insert_Input>;
  on_conflict?: InputMaybe<Circle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_MemberArgs = {
  objects: Array<Circle_Member_Insert_Input>;
  on_conflict?: InputMaybe<Circle_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_Member_OneArgs = {
  object: Circle_Member_Insert_Input;
  on_conflict?: InputMaybe<Circle_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_OneArgs = {
  object: Circle_Insert_Input;
  on_conflict?: InputMaybe<Circle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DecisionArgs = {
  objects: Array<Decision_Insert_Input>;
  on_conflict?: InputMaybe<Decision_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Decision_OneArgs = {
  object: Decision_Insert_Input;
  on_conflict?: InputMaybe<Decision_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LogArgs = {
  objects: Array<Log_Insert_Input>;
  on_conflict?: InputMaybe<Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Log_OneArgs = {
  object: Log_Insert_Input;
  on_conflict?: InputMaybe<Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MeetingArgs = {
  objects: Array<Meeting_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_OneArgs = {
  object: Meeting_Insert_Input;
  on_conflict?: InputMaybe<Meeting_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_RecurringArgs = {
  objects: Array<Meeting_Recurring_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_Recurring_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Recurring_OneArgs = {
  object: Meeting_Recurring_Insert_Input;
  on_conflict?: InputMaybe<Meeting_Recurring_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_StepArgs = {
  objects: Array<Meeting_Step_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_Step_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Step_OneArgs = {
  object: Meeting_Step_Insert_Input;
  on_conflict?: InputMaybe<Meeting_Step_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Step_TypeArgs = {
  objects: Array<Meeting_Step_Type_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_Step_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Step_Type_OneArgs = {
  object: Meeting_Step_Type_Insert_Input;
  on_conflict?: InputMaybe<Meeting_Step_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_TemplateArgs = {
  objects: Array<Meeting_Template_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Template_OneArgs = {
  object: Meeting_Template_Insert_Input;
  on_conflict?: InputMaybe<Meeting_Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MemberArgs = {
  objects: Array<Member_Insert_Input>;
  on_conflict?: InputMaybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Member_OneArgs = {
  object: Member_Insert_Input;
  on_conflict?: InputMaybe<Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Member_RoleArgs = {
  objects: Array<Member_Role_Insert_Input>;
  on_conflict?: InputMaybe<Member_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Member_Role_OneArgs = {
  object: Member_Role_Insert_Input;
  on_conflict?: InputMaybe<Member_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Member_ScopeArgs = {
  objects: Array<Member_Scope_Insert_Input>;
  on_conflict?: InputMaybe<Member_Scope_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Member_Scope_OneArgs = {
  object: Member_Scope_Insert_Input;
  on_conflict?: InputMaybe<Member_Scope_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Old_IdArgs = {
  objects: Array<Old_Id_Insert_Input>;
  on_conflict?: InputMaybe<Old_Id_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Old_Id_OneArgs = {
  object: Old_Id_Insert_Input;
  on_conflict?: InputMaybe<Old_Id_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrgArgs = {
  objects: Array<Org_Insert_Input>;
  on_conflict?: InputMaybe<Org_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Org_FileArgs = {
  objects: Array<Org_File_Insert_Input>;
  on_conflict?: InputMaybe<Org_File_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Org_File_OneArgs = {
  object: Org_File_Insert_Input;
  on_conflict?: InputMaybe<Org_File_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Org_OneArgs = {
  object: Org_Insert_Input;
  on_conflict?: InputMaybe<Org_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoleArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_OneArgs = {
  object: Role_Insert_Input;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TaskArgs = {
  objects: Array<Task_Insert_Input>;
  on_conflict?: InputMaybe<Task_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_OneArgs = {
  object: Task_Insert_Input;
  on_conflict?: InputMaybe<Task_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_StatusArgs = {
  objects: Array<Task_Status_Insert_Input>;
  on_conflict?: InputMaybe<Task_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_Status_OneArgs = {
  object: Task_Status_Insert_Input;
  on_conflict?: InputMaybe<Task_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_ViewArgs = {
  objects: Array<Task_View_Insert_Input>;
  on_conflict?: InputMaybe<Task_View_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_View_OneArgs = {
  object: Task_View_Insert_Input;
  on_conflict?: InputMaybe<Task_View_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ThreadArgs = {
  objects: Array<Thread_Insert_Input>;
  on_conflict?: InputMaybe<Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_ActivityArgs = {
  objects: Array<Thread_Activity_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Activity_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Activity_OneArgs = {
  object: Thread_Activity_Insert_Input;
  on_conflict?: InputMaybe<Thread_Activity_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Activity_TypeArgs = {
  objects: Array<Thread_Activity_Type_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Activity_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Activity_Type_OneArgs = {
  object: Thread_Activity_Type_Insert_Input;
  on_conflict?: InputMaybe<Thread_Activity_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Member_StatusArgs = {
  objects: Array<Thread_Member_Status_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Member_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Member_Status_OneArgs = {
  object: Thread_Member_Status_Insert_Input;
  on_conflict?: InputMaybe<Thread_Member_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_OneArgs = {
  object: Thread_Insert_Input;
  on_conflict?: InputMaybe<Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Poll_AnswerArgs = {
  objects: Array<Thread_Poll_Answer_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Poll_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Poll_Answer_OneArgs = {
  object: Thread_Poll_Answer_Insert_Input;
  on_conflict?: InputMaybe<Thread_Poll_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  pk_columns: AuthProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestArgs = {
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  pk_columns: AuthProviderRequests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestsArgs = {
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthProvidersArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenArgs = {
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  pk_columns: AuthRefreshTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensArgs = {
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRoleArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  pk_columns: AuthRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRolesArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProviderArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  pk_columns: AuthUserProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProvidersArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRoleArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  pk_columns: AuthUserRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRolesArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeyArgs = {
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  pk_columns: AuthUserSecurityKeys_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeysArgs = {
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  where: AuthUserSecurityKeys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBucketArgs = {
  _inc?: InputMaybe<Buckets_Inc_Input>;
  _set?: InputMaybe<Buckets_Set_Input>;
  pk_columns: Buckets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBucketsArgs = {
  _inc?: InputMaybe<Buckets_Inc_Input>;
  _set?: InputMaybe<Buckets_Set_Input>;
  where: Buckets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateFileArgs = {
  _inc?: InputMaybe<Files_Inc_Input>;
  _set?: InputMaybe<Files_Set_Input>;
  pk_columns: Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateFilesArgs = {
  _inc?: InputMaybe<Files_Inc_Input>;
  _set?: InputMaybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AuthProviderRequests_ManyArgs = {
  updates: Array<AuthProviderRequests_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthProviders_ManyArgs = {
  updates: Array<AuthProviders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthRefreshTokens_ManyArgs = {
  updates: Array<AuthRefreshTokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthRoles_ManyArgs = {
  updates: Array<AuthRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserProviders_ManyArgs = {
  updates: Array<AuthUserProviders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserRoles_ManyArgs = {
  updates: Array<AuthUserRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserSecurityKeys_ManyArgs = {
  updates: Array<AuthUserSecurityKeys_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Buckets_ManyArgs = {
  updates: Array<Buckets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CircleArgs = {
  _set?: InputMaybe<Circle_Set_Input>;
  where: Circle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_By_PkArgs = {
  _set?: InputMaybe<Circle_Set_Input>;
  pk_columns: Circle_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_ManyArgs = {
  updates: Array<Circle_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_MemberArgs = {
  _inc?: InputMaybe<Circle_Member_Inc_Input>;
  _set?: InputMaybe<Circle_Member_Set_Input>;
  where: Circle_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Member_By_PkArgs = {
  _inc?: InputMaybe<Circle_Member_Inc_Input>;
  _set?: InputMaybe<Circle_Member_Set_Input>;
  pk_columns: Circle_Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Member_ManyArgs = {
  updates: Array<Circle_Member_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DecisionArgs = {
  _set?: InputMaybe<Decision_Set_Input>;
  where: Decision_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Decision_By_PkArgs = {
  _set?: InputMaybe<Decision_Set_Input>;
  pk_columns: Decision_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Decision_ManyArgs = {
  updates: Array<Decision_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Files_ManyArgs = {
  updates: Array<Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_LogArgs = {
  _set?: InputMaybe<Log_Set_Input>;
  where: Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Log_By_PkArgs = {
  _set?: InputMaybe<Log_Set_Input>;
  pk_columns: Log_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Log_ManyArgs = {
  updates: Array<Log_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MeetingArgs = {
  _set?: InputMaybe<Meeting_Set_Input>;
  where: Meeting_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_By_PkArgs = {
  _set?: InputMaybe<Meeting_Set_Input>;
  pk_columns: Meeting_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_ManyArgs = {
  updates: Array<Meeting_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_RecurringArgs = {
  _inc?: InputMaybe<Meeting_Recurring_Inc_Input>;
  _set?: InputMaybe<Meeting_Recurring_Set_Input>;
  where: Meeting_Recurring_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Recurring_By_PkArgs = {
  _inc?: InputMaybe<Meeting_Recurring_Inc_Input>;
  _set?: InputMaybe<Meeting_Recurring_Set_Input>;
  pk_columns: Meeting_Recurring_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Recurring_ManyArgs = {
  updates: Array<Meeting_Recurring_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_StepArgs = {
  _set?: InputMaybe<Meeting_Step_Set_Input>;
  where: Meeting_Step_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Step_By_PkArgs = {
  _set?: InputMaybe<Meeting_Step_Set_Input>;
  pk_columns: Meeting_Step_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Step_ManyArgs = {
  updates: Array<Meeting_Step_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Step_TypeArgs = {
  _set?: InputMaybe<Meeting_Step_Type_Set_Input>;
  where: Meeting_Step_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Step_Type_By_PkArgs = {
  _set?: InputMaybe<Meeting_Step_Type_Set_Input>;
  pk_columns: Meeting_Step_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Step_Type_ManyArgs = {
  updates: Array<Meeting_Step_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_TemplateArgs = {
  _set?: InputMaybe<Meeting_Template_Set_Input>;
  where: Meeting_Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Template_By_PkArgs = {
  _set?: InputMaybe<Meeting_Template_Set_Input>;
  pk_columns: Meeting_Template_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Template_ManyArgs = {
  updates: Array<Meeting_Template_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MemberArgs = {
  _inc?: InputMaybe<Member_Inc_Input>;
  _set?: InputMaybe<Member_Set_Input>;
  where: Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Member_By_PkArgs = {
  _inc?: InputMaybe<Member_Inc_Input>;
  _set?: InputMaybe<Member_Set_Input>;
  pk_columns: Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Member_ManyArgs = {
  updates: Array<Member_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Member_RoleArgs = {
  _set?: InputMaybe<Member_Role_Set_Input>;
  where: Member_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Member_Role_By_PkArgs = {
  _set?: InputMaybe<Member_Role_Set_Input>;
  pk_columns: Member_Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Member_Role_ManyArgs = {
  updates: Array<Member_Role_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Member_ScopeArgs = {
  _set?: InputMaybe<Member_Scope_Set_Input>;
  where: Member_Scope_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Member_Scope_By_PkArgs = {
  _set?: InputMaybe<Member_Scope_Set_Input>;
  pk_columns: Member_Scope_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Member_Scope_ManyArgs = {
  updates: Array<Member_Scope_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Old_IdArgs = {
  _set?: InputMaybe<Old_Id_Set_Input>;
  where: Old_Id_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Old_Id_By_PkArgs = {
  _set?: InputMaybe<Old_Id_Set_Input>;
  pk_columns: Old_Id_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Old_Id_ManyArgs = {
  updates: Array<Old_Id_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrgArgs = {
  _inc?: InputMaybe<Org_Inc_Input>;
  _set?: InputMaybe<Org_Set_Input>;
  where: Org_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Org_By_PkArgs = {
  _inc?: InputMaybe<Org_Inc_Input>;
  _set?: InputMaybe<Org_Set_Input>;
  pk_columns: Org_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Org_FileArgs = {
  _set?: InputMaybe<Org_File_Set_Input>;
  where: Org_File_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Org_File_By_PkArgs = {
  _set?: InputMaybe<Org_File_Set_Input>;
  pk_columns: Org_File_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Org_File_ManyArgs = {
  updates: Array<Org_File_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Org_ManyArgs = {
  updates: Array<Org_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RoleArgs = {
  _inc?: InputMaybe<Role_Inc_Input>;
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_By_PkArgs = {
  _inc?: InputMaybe<Role_Inc_Input>;
  _set?: InputMaybe<Role_Set_Input>;
  pk_columns: Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Role_ManyArgs = {
  updates: Array<Role_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TaskArgs = {
  _set?: InputMaybe<Task_Set_Input>;
  where: Task_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_By_PkArgs = {
  _set?: InputMaybe<Task_Set_Input>;
  pk_columns: Task_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Task_ManyArgs = {
  updates: Array<Task_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Task_StatusArgs = {
  _set?: InputMaybe<Task_Status_Set_Input>;
  where: Task_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_Status_By_PkArgs = {
  _set?: InputMaybe<Task_Status_Set_Input>;
  pk_columns: Task_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Task_Status_ManyArgs = {
  updates: Array<Task_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Task_ViewArgs = {
  _set?: InputMaybe<Task_View_Set_Input>;
  where: Task_View_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_View_By_PkArgs = {
  _set?: InputMaybe<Task_View_Set_Input>;
  pk_columns: Task_View_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Task_View_ManyArgs = {
  updates: Array<Task_View_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ThreadArgs = {
  _set?: InputMaybe<Thread_Set_Input>;
  where: Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_ActivityArgs = {
  _set?: InputMaybe<Thread_Activity_Set_Input>;
  where: Thread_Activity_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_By_PkArgs = {
  _set?: InputMaybe<Thread_Activity_Set_Input>;
  pk_columns: Thread_Activity_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_ManyArgs = {
  updates: Array<Thread_Activity_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_TypeArgs = {
  _set?: InputMaybe<Thread_Activity_Type_Set_Input>;
  where: Thread_Activity_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_Type_By_PkArgs = {
  _set?: InputMaybe<Thread_Activity_Type_Set_Input>;
  pk_columns: Thread_Activity_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_Type_ManyArgs = {
  updates: Array<Thread_Activity_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_By_PkArgs = {
  _set?: InputMaybe<Thread_Set_Input>;
  pk_columns: Thread_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_ManyArgs = {
  updates: Array<Thread_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Member_StatusArgs = {
  _set?: InputMaybe<Thread_Member_Status_Set_Input>;
  where: Thread_Member_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Member_Status_By_PkArgs = {
  _set?: InputMaybe<Thread_Member_Status_Set_Input>;
  pk_columns: Thread_Member_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Member_Status_ManyArgs = {
  updates: Array<Thread_Member_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Poll_AnswerArgs = {
  _set?: InputMaybe<Thread_Poll_Answer_Set_Input>;
  where: Thread_Poll_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Poll_Answer_By_PkArgs = {
  _set?: InputMaybe<Thread_Poll_Answer_Set_Input>;
  pk_columns: Thread_Poll_Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Poll_Answer_ManyArgs = {
  updates: Array<Thread_Poll_Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** columns and relationships of "old_id" */
export type Old_Id = {
  __typename?: 'old_id';
  id: Scalars['uuid'];
  oldId: Scalars['String'];
  type: Scalars['String'];
};

/** aggregated selection of "old_id" */
export type Old_Id_Aggregate = {
  __typename?: 'old_id_aggregate';
  aggregate?: Maybe<Old_Id_Aggregate_Fields>;
  nodes: Array<Old_Id>;
};

/** aggregate fields of "old_id" */
export type Old_Id_Aggregate_Fields = {
  __typename?: 'old_id_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Old_Id_Max_Fields>;
  min?: Maybe<Old_Id_Min_Fields>;
};


/** aggregate fields of "old_id" */
export type Old_Id_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Old_Id_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "old_id". All fields are combined with a logical 'AND'. */
export type Old_Id_Bool_Exp = {
  _and?: InputMaybe<Array<Old_Id_Bool_Exp>>;
  _not?: InputMaybe<Old_Id_Bool_Exp>;
  _or?: InputMaybe<Array<Old_Id_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  oldId?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "old_id" */
export enum Old_Id_Constraint {
  /** unique or primary key constraint on columns "oldId" */
  OldIdOldIdKey = 'old_id_oldId_key',
  /** unique or primary key constraint on columns "id" */
  OldIdPkey = 'old_id_pkey'
}

/** input type for inserting data into table "old_id" */
export type Old_Id_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  oldId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Old_Id_Max_Fields = {
  __typename?: 'old_id_max_fields';
  id?: Maybe<Scalars['uuid']>;
  oldId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Old_Id_Min_Fields = {
  __typename?: 'old_id_min_fields';
  id?: Maybe<Scalars['uuid']>;
  oldId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "old_id" */
export type Old_Id_Mutation_Response = {
  __typename?: 'old_id_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Old_Id>;
};

/** on_conflict condition type for table "old_id" */
export type Old_Id_On_Conflict = {
  constraint: Old_Id_Constraint;
  update_columns?: Array<Old_Id_Update_Column>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};

/** Ordering options when selecting data from "old_id". */
export type Old_Id_Order_By = {
  id?: InputMaybe<Order_By>;
  oldId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: old_id */
export type Old_Id_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "old_id" */
export enum Old_Id_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OldId = 'oldId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "old_id" */
export type Old_Id_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  oldId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "old_id" */
export type Old_Id_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Old_Id_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Old_Id_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  oldId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "old_id" */
export enum Old_Id_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OldId = 'oldId',
  /** column name */
  Type = 'type'
}

export type Old_Id_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Old_Id_Set_Input>;
  where: Old_Id_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "org" */
export type Org = {
  __typename?: 'org';
  archived: Scalars['Boolean'];
  /** An array relationship */
  circles: Array<Circle>;
  /** An aggregate relationship */
  circles_aggregate: Circle_Aggregate;
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  decisions: Array<Decision>;
  /** An aggregate relationship */
  decisions_aggregate: Decision_Aggregate;
  defaultWorkedMinPerWeek: Scalars['Int'];
  /** An array relationship */
  files: Array<Org_File>;
  /** An aggregate relationship */
  files_aggregate: Org_File_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  meetings: Array<Meeting>;
  /** An aggregate relationship */
  meetings_aggregate: Meeting_Aggregate;
  /** An array relationship */
  meetings_recurring: Array<Meeting_Recurring>;
  /** An aggregate relationship */
  meetings_recurring_aggregate: Meeting_Recurring_Aggregate;
  /** An array relationship */
  members: Array<Member>;
  /** An aggregate relationship */
  members_aggregate: Member_Aggregate;
  name: Scalars['String'];
  /** An array relationship */
  roles: Array<Role>;
  /** An aggregate relationship */
  roles_aggregate: Role_Aggregate;
  slug?: Maybe<Scalars['String']>;
};


/** columns and relationships of "org" */
export type OrgCirclesArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgCircles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgDecisionsArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgDecisions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgFilesArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgFiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeetingsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeetings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeetings_RecurringArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeetings_Recurring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgRolesArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};

/** aggregated selection of "org" */
export type Org_Aggregate = {
  __typename?: 'org_aggregate';
  aggregate?: Maybe<Org_Aggregate_Fields>;
  nodes: Array<Org>;
};

/** aggregate fields of "org" */
export type Org_Aggregate_Fields = {
  __typename?: 'org_aggregate_fields';
  avg?: Maybe<Org_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Org_Max_Fields>;
  min?: Maybe<Org_Min_Fields>;
  stddev?: Maybe<Org_Stddev_Fields>;
  stddev_pop?: Maybe<Org_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Org_Stddev_Samp_Fields>;
  sum?: Maybe<Org_Sum_Fields>;
  var_pop?: Maybe<Org_Var_Pop_Fields>;
  var_samp?: Maybe<Org_Var_Samp_Fields>;
  variance?: Maybe<Org_Variance_Fields>;
};


/** aggregate fields of "org" */
export type Org_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Org_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Org_Avg_Fields = {
  __typename?: 'org_avg_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "org". All fields are combined with a logical 'AND'. */
export type Org_Bool_Exp = {
  _and?: InputMaybe<Array<Org_Bool_Exp>>;
  _not?: InputMaybe<Org_Bool_Exp>;
  _or?: InputMaybe<Array<Org_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circles?: InputMaybe<Circle_Bool_Exp>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  decisions?: InputMaybe<Decision_Bool_Exp>;
  decisions_aggregate?: InputMaybe<Decision_Aggregate_Bool_Exp>;
  defaultWorkedMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
  files?: InputMaybe<Org_File_Bool_Exp>;
  files_aggregate?: InputMaybe<Org_File_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meetings?: InputMaybe<Meeting_Bool_Exp>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Bool_Exp>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp>;
  members?: InputMaybe<Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Member_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  roles?: InputMaybe<Role_Bool_Exp>;
  roles_aggregate?: InputMaybe<Role_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "org" */
export enum Org_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrgPkey = 'org_pkey',
  /** unique or primary key constraint on columns "slug" */
  OrgSlugKey = 'org_slug_key'
}

/** columns and relationships of "org_file" */
export type Org_File = {
  __typename?: 'org_file';
  /** An object relationship */
  file: Files;
  fileId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
};

/** aggregated selection of "org_file" */
export type Org_File_Aggregate = {
  __typename?: 'org_file_aggregate';
  aggregate?: Maybe<Org_File_Aggregate_Fields>;
  nodes: Array<Org_File>;
};

export type Org_File_Aggregate_Bool_Exp = {
  count?: InputMaybe<Org_File_Aggregate_Bool_Exp_Count>;
};

export type Org_File_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Org_File_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Org_File_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "org_file" */
export type Org_File_Aggregate_Fields = {
  __typename?: 'org_file_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Org_File_Max_Fields>;
  min?: Maybe<Org_File_Min_Fields>;
};


/** aggregate fields of "org_file" */
export type Org_File_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Org_File_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "org_file" */
export type Org_File_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Org_File_Max_Order_By>;
  min?: InputMaybe<Org_File_Min_Order_By>;
};

/** input type for inserting array relation for remote table "org_file" */
export type Org_File_Arr_Rel_Insert_Input = {
  data: Array<Org_File_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Org_File_On_Conflict>;
};

/** Boolean expression to filter rows from the table "org_file". All fields are combined with a logical 'AND'. */
export type Org_File_Bool_Exp = {
  _and?: InputMaybe<Array<Org_File_Bool_Exp>>;
  _not?: InputMaybe<Org_File_Bool_Exp>;
  _or?: InputMaybe<Array<Org_File_Bool_Exp>>;
  file?: InputMaybe<Files_Bool_Exp>;
  fileId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "org_file" */
export enum Org_File_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrgFilePkey = 'org_file_pkey'
}

/** input type for inserting data into table "org_file" */
export type Org_File_Insert_Input = {
  file?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  fileId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Org_File_Max_Fields = {
  __typename?: 'org_file_max_fields';
  fileId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "org_file" */
export type Org_File_Max_Order_By = {
  fileId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Org_File_Min_Fields = {
  __typename?: 'org_file_min_fields';
  fileId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "org_file" */
export type Org_File_Min_Order_By = {
  fileId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "org_file" */
export type Org_File_Mutation_Response = {
  __typename?: 'org_file_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Org_File>;
};

/** on_conflict condition type for table "org_file" */
export type Org_File_On_Conflict = {
  constraint: Org_File_Constraint;
  update_columns?: Array<Org_File_Update_Column>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};

/** Ordering options when selecting data from "org_file". */
export type Org_File_Order_By = {
  file?: InputMaybe<Files_Order_By>;
  fileId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: org_file */
export type Org_File_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "org_file" */
export enum Org_File_Select_Column {
  /** column name */
  FileId = 'fileId',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId'
}

/** input type for updating data in table "org_file" */
export type Org_File_Set_Input = {
  fileId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "org_file" */
export type Org_File_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Org_File_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Org_File_Stream_Cursor_Value_Input = {
  fileId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "org_file" */
export enum Org_File_Update_Column {
  /** column name */
  FileId = 'fileId',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId'
}

export type Org_File_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Org_File_Set_Input>;
  where: Org_File_Bool_Exp;
};

/** input type for incrementing numeric columns in table "org" */
export type Org_Inc_Input = {
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "org" */
export type Org_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circles?: InputMaybe<Circle_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  decisions?: InputMaybe<Decision_Arr_Rel_Insert_Input>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  files?: InputMaybe<Org_File_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  meetings?: InputMaybe<Meeting_Arr_Rel_Insert_Input>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Arr_Rel_Insert_Input>;
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Role_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Org_Max_Fields = {
  __typename?: 'org_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultWorkedMinPerWeek?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Org_Min_Fields = {
  __typename?: 'org_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultWorkedMinPerWeek?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "org" */
export type Org_Mutation_Response = {
  __typename?: 'org_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Org>;
};

/** input type for inserting object relation for remote table "org" */
export type Org_Obj_Rel_Insert_Input = {
  data: Org_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Org_On_Conflict>;
};

/** on_conflict condition type for table "org" */
export type Org_On_Conflict = {
  constraint: Org_Constraint;
  update_columns?: Array<Org_Update_Column>;
  where?: InputMaybe<Org_Bool_Exp>;
};

/** Ordering options when selecting data from "org". */
export type Org_Order_By = {
  archived?: InputMaybe<Order_By>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  decisions_aggregate?: InputMaybe<Decision_Aggregate_Order_By>;
  defaultWorkedMinPerWeek?: InputMaybe<Order_By>;
  files_aggregate?: InputMaybe<Org_File_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Order_By>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Order_By>;
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  roles_aggregate?: InputMaybe<Role_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** primary key columns input for table: org */
export type Org_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "org" */
export enum Org_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultWorkedMinPerWeek = 'defaultWorkedMinPerWeek',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "org" */
export type Org_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Org_Stddev_Fields = {
  __typename?: 'org_stddev_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Org_Stddev_Pop_Fields = {
  __typename?: 'org_stddev_pop_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Org_Stddev_Samp_Fields = {
  __typename?: 'org_stddev_samp_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "org" */
export type Org_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Org_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Org_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Org_Sum_Fields = {
  __typename?: 'org_sum_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Int']>;
};

/** update columns of table "org" */
export enum Org_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultWorkedMinPerWeek = 'defaultWorkedMinPerWeek',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

export type Org_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Org_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Org_Set_Input>;
  where: Org_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Org_Var_Pop_Fields = {
  __typename?: 'org_var_pop_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Org_Var_Samp_Fields = {
  __typename?: 'org_var_samp_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Org_Variance_Fields = {
  __typename?: 'org_variance_fields';
  defaultWorkedMinPerWeek?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeys_Aggregate;
  /** fetch data from the table: "storage.buckets" using primary key columns */
  bucket?: Maybe<Buckets>;
  /** fetch data from the table: "storage.buckets" */
  buckets: Array<Buckets>;
  /** fetch aggregated fields from the table: "storage.buckets" */
  bucketsAggregate: Buckets_Aggregate;
  /** fetch data from the table: "circle" */
  circle: Array<Circle>;
  /** fetch aggregated fields from the table: "circle" */
  circle_aggregate: Circle_Aggregate;
  /** fetch data from the table: "circle" using primary key columns */
  circle_by_pk?: Maybe<Circle>;
  /** fetch data from the table: "circle_member" */
  circle_member: Array<Circle_Member>;
  /** fetch aggregated fields from the table: "circle_member" */
  circle_member_aggregate: Circle_Member_Aggregate;
  /** fetch data from the table: "circle_member" using primary key columns */
  circle_member_by_pk?: Maybe<Circle_Member>;
  /** fetch data from the table: "decision" */
  decision: Array<Decision>;
  /** fetch aggregated fields from the table: "decision" */
  decision_aggregate: Decision_Aggregate;
  /** fetch data from the table: "decision" using primary key columns */
  decision_by_pk?: Maybe<Decision>;
  /** fetch data from the table: "storage.files" using primary key columns */
  file?: Maybe<Files>;
  /** An array relationship */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "storage.files" */
  filesAggregate: Files_Aggregate;
  /** fetch data from the table: "log" */
  log: Array<Log>;
  /** fetch aggregated fields from the table: "log" */
  log_aggregate: Log_Aggregate;
  /** fetch data from the table: "log" using primary key columns */
  log_by_pk?: Maybe<Log>;
  /** fetch data from the table: "meeting" */
  meeting: Array<Meeting>;
  /** fetch aggregated fields from the table: "meeting" */
  meeting_aggregate: Meeting_Aggregate;
  /** fetch data from the table: "meeting" using primary key columns */
  meeting_by_pk?: Maybe<Meeting>;
  /** fetch data from the table: "meeting_recurring" */
  meeting_recurring: Array<Meeting_Recurring>;
  /** fetch aggregated fields from the table: "meeting_recurring" */
  meeting_recurring_aggregate: Meeting_Recurring_Aggregate;
  /** fetch data from the table: "meeting_recurring" using primary key columns */
  meeting_recurring_by_pk?: Maybe<Meeting_Recurring>;
  /** fetch data from the table: "meeting_step" */
  meeting_step: Array<Meeting_Step>;
  /** fetch aggregated fields from the table: "meeting_step" */
  meeting_step_aggregate: Meeting_Step_Aggregate;
  /** fetch data from the table: "meeting_step" using primary key columns */
  meeting_step_by_pk?: Maybe<Meeting_Step>;
  /** fetch data from the table: "meeting_step_type" */
  meeting_step_type: Array<Meeting_Step_Type>;
  /** fetch aggregated fields from the table: "meeting_step_type" */
  meeting_step_type_aggregate: Meeting_Step_Type_Aggregate;
  /** fetch data from the table: "meeting_step_type" using primary key columns */
  meeting_step_type_by_pk?: Maybe<Meeting_Step_Type>;
  /** fetch data from the table: "meeting_template" */
  meeting_template: Array<Meeting_Template>;
  /** fetch aggregated fields from the table: "meeting_template" */
  meeting_template_aggregate: Meeting_Template_Aggregate;
  /** fetch data from the table: "meeting_template" using primary key columns */
  meeting_template_by_pk?: Maybe<Meeting_Template>;
  /** fetch data from the table: "member" */
  member: Array<Member>;
  /** fetch aggregated fields from the table: "member" */
  member_aggregate: Member_Aggregate;
  /** fetch data from the table: "member" using primary key columns */
  member_by_pk?: Maybe<Member>;
  /** fetch data from the table: "member_role" */
  member_role: Array<Member_Role>;
  /** fetch aggregated fields from the table: "member_role" */
  member_role_aggregate: Member_Role_Aggregate;
  /** fetch data from the table: "member_role" using primary key columns */
  member_role_by_pk?: Maybe<Member_Role>;
  /** fetch data from the table: "member_scope" */
  member_scope: Array<Member_Scope>;
  /** fetch aggregated fields from the table: "member_scope" */
  member_scope_aggregate: Member_Scope_Aggregate;
  /** fetch data from the table: "member_scope" using primary key columns */
  member_scope_by_pk?: Maybe<Member_Scope>;
  /** fetch data from the table: "old_id" */
  old_id: Array<Old_Id>;
  /** fetch aggregated fields from the table: "old_id" */
  old_id_aggregate: Old_Id_Aggregate;
  /** fetch data from the table: "old_id" using primary key columns */
  old_id_by_pk?: Maybe<Old_Id>;
  /** fetch data from the table: "org" */
  org: Array<Org>;
  /** fetch aggregated fields from the table: "org" */
  org_aggregate: Org_Aggregate;
  /** fetch data from the table: "org" using primary key columns */
  org_by_pk?: Maybe<Org>;
  /** fetch data from the table: "org_file" */
  org_file: Array<Org_File>;
  /** fetch aggregated fields from the table: "org_file" */
  org_file_aggregate: Org_File_Aggregate;
  /** fetch data from the table: "org_file" using primary key columns */
  org_file_by_pk?: Maybe<Org_File>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table: "task" */
  task: Array<Task>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: Task_Aggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "task_status" */
  task_status: Array<Task_Status>;
  /** fetch aggregated fields from the table: "task_status" */
  task_status_aggregate: Task_Status_Aggregate;
  /** fetch data from the table: "task_status" using primary key columns */
  task_status_by_pk?: Maybe<Task_Status>;
  /** fetch data from the table: "task_view" */
  task_view: Array<Task_View>;
  /** fetch aggregated fields from the table: "task_view" */
  task_view_aggregate: Task_View_Aggregate;
  /** fetch data from the table: "task_view" using primary key columns */
  task_view_by_pk?: Maybe<Task_View>;
  /** fetch data from the table: "thread" */
  thread: Array<Thread>;
  /** fetch data from the table: "thread_activity" */
  thread_activity: Array<Thread_Activity>;
  /** fetch aggregated fields from the table: "thread_activity" */
  thread_activity_aggregate: Thread_Activity_Aggregate;
  /** fetch data from the table: "thread_activity" using primary key columns */
  thread_activity_by_pk?: Maybe<Thread_Activity>;
  /** fetch data from the table: "thread_activity_type" */
  thread_activity_type: Array<Thread_Activity_Type>;
  /** fetch aggregated fields from the table: "thread_activity_type" */
  thread_activity_type_aggregate: Thread_Activity_Type_Aggregate;
  /** fetch data from the table: "thread_activity_type" using primary key columns */
  thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** fetch aggregated fields from the table: "thread" */
  thread_aggregate: Thread_Aggregate;
  /** fetch data from the table: "thread" using primary key columns */
  thread_by_pk?: Maybe<Thread>;
  /** fetch data from the table: "thread_member_status" */
  thread_member_status: Array<Thread_Member_Status>;
  /** fetch aggregated fields from the table: "thread_member_status" */
  thread_member_status_aggregate: Thread_Member_Status_Aggregate;
  /** fetch data from the table: "thread_member_status" using primary key columns */
  thread_member_status_by_pk?: Maybe<Thread_Member_Status>;
  /** fetch data from the table: "thread_poll_answer" */
  thread_poll_answer: Array<Thread_Poll_Answer>;
  /** fetch aggregated fields from the table: "thread_poll_answer" */
  thread_poll_answer_aggregate: Thread_Poll_Answer_Aggregate;
  /** fetch data from the table: "thread_poll_answer" using primary key columns */
  thread_poll_answer_by_pk?: Maybe<Thread_Poll_Answer>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
};


export type Query_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Query_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Query_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Query_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Query_RootAuthUserSecurityKeysAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Query_RootBucketArgs = {
  id: Scalars['String'];
};


export type Query_RootBucketsArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Query_RootBucketsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Query_RootCircleArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


export type Query_RootCircle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


export type Query_RootCircle_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCircle_MemberArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


export type Query_RootCircle_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


export type Query_RootCircle_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDecisionArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


export type Query_RootDecision_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


export type Query_RootDecision_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootFileArgs = {
  id: Scalars['uuid'];
};


export type Query_RootFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootFilesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootLogArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


export type Query_RootLog_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


export type Query_RootLog_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMeetingArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


export type Query_RootMeeting_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


export type Query_RootMeeting_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMeeting_RecurringArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


export type Query_RootMeeting_Recurring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


export type Query_RootMeeting_Recurring_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMeeting_StepArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


export type Query_RootMeeting_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


export type Query_RootMeeting_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMeeting_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Type_Order_By>>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};


export type Query_RootMeeting_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Type_Order_By>>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};


export type Query_RootMeeting_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootMeeting_TemplateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


export type Query_RootMeeting_Template_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


export type Query_RootMeeting_Template_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMemberArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Query_RootMember_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Query_RootMember_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMember_RoleArgs = {
  distinct_on?: InputMaybe<Array<Member_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Role_Order_By>>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};


export type Query_RootMember_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Role_Order_By>>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};


export type Query_RootMember_Role_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootMember_ScopeArgs = {
  distinct_on?: InputMaybe<Array<Member_Scope_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Scope_Order_By>>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};


export type Query_RootMember_Scope_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Scope_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Scope_Order_By>>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};


export type Query_RootMember_Scope_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootOld_IdArgs = {
  distinct_on?: InputMaybe<Array<Old_Id_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Old_Id_Order_By>>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};


export type Query_RootOld_Id_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Old_Id_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Old_Id_Order_By>>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};


export type Query_RootOld_Id_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrgArgs = {
  distinct_on?: InputMaybe<Array<Org_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Order_By>>;
  where?: InputMaybe<Org_Bool_Exp>;
};


export type Query_RootOrg_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Order_By>>;
  where?: InputMaybe<Org_Bool_Exp>;
};


export type Query_RootOrg_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrg_FileArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


export type Query_RootOrg_File_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


export type Query_RootOrg_File_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTaskArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


export type Query_RootTask_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


export type Query_RootTask_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTask_StatusArgs = {
  distinct_on?: InputMaybe<Array<Task_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Status_Order_By>>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};


export type Query_RootTask_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Status_Order_By>>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};


export type Query_RootTask_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootTask_ViewArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


export type Query_RootTask_View_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


export type Query_RootTask_View_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootThreadArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Query_RootThread_ActivityArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


export type Query_RootThread_Activity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


export type Query_RootThread_Activity_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootThread_Activity_TypeArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Type_Order_By>>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};


export type Query_RootThread_Activity_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Type_Order_By>>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};


export type Query_RootThread_Activity_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootThread_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Query_RootThread_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootThread_Member_StatusArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


export type Query_RootThread_Member_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


export type Query_RootThread_Member_Status_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootThread_Poll_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Thread_Poll_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Poll_Answer_Order_By>>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};


export type Query_RootThread_Poll_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Poll_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Poll_Answer_Order_By>>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};


export type Query_RootThread_Poll_Answer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "role" */
export type Role = {
  __typename?: 'role';
  accountabilities: Scalars['String'];
  archived: Scalars['Boolean'];
  autoCreate: Scalars['Boolean'];
  base: Scalars['Boolean'];
  checklist: Scalars['String'];
  /** An array relationship */
  circles: Array<Circle>;
  /** An aggregate relationship */
  circles_aggregate: Circle_Aggregate;
  colorHue?: Maybe<Scalars['smallint']>;
  defaultMinPerWeek?: Maybe<Scalars['Int']>;
  domain: Scalars['String'];
  id: Scalars['uuid'];
  indicators: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
  notes: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  purpose: Scalars['String'];
  singleMember: Scalars['Boolean'];
};


/** columns and relationships of "role" */
export type RoleCirclesArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


/** columns and relationships of "role" */
export type RoleCircles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};

/** aggregated selection of "role" */
export type Role_Aggregate = {
  __typename?: 'role_aggregate';
  aggregate?: Maybe<Role_Aggregate_Fields>;
  nodes: Array<Role>;
};

export type Role_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Role_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Role_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Role_Aggregate_Bool_Exp_Count>;
};

export type Role_Aggregate_Bool_Exp_Bool_And = {
  arguments: Role_Select_Column_Role_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Role_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Role_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Role_Select_Column_Role_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Role_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Role_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Role_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "role" */
export type Role_Aggregate_Fields = {
  __typename?: 'role_aggregate_fields';
  avg?: Maybe<Role_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
  stddev?: Maybe<Role_Stddev_Fields>;
  stddev_pop?: Maybe<Role_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Role_Stddev_Samp_Fields>;
  sum?: Maybe<Role_Sum_Fields>;
  var_pop?: Maybe<Role_Var_Pop_Fields>;
  var_samp?: Maybe<Role_Var_Samp_Fields>;
  variance?: Maybe<Role_Variance_Fields>;
};


/** aggregate fields of "role" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "role" */
export type Role_Aggregate_Order_By = {
  avg?: InputMaybe<Role_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Role_Max_Order_By>;
  min?: InputMaybe<Role_Min_Order_By>;
  stddev?: InputMaybe<Role_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Role_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Role_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Role_Sum_Order_By>;
  var_pop?: InputMaybe<Role_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Role_Var_Samp_Order_By>;
  variance?: InputMaybe<Role_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "role" */
export type Role_Arr_Rel_Insert_Input = {
  data: Array<Role_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Role_On_Conflict>;
};

/** aggregate avg on columns */
export type Role_Avg_Fields = {
  __typename?: 'role_avg_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "role" */
export type Role_Avg_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  accountabilities?: InputMaybe<String_Comparison_Exp>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  autoCreate?: InputMaybe<Boolean_Comparison_Exp>;
  base?: InputMaybe<Boolean_Comparison_Exp>;
  checklist?: InputMaybe<String_Comparison_Exp>;
  circles?: InputMaybe<Circle_Bool_Exp>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Bool_Exp>;
  colorHue?: InputMaybe<Smallint_Comparison_Exp>;
  defaultMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  indicators?: InputMaybe<String_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  purpose?: InputMaybe<String_Comparison_Exp>;
  singleMember?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "role" */
export enum Role_Constraint {
  /** unique or primary key constraint on columns "id" */
  RolesPkey = 'roles_pkey'
}

/** input type for incrementing numeric columns in table "role" */
export type Role_Inc_Input = {
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "role" */
export type Role_Insert_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  autoCreate?: InputMaybe<Scalars['Boolean']>;
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  circles?: InputMaybe<Circle_Arr_Rel_Insert_Input>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  purpose?: InputMaybe<Scalars['String']>;
  singleMember?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  __typename?: 'role_max_fields';
  accountabilities?: Maybe<Scalars['String']>;
  checklist?: Maybe<Scalars['String']>;
  colorHue?: Maybe<Scalars['smallint']>;
  defaultMinPerWeek?: Maybe<Scalars['Int']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  indicators?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  purpose?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "role" */
export type Role_Max_Order_By = {
  accountabilities?: InputMaybe<Order_By>;
  checklist?: InputMaybe<Order_By>;
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indicators?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  purpose?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  __typename?: 'role_min_fields';
  accountabilities?: Maybe<Scalars['String']>;
  checklist?: Maybe<Scalars['String']>;
  colorHue?: Maybe<Scalars['smallint']>;
  defaultMinPerWeek?: Maybe<Scalars['Int']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  indicators?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  purpose?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "role" */
export type Role_Min_Order_By = {
  accountabilities?: InputMaybe<Order_By>;
  checklist?: InputMaybe<Order_By>;
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indicators?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  purpose?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "role" */
export type Role_Mutation_Response = {
  __typename?: 'role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Role>;
};

/** input type for inserting object relation for remote table "role" */
export type Role_Obj_Rel_Insert_Input = {
  data: Role_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Role_On_Conflict>;
};

/** on_conflict condition type for table "role" */
export type Role_On_Conflict = {
  constraint: Role_Constraint;
  update_columns?: Array<Role_Update_Column>;
  where?: InputMaybe<Role_Bool_Exp>;
};

/** Ordering options when selecting data from "role". */
export type Role_Order_By = {
  accountabilities?: InputMaybe<Order_By>;
  archived?: InputMaybe<Order_By>;
  autoCreate?: InputMaybe<Order_By>;
  base?: InputMaybe<Order_By>;
  checklist?: InputMaybe<Order_By>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Order_By>;
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indicators?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  purpose?: InputMaybe<Order_By>;
  singleMember?: InputMaybe<Order_By>;
};

/** primary key columns input for table: role */
export type Role_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "role" */
export enum Role_Select_Column {
  /** column name */
  Accountabilities = 'accountabilities',
  /** column name */
  Archived = 'archived',
  /** column name */
  AutoCreate = 'autoCreate',
  /** column name */
  Base = 'base',
  /** column name */
  Checklist = 'checklist',
  /** column name */
  ColorHue = 'colorHue',
  /** column name */
  DefaultMinPerWeek = 'defaultMinPerWeek',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Indicators = 'indicators',
  /** column name */
  Link = 'link',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Purpose = 'purpose',
  /** column name */
  SingleMember = 'singleMember'
}

/** select "role_aggregate_bool_exp_bool_and_arguments_columns" columns of table "role" */
export enum Role_Select_Column_Role_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  AutoCreate = 'autoCreate',
  /** column name */
  Base = 'base',
  /** column name */
  SingleMember = 'singleMember'
}

/** select "role_aggregate_bool_exp_bool_or_arguments_columns" columns of table "role" */
export enum Role_Select_Column_Role_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  AutoCreate = 'autoCreate',
  /** column name */
  Base = 'base',
  /** column name */
  SingleMember = 'singleMember'
}

/** input type for updating data in table "role" */
export type Role_Set_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  autoCreate?: InputMaybe<Scalars['Boolean']>;
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  purpose?: InputMaybe<Scalars['String']>;
  singleMember?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate stddev on columns */
export type Role_Stddev_Fields = {
  __typename?: 'role_stddev_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "role" */
export type Role_Stddev_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Role_Stddev_Pop_Fields = {
  __typename?: 'role_stddev_pop_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "role" */
export type Role_Stddev_Pop_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Role_Stddev_Samp_Fields = {
  __typename?: 'role_stddev_samp_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "role" */
export type Role_Stddev_Samp_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "role" */
export type Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Stream_Cursor_Value_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  autoCreate?: InputMaybe<Scalars['Boolean']>;
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  purpose?: InputMaybe<Scalars['String']>;
  singleMember?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate sum on columns */
export type Role_Sum_Fields = {
  __typename?: 'role_sum_fields';
  colorHue?: Maybe<Scalars['smallint']>;
  defaultMinPerWeek?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "role" */
export type Role_Sum_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** update columns of table "role" */
export enum Role_Update_Column {
  /** column name */
  Accountabilities = 'accountabilities',
  /** column name */
  Archived = 'archived',
  /** column name */
  AutoCreate = 'autoCreate',
  /** column name */
  Base = 'base',
  /** column name */
  Checklist = 'checklist',
  /** column name */
  ColorHue = 'colorHue',
  /** column name */
  DefaultMinPerWeek = 'defaultMinPerWeek',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Indicators = 'indicators',
  /** column name */
  Link = 'link',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Purpose = 'purpose',
  /** column name */
  SingleMember = 'singleMember'
}

export type Role_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Role_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Role_Var_Pop_Fields = {
  __typename?: 'role_var_pop_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "role" */
export type Role_Var_Pop_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Role_Var_Samp_Fields = {
  __typename?: 'role_var_samp_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "role" */
export type Role_Var_Samp_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Role_Variance_Fields = {
  __typename?: 'role_variance_fields';
  colorHue?: Maybe<Scalars['Float']>;
  defaultMinPerWeek?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "role" */
export type Role_Variance_Order_By = {
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']>;
  _gt?: InputMaybe<Scalars['smallint']>;
  _gte?: InputMaybe<Scalars['smallint']>;
  _in?: InputMaybe<Array<Scalars['smallint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['smallint']>;
  _lte?: InputMaybe<Scalars['smallint']>;
  _neq?: InputMaybe<Scalars['smallint']>;
  _nin?: InputMaybe<Array<Scalars['smallint']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.provider_requests" */
  authProviderRequests_stream: Array<AuthProviderRequests>;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.providers" */
  authProviders_stream: Array<AuthProviders>;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.refresh_tokens" */
  authRefreshTokens_stream: Array<AuthRefreshTokens>;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.roles" */
  authRoles_stream: Array<AuthRoles>;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_providers" */
  authUserProviders_stream: Array<AuthUserProviders>;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_roles" */
  authUserRoles_stream: Array<AuthUserRoles>;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeys_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_security_keys" */
  authUserSecurityKeys_stream: Array<AuthUserSecurityKeys>;
  /** fetch data from the table: "storage.buckets" using primary key columns */
  bucket?: Maybe<Buckets>;
  /** fetch data from the table: "storage.buckets" */
  buckets: Array<Buckets>;
  /** fetch aggregated fields from the table: "storage.buckets" */
  bucketsAggregate: Buckets_Aggregate;
  /** fetch data from the table in a streaming manner: "storage.buckets" */
  buckets_stream: Array<Buckets>;
  /** fetch data from the table: "circle" */
  circle: Array<Circle>;
  /** fetch aggregated fields from the table: "circle" */
  circle_aggregate: Circle_Aggregate;
  /** fetch data from the table: "circle" using primary key columns */
  circle_by_pk?: Maybe<Circle>;
  /** fetch data from the table: "circle_member" */
  circle_member: Array<Circle_Member>;
  /** fetch aggregated fields from the table: "circle_member" */
  circle_member_aggregate: Circle_Member_Aggregate;
  /** fetch data from the table: "circle_member" using primary key columns */
  circle_member_by_pk?: Maybe<Circle_Member>;
  /** fetch data from the table in a streaming manner: "circle_member" */
  circle_member_stream: Array<Circle_Member>;
  /** fetch data from the table in a streaming manner: "circle" */
  circle_stream: Array<Circle>;
  /** fetch data from the table: "decision" */
  decision: Array<Decision>;
  /** fetch aggregated fields from the table: "decision" */
  decision_aggregate: Decision_Aggregate;
  /** fetch data from the table: "decision" using primary key columns */
  decision_by_pk?: Maybe<Decision>;
  /** fetch data from the table in a streaming manner: "decision" */
  decision_stream: Array<Decision>;
  /** fetch data from the table: "storage.files" using primary key columns */
  file?: Maybe<Files>;
  /** An array relationship */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "storage.files" */
  filesAggregate: Files_Aggregate;
  /** fetch data from the table in a streaming manner: "storage.files" */
  files_stream: Array<Files>;
  /** fetch data from the table: "log" */
  log: Array<Log>;
  /** fetch aggregated fields from the table: "log" */
  log_aggregate: Log_Aggregate;
  /** fetch data from the table: "log" using primary key columns */
  log_by_pk?: Maybe<Log>;
  /** fetch data from the table in a streaming manner: "log" */
  log_stream: Array<Log>;
  /** fetch data from the table: "meeting" */
  meeting: Array<Meeting>;
  /** fetch aggregated fields from the table: "meeting" */
  meeting_aggregate: Meeting_Aggregate;
  /** fetch data from the table: "meeting" using primary key columns */
  meeting_by_pk?: Maybe<Meeting>;
  /** fetch data from the table: "meeting_recurring" */
  meeting_recurring: Array<Meeting_Recurring>;
  /** fetch aggregated fields from the table: "meeting_recurring" */
  meeting_recurring_aggregate: Meeting_Recurring_Aggregate;
  /** fetch data from the table: "meeting_recurring" using primary key columns */
  meeting_recurring_by_pk?: Maybe<Meeting_Recurring>;
  /** fetch data from the table in a streaming manner: "meeting_recurring" */
  meeting_recurring_stream: Array<Meeting_Recurring>;
  /** fetch data from the table: "meeting_step" */
  meeting_step: Array<Meeting_Step>;
  /** fetch aggregated fields from the table: "meeting_step" */
  meeting_step_aggregate: Meeting_Step_Aggregate;
  /** fetch data from the table: "meeting_step" using primary key columns */
  meeting_step_by_pk?: Maybe<Meeting_Step>;
  /** fetch data from the table in a streaming manner: "meeting_step" */
  meeting_step_stream: Array<Meeting_Step>;
  /** fetch data from the table: "meeting_step_type" */
  meeting_step_type: Array<Meeting_Step_Type>;
  /** fetch aggregated fields from the table: "meeting_step_type" */
  meeting_step_type_aggregate: Meeting_Step_Type_Aggregate;
  /** fetch data from the table: "meeting_step_type" using primary key columns */
  meeting_step_type_by_pk?: Maybe<Meeting_Step_Type>;
  /** fetch data from the table in a streaming manner: "meeting_step_type" */
  meeting_step_type_stream: Array<Meeting_Step_Type>;
  /** fetch data from the table in a streaming manner: "meeting" */
  meeting_stream: Array<Meeting>;
  /** fetch data from the table: "meeting_template" */
  meeting_template: Array<Meeting_Template>;
  /** fetch aggregated fields from the table: "meeting_template" */
  meeting_template_aggregate: Meeting_Template_Aggregate;
  /** fetch data from the table: "meeting_template" using primary key columns */
  meeting_template_by_pk?: Maybe<Meeting_Template>;
  /** fetch data from the table in a streaming manner: "meeting_template" */
  meeting_template_stream: Array<Meeting_Template>;
  /** fetch data from the table: "member" */
  member: Array<Member>;
  /** fetch aggregated fields from the table: "member" */
  member_aggregate: Member_Aggregate;
  /** fetch data from the table: "member" using primary key columns */
  member_by_pk?: Maybe<Member>;
  /** fetch data from the table: "member_role" */
  member_role: Array<Member_Role>;
  /** fetch aggregated fields from the table: "member_role" */
  member_role_aggregate: Member_Role_Aggregate;
  /** fetch data from the table: "member_role" using primary key columns */
  member_role_by_pk?: Maybe<Member_Role>;
  /** fetch data from the table in a streaming manner: "member_role" */
  member_role_stream: Array<Member_Role>;
  /** fetch data from the table: "member_scope" */
  member_scope: Array<Member_Scope>;
  /** fetch aggregated fields from the table: "member_scope" */
  member_scope_aggregate: Member_Scope_Aggregate;
  /** fetch data from the table: "member_scope" using primary key columns */
  member_scope_by_pk?: Maybe<Member_Scope>;
  /** fetch data from the table in a streaming manner: "member_scope" */
  member_scope_stream: Array<Member_Scope>;
  /** fetch data from the table in a streaming manner: "member" */
  member_stream: Array<Member>;
  /** fetch data from the table: "old_id" */
  old_id: Array<Old_Id>;
  /** fetch aggregated fields from the table: "old_id" */
  old_id_aggregate: Old_Id_Aggregate;
  /** fetch data from the table: "old_id" using primary key columns */
  old_id_by_pk?: Maybe<Old_Id>;
  /** fetch data from the table in a streaming manner: "old_id" */
  old_id_stream: Array<Old_Id>;
  /** fetch data from the table: "org" */
  org: Array<Org>;
  /** fetch aggregated fields from the table: "org" */
  org_aggregate: Org_Aggregate;
  /** fetch data from the table: "org" using primary key columns */
  org_by_pk?: Maybe<Org>;
  /** fetch data from the table: "org_file" */
  org_file: Array<Org_File>;
  /** fetch aggregated fields from the table: "org_file" */
  org_file_aggregate: Org_File_Aggregate;
  /** fetch data from the table: "org_file" using primary key columns */
  org_file_by_pk?: Maybe<Org_File>;
  /** fetch data from the table in a streaming manner: "org_file" */
  org_file_stream: Array<Org_File>;
  /** fetch data from the table in a streaming manner: "org" */
  org_stream: Array<Org>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "role" */
  role_stream: Array<Role>;
  /** fetch data from the table: "task" */
  task: Array<Task>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: Task_Aggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "task_status" */
  task_status: Array<Task_Status>;
  /** fetch aggregated fields from the table: "task_status" */
  task_status_aggregate: Task_Status_Aggregate;
  /** fetch data from the table: "task_status" using primary key columns */
  task_status_by_pk?: Maybe<Task_Status>;
  /** fetch data from the table in a streaming manner: "task_status" */
  task_status_stream: Array<Task_Status>;
  /** fetch data from the table in a streaming manner: "task" */
  task_stream: Array<Task>;
  /** fetch data from the table: "task_view" */
  task_view: Array<Task_View>;
  /** fetch aggregated fields from the table: "task_view" */
  task_view_aggregate: Task_View_Aggregate;
  /** fetch data from the table: "task_view" using primary key columns */
  task_view_by_pk?: Maybe<Task_View>;
  /** fetch data from the table in a streaming manner: "task_view" */
  task_view_stream: Array<Task_View>;
  /** fetch data from the table: "thread" */
  thread: Array<Thread>;
  /** fetch data from the table: "thread_activity" */
  thread_activity: Array<Thread_Activity>;
  /** fetch aggregated fields from the table: "thread_activity" */
  thread_activity_aggregate: Thread_Activity_Aggregate;
  /** fetch data from the table: "thread_activity" using primary key columns */
  thread_activity_by_pk?: Maybe<Thread_Activity>;
  /** fetch data from the table in a streaming manner: "thread_activity" */
  thread_activity_stream: Array<Thread_Activity>;
  /** fetch data from the table: "thread_activity_type" */
  thread_activity_type: Array<Thread_Activity_Type>;
  /** fetch aggregated fields from the table: "thread_activity_type" */
  thread_activity_type_aggregate: Thread_Activity_Type_Aggregate;
  /** fetch data from the table: "thread_activity_type" using primary key columns */
  thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** fetch data from the table in a streaming manner: "thread_activity_type" */
  thread_activity_type_stream: Array<Thread_Activity_Type>;
  /** fetch aggregated fields from the table: "thread" */
  thread_aggregate: Thread_Aggregate;
  /** fetch data from the table: "thread" using primary key columns */
  thread_by_pk?: Maybe<Thread>;
  /** fetch data from the table: "thread_member_status" */
  thread_member_status: Array<Thread_Member_Status>;
  /** fetch aggregated fields from the table: "thread_member_status" */
  thread_member_status_aggregate: Thread_Member_Status_Aggregate;
  /** fetch data from the table: "thread_member_status" using primary key columns */
  thread_member_status_by_pk?: Maybe<Thread_Member_Status>;
  /** fetch data from the table in a streaming manner: "thread_member_status" */
  thread_member_status_stream: Array<Thread_Member_Status>;
  /** fetch data from the table: "thread_poll_answer" */
  thread_poll_answer: Array<Thread_Poll_Answer>;
  /** fetch aggregated fields from the table: "thread_poll_answer" */
  thread_poll_answer_aggregate: Thread_Poll_Answer_Aggregate;
  /** fetch data from the table: "thread_poll_answer" using primary key columns */
  thread_poll_answer_by_pk?: Maybe<Thread_Poll_Answer>;
  /** fetch data from the table in a streaming manner: "thread_poll_answer" */
  thread_poll_answer_stream: Array<Thread_Poll_Answer>;
  /** fetch data from the table in a streaming manner: "thread" */
  thread_stream: Array<Thread>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.users" */
  users_stream: Array<Users>;
};


export type Subscription_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Subscription_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProviderRequests_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthProviderRequests_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthProviders_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthProviders_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Subscription_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokens_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthRefreshTokens_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Subscription_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthRoles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserProviders_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserProviders_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserRoles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeysAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeys_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserSecurityKeys_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootBucketArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBucketsArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootBucketsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootBuckets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Buckets_Stream_Cursor_Input>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootCircleArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


export type Subscription_RootCircle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Order_By>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


export type Subscription_RootCircle_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCircle_MemberArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


export type Subscription_RootCircle_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Member_Order_By>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


export type Subscription_RootCircle_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCircle_Member_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Member_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Member_Bool_Exp>;
};


export type Subscription_RootCircle_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Bool_Exp>;
};


export type Subscription_RootDecisionArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


export type Subscription_RootDecision_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


export type Subscription_RootDecision_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDecision_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Decision_Stream_Cursor_Input>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


export type Subscription_RootFileArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFilesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFiles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Files_Stream_Cursor_Input>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootLogArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


export type Subscription_RootLog_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


export type Subscription_RootLog_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLog_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Log_Stream_Cursor_Input>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


export type Subscription_RootMeetingArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


export type Subscription_RootMeeting_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


export type Subscription_RootMeeting_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeeting_RecurringArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


export type Subscription_RootMeeting_Recurring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


export type Subscription_RootMeeting_Recurring_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeeting_Recurring_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Recurring_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


export type Subscription_RootMeeting_StepArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


export type Subscription_RootMeeting_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Order_By>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


export type Subscription_RootMeeting_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeeting_Step_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Step_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Step_Bool_Exp>;
};


export type Subscription_RootMeeting_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Type_Order_By>>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};


export type Subscription_RootMeeting_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Step_Type_Order_By>>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};


export type Subscription_RootMeeting_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootMeeting_Step_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Step_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Step_Type_Bool_Exp>;
};


export type Subscription_RootMeeting_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


export type Subscription_RootMeeting_TemplateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


export type Subscription_RootMeeting_Template_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


export type Subscription_RootMeeting_Template_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeeting_Template_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Template_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


export type Subscription_RootMemberArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootMember_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootMember_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMember_RoleArgs = {
  distinct_on?: InputMaybe<Array<Member_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Role_Order_By>>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};


export type Subscription_RootMember_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Role_Order_By>>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};


export type Subscription_RootMember_Role_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootMember_Role_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Member_Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Member_Role_Bool_Exp>;
};


export type Subscription_RootMember_ScopeArgs = {
  distinct_on?: InputMaybe<Array<Member_Scope_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Scope_Order_By>>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};


export type Subscription_RootMember_Scope_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Scope_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Scope_Order_By>>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};


export type Subscription_RootMember_Scope_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootMember_Scope_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Member_Scope_Stream_Cursor_Input>>;
  where?: InputMaybe<Member_Scope_Bool_Exp>;
};


export type Subscription_RootMember_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Member_Stream_Cursor_Input>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootOld_IdArgs = {
  distinct_on?: InputMaybe<Array<Old_Id_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Old_Id_Order_By>>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};


export type Subscription_RootOld_Id_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Old_Id_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Old_Id_Order_By>>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};


export type Subscription_RootOld_Id_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOld_Id_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Old_Id_Stream_Cursor_Input>>;
  where?: InputMaybe<Old_Id_Bool_Exp>;
};


export type Subscription_RootOrgArgs = {
  distinct_on?: InputMaybe<Array<Org_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Order_By>>;
  where?: InputMaybe<Org_Bool_Exp>;
};


export type Subscription_RootOrg_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Order_By>>;
  where?: InputMaybe<Org_Bool_Exp>;
};


export type Subscription_RootOrg_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrg_FileArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


export type Subscription_RootOrg_File_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_File_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_File_Order_By>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


export type Subscription_RootOrg_File_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrg_File_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Org_File_Stream_Cursor_Input>>;
  where?: InputMaybe<Org_File_Bool_Exp>;
};


export type Subscription_RootOrg_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Org_Stream_Cursor_Input>>;
  where?: InputMaybe<Org_Bool_Exp>;
};


export type Subscription_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootTaskArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


export type Subscription_RootTask_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


export type Subscription_RootTask_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTask_StatusArgs = {
  distinct_on?: InputMaybe<Array<Task_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Status_Order_By>>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};


export type Subscription_RootTask_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Status_Order_By>>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};


export type Subscription_RootTask_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootTask_Status_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Task_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};


export type Subscription_RootTask_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Task_Stream_Cursor_Input>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


export type Subscription_RootTask_ViewArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


export type Subscription_RootTask_View_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


export type Subscription_RootTask_View_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTask_View_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Task_View_Stream_Cursor_Input>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


export type Subscription_RootThreadArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Subscription_RootThread_ActivityArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


export type Subscription_RootThread_Activity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


export type Subscription_RootThread_Activity_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Activity_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Activity_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


export type Subscription_RootThread_Activity_TypeArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Type_Order_By>>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};


export type Subscription_RootThread_Activity_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Type_Order_By>>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};


export type Subscription_RootThread_Activity_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootThread_Activity_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Activity_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};


export type Subscription_RootThread_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Subscription_RootThread_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Member_StatusArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


export type Subscription_RootThread_Member_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


export type Subscription_RootThread_Member_Status_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Member_Status_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Member_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


export type Subscription_RootThread_Poll_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Thread_Poll_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Poll_Answer_Order_By>>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};


export type Subscription_RootThread_Poll_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Poll_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Poll_Answer_Order_By>>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};


export type Subscription_RootThread_Poll_Answer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Poll_Answer_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Poll_Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};


export type Subscription_RootThread_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "task" */
export type Task = {
  __typename?: 'task';
  archived: Scalars['Boolean'];
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  dueDate?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  status: Task_Status_Enum;
  tasksIds: Array<Scalars['uuid']>;
  title: Scalars['String'];
};

/** aggregated selection of "task" */
export type Task_Aggregate = {
  __typename?: 'task_aggregate';
  aggregate?: Maybe<Task_Aggregate_Fields>;
  nodes: Array<Task>;
};

/** aggregate fields of "task" */
export type Task_Aggregate_Fields = {
  __typename?: 'task_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Task_Max_Fields>;
  min?: Maybe<Task_Min_Fields>;
};


/** aggregate fields of "task" */
export type Task_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Task_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "task". All fields are combined with a logical 'AND'. */
export type Task_Bool_Exp = {
  _and?: InputMaybe<Array<Task_Bool_Exp>>;
  _not?: InputMaybe<Task_Bool_Exp>;
  _or?: InputMaybe<Array<Task_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  dueDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Task_Status_Enum_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "task" */
export enum Task_Constraint {
  /** unique or primary key constraint on columns "id" */
  TaskPkey = 'task_pkey'
}

/** input type for inserting data into table "task" */
export type Task_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Task_Status_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Task_Max_Fields = {
  __typename?: 'task_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Task_Min_Fields = {
  __typename?: 'task_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "task" */
export type Task_Mutation_Response = {
  __typename?: 'task_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Task>;
};

/** on_conflict condition type for table "task" */
export type Task_On_Conflict = {
  constraint: Task_Constraint;
  update_columns?: Array<Task_Update_Column>;
  where?: InputMaybe<Task_Bool_Exp>;
};

/** Ordering options when selecting data from "task". */
export type Task_Order_By = {
  archived?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  dueDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: task */
export type Task_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "task" */
export enum Task_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  DueDate = 'dueDate',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "task" */
export type Task_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Task_Status_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "task_status" */
export type Task_Status = {
  __typename?: 'task_status';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "task_status" */
export type Task_Status_Aggregate = {
  __typename?: 'task_status_aggregate';
  aggregate?: Maybe<Task_Status_Aggregate_Fields>;
  nodes: Array<Task_Status>;
};

/** aggregate fields of "task_status" */
export type Task_Status_Aggregate_Fields = {
  __typename?: 'task_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Task_Status_Max_Fields>;
  min?: Maybe<Task_Status_Min_Fields>;
};


/** aggregate fields of "task_status" */
export type Task_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Task_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "task_status". All fields are combined with a logical 'AND'. */
export type Task_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Task_Status_Bool_Exp>>;
  _not?: InputMaybe<Task_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Task_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "task_status" */
export enum Task_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  TaskStatusPkey = 'task_status_pkey'
}

export enum Task_Status_Enum {
  Blocked = 'Blocked',
  Done = 'Done',
  InProgress = 'InProgress',
  InReview = 'InReview',
  Open = 'Open'
}

/** Boolean expression to compare columns of type "task_status_enum". All fields are combined with logical 'AND'. */
export type Task_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Task_Status_Enum>;
  _in?: InputMaybe<Array<Task_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Task_Status_Enum>;
  _nin?: InputMaybe<Array<Task_Status_Enum>>;
};

/** input type for inserting data into table "task_status" */
export type Task_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Task_Status_Max_Fields = {
  __typename?: 'task_status_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Task_Status_Min_Fields = {
  __typename?: 'task_status_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "task_status" */
export type Task_Status_Mutation_Response = {
  __typename?: 'task_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Task_Status>;
};

/** on_conflict condition type for table "task_status" */
export type Task_Status_On_Conflict = {
  constraint: Task_Status_Constraint;
  update_columns?: Array<Task_Status_Update_Column>;
  where?: InputMaybe<Task_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "task_status". */
export type Task_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: task_status */
export type Task_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "task_status" */
export enum Task_Status_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "task_status" */
export type Task_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "task_status" */
export type Task_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Task_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Task_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "task_status" */
export enum Task_Status_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Task_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Task_Status_Set_Input>;
  where: Task_Status_Bool_Exp;
};

/** Streaming cursor of the table "task" */
export type Task_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Task_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Task_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Task_Status_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** update columns of table "task" */
export enum Task_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  DueDate = 'dueDate',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

export type Task_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Task_Set_Input>;
  where: Task_Bool_Exp;
};

/** columns and relationships of "task_view" */
export type Task_View = {
  __typename?: 'task_view';
  id: Scalars['uuid'];
  key: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  tasksIds: Scalars['json'];
};


/** columns and relationships of "task_view" */
export type Task_ViewTasksIdsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "task_view" */
export type Task_View_Aggregate = {
  __typename?: 'task_view_aggregate';
  aggregate?: Maybe<Task_View_Aggregate_Fields>;
  nodes: Array<Task_View>;
};

/** aggregate fields of "task_view" */
export type Task_View_Aggregate_Fields = {
  __typename?: 'task_view_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Task_View_Max_Fields>;
  min?: Maybe<Task_View_Min_Fields>;
};


/** aggregate fields of "task_view" */
export type Task_View_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Task_View_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "task_view". All fields are combined with a logical 'AND'. */
export type Task_View_Bool_Exp = {
  _and?: InputMaybe<Array<Task_View_Bool_Exp>>;
  _not?: InputMaybe<Task_View_Bool_Exp>;
  _or?: InputMaybe<Array<Task_View_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  tasksIds?: InputMaybe<Json_Comparison_Exp>;
};

/** unique or primary key constraints on table "task_view" */
export enum Task_View_Constraint {
  /** unique or primary key constraint on columns "key", "orgId" */
  TaskViewOrgIdKeyKey = 'task_view_orgId_key_key',
  /** unique or primary key constraint on columns "id" */
  TaskViewPkey = 'task_view_pkey'
}

/** input type for inserting data into table "task_view" */
export type Task_View_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  tasksIds?: InputMaybe<Scalars['json']>;
};

/** aggregate max on columns */
export type Task_View_Max_Fields = {
  __typename?: 'task_view_max_fields';
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Task_View_Min_Fields = {
  __typename?: 'task_view_min_fields';
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "task_view" */
export type Task_View_Mutation_Response = {
  __typename?: 'task_view_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Task_View>;
};

/** on_conflict condition type for table "task_view" */
export type Task_View_On_Conflict = {
  constraint: Task_View_Constraint;
  update_columns?: Array<Task_View_Update_Column>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};

/** Ordering options when selecting data from "task_view". */
export type Task_View_Order_By = {
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  tasksIds?: InputMaybe<Order_By>;
};

/** primary key columns input for table: task_view */
export type Task_View_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "task_view" */
export enum Task_View_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  TasksIds = 'tasksIds'
}

/** input type for updating data in table "task_view" */
export type Task_View_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  tasksIds?: InputMaybe<Scalars['json']>;
};

/** Streaming cursor of the table "task_view" */
export type Task_View_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Task_View_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Task_View_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  tasksIds?: InputMaybe<Scalars['json']>;
};

/** update columns of table "task_view" */
export enum Task_View_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  TasksIds = 'tasksIds'
}

export type Task_View_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Task_View_Set_Input>;
  where: Task_View_Bool_Exp;
};

/** columns and relationships of "thread" */
export type Thread = {
  __typename?: 'thread';
  archived: Scalars['Boolean'];
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  initiatorMember: Member;
  initiatorMemberId: Scalars['uuid'];
  lastActivityDate?: Maybe<Scalars['timestamptz']>;
  lastActivityId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  member_status: Array<Thread_Member_Status>;
  /** An aggregate relationship */
  member_status_aggregate: Thread_Member_Status_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  participantsMembersIds: Array<Scalars['uuid']>;
  participantsScope: Member_Scope_Enum;
  title: Scalars['String'];
};


/** columns and relationships of "thread" */
export type ThreadMember_StatusArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadMember_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Member_Status_Order_By>>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadParticipantsMembersIdsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "thread_activity" */
export type Thread_Activity = {
  __typename?: 'thread_activity';
  createdAt: Scalars['timestamptz'];
  data: Scalars['thread_activity_data'];
  id: Scalars['uuid'];
  /** An object relationship */
  thread: Thread;
  threadId: Scalars['uuid'];
  type: Thread_Activity_Type_Enum;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};


/** columns and relationships of "thread_activity" */
export type Thread_ActivityDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "thread_activity" */
export type Thread_Activity_Aggregate = {
  __typename?: 'thread_activity_aggregate';
  aggregate?: Maybe<Thread_Activity_Aggregate_Fields>;
  nodes: Array<Thread_Activity>;
};

/** aggregate fields of "thread_activity" */
export type Thread_Activity_Aggregate_Fields = {
  __typename?: 'thread_activity_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Activity_Max_Fields>;
  min?: Maybe<Thread_Activity_Min_Fields>;
};


/** aggregate fields of "thread_activity" */
export type Thread_Activity_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "thread_activity". All fields are combined with a logical 'AND'. */
export type Thread_Activity_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Activity_Bool_Exp>>;
  _not?: InputMaybe<Thread_Activity_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Activity_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Thread_Activity_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_activity" */
export enum Thread_Activity_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadActivityPkey = 'thread_activity_pkey'
}

/** input type for inserting data into table "thread_activity" */
export type Thread_Activity_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  thread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  threadId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Thread_Activity_Type_Enum>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Thread_Activity_Max_Fields = {
  __typename?: 'thread_activity_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Thread_Activity_Min_Fields = {
  __typename?: 'thread_activity_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "thread_activity" */
export type Thread_Activity_Mutation_Response = {
  __typename?: 'thread_activity_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Activity>;
};

/** input type for inserting object relation for remote table "thread_activity" */
export type Thread_Activity_Obj_Rel_Insert_Input = {
  data: Thread_Activity_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_Activity_On_Conflict>;
};

/** on_conflict condition type for table "thread_activity" */
export type Thread_Activity_On_Conflict = {
  constraint: Thread_Activity_Constraint;
  update_columns?: Array<Thread_Activity_Update_Column>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_activity". */
export type Thread_Activity_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  thread?: InputMaybe<Thread_Order_By>;
  threadId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_activity */
export type Thread_Activity_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "thread_activity" */
export enum Thread_Activity_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  ThreadId = 'threadId',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "thread_activity" */
export type Thread_Activity_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Thread_Activity_Type_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "thread_activity" */
export type Thread_Activity_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Activity_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Activity_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Thread_Activity_Type_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** columns and relationships of "thread_activity_type" */
export type Thread_Activity_Type = {
  __typename?: 'thread_activity_type';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "thread_activity_type" */
export type Thread_Activity_Type_Aggregate = {
  __typename?: 'thread_activity_type_aggregate';
  aggregate?: Maybe<Thread_Activity_Type_Aggregate_Fields>;
  nodes: Array<Thread_Activity_Type>;
};

/** aggregate fields of "thread_activity_type" */
export type Thread_Activity_Type_Aggregate_Fields = {
  __typename?: 'thread_activity_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Activity_Type_Max_Fields>;
  min?: Maybe<Thread_Activity_Type_Min_Fields>;
};


/** aggregate fields of "thread_activity_type" */
export type Thread_Activity_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Activity_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "thread_activity_type". All fields are combined with a logical 'AND'. */
export type Thread_Activity_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Activity_Type_Bool_Exp>>;
  _not?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Activity_Type_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_activity_type" */
export enum Thread_Activity_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  ThreadActivityTypePkey = 'thread_activity_type_pkey'
}

export enum Thread_Activity_Type_Enum {
  Decision = 'Decision',
  Meeting = 'Meeting',
  Message = 'Message',
  Poll = 'Poll',
  Task = 'Task',
  Thread = 'Thread'
}

/** Boolean expression to compare columns of type "thread_activity_type_enum". All fields are combined with logical 'AND'. */
export type Thread_Activity_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Thread_Activity_Type_Enum>;
  _in?: InputMaybe<Array<Thread_Activity_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Thread_Activity_Type_Enum>;
  _nin?: InputMaybe<Array<Thread_Activity_Type_Enum>>;
};

/** input type for inserting data into table "thread_activity_type" */
export type Thread_Activity_Type_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Thread_Activity_Type_Max_Fields = {
  __typename?: 'thread_activity_type_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Thread_Activity_Type_Min_Fields = {
  __typename?: 'thread_activity_type_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "thread_activity_type" */
export type Thread_Activity_Type_Mutation_Response = {
  __typename?: 'thread_activity_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Activity_Type>;
};

/** on_conflict condition type for table "thread_activity_type" */
export type Thread_Activity_Type_On_Conflict = {
  constraint: Thread_Activity_Type_Constraint;
  update_columns?: Array<Thread_Activity_Type_Update_Column>;
  where?: InputMaybe<Thread_Activity_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_activity_type". */
export type Thread_Activity_Type_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_activity_type */
export type Thread_Activity_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "thread_activity_type" */
export enum Thread_Activity_Type_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "thread_activity_type" */
export type Thread_Activity_Type_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "thread_activity_type" */
export type Thread_Activity_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Activity_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Activity_Type_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "thread_activity_type" */
export enum Thread_Activity_Type_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Thread_Activity_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Activity_Type_Set_Input>;
  where: Thread_Activity_Type_Bool_Exp;
};

/** update columns of table "thread_activity" */
export enum Thread_Activity_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  ThreadId = 'threadId',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

export type Thread_Activity_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Activity_Set_Input>;
  where: Thread_Activity_Bool_Exp;
};

/** aggregated selection of "thread" */
export type Thread_Aggregate = {
  __typename?: 'thread_aggregate';
  aggregate?: Maybe<Thread_Aggregate_Fields>;
  nodes: Array<Thread>;
};

/** aggregate fields of "thread" */
export type Thread_Aggregate_Fields = {
  __typename?: 'thread_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Max_Fields>;
  min?: Maybe<Thread_Min_Fields>;
};


/** aggregate fields of "thread" */
export type Thread_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "thread". All fields are combined with a logical 'AND'. */
export type Thread_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Bool_Exp>>;
  _not?: InputMaybe<Thread_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  initiatorMember?: InputMaybe<Member_Bool_Exp>;
  initiatorMemberId?: InputMaybe<Uuid_Comparison_Exp>;
  lastActivityDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  lastActivityId?: InputMaybe<Uuid_Comparison_Exp>;
  member_status?: InputMaybe<Thread_Member_Status_Bool_Exp>;
  member_status_aggregate?: InputMaybe<Thread_Member_Status_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  participantsMembersIds?: InputMaybe<Json_Comparison_Exp>;
  participantsScope?: InputMaybe<Member_Scope_Enum_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread" */
export enum Thread_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadPkey = 'thread_pkey'
}

/** input type for inserting data into table "thread" */
export type Thread_Insert_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  initiatorMember?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  initiatorMemberId?: InputMaybe<Scalars['uuid']>;
  lastActivityDate?: InputMaybe<Scalars['timestamptz']>;
  lastActivityId?: InputMaybe<Scalars['uuid']>;
  member_status?: InputMaybe<Thread_Member_Status_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Thread_Max_Fields = {
  __typename?: 'thread_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiatorMemberId?: Maybe<Scalars['uuid']>;
  lastActivityDate?: Maybe<Scalars['timestamptz']>;
  lastActivityId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** columns and relationships of "thread_member_status" */
export type Thread_Member_Status = {
  __typename?: 'thread_member_status';
  id: Scalars['uuid'];
  lastReadActivityId?: Maybe<Scalars['uuid']>;
  lastReadDate: Scalars['timestamptz'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  /** An object relationship */
  thread: Thread;
  threadId: Scalars['uuid'];
};

/** aggregated selection of "thread_member_status" */
export type Thread_Member_Status_Aggregate = {
  __typename?: 'thread_member_status_aggregate';
  aggregate?: Maybe<Thread_Member_Status_Aggregate_Fields>;
  nodes: Array<Thread_Member_Status>;
};

export type Thread_Member_Status_Aggregate_Bool_Exp = {
  count?: InputMaybe<Thread_Member_Status_Aggregate_Bool_Exp_Count>;
};

export type Thread_Member_Status_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Member_Status_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "thread_member_status" */
export type Thread_Member_Status_Aggregate_Fields = {
  __typename?: 'thread_member_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Member_Status_Max_Fields>;
  min?: Maybe<Thread_Member_Status_Min_Fields>;
};


/** aggregate fields of "thread_member_status" */
export type Thread_Member_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Member_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "thread_member_status" */
export type Thread_Member_Status_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Thread_Member_Status_Max_Order_By>;
  min?: InputMaybe<Thread_Member_Status_Min_Order_By>;
};

/** input type for inserting array relation for remote table "thread_member_status" */
export type Thread_Member_Status_Arr_Rel_Insert_Input = {
  data: Array<Thread_Member_Status_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_Member_Status_On_Conflict>;
};

/** Boolean expression to filter rows from the table "thread_member_status". All fields are combined with a logical 'AND'. */
export type Thread_Member_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Member_Status_Bool_Exp>>;
  _not?: InputMaybe<Thread_Member_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Member_Status_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastReadActivityId?: InputMaybe<Uuid_Comparison_Exp>;
  lastReadDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_member_status" */
export enum Thread_Member_Status_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadMemberStatusPkey = 'thread_member_status_pkey',
  /** unique or primary key constraint on columns "memberId", "threadId" */
  ThreadMemberStatusThreadIdMemberIdKey = 'thread_member_status_threadId_memberId_key'
}

/** input type for inserting data into table "thread_member_status" */
export type Thread_Member_Status_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  lastReadActivityId?: InputMaybe<Scalars['uuid']>;
  lastReadDate?: InputMaybe<Scalars['timestamptz']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  thread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Thread_Member_Status_Max_Fields = {
  __typename?: 'thread_member_status_max_fields';
  id?: Maybe<Scalars['uuid']>;
  lastReadActivityId?: Maybe<Scalars['uuid']>;
  lastReadDate?: Maybe<Scalars['timestamptz']>;
  memberId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "thread_member_status" */
export type Thread_Member_Status_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  lastReadActivityId?: InputMaybe<Order_By>;
  lastReadDate?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Thread_Member_Status_Min_Fields = {
  __typename?: 'thread_member_status_min_fields';
  id?: Maybe<Scalars['uuid']>;
  lastReadActivityId?: Maybe<Scalars['uuid']>;
  lastReadDate?: Maybe<Scalars['timestamptz']>;
  memberId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "thread_member_status" */
export type Thread_Member_Status_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  lastReadActivityId?: InputMaybe<Order_By>;
  lastReadDate?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "thread_member_status" */
export type Thread_Member_Status_Mutation_Response = {
  __typename?: 'thread_member_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Member_Status>;
};

/** on_conflict condition type for table "thread_member_status" */
export type Thread_Member_Status_On_Conflict = {
  constraint: Thread_Member_Status_Constraint;
  update_columns?: Array<Thread_Member_Status_Update_Column>;
  where?: InputMaybe<Thread_Member_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_member_status". */
export type Thread_Member_Status_Order_By = {
  id?: InputMaybe<Order_By>;
  lastReadActivityId?: InputMaybe<Order_By>;
  lastReadDate?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  thread?: InputMaybe<Thread_Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_member_status */
export type Thread_Member_Status_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "thread_member_status" */
export enum Thread_Member_Status_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastReadActivityId = 'lastReadActivityId',
  /** column name */
  LastReadDate = 'lastReadDate',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  ThreadId = 'threadId'
}

/** input type for updating data in table "thread_member_status" */
export type Thread_Member_Status_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  lastReadActivityId?: InputMaybe<Scalars['uuid']>;
  lastReadDate?: InputMaybe<Scalars['timestamptz']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "thread_member_status" */
export type Thread_Member_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Member_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Member_Status_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  lastReadActivityId?: InputMaybe<Scalars['uuid']>;
  lastReadDate?: InputMaybe<Scalars['timestamptz']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "thread_member_status" */
export enum Thread_Member_Status_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastReadActivityId = 'lastReadActivityId',
  /** column name */
  LastReadDate = 'lastReadDate',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  ThreadId = 'threadId'
}

export type Thread_Member_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Member_Status_Set_Input>;
  where: Thread_Member_Status_Bool_Exp;
};

/** aggregate min on columns */
export type Thread_Min_Fields = {
  __typename?: 'thread_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiatorMemberId?: Maybe<Scalars['uuid']>;
  lastActivityDate?: Maybe<Scalars['timestamptz']>;
  lastActivityId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "thread" */
export type Thread_Mutation_Response = {
  __typename?: 'thread_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread>;
};

/** input type for inserting object relation for remote table "thread" */
export type Thread_Obj_Rel_Insert_Input = {
  data: Thread_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_On_Conflict>;
};

/** on_conflict condition type for table "thread" */
export type Thread_On_Conflict = {
  constraint: Thread_Constraint;
  update_columns?: Array<Thread_Update_Column>;
  where?: InputMaybe<Thread_Bool_Exp>;
};

/** Ordering options when selecting data from "thread". */
export type Thread_Order_By = {
  archived?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initiatorMember?: InputMaybe<Member_Order_By>;
  initiatorMemberId?: InputMaybe<Order_By>;
  lastActivityDate?: InputMaybe<Order_By>;
  lastActivityId?: InputMaybe<Order_By>;
  member_status_aggregate?: InputMaybe<Thread_Member_Status_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  participantsMembersIds?: InputMaybe<Order_By>;
  participantsScope?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread */
export type Thread_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "thread_poll_answer" */
export type Thread_Poll_Answer = {
  __typename?: 'thread_poll_answer';
  /** An object relationship */
  activity: Thread_Activity;
  activityId: Scalars['uuid'];
  choicesPoints: Array<Scalars['Int']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  userId: Scalars['uuid'];
};


/** columns and relationships of "thread_poll_answer" */
export type Thread_Poll_AnswerChoicesPointsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "thread_poll_answer" */
export type Thread_Poll_Answer_Aggregate = {
  __typename?: 'thread_poll_answer_aggregate';
  aggregate?: Maybe<Thread_Poll_Answer_Aggregate_Fields>;
  nodes: Array<Thread_Poll_Answer>;
};

/** aggregate fields of "thread_poll_answer" */
export type Thread_Poll_Answer_Aggregate_Fields = {
  __typename?: 'thread_poll_answer_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Poll_Answer_Max_Fields>;
  min?: Maybe<Thread_Poll_Answer_Min_Fields>;
};


/** aggregate fields of "thread_poll_answer" */
export type Thread_Poll_Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Poll_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "thread_poll_answer". All fields are combined with a logical 'AND'. */
export type Thread_Poll_Answer_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Poll_Answer_Bool_Exp>>;
  _not?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Poll_Answer_Bool_Exp>>;
  activity?: InputMaybe<Thread_Activity_Bool_Exp>;
  activityId?: InputMaybe<Uuid_Comparison_Exp>;
  choicesPoints?: InputMaybe<Json_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_poll_answer" */
export enum Thread_Poll_Answer_Constraint {
  /** unique or primary key constraint on columns "userId", "activityId" */
  ThreadPollAnswerActivityIdUserIdKey = 'thread_poll_answer_activityId_userId_key',
  /** unique or primary key constraint on columns "id" */
  ThreadPollAnswerPkey = 'thread_poll_answer_pkey'
}

/** input type for inserting data into table "thread_poll_answer" */
export type Thread_Poll_Answer_Insert_Input = {
  activity?: InputMaybe<Thread_Activity_Obj_Rel_Insert_Input>;
  activityId?: InputMaybe<Scalars['uuid']>;
  choicesPoints?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Thread_Poll_Answer_Max_Fields = {
  __typename?: 'thread_poll_answer_max_fields';
  activityId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Thread_Poll_Answer_Min_Fields = {
  __typename?: 'thread_poll_answer_min_fields';
  activityId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "thread_poll_answer" */
export type Thread_Poll_Answer_Mutation_Response = {
  __typename?: 'thread_poll_answer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Poll_Answer>;
};

/** on_conflict condition type for table "thread_poll_answer" */
export type Thread_Poll_Answer_On_Conflict = {
  constraint: Thread_Poll_Answer_Constraint;
  update_columns?: Array<Thread_Poll_Answer_Update_Column>;
  where?: InputMaybe<Thread_Poll_Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_poll_answer". */
export type Thread_Poll_Answer_Order_By = {
  activity?: InputMaybe<Thread_Activity_Order_By>;
  activityId?: InputMaybe<Order_By>;
  choicesPoints?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_poll_answer */
export type Thread_Poll_Answer_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "thread_poll_answer" */
export enum Thread_Poll_Answer_Select_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  ChoicesPoints = 'choicesPoints',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "thread_poll_answer" */
export type Thread_Poll_Answer_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  choicesPoints?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "thread_poll_answer" */
export type Thread_Poll_Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Poll_Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Poll_Answer_Stream_Cursor_Value_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  choicesPoints?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "thread_poll_answer" */
export enum Thread_Poll_Answer_Update_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  ChoicesPoints = 'choicesPoints',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'userId'
}

export type Thread_Poll_Answer_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Poll_Answer_Set_Input>;
  where: Thread_Poll_Answer_Bool_Exp;
};

/** select columns of table "thread" */
export enum Thread_Select_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  InitiatorMemberId = 'initiatorMemberId',
  /** column name */
  LastActivityDate = 'lastActivityDate',
  /** column name */
  LastActivityId = 'lastActivityId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "thread" */
export type Thread_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  initiatorMemberId?: InputMaybe<Scalars['uuid']>;
  lastActivityDate?: InputMaybe<Scalars['timestamptz']>;
  lastActivityId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "thread" */
export type Thread_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Stream_Cursor_Value_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  initiatorMemberId?: InputMaybe<Scalars['uuid']>;
  lastActivityDate?: InputMaybe<Scalars['timestamptz']>;
  lastActivityId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  participantsMembersIds?: InputMaybe<Scalars['json']>;
  participantsScope?: InputMaybe<Member_Scope_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** update columns of table "thread" */
export enum Thread_Update_Column {
  /** column name */
  Archived = 'archived',
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  InitiatorMemberId = 'initiatorMemberId',
  /** column name */
  LastActivityDate = 'lastActivityDate',
  /** column name */
  LastActivityId = 'lastActivityId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParticipantsMembersIds = 'participantsMembersIds',
  /** column name */
  ParticipantsScope = 'participantsScope',
  /** column name */
  Title = 'title'
}

export type Thread_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Set_Input>;
  where: Thread_Bool_Exp;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currentChallenge?: Maybe<Scalars['String']>;
  defaultRole: Scalars['String'];
  /** An object relationship */
  defaultRoleByRole: AuthRoles;
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['citext']>;
  emailVerified: Scalars['Boolean'];
  id: Scalars['uuid'];
  isAnonymous: Scalars['Boolean'];
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale: Scalars['String'];
  metadata?: Maybe<Scalars['jsonb']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt: Scalars['timestamptz'];
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberVerified: Scalars['Boolean'];
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokens_aggregate: AuthRefreshTokens_Aggregate;
  /** An array relationship */
  roles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  roles_aggregate: AuthUserRoles_Aggregate;
  /** An array relationship */
  securityKeys: Array<AuthUserSecurityKeys>;
  /** An aggregate relationship */
  securityKeys_aggregate: AuthUserSecurityKeys_Aggregate;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt: Scalars['timestamptz'];
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** aggregated selection of "auth.users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Users_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Users_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Bool_And = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Users_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "auth.users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "auth.users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  activeMfaType?: InputMaybe<String_Comparison_Exp>;
  avatarUrl?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentChallenge?: InputMaybe<String_Comparison_Exp>;
  defaultRole?: InputMaybe<String_Comparison_Exp>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  disabled?: InputMaybe<Boolean_Comparison_Exp>;
  displayName?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  emailVerified?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isAnonymous?: InputMaybe<Boolean_Comparison_Exp>;
  lastSeen?: InputMaybe<Timestamptz_Comparison_Exp>;
  locale?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  newEmail?: InputMaybe<Citext_Comparison_Exp>;
  otpHash?: InputMaybe<String_Comparison_Exp>;
  otpHashExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  otpMethodLastUsed?: InputMaybe<String_Comparison_Exp>;
  passwordHash?: InputMaybe<String_Comparison_Exp>;
  phoneNumber?: InputMaybe<String_Comparison_Exp>;
  phoneNumberVerified?: InputMaybe<Boolean_Comparison_Exp>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp>;
  roles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  roles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  securityKeys?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  securityKeys_aggregate?: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp>;
  ticket?: InputMaybe<String_Comparison_Exp>;
  ticketExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  totpSecret?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "phone_number" */
  UsersPhoneNumberKey = 'users_phone_number_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.users" */
export type Users_Insert_Input = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentChallenge?: InputMaybe<Scalars['String']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  otpHash?: InputMaybe<Scalars['String']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Arr_Rel_Insert_Input>;
  roles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  securityKeys?: InputMaybe<AuthUserSecurityKeys_Arr_Rel_Insert_Input>;
  ticket?: InputMaybe<Scalars['String']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentChallenge?: Maybe<Scalars['String']>;
  defaultRole?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['citext']>;
  id?: Maybe<Scalars['uuid']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']>;
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "auth.users" */
export type Users_Max_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  currentChallenge?: Maybe<Scalars['String']>;
  defaultRole?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['citext']>;
  id?: Maybe<Scalars['uuid']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']>;
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "auth.users" */
export type Users_Min_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "auth.users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "auth.users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.users". */
export type Users_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Order_By>;
  disabled?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isAnonymous?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  phoneNumberVerified?: InputMaybe<Order_By>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Order_By>;
  roles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  securityKeys_aggregate?: InputMaybe<AuthUserSecurityKeys_Aggregate_Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.users" */
export enum Users_Select_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "users_aggregate_bool_exp_bool_and_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** select "users_aggregate_bool_exp_bool_or_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** input type for updating data in table "auth.users" */
export type Users_Set_Input = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentChallenge?: InputMaybe<Scalars['String']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  otpHash?: InputMaybe<Scalars['String']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
  ticket?: InputMaybe<Scalars['String']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentChallenge?: InputMaybe<Scalars['String']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  otpHash?: InputMaybe<Scalars['String']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
  ticket?: InputMaybe<Scalars['String']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "auth.users" */
export enum Users_Update_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Users_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Users_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Users_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type DecisionFragment = { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string };

export type MeetingFragment = { __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null };

export type MeetingStepFragment = { __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData };

export type OrgFragment = { __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null };

export type TaskFragment = { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum };

export type ThreadFragment = { __typename?: 'thread', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, lastActivityId?: string | null, lastActivityDate?: string | null };

export type ThreadActivityFragment = { __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData };

export type CircleFieldsFragment = { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean };

export type GetCircleQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCircleQuery = { __typename?: 'query_root', circle_by_pk?: { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, members: Array<{ __typename?: 'circle_member', id: string, memberId: string, avgMinPerWeek?: number | null, archived: boolean }> } | null };

export type SubscribeCirclesSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
  archived: Scalars['Boolean'];
}>;


export type SubscribeCirclesSubscription = { __typename?: 'subscription_root', circle: Array<{ __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, members: Array<{ __typename?: 'circle_member', id: string, memberId: string, avgMinPerWeek?: number | null, archived: boolean }> }> };

export type CreateCircleMutationVariables = Exact<{
  orgId: Scalars['uuid'];
  roleId: Scalars['uuid'];
  parentId?: InputMaybe<Scalars['uuid']>;
}>;


export type CreateCircleMutation = { __typename?: 'mutation_root', insert_circle_one?: { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean } | null };

export type CreateCirclesMutationVariables = Exact<{
  circles: Array<Circle_Insert_Input> | Circle_Insert_Input;
}>;


export type CreateCirclesMutation = { __typename?: 'mutation_root', insert_circle?: { __typename?: 'circle_mutation_response', returning: Array<{ __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, role: { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null } }> } | null };

export type UpdateCircleMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Circle_Set_Input;
}>;


export type UpdateCircleMutation = { __typename?: 'mutation_root', update_circle_by_pk?: { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, role: { __typename?: 'role', name: string }, parent?: { __typename?: 'circle', role: { __typename?: 'role', name: string } } | null } | null };

export type ArchiveCircleMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveCircleMutation = { __typename?: 'mutation_root', update_circle_by_pk?: { __typename?: 'circle', id: string } | null };

export type CircleMemberFieldsFragment = { __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean };

export type GetCircleMemberQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCircleMemberQuery = { __typename?: 'query_root', circle_member_by_pk?: { __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean } | null };

export type CreateCircleMemberMutationVariables = Exact<{
  circleId: Scalars['uuid'];
  memberId: Scalars['uuid'];
  avgMinPerWeek?: InputMaybe<Scalars['Int']>;
}>;


export type CreateCircleMemberMutation = { __typename?: 'mutation_root', insert_circle_member_one?: { __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean, member: { __typename?: 'member', id: string, name: string }, circle: { __typename?: 'circle', role: { __typename?: 'role', id: string, name: string } } } | null };

export type UpdateCircleMemberMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Circle_Member_Set_Input;
}>;


export type UpdateCircleMemberMutation = { __typename?: 'mutation_root', update_circle_member_by_pk?: { __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean } | null };

export type ArchiveCircleMemberMutationVariables = Exact<{
  circleId: Scalars['uuid'];
  memberId: Scalars['uuid'];
}>;


export type ArchiveCircleMemberMutation = { __typename?: 'mutation_root', update_circle_member?: { __typename?: 'circle_member_mutation_response', returning: Array<{ __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean, member: { __typename?: 'member', id: string, name: string }, circle: { __typename?: 'circle', role: { __typename?: 'role', id: string, name: string } } }> } | null };

export type GetDecisionQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetDecisionQuery = { __typename?: 'query_root', decision_by_pk?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string } | null };

export type SubscribeDecisionSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeDecisionSubscription = { __typename?: 'subscription_root', decision_by_pk?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string } | null };

export type SubscribeCircleDecisionsSubscriptionVariables = Exact<{
  circleId: Scalars['uuid'];
  archived: Scalars['Boolean'];
}>;


export type SubscribeCircleDecisionsSubscription = { __typename?: 'subscription_root', decision: Array<{ __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string }> };

export type CreateDecisionMutationVariables = Exact<{
  values: Decision_Insert_Input;
}>;


export type CreateDecisionMutation = { __typename?: 'mutation_root', insert_decision_one?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string } | null };

export type UpdateDecisionMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Decision_Set_Input;
}>;


export type UpdateDecisionMutation = { __typename?: 'mutation_root', update_decision_by_pk?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string } | null };

export type ArchiveDecisionMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveDecisionMutation = { __typename?: 'mutation_root', update_decision_by_pk?: { __typename?: 'decision', id: string } | null };

export type LogFieldsFragment = { __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: any, changes: any, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean };

export type SubscribeLastLogsSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
}>;


export type SubscribeLastLogsSubscription = { __typename?: 'subscription_root', log: Array<{ __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: any, changes: any, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean }> };

export type SubscribeMeetingLogsSubscriptionVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type SubscribeMeetingLogsSubscription = { __typename?: 'subscription_root', log: Array<{ __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: any, changes: any, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean }> };

export type CreateLogMutationVariables = Exact<{
  values: Log_Insert_Input;
}>;


export type CreateLogMutation = { __typename?: 'mutation_root', insert_log_one?: { __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: any, changes: any, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean } | null };

export type CancelLogMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type CancelLogMutation = { __typename?: 'mutation_root', update_log_by_pk?: { __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: any, changes: any, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean } | null };

export type SubscribeMeetingSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeMeetingSubscription = { __typename?: 'subscription_root', meeting_by_pk?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null } | null };

export type SubscribeMeetingsByDatesSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
  fromDate: Scalars['timestamptz'];
  toDate: Scalars['timestamptz'];
}>;


export type SubscribeMeetingsByDatesSubscription = { __typename?: 'subscription_root', meeting: Array<{ __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null }> };

export type SubscribeCircleMeetingsSubscriptionVariables = Exact<{
  circleId: Scalars['uuid'];
}>;


export type SubscribeCircleMeetingsSubscription = { __typename?: 'subscription_root', meeting: Array<{ __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null }> };

export type CreateMeetingMutationVariables = Exact<{
  values: Meeting_Insert_Input;
}>;


export type CreateMeetingMutation = { __typename?: 'mutation_root', insert_meeting_one?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null } | null };

export type UpdateMeetingMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Meeting_Set_Input;
}>;


export type UpdateMeetingMutation = { __typename?: 'mutation_root', update_meeting_by_pk?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, createdAt: string, startDate: string, endDate: string, ended: boolean, title: string, attendees?: Array<MeetingAttendee> | null, stepsConfig: Array<MeetingStepConfig>, currentStepId?: string | null, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null } | null };

export type ArchiveMeetingMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveMeetingMutation = { __typename?: 'mutation_root', update_meeting_by_pk?: { __typename?: 'meeting', id: string } | null };

export type MeetingRecurringFragment = { __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } };

export type SubscribeMeetingRecurringSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeMeetingRecurringSubscription = { __typename?: 'subscription_root', meeting_recurring_by_pk?: { __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, meetings: Array<{ __typename?: 'meeting', id: string, recurringDate?: string | null }>, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } } | null };

export type SubscribeCircleMeetingRecurringsSubscriptionVariables = Exact<{
  where: Meeting_Recurring_Bool_Exp;
}>;


export type SubscribeCircleMeetingRecurringsSubscription = { __typename?: 'subscription_root', meeting_recurring: Array<{ __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } }> };

export type CreateMeetingRecurringMutationVariables = Exact<{
  values: Meeting_Recurring_Insert_Input;
}>;


export type CreateMeetingRecurringMutation = { __typename?: 'mutation_root', insert_meeting_recurring_one?: { __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } } | null };

export type UpdateMeetingRecurringMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Meeting_Recurring_Set_Input;
}>;


export type UpdateMeetingRecurringMutation = { __typename?: 'mutation_root', update_meeting_recurring_by_pk?: { __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } } | null };

export type DeleteMeetingRecurringMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteMeetingRecurringMutation = { __typename?: 'mutation_root', delete_meeting_recurring_by_pk?: { __typename?: 'meeting_recurring', id: string } | null };

export type GetMeetingStepsIdsQueryVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type GetMeetingStepsIdsQuery = { __typename?: 'query_root', meeting_step: Array<{ __typename?: 'meeting_step', id: string, stepConfigId: string }> };

export type GetMeetingStepsQueryVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type GetMeetingStepsQuery = { __typename?: 'query_root', meeting_step: Array<{ __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData }> };

export type SubscribeMeetingStepsSubscriptionVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type SubscribeMeetingStepsSubscription = { __typename?: 'subscription_root', meeting_step: Array<{ __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData }> };

export type CreateMeetingStepMutationVariables = Exact<{
  values: Meeting_Step_Insert_Input;
}>;


export type CreateMeetingStepMutation = { __typename?: 'mutation_root', insert_meeting_step_one?: { __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData } | null };

export type UpdateMeetingStepMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Meeting_Step_Set_Input;
}>;


export type UpdateMeetingStepMutation = { __typename?: 'mutation_root', update_meeting_step_by_pk?: { __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData } | null };

export type DeleteMeetingStepMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteMeetingStepMutation = { __typename?: 'mutation_root', delete_meeting_step_by_pk?: { __typename?: 'meeting_step', id: string } | null };

export type MeetingTemplateFragment = { __typename?: 'meeting_template', id: string, orgId: string, title: string, stepsConfig: Array<MeetingStepConfig> };

export type SubscribeMeetingTemplatesSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
}>;


export type SubscribeMeetingTemplatesSubscription = { __typename?: 'subscription_root', meeting_template: Array<{ __typename?: 'meeting_template', id: string, orgId: string, title: string, stepsConfig: Array<MeetingStepConfig> }> };

export type CreateMeetingTemplateMutationVariables = Exact<{
  values: Meeting_Template_Insert_Input;
}>;


export type CreateMeetingTemplateMutation = { __typename?: 'mutation_root', insert_meeting_template_one?: { __typename?: 'meeting_template', id: string, orgId: string, title: string, stepsConfig: Array<MeetingStepConfig> } | null };

export type UpdateMeetingTemplateMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Meeting_Template_Set_Input;
}>;


export type UpdateMeetingTemplateMutation = { __typename?: 'mutation_root', update_meeting_template_by_pk?: { __typename?: 'meeting_template', id: string, orgId: string, title: string, stepsConfig: Array<MeetingStepConfig> } | null };

export type DeleteMeetingTemplateMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteMeetingTemplateMutation = { __typename?: 'mutation_root', delete_meeting_template_by_pk?: { __typename?: 'meeting_template', id: string } | null };

export type MemberFieldsFragment = { __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null };

export type GetMemberQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetMemberQuery = { __typename?: 'query_root', member_by_pk?: { __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null } | null };

export type GetOrgsMembersQueryVariables = Exact<{
  orgsIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type GetOrgsMembersQuery = { __typename?: 'query_root', member: Array<{ __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null }> };

export type SubscribeMembersSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
  archived: Scalars['Boolean'];
}>;


export type SubscribeMembersSubscription = { __typename?: 'subscription_root', member: Array<{ __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null }> };

export type CreateMemberMutationVariables = Exact<{
  orgId: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type CreateMemberMutation = { __typename?: 'mutation_root', insert_member_one?: { __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Member_Set_Input;
}>;


export type UpdateMemberMutation = { __typename?: 'mutation_root', update_member_by_pk?: { __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null, meetingId?: string | null, preferences?: any | null } | null };

export type ArchiveMemberMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveMemberMutation = { __typename?: 'mutation_root', update_member_by_pk?: { __typename?: 'member', id: string } | null };

export type GetOrgQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetOrgQuery = { __typename?: 'query_root', org_by_pk?: { __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null } | null };

export type SubscribeOrgsSubscriptionVariables = Exact<{
  archived: Scalars['Boolean'];
}>;


export type SubscribeOrgsSubscription = { __typename?: 'subscription_root', org: Array<{ __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null }> };

export type UpdateOrgMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  defaultWorkedMinPerWeek: Scalars['Int'];
}>;


export type UpdateOrgMutation = { __typename?: 'mutation_root', update_org_by_pk?: { __typename?: 'org', id: string } | null };

export type ChangeOrgSlugMutationVariables = Exact<{
  id: Scalars['uuid'];
  slug: Scalars['String'];
}>;


export type ChangeOrgSlugMutation = { __typename?: 'mutation_root', update_org_by_pk?: { __typename?: 'org', id: string } | null };

export type ArchiveOrgMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveOrgMutation = { __typename?: 'mutation_root', update_org_by_pk?: { __typename?: 'org', id: string } | null };

export type RoleFieldsFragment = { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null };

export type GetRoleQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetRoleQuery = { __typename?: 'query_root', role_by_pk?: { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null } | null };

export type SubscribeRolesSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
  archived: Scalars['Boolean'];
}>;


export type SubscribeRolesSubscription = { __typename?: 'subscription_root', role: Array<{ __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null }> };

export type CreateRoleMutationVariables = Exact<{
  values: Role_Insert_Input;
}>;


export type CreateRoleMutation = { __typename?: 'mutation_root', insert_role_one?: { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null } | null };

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Role_Set_Input;
}>;


export type UpdateRoleMutation = { __typename?: 'mutation_root', update_role_by_pk?: { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, autoCreate: boolean, link: string, defaultMinPerWeek?: number | null, colorHue?: number | null } | null };

export type ArchiveRoleMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveRoleMutation = { __typename?: 'mutation_root', update_role_by_pk?: { __typename?: 'role', id: string } | null };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetTaskQuery = { __typename?: 'query_root', task_by_pk?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum } | null };

export type SubscribeTaskSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeTaskSubscription = { __typename?: 'subscription_root', task_by_pk?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum } | null };

export type SubscribeTasksSubscriptionVariables = Exact<{
  filters?: InputMaybe<Array<Task_Bool_Exp> | Task_Bool_Exp>;
}>;


export type SubscribeTasksSubscription = { __typename?: 'subscription_root', task: Array<{ __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum }> };

export type CreateTaskMutationVariables = Exact<{
  values: Task_Insert_Input;
}>;


export type CreateTaskMutation = { __typename?: 'mutation_root', insert_task_one?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Task_Set_Input;
}>;


export type UpdateTaskMutation = { __typename?: 'mutation_root', update_task_by_pk?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum } | null };

export type ArchiveTaskMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveTaskMutation = { __typename?: 'mutation_root', update_task_by_pk?: { __typename?: 'task', id: string } | null };

export type TaskViewFragment = { __typename?: 'task_view', id: string, orgId: string, key: string, tasksIds: any };

export type SubscribeTaskViewSubscriptionVariables = Exact<{
  orgId: Scalars['uuid'];
  key: Scalars['String'];
}>;


export type SubscribeTaskViewSubscription = { __typename?: 'subscription_root', task_view: Array<{ __typename?: 'task_view', id: string, orgId: string, key: string, tasksIds: any }> };

export type CreateTaskViewMutationVariables = Exact<{
  orgId: Scalars['uuid'];
  key: Scalars['String'];
  tasksIds?: InputMaybe<Scalars['json']>;
}>;


export type CreateTaskViewMutation = { __typename?: 'mutation_root', insert_task_view_one?: { __typename?: 'task_view', id: string, orgId: string, key: string, tasksIds: any } | null };

export type UpdateTaskViewMutationVariables = Exact<{
  orgId: Scalars['uuid'];
  key: Scalars['String'];
  tasksIds?: InputMaybe<Scalars['json']>;
}>;


export type UpdateTaskViewMutation = { __typename?: 'mutation_root', update_task_view?: { __typename?: 'task_view_mutation_response', returning: Array<{ __typename?: 'task_view', id: string, orgId: string, key: string, tasksIds: any }> } | null };

export type GetCircleThreadsIdsQueryVariables = Exact<{
  circleId: Scalars['uuid'];
}>;


export type GetCircleThreadsIdsQuery = { __typename?: 'query_root', thread: Array<{ __typename?: 'thread', id: string }> };

export type SubscribeThreadSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
  memberId: Scalars['uuid'];
}>;


export type SubscribeThreadSubscription = { __typename?: 'subscription_root', thread_by_pk?: { __typename?: 'thread', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, lastActivityId?: string | null, lastActivityDate?: string | null, member_status: Array<{ __typename?: 'thread_member_status', lastReadActivityId?: string | null, lastReadDate: string }> } | null };

export type SubscribeThreadsSubscriptionVariables = Exact<{
  filters?: InputMaybe<Array<Thread_Bool_Exp> | Thread_Bool_Exp>;
  memberId: Scalars['uuid'];
}>;


export type SubscribeThreadsSubscription = { __typename?: 'subscription_root', thread: Array<{ __typename?: 'thread', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, lastActivityId?: string | null, lastActivityDate?: string | null, member_status: Array<{ __typename?: 'thread_member_status', lastReadActivityId?: string | null, lastReadDate: string }> }> };

export type CreateThreadMutationVariables = Exact<{
  values: Thread_Insert_Input;
}>;


export type CreateThreadMutation = { __typename?: 'mutation_root', insert_thread_one?: { __typename?: 'thread', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, lastActivityId?: string | null, lastActivityDate?: string | null } | null };

export type UpdateThreadMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Thread_Set_Input;
}>;


export type UpdateThreadMutation = { __typename?: 'mutation_root', update_thread_by_pk?: { __typename?: 'thread', id: string, orgId: string, circleId: string, participantsScope: Member_Scope_Enum, participantsMembersIds: Array<string>, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, lastActivityId?: string | null, lastActivityDate?: string | null } | null };

export type ArchiveThreadMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ArchiveThreadMutation = { __typename?: 'mutation_root', update_thread_by_pk?: { __typename?: 'thread', id: string } | null };

export type GetLastThreadActivityQueryVariables = Exact<{
  threadId: Scalars['uuid'];
}>;


export type GetLastThreadActivityQuery = { __typename?: 'query_root', thread_activity: Array<{ __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData }> };

export type SubscribeThreadActivitySubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeThreadActivitySubscription = { __typename?: 'subscription_root', thread_activity_by_pk?: { __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData } | null };

export type SubscribeThreadActivitiesSubscriptionVariables = Exact<{
  threadId: Scalars['uuid'];
}>;


export type SubscribeThreadActivitiesSubscription = { __typename?: 'subscription_root', thread_activity: Array<{ __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData }> };

export type CreateThreadActivityMutationVariables = Exact<{
  values: Thread_Activity_Insert_Input;
}>;


export type CreateThreadActivityMutation = { __typename?: 'mutation_root', insert_thread_activity_one?: { __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData } | null };

export type UpdateThreadActivityMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Thread_Activity_Set_Input;
}>;


export type UpdateThreadActivityMutation = { __typename?: 'mutation_root', update_thread_activity_by_pk?: { __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: ThreadActivityData } | null };

export type DeleteThreadActivityMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteThreadActivityMutation = { __typename?: 'mutation_root', delete_thread_activity_by_pk?: { __typename?: 'thread_activity', id: string } | null };

export type ThreadMemberStatusFieldsFragment = { __typename?: 'thread_member_status', id: string, threadId: string, memberId: string, lastReadActivityId?: string | null, lastReadDate: string };

export type CreateThreadMemberStatusMutationVariables = Exact<{
  values: Thread_Member_Status_Insert_Input;
}>;


export type CreateThreadMemberStatusMutation = { __typename?: 'mutation_root', insert_thread_member_status_one?: { __typename?: 'thread_member_status', id: string, threadId: string, memberId: string, lastReadActivityId?: string | null, lastReadDate: string } | null };

export type UpdateThreadMemberStatusMutationVariables = Exact<{
  threadId: Scalars['uuid'];
  memberId: Scalars['uuid'];
  values: Thread_Member_Status_Set_Input;
}>;


export type UpdateThreadMemberStatusMutation = { __typename?: 'mutation_root', update_thread_member_status?: { __typename?: 'thread_member_status_mutation_response', returning: Array<{ __typename?: 'thread_member_status', id: string, threadId: string, memberId: string, lastReadActivityId?: string | null, lastReadDate: string }> } | null };

export type ThreadPollAnswerFragment = { __typename?: 'thread_poll_answer', id: string, activityId: string, userId: string, choicesPoints: Array<number>, createdAt: string };

export type SubscribeThreadPollAnswersSubscriptionVariables = Exact<{
  activityId: Scalars['uuid'];
}>;


export type SubscribeThreadPollAnswersSubscription = { __typename?: 'subscription_root', thread_poll_answer: Array<{ __typename?: 'thread_poll_answer', id: string, activityId: string, userId: string, choicesPoints: Array<number>, createdAt: string }> };

export type CreateThreadPollAnswerMutationVariables = Exact<{
  values: Thread_Poll_Answer_Insert_Input;
}>;


export type CreateThreadPollAnswerMutation = { __typename?: 'mutation_root', insert_thread_poll_answer_one?: { __typename?: 'thread_poll_answer', id: string, activityId: string, userId: string, choicesPoints: Array<number>, createdAt: string } | null };

export type UpdateThreadPollAnswerMutationVariables = Exact<{
  id: Scalars['uuid'];
  values: Thread_Poll_Answer_Set_Input;
}>;


export type UpdateThreadPollAnswerMutation = { __typename?: 'mutation_root', update_thread_poll_answer_by_pk?: { __typename?: 'thread_poll_answer', id: string, activityId: string, userId: string, choicesPoints: Array<number>, createdAt: string } | null };

export type DeleteThreadPollAnswersMutationVariables = Exact<{
  activityId: Scalars['uuid'];
}>;


export type DeleteThreadPollAnswersMutation = { __typename?: 'mutation_root', delete_thread_poll_answer?: { __typename?: 'thread_poll_answer_mutation_response', returning: Array<{ __typename?: 'thread_poll_answer', id: string }> } | null };

export type ChangeDisplayNameMutationVariables = Exact<{
  userId: Scalars['uuid'];
  displayName: Scalars['String'];
}>;


export type ChangeDisplayNameMutation = { __typename?: 'mutation_root', updateUser?: { __typename?: 'users', id: string, displayName: string } | null };

export const DecisionFragmentDoc = gql`
    fragment Decision on decision {
  id
  orgId
  circleId
  memberId
  title
  description
  archived
  createdAt
}
    `;
export const MeetingFragmentDoc = gql`
    fragment Meeting on meeting {
  id
  orgId
  circleId
  participantsScope
  participantsMembersIds
  createdAt
  startDate
  endDate
  ended
  title
  attendees
  stepsConfig
  currentStepId
  archived
  videoConf
  recurringId
  recurringDate
}
    `;
export const MeetingStepFragmentDoc = gql`
    fragment MeetingStep on meeting_step {
  id
  meetingId
  stepConfigId
  notes
  type
  data
}
    `;
export const OrgFragmentDoc = gql`
    fragment Org on org {
  id
  name
  archived
  createdAt
  defaultWorkedMinPerWeek
  slug
}
    `;
export const TaskFragmentDoc = gql`
    fragment Task on task {
  id
  orgId
  circleId
  memberId
  title
  description
  archived
  createdAt
  dueDate
  status
}
    `;
export const ThreadFragmentDoc = gql`
    fragment Thread on thread {
  id
  orgId
  circleId
  participantsScope
  participantsMembersIds
  initiatorMemberId
  title
  createdAt
  archived
  lastActivityId
  lastActivityDate
}
    `;
export const ThreadActivityFragmentDoc = gql`
    fragment ThreadActivity on thread_activity {
  id
  threadId
  userId
  createdAt
  type
  data
}
    `;
export const CircleFieldsFragmentDoc = gql`
    fragment CircleFields on circle {
  id
  orgId
  roleId
  parentId
  archived
}
    `;
export const CircleMemberFieldsFragmentDoc = gql`
    fragment CircleMemberFields on circle_member {
  id
  circleId
  memberId
  avgMinPerWeek
  createdAt
  archived
}
    `;
export const LogFieldsFragmentDoc = gql`
    fragment LogFields on log {
  id
  orgId
  userId
  memberId
  memberName
  meetingId
  createdAt
  display
  changes
  cancelLogId
  cancelMemberId
  cancelMemberName
  canceled
}
    `;
export const MeetingRecurringFragmentDoc = gql`
    fragment MeetingRecurring on meeting_recurring {
  id
  orgId
  circleId
  circle {
    role {
      name
      colorHue
    }
  }
  participantsScope
  participantsMembersIds
  templateId
  template {
    title
    stepsConfig
  }
  rrule
  duration
  videoConf
  createdAt
}
    `;
export const MeetingTemplateFragmentDoc = gql`
    fragment MeetingTemplate on meeting_template {
  id
  orgId
  title
  stepsConfig
}
    `;
export const MemberFieldsFragmentDoc = gql`
    fragment MemberFields on member {
  id
  orgId
  archived
  name
  description
  pictureFileId
  picture
  userId
  inviteEmail
  inviteDate
  workedMinPerWeek
  role
  meetingId
  preferences
}
    `;
export const RoleFieldsFragmentDoc = gql`
    fragment RoleFields on role {
  id
  orgId
  archived
  base
  name
  purpose
  domain
  accountabilities
  checklist
  indicators
  notes
  singleMember
  autoCreate
  link
  defaultMinPerWeek
  colorHue
}
    `;
export const TaskViewFragmentDoc = gql`
    fragment TaskView on task_view {
  id
  orgId
  key
  tasksIds
}
    `;
export const ThreadMemberStatusFieldsFragmentDoc = gql`
    fragment ThreadMemberStatusFields on thread_member_status {
  id
  threadId
  memberId
  lastReadActivityId
  lastReadDate
}
    `;
export const ThreadPollAnswerFragmentDoc = gql`
    fragment ThreadPollAnswer on thread_poll_answer {
  id
  activityId
  userId
  choicesPoints
  createdAt
}
    `;
export const GetCircleDocument = gql`
    query getCircle($id: uuid!) {
  circle_by_pk(id: $id) {
    ...CircleFields
    members(where: {archived: {_eq: false}}) {
      id
      memberId
      avgMinPerWeek
      archived
    }
  }
}
    ${CircleFieldsFragmentDoc}`;

/**
 * __useGetCircleQuery__
 *
 * To run a query within a React component, call `useGetCircleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleQuery(baseOptions: Apollo.QueryHookOptions<GetCircleQuery, GetCircleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCircleQuery, GetCircleQueryVariables>(GetCircleDocument, options);
      }
export function useGetCircleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCircleQuery, GetCircleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCircleQuery, GetCircleQueryVariables>(GetCircleDocument, options);
        }
export type GetCircleQueryHookResult = ReturnType<typeof useGetCircleQuery>;
export type GetCircleLazyQueryHookResult = ReturnType<typeof useGetCircleLazyQuery>;
export type GetCircleQueryResult = Apollo.QueryResult<GetCircleQuery, GetCircleQueryVariables>;
export function refetchGetCircleQuery(variables: GetCircleQueryVariables) {
      return { query: GetCircleDocument, variables: variables }
    }
export const SubscribeCirclesDocument = gql`
    subscription subscribeCircles($orgId: uuid!, $archived: Boolean!) {
  circle(where: {orgId: {_eq: $orgId}, archived: {_eq: $archived}}) {
    ...CircleFields
    members(where: {archived: {_eq: false}}) {
      id
      memberId
      avgMinPerWeek
      archived
    }
  }
}
    ${CircleFieldsFragmentDoc}`;

/**
 * __useSubscribeCirclesSubscription__
 *
 * To run a query within a React component, call `useSubscribeCirclesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeCirclesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeCirclesSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSubscribeCirclesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeCirclesSubscription, SubscribeCirclesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeCirclesSubscription, SubscribeCirclesSubscriptionVariables>(SubscribeCirclesDocument, options);
      }
export type SubscribeCirclesSubscriptionHookResult = ReturnType<typeof useSubscribeCirclesSubscription>;
export type SubscribeCirclesSubscriptionResult = Apollo.SubscriptionResult<SubscribeCirclesSubscription>;
export const CreateCircleDocument = gql`
    mutation createCircle($orgId: uuid!, $roleId: uuid!, $parentId: uuid) {
  insert_circle_one(object: {orgId: $orgId, roleId: $roleId, parentId: $parentId}) {
    ...CircleFields
  }
}
    ${CircleFieldsFragmentDoc}`;
export type CreateCircleMutationFn = Apollo.MutationFunction<CreateCircleMutation, CreateCircleMutationVariables>;

/**
 * __useCreateCircleMutation__
 *
 * To run a mutation, you first call `useCreateCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCircleMutation, { data, loading, error }] = useCreateCircleMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      roleId: // value for 'roleId'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCircleMutation(baseOptions?: Apollo.MutationHookOptions<CreateCircleMutation, CreateCircleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCircleMutation, CreateCircleMutationVariables>(CreateCircleDocument, options);
      }
export type CreateCircleMutationHookResult = ReturnType<typeof useCreateCircleMutation>;
export type CreateCircleMutationResult = Apollo.MutationResult<CreateCircleMutation>;
export type CreateCircleMutationOptions = Apollo.BaseMutationOptions<CreateCircleMutation, CreateCircleMutationVariables>;
export const CreateCirclesDocument = gql`
    mutation createCircles($circles: [circle_insert_input!]!) {
  insert_circle(objects: $circles) {
    returning {
      ...CircleFields
      role {
        ...RoleFields
      }
    }
  }
}
    ${CircleFieldsFragmentDoc}
${RoleFieldsFragmentDoc}`;
export type CreateCirclesMutationFn = Apollo.MutationFunction<CreateCirclesMutation, CreateCirclesMutationVariables>;

/**
 * __useCreateCirclesMutation__
 *
 * To run a mutation, you first call `useCreateCirclesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCirclesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCirclesMutation, { data, loading, error }] = useCreateCirclesMutation({
 *   variables: {
 *      circles: // value for 'circles'
 *   },
 * });
 */
export function useCreateCirclesMutation(baseOptions?: Apollo.MutationHookOptions<CreateCirclesMutation, CreateCirclesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCirclesMutation, CreateCirclesMutationVariables>(CreateCirclesDocument, options);
      }
export type CreateCirclesMutationHookResult = ReturnType<typeof useCreateCirclesMutation>;
export type CreateCirclesMutationResult = Apollo.MutationResult<CreateCirclesMutation>;
export type CreateCirclesMutationOptions = Apollo.BaseMutationOptions<CreateCirclesMutation, CreateCirclesMutationVariables>;
export const UpdateCircleDocument = gql`
    mutation updateCircle($id: uuid!, $values: circle_set_input!) {
  update_circle_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...CircleFields
    role {
      name
    }
    parent {
      role {
        name
      }
    }
  }
}
    ${CircleFieldsFragmentDoc}`;
export type UpdateCircleMutationFn = Apollo.MutationFunction<UpdateCircleMutation, UpdateCircleMutationVariables>;

/**
 * __useUpdateCircleMutation__
 *
 * To run a mutation, you first call `useUpdateCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCircleMutation, { data, loading, error }] = useUpdateCircleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateCircleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCircleMutation, UpdateCircleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCircleMutation, UpdateCircleMutationVariables>(UpdateCircleDocument, options);
      }
export type UpdateCircleMutationHookResult = ReturnType<typeof useUpdateCircleMutation>;
export type UpdateCircleMutationResult = Apollo.MutationResult<UpdateCircleMutation>;
export type UpdateCircleMutationOptions = Apollo.BaseMutationOptions<UpdateCircleMutation, UpdateCircleMutationVariables>;
export const ArchiveCircleDocument = gql`
    mutation archiveCircle($id: uuid!) {
  update_circle_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveCircleMutationFn = Apollo.MutationFunction<ArchiveCircleMutation, ArchiveCircleMutationVariables>;

/**
 * __useArchiveCircleMutation__
 *
 * To run a mutation, you first call `useArchiveCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCircleMutation, { data, loading, error }] = useArchiveCircleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveCircleMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCircleMutation, ArchiveCircleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCircleMutation, ArchiveCircleMutationVariables>(ArchiveCircleDocument, options);
      }
export type ArchiveCircleMutationHookResult = ReturnType<typeof useArchiveCircleMutation>;
export type ArchiveCircleMutationResult = Apollo.MutationResult<ArchiveCircleMutation>;
export type ArchiveCircleMutationOptions = Apollo.BaseMutationOptions<ArchiveCircleMutation, ArchiveCircleMutationVariables>;
export const GetCircleMemberDocument = gql`
    query getCircleMember($id: uuid!) {
  circle_member_by_pk(id: $id) {
    ...CircleMemberFields
  }
}
    ${CircleMemberFieldsFragmentDoc}`;

/**
 * __useGetCircleMemberQuery__
 *
 * To run a query within a React component, call `useGetCircleMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleMemberQuery(baseOptions: Apollo.QueryHookOptions<GetCircleMemberQuery, GetCircleMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCircleMemberQuery, GetCircleMemberQueryVariables>(GetCircleMemberDocument, options);
      }
export function useGetCircleMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCircleMemberQuery, GetCircleMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCircleMemberQuery, GetCircleMemberQueryVariables>(GetCircleMemberDocument, options);
        }
export type GetCircleMemberQueryHookResult = ReturnType<typeof useGetCircleMemberQuery>;
export type GetCircleMemberLazyQueryHookResult = ReturnType<typeof useGetCircleMemberLazyQuery>;
export type GetCircleMemberQueryResult = Apollo.QueryResult<GetCircleMemberQuery, GetCircleMemberQueryVariables>;
export function refetchGetCircleMemberQuery(variables: GetCircleMemberQueryVariables) {
      return { query: GetCircleMemberDocument, variables: variables }
    }
export const CreateCircleMemberDocument = gql`
    mutation createCircleMember($circleId: uuid!, $memberId: uuid!, $avgMinPerWeek: Int) {
  insert_circle_member_one(
    object: {circleId: $circleId, memberId: $memberId, avgMinPerWeek: $avgMinPerWeek}
  ) {
    ...CircleMemberFields
    member {
      id
      name
    }
    circle {
      role {
        id
        name
      }
    }
  }
}
    ${CircleMemberFieldsFragmentDoc}`;
export type CreateCircleMemberMutationFn = Apollo.MutationFunction<CreateCircleMemberMutation, CreateCircleMemberMutationVariables>;

/**
 * __useCreateCircleMemberMutation__
 *
 * To run a mutation, you first call `useCreateCircleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCircleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCircleMemberMutation, { data, loading, error }] = useCreateCircleMemberMutation({
 *   variables: {
 *      circleId: // value for 'circleId'
 *      memberId: // value for 'memberId'
 *      avgMinPerWeek: // value for 'avgMinPerWeek'
 *   },
 * });
 */
export function useCreateCircleMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateCircleMemberMutation, CreateCircleMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCircleMemberMutation, CreateCircleMemberMutationVariables>(CreateCircleMemberDocument, options);
      }
export type CreateCircleMemberMutationHookResult = ReturnType<typeof useCreateCircleMemberMutation>;
export type CreateCircleMemberMutationResult = Apollo.MutationResult<CreateCircleMemberMutation>;
export type CreateCircleMemberMutationOptions = Apollo.BaseMutationOptions<CreateCircleMemberMutation, CreateCircleMemberMutationVariables>;
export const UpdateCircleMemberDocument = gql`
    mutation updateCircleMember($id: uuid!, $values: circle_member_set_input!) {
  update_circle_member_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...CircleMemberFields
  }
}
    ${CircleMemberFieldsFragmentDoc}`;
export type UpdateCircleMemberMutationFn = Apollo.MutationFunction<UpdateCircleMemberMutation, UpdateCircleMemberMutationVariables>;

/**
 * __useUpdateCircleMemberMutation__
 *
 * To run a mutation, you first call `useUpdateCircleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCircleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCircleMemberMutation, { data, loading, error }] = useUpdateCircleMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateCircleMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCircleMemberMutation, UpdateCircleMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCircleMemberMutation, UpdateCircleMemberMutationVariables>(UpdateCircleMemberDocument, options);
      }
export type UpdateCircleMemberMutationHookResult = ReturnType<typeof useUpdateCircleMemberMutation>;
export type UpdateCircleMemberMutationResult = Apollo.MutationResult<UpdateCircleMemberMutation>;
export type UpdateCircleMemberMutationOptions = Apollo.BaseMutationOptions<UpdateCircleMemberMutation, UpdateCircleMemberMutationVariables>;
export const ArchiveCircleMemberDocument = gql`
    mutation archiveCircleMember($circleId: uuid!, $memberId: uuid!) {
  update_circle_member(
    where: {circleId: {_eq: $circleId}, memberId: {_eq: $memberId}}
    _set: {archived: true}
  ) {
    returning {
      ...CircleMemberFields
      member {
        id
        name
      }
      circle {
        role {
          id
          name
        }
      }
    }
  }
}
    ${CircleMemberFieldsFragmentDoc}`;
export type ArchiveCircleMemberMutationFn = Apollo.MutationFunction<ArchiveCircleMemberMutation, ArchiveCircleMemberMutationVariables>;

/**
 * __useArchiveCircleMemberMutation__
 *
 * To run a mutation, you first call `useArchiveCircleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCircleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCircleMemberMutation, { data, loading, error }] = useArchiveCircleMemberMutation({
 *   variables: {
 *      circleId: // value for 'circleId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useArchiveCircleMemberMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCircleMemberMutation, ArchiveCircleMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCircleMemberMutation, ArchiveCircleMemberMutationVariables>(ArchiveCircleMemberDocument, options);
      }
export type ArchiveCircleMemberMutationHookResult = ReturnType<typeof useArchiveCircleMemberMutation>;
export type ArchiveCircleMemberMutationResult = Apollo.MutationResult<ArchiveCircleMemberMutation>;
export type ArchiveCircleMemberMutationOptions = Apollo.BaseMutationOptions<ArchiveCircleMemberMutation, ArchiveCircleMemberMutationVariables>;
export const GetDecisionDocument = gql`
    query getDecision($id: uuid!) {
  decision_by_pk(id: $id) {
    ...Decision
  }
}
    ${DecisionFragmentDoc}`;

/**
 * __useGetDecisionQuery__
 *
 * To run a query within a React component, call `useGetDecisionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDecisionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDecisionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDecisionQuery(baseOptions: Apollo.QueryHookOptions<GetDecisionQuery, GetDecisionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDecisionQuery, GetDecisionQueryVariables>(GetDecisionDocument, options);
      }
export function useGetDecisionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDecisionQuery, GetDecisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDecisionQuery, GetDecisionQueryVariables>(GetDecisionDocument, options);
        }
export type GetDecisionQueryHookResult = ReturnType<typeof useGetDecisionQuery>;
export type GetDecisionLazyQueryHookResult = ReturnType<typeof useGetDecisionLazyQuery>;
export type GetDecisionQueryResult = Apollo.QueryResult<GetDecisionQuery, GetDecisionQueryVariables>;
export function refetchGetDecisionQuery(variables: GetDecisionQueryVariables) {
      return { query: GetDecisionDocument, variables: variables }
    }
export const SubscribeDecisionDocument = gql`
    subscription subscribeDecision($id: uuid!) {
  decision_by_pk(id: $id) {
    ...Decision
  }
}
    ${DecisionFragmentDoc}`;

/**
 * __useSubscribeDecisionSubscription__
 *
 * To run a query within a React component, call `useSubscribeDecisionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeDecisionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeDecisionSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeDecisionSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeDecisionSubscription, SubscribeDecisionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeDecisionSubscription, SubscribeDecisionSubscriptionVariables>(SubscribeDecisionDocument, options);
      }
export type SubscribeDecisionSubscriptionHookResult = ReturnType<typeof useSubscribeDecisionSubscription>;
export type SubscribeDecisionSubscriptionResult = Apollo.SubscriptionResult<SubscribeDecisionSubscription>;
export const SubscribeCircleDecisionsDocument = gql`
    subscription subscribeCircleDecisions($circleId: uuid!, $archived: Boolean!) {
  decision(
    where: {circleId: {_eq: $circleId}, archived: {_eq: $archived}}
    order_by: {createdAt: desc}
  ) {
    ...Decision
  }
}
    ${DecisionFragmentDoc}`;

/**
 * __useSubscribeCircleDecisionsSubscription__
 *
 * To run a query within a React component, call `useSubscribeCircleDecisionsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeCircleDecisionsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeCircleDecisionsSubscription({
 *   variables: {
 *      circleId: // value for 'circleId'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSubscribeCircleDecisionsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeCircleDecisionsSubscription, SubscribeCircleDecisionsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeCircleDecisionsSubscription, SubscribeCircleDecisionsSubscriptionVariables>(SubscribeCircleDecisionsDocument, options);
      }
export type SubscribeCircleDecisionsSubscriptionHookResult = ReturnType<typeof useSubscribeCircleDecisionsSubscription>;
export type SubscribeCircleDecisionsSubscriptionResult = Apollo.SubscriptionResult<SubscribeCircleDecisionsSubscription>;
export const CreateDecisionDocument = gql`
    mutation createDecision($values: decision_insert_input!) {
  insert_decision_one(object: $values) {
    ...Decision
  }
}
    ${DecisionFragmentDoc}`;
export type CreateDecisionMutationFn = Apollo.MutationFunction<CreateDecisionMutation, CreateDecisionMutationVariables>;

/**
 * __useCreateDecisionMutation__
 *
 * To run a mutation, you first call `useCreateDecisionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDecisionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDecisionMutation, { data, loading, error }] = useCreateDecisionMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateDecisionMutation(baseOptions?: Apollo.MutationHookOptions<CreateDecisionMutation, CreateDecisionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDecisionMutation, CreateDecisionMutationVariables>(CreateDecisionDocument, options);
      }
export type CreateDecisionMutationHookResult = ReturnType<typeof useCreateDecisionMutation>;
export type CreateDecisionMutationResult = Apollo.MutationResult<CreateDecisionMutation>;
export type CreateDecisionMutationOptions = Apollo.BaseMutationOptions<CreateDecisionMutation, CreateDecisionMutationVariables>;
export const UpdateDecisionDocument = gql`
    mutation updateDecision($id: uuid!, $values: decision_set_input!) {
  update_decision_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...Decision
  }
}
    ${DecisionFragmentDoc}`;
export type UpdateDecisionMutationFn = Apollo.MutationFunction<UpdateDecisionMutation, UpdateDecisionMutationVariables>;

/**
 * __useUpdateDecisionMutation__
 *
 * To run a mutation, you first call `useUpdateDecisionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDecisionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDecisionMutation, { data, loading, error }] = useUpdateDecisionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateDecisionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDecisionMutation, UpdateDecisionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDecisionMutation, UpdateDecisionMutationVariables>(UpdateDecisionDocument, options);
      }
export type UpdateDecisionMutationHookResult = ReturnType<typeof useUpdateDecisionMutation>;
export type UpdateDecisionMutationResult = Apollo.MutationResult<UpdateDecisionMutation>;
export type UpdateDecisionMutationOptions = Apollo.BaseMutationOptions<UpdateDecisionMutation, UpdateDecisionMutationVariables>;
export const ArchiveDecisionDocument = gql`
    mutation archiveDecision($id: uuid!) {
  update_decision_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveDecisionMutationFn = Apollo.MutationFunction<ArchiveDecisionMutation, ArchiveDecisionMutationVariables>;

/**
 * __useArchiveDecisionMutation__
 *
 * To run a mutation, you first call `useArchiveDecisionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveDecisionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveDecisionMutation, { data, loading, error }] = useArchiveDecisionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveDecisionMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveDecisionMutation, ArchiveDecisionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveDecisionMutation, ArchiveDecisionMutationVariables>(ArchiveDecisionDocument, options);
      }
export type ArchiveDecisionMutationHookResult = ReturnType<typeof useArchiveDecisionMutation>;
export type ArchiveDecisionMutationResult = Apollo.MutationResult<ArchiveDecisionMutation>;
export type ArchiveDecisionMutationOptions = Apollo.BaseMutationOptions<ArchiveDecisionMutation, ArchiveDecisionMutationVariables>;
export const SubscribeLastLogsDocument = gql`
    subscription subscribeLastLogs($orgId: uuid!) {
  log(where: {orgId: {_eq: $orgId}}, order_by: {createdAt: desc}, limit: 100) {
    ...LogFields
  }
}
    ${LogFieldsFragmentDoc}`;

/**
 * __useSubscribeLastLogsSubscription__
 *
 * To run a query within a React component, call `useSubscribeLastLogsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeLastLogsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeLastLogsSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useSubscribeLastLogsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeLastLogsSubscription, SubscribeLastLogsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeLastLogsSubscription, SubscribeLastLogsSubscriptionVariables>(SubscribeLastLogsDocument, options);
      }
export type SubscribeLastLogsSubscriptionHookResult = ReturnType<typeof useSubscribeLastLogsSubscription>;
export type SubscribeLastLogsSubscriptionResult = Apollo.SubscriptionResult<SubscribeLastLogsSubscription>;
export const SubscribeMeetingLogsDocument = gql`
    subscription subscribeMeetingLogs($meetingId: uuid!) {
  log(where: {meetingId: {_eq: $meetingId}}, order_by: {createdAt: asc}) {
    ...LogFields
  }
}
    ${LogFieldsFragmentDoc}`;

/**
 * __useSubscribeMeetingLogsSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingLogsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingLogsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingLogsSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useSubscribeMeetingLogsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingLogsSubscription, SubscribeMeetingLogsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingLogsSubscription, SubscribeMeetingLogsSubscriptionVariables>(SubscribeMeetingLogsDocument, options);
      }
export type SubscribeMeetingLogsSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingLogsSubscription>;
export type SubscribeMeetingLogsSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingLogsSubscription>;
export const CreateLogDocument = gql`
    mutation createLog($values: log_insert_input!) {
  insert_log_one(object: $values) {
    ...LogFields
  }
}
    ${LogFieldsFragmentDoc}`;
export type CreateLogMutationFn = Apollo.MutationFunction<CreateLogMutation, CreateLogMutationVariables>;

/**
 * __useCreateLogMutation__
 *
 * To run a mutation, you first call `useCreateLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLogMutation, { data, loading, error }] = useCreateLogMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateLogMutation, CreateLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLogMutation, CreateLogMutationVariables>(CreateLogDocument, options);
      }
export type CreateLogMutationHookResult = ReturnType<typeof useCreateLogMutation>;
export type CreateLogMutationResult = Apollo.MutationResult<CreateLogMutation>;
export type CreateLogMutationOptions = Apollo.BaseMutationOptions<CreateLogMutation, CreateLogMutationVariables>;
export const CancelLogDocument = gql`
    mutation cancelLog($id: uuid!) {
  update_log_by_pk(pk_columns: {id: $id}, _set: {canceled: true}) {
    ...LogFields
  }
}
    ${LogFieldsFragmentDoc}`;
export type CancelLogMutationFn = Apollo.MutationFunction<CancelLogMutation, CancelLogMutationVariables>;

/**
 * __useCancelLogMutation__
 *
 * To run a mutation, you first call `useCancelLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelLogMutation, { data, loading, error }] = useCancelLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelLogMutation(baseOptions?: Apollo.MutationHookOptions<CancelLogMutation, CancelLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelLogMutation, CancelLogMutationVariables>(CancelLogDocument, options);
      }
export type CancelLogMutationHookResult = ReturnType<typeof useCancelLogMutation>;
export type CancelLogMutationResult = Apollo.MutationResult<CancelLogMutation>;
export type CancelLogMutationOptions = Apollo.BaseMutationOptions<CancelLogMutation, CancelLogMutationVariables>;
export const SubscribeMeetingDocument = gql`
    subscription subscribeMeeting($id: uuid!) {
  meeting_by_pk(id: $id) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;

/**
 * __useSubscribeMeetingSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeMeetingSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingSubscription, SubscribeMeetingSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingSubscription, SubscribeMeetingSubscriptionVariables>(SubscribeMeetingDocument, options);
      }
export type SubscribeMeetingSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingSubscription>;
export type SubscribeMeetingSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingSubscription>;
export const SubscribeMeetingsByDatesDocument = gql`
    subscription subscribeMeetingsByDates($orgId: uuid!, $fromDate: timestamptz!, $toDate: timestamptz!) {
  meeting(
    where: {orgId: {_eq: $orgId}, startDate: {_gte: $fromDate, _lt: $toDate}, archived: {_eq: false}}
  ) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;

/**
 * __useSubscribeMeetingsByDatesSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingsByDatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingsByDatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingsByDatesSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useSubscribeMeetingsByDatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingsByDatesSubscription, SubscribeMeetingsByDatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingsByDatesSubscription, SubscribeMeetingsByDatesSubscriptionVariables>(SubscribeMeetingsByDatesDocument, options);
      }
export type SubscribeMeetingsByDatesSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingsByDatesSubscription>;
export type SubscribeMeetingsByDatesSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingsByDatesSubscription>;
export const SubscribeCircleMeetingsDocument = gql`
    subscription subscribeCircleMeetings($circleId: uuid!) {
  meeting(
    where: {circleId: {_eq: $circleId}, archived: {_eq: false}}
    order_by: {startDate: desc}
  ) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;

/**
 * __useSubscribeCircleMeetingsSubscription__
 *
 * To run a query within a React component, call `useSubscribeCircleMeetingsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeCircleMeetingsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeCircleMeetingsSubscription({
 *   variables: {
 *      circleId: // value for 'circleId'
 *   },
 * });
 */
export function useSubscribeCircleMeetingsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeCircleMeetingsSubscription, SubscribeCircleMeetingsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeCircleMeetingsSubscription, SubscribeCircleMeetingsSubscriptionVariables>(SubscribeCircleMeetingsDocument, options);
      }
export type SubscribeCircleMeetingsSubscriptionHookResult = ReturnType<typeof useSubscribeCircleMeetingsSubscription>;
export type SubscribeCircleMeetingsSubscriptionResult = Apollo.SubscriptionResult<SubscribeCircleMeetingsSubscription>;
export const CreateMeetingDocument = gql`
    mutation createMeeting($values: meeting_insert_input!) {
  insert_meeting_one(object: $values) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type CreateMeetingMutationFn = Apollo.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>;

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingMutation, CreateMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument, options);
      }
export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = Apollo.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = Apollo.BaseMutationOptions<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const UpdateMeetingDocument = gql`
    mutation updateMeeting($id: uuid!, $values: meeting_set_input!) {
  update_meeting_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type UpdateMeetingMutationFn = Apollo.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>;

/**
 * __useUpdateMeetingMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingMutation, { data, loading, error }] = useUpdateMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument, options);
      }
export type UpdateMeetingMutationHookResult = ReturnType<typeof useUpdateMeetingMutation>;
export type UpdateMeetingMutationResult = Apollo.MutationResult<UpdateMeetingMutation>;
export type UpdateMeetingMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const ArchiveMeetingDocument = gql`
    mutation archiveMeeting($id: uuid!) {
  update_meeting_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveMeetingMutationFn = Apollo.MutationFunction<ArchiveMeetingMutation, ArchiveMeetingMutationVariables>;

/**
 * __useArchiveMeetingMutation__
 *
 * To run a mutation, you first call `useArchiveMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveMeetingMutation, { data, loading, error }] = useArchiveMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveMeetingMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveMeetingMutation, ArchiveMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveMeetingMutation, ArchiveMeetingMutationVariables>(ArchiveMeetingDocument, options);
      }
export type ArchiveMeetingMutationHookResult = ReturnType<typeof useArchiveMeetingMutation>;
export type ArchiveMeetingMutationResult = Apollo.MutationResult<ArchiveMeetingMutation>;
export type ArchiveMeetingMutationOptions = Apollo.BaseMutationOptions<ArchiveMeetingMutation, ArchiveMeetingMutationVariables>;
export const SubscribeMeetingRecurringDocument = gql`
    subscription subscribeMeetingRecurring($id: uuid!) {
  meeting_recurring_by_pk(id: $id) {
    ...MeetingRecurring
    meetings {
      id
      recurringDate
    }
  }
}
    ${MeetingRecurringFragmentDoc}`;

/**
 * __useSubscribeMeetingRecurringSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingRecurringSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingRecurringSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingRecurringSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeMeetingRecurringSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingRecurringSubscription, SubscribeMeetingRecurringSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingRecurringSubscription, SubscribeMeetingRecurringSubscriptionVariables>(SubscribeMeetingRecurringDocument, options);
      }
export type SubscribeMeetingRecurringSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingRecurringSubscription>;
export type SubscribeMeetingRecurringSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingRecurringSubscription>;
export const SubscribeCircleMeetingRecurringsDocument = gql`
    subscription subscribeCircleMeetingRecurrings($where: meeting_recurring_bool_exp!) {
  meeting_recurring(where: $where, order_by: {template: {title: asc}}) {
    ...MeetingRecurring
  }
}
    ${MeetingRecurringFragmentDoc}`;

/**
 * __useSubscribeCircleMeetingRecurringsSubscription__
 *
 * To run a query within a React component, call `useSubscribeCircleMeetingRecurringsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeCircleMeetingRecurringsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeCircleMeetingRecurringsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSubscribeCircleMeetingRecurringsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeCircleMeetingRecurringsSubscription, SubscribeCircleMeetingRecurringsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeCircleMeetingRecurringsSubscription, SubscribeCircleMeetingRecurringsSubscriptionVariables>(SubscribeCircleMeetingRecurringsDocument, options);
      }
export type SubscribeCircleMeetingRecurringsSubscriptionHookResult = ReturnType<typeof useSubscribeCircleMeetingRecurringsSubscription>;
export type SubscribeCircleMeetingRecurringsSubscriptionResult = Apollo.SubscriptionResult<SubscribeCircleMeetingRecurringsSubscription>;
export const CreateMeetingRecurringDocument = gql`
    mutation createMeetingRecurring($values: meeting_recurring_insert_input!) {
  insert_meeting_recurring_one(object: $values) {
    ...MeetingRecurring
  }
}
    ${MeetingRecurringFragmentDoc}`;
export type CreateMeetingRecurringMutationFn = Apollo.MutationFunction<CreateMeetingRecurringMutation, CreateMeetingRecurringMutationVariables>;

/**
 * __useCreateMeetingRecurringMutation__
 *
 * To run a mutation, you first call `useCreateMeetingRecurringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingRecurringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingRecurringMutation, { data, loading, error }] = useCreateMeetingRecurringMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateMeetingRecurringMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingRecurringMutation, CreateMeetingRecurringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeetingRecurringMutation, CreateMeetingRecurringMutationVariables>(CreateMeetingRecurringDocument, options);
      }
export type CreateMeetingRecurringMutationHookResult = ReturnType<typeof useCreateMeetingRecurringMutation>;
export type CreateMeetingRecurringMutationResult = Apollo.MutationResult<CreateMeetingRecurringMutation>;
export type CreateMeetingRecurringMutationOptions = Apollo.BaseMutationOptions<CreateMeetingRecurringMutation, CreateMeetingRecurringMutationVariables>;
export const UpdateMeetingRecurringDocument = gql`
    mutation updateMeetingRecurring($id: uuid!, $values: meeting_recurring_set_input!) {
  update_meeting_recurring_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...MeetingRecurring
  }
}
    ${MeetingRecurringFragmentDoc}`;
export type UpdateMeetingRecurringMutationFn = Apollo.MutationFunction<UpdateMeetingRecurringMutation, UpdateMeetingRecurringMutationVariables>;

/**
 * __useUpdateMeetingRecurringMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingRecurringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingRecurringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingRecurringMutation, { data, loading, error }] = useUpdateMeetingRecurringMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateMeetingRecurringMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingRecurringMutation, UpdateMeetingRecurringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingRecurringMutation, UpdateMeetingRecurringMutationVariables>(UpdateMeetingRecurringDocument, options);
      }
export type UpdateMeetingRecurringMutationHookResult = ReturnType<typeof useUpdateMeetingRecurringMutation>;
export type UpdateMeetingRecurringMutationResult = Apollo.MutationResult<UpdateMeetingRecurringMutation>;
export type UpdateMeetingRecurringMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingRecurringMutation, UpdateMeetingRecurringMutationVariables>;
export const DeleteMeetingRecurringDocument = gql`
    mutation deleteMeetingRecurring($id: uuid!) {
  delete_meeting_recurring_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteMeetingRecurringMutationFn = Apollo.MutationFunction<DeleteMeetingRecurringMutation, DeleteMeetingRecurringMutationVariables>;

/**
 * __useDeleteMeetingRecurringMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingRecurringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingRecurringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingRecurringMutation, { data, loading, error }] = useDeleteMeetingRecurringMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingRecurringMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingRecurringMutation, DeleteMeetingRecurringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeetingRecurringMutation, DeleteMeetingRecurringMutationVariables>(DeleteMeetingRecurringDocument, options);
      }
export type DeleteMeetingRecurringMutationHookResult = ReturnType<typeof useDeleteMeetingRecurringMutation>;
export type DeleteMeetingRecurringMutationResult = Apollo.MutationResult<DeleteMeetingRecurringMutation>;
export type DeleteMeetingRecurringMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingRecurringMutation, DeleteMeetingRecurringMutationVariables>;
export const GetMeetingStepsIdsDocument = gql`
    query getMeetingStepsIds($meetingId: uuid!) {
  meeting_step(where: {meetingId: {_eq: $meetingId}}) {
    id
    stepConfigId
  }
}
    `;

/**
 * __useGetMeetingStepsIdsQuery__
 *
 * To run a query within a React component, call `useGetMeetingStepsIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingStepsIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingStepsIdsQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetMeetingStepsIdsQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingStepsIdsQuery, GetMeetingStepsIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingStepsIdsQuery, GetMeetingStepsIdsQueryVariables>(GetMeetingStepsIdsDocument, options);
      }
export function useGetMeetingStepsIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingStepsIdsQuery, GetMeetingStepsIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingStepsIdsQuery, GetMeetingStepsIdsQueryVariables>(GetMeetingStepsIdsDocument, options);
        }
export type GetMeetingStepsIdsQueryHookResult = ReturnType<typeof useGetMeetingStepsIdsQuery>;
export type GetMeetingStepsIdsLazyQueryHookResult = ReturnType<typeof useGetMeetingStepsIdsLazyQuery>;
export type GetMeetingStepsIdsQueryResult = Apollo.QueryResult<GetMeetingStepsIdsQuery, GetMeetingStepsIdsQueryVariables>;
export function refetchGetMeetingStepsIdsQuery(variables: GetMeetingStepsIdsQueryVariables) {
      return { query: GetMeetingStepsIdsDocument, variables: variables }
    }
export const GetMeetingStepsDocument = gql`
    query getMeetingSteps($meetingId: uuid!) {
  meeting_step(where: {meetingId: {_eq: $meetingId}}) {
    ...MeetingStep
  }
}
    ${MeetingStepFragmentDoc}`;

/**
 * __useGetMeetingStepsQuery__
 *
 * To run a query within a React component, call `useGetMeetingStepsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingStepsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingStepsQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useGetMeetingStepsQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingStepsQuery, GetMeetingStepsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingStepsQuery, GetMeetingStepsQueryVariables>(GetMeetingStepsDocument, options);
      }
export function useGetMeetingStepsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingStepsQuery, GetMeetingStepsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingStepsQuery, GetMeetingStepsQueryVariables>(GetMeetingStepsDocument, options);
        }
export type GetMeetingStepsQueryHookResult = ReturnType<typeof useGetMeetingStepsQuery>;
export type GetMeetingStepsLazyQueryHookResult = ReturnType<typeof useGetMeetingStepsLazyQuery>;
export type GetMeetingStepsQueryResult = Apollo.QueryResult<GetMeetingStepsQuery, GetMeetingStepsQueryVariables>;
export function refetchGetMeetingStepsQuery(variables: GetMeetingStepsQueryVariables) {
      return { query: GetMeetingStepsDocument, variables: variables }
    }
export const SubscribeMeetingStepsDocument = gql`
    subscription subscribeMeetingSteps($meetingId: uuid!) {
  meeting_step(where: {meetingId: {_eq: $meetingId}}) {
    ...MeetingStep
  }
}
    ${MeetingStepFragmentDoc}`;

/**
 * __useSubscribeMeetingStepsSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingStepsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingStepsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingStepsSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useSubscribeMeetingStepsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingStepsSubscription, SubscribeMeetingStepsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingStepsSubscription, SubscribeMeetingStepsSubscriptionVariables>(SubscribeMeetingStepsDocument, options);
      }
export type SubscribeMeetingStepsSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingStepsSubscription>;
export type SubscribeMeetingStepsSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingStepsSubscription>;
export const CreateMeetingStepDocument = gql`
    mutation createMeetingStep($values: meeting_step_insert_input!) {
  insert_meeting_step_one(object: $values) {
    ...MeetingStep
  }
}
    ${MeetingStepFragmentDoc}`;
export type CreateMeetingStepMutationFn = Apollo.MutationFunction<CreateMeetingStepMutation, CreateMeetingStepMutationVariables>;

/**
 * __useCreateMeetingStepMutation__
 *
 * To run a mutation, you first call `useCreateMeetingStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingStepMutation, { data, loading, error }] = useCreateMeetingStepMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateMeetingStepMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingStepMutation, CreateMeetingStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeetingStepMutation, CreateMeetingStepMutationVariables>(CreateMeetingStepDocument, options);
      }
export type CreateMeetingStepMutationHookResult = ReturnType<typeof useCreateMeetingStepMutation>;
export type CreateMeetingStepMutationResult = Apollo.MutationResult<CreateMeetingStepMutation>;
export type CreateMeetingStepMutationOptions = Apollo.BaseMutationOptions<CreateMeetingStepMutation, CreateMeetingStepMutationVariables>;
export const UpdateMeetingStepDocument = gql`
    mutation updateMeetingStep($id: uuid!, $values: meeting_step_set_input!) {
  update_meeting_step_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...MeetingStep
  }
}
    ${MeetingStepFragmentDoc}`;
export type UpdateMeetingStepMutationFn = Apollo.MutationFunction<UpdateMeetingStepMutation, UpdateMeetingStepMutationVariables>;

/**
 * __useUpdateMeetingStepMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingStepMutation, { data, loading, error }] = useUpdateMeetingStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateMeetingStepMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingStepMutation, UpdateMeetingStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingStepMutation, UpdateMeetingStepMutationVariables>(UpdateMeetingStepDocument, options);
      }
export type UpdateMeetingStepMutationHookResult = ReturnType<typeof useUpdateMeetingStepMutation>;
export type UpdateMeetingStepMutationResult = Apollo.MutationResult<UpdateMeetingStepMutation>;
export type UpdateMeetingStepMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingStepMutation, UpdateMeetingStepMutationVariables>;
export const DeleteMeetingStepDocument = gql`
    mutation deleteMeetingStep($id: uuid!) {
  delete_meeting_step_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteMeetingStepMutationFn = Apollo.MutationFunction<DeleteMeetingStepMutation, DeleteMeetingStepMutationVariables>;

/**
 * __useDeleteMeetingStepMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingStepMutation, { data, loading, error }] = useDeleteMeetingStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingStepMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingStepMutation, DeleteMeetingStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeetingStepMutation, DeleteMeetingStepMutationVariables>(DeleteMeetingStepDocument, options);
      }
export type DeleteMeetingStepMutationHookResult = ReturnType<typeof useDeleteMeetingStepMutation>;
export type DeleteMeetingStepMutationResult = Apollo.MutationResult<DeleteMeetingStepMutation>;
export type DeleteMeetingStepMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingStepMutation, DeleteMeetingStepMutationVariables>;
export const SubscribeMeetingTemplatesDocument = gql`
    subscription subscribeMeetingTemplates($orgId: uuid!) {
  meeting_template(where: {orgId: {_eq: $orgId}}, order_by: {title: asc}) {
    ...MeetingTemplate
  }
}
    ${MeetingTemplateFragmentDoc}`;

/**
 * __useSubscribeMeetingTemplatesSubscription__
 *
 * To run a query within a React component, call `useSubscribeMeetingTemplatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMeetingTemplatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMeetingTemplatesSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useSubscribeMeetingTemplatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMeetingTemplatesSubscription, SubscribeMeetingTemplatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMeetingTemplatesSubscription, SubscribeMeetingTemplatesSubscriptionVariables>(SubscribeMeetingTemplatesDocument, options);
      }
export type SubscribeMeetingTemplatesSubscriptionHookResult = ReturnType<typeof useSubscribeMeetingTemplatesSubscription>;
export type SubscribeMeetingTemplatesSubscriptionResult = Apollo.SubscriptionResult<SubscribeMeetingTemplatesSubscription>;
export const CreateMeetingTemplateDocument = gql`
    mutation createMeetingTemplate($values: meeting_template_insert_input!) {
  insert_meeting_template_one(object: $values) {
    ...MeetingTemplate
  }
}
    ${MeetingTemplateFragmentDoc}`;
export type CreateMeetingTemplateMutationFn = Apollo.MutationFunction<CreateMeetingTemplateMutation, CreateMeetingTemplateMutationVariables>;

/**
 * __useCreateMeetingTemplateMutation__
 *
 * To run a mutation, you first call `useCreateMeetingTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingTemplateMutation, { data, loading, error }] = useCreateMeetingTemplateMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateMeetingTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingTemplateMutation, CreateMeetingTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeetingTemplateMutation, CreateMeetingTemplateMutationVariables>(CreateMeetingTemplateDocument, options);
      }
export type CreateMeetingTemplateMutationHookResult = ReturnType<typeof useCreateMeetingTemplateMutation>;
export type CreateMeetingTemplateMutationResult = Apollo.MutationResult<CreateMeetingTemplateMutation>;
export type CreateMeetingTemplateMutationOptions = Apollo.BaseMutationOptions<CreateMeetingTemplateMutation, CreateMeetingTemplateMutationVariables>;
export const UpdateMeetingTemplateDocument = gql`
    mutation updateMeetingTemplate($id: uuid!, $values: meeting_template_set_input!) {
  update_meeting_template_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...MeetingTemplate
  }
}
    ${MeetingTemplateFragmentDoc}`;
export type UpdateMeetingTemplateMutationFn = Apollo.MutationFunction<UpdateMeetingTemplateMutation, UpdateMeetingTemplateMutationVariables>;

/**
 * __useUpdateMeetingTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingTemplateMutation, { data, loading, error }] = useUpdateMeetingTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateMeetingTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingTemplateMutation, UpdateMeetingTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingTemplateMutation, UpdateMeetingTemplateMutationVariables>(UpdateMeetingTemplateDocument, options);
      }
export type UpdateMeetingTemplateMutationHookResult = ReturnType<typeof useUpdateMeetingTemplateMutation>;
export type UpdateMeetingTemplateMutationResult = Apollo.MutationResult<UpdateMeetingTemplateMutation>;
export type UpdateMeetingTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingTemplateMutation, UpdateMeetingTemplateMutationVariables>;
export const DeleteMeetingTemplateDocument = gql`
    mutation deleteMeetingTemplate($id: uuid!) {
  delete_meeting_template_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteMeetingTemplateMutationFn = Apollo.MutationFunction<DeleteMeetingTemplateMutation, DeleteMeetingTemplateMutationVariables>;

/**
 * __useDeleteMeetingTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingTemplateMutation, { data, loading, error }] = useDeleteMeetingTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingTemplateMutation, DeleteMeetingTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeetingTemplateMutation, DeleteMeetingTemplateMutationVariables>(DeleteMeetingTemplateDocument, options);
      }
export type DeleteMeetingTemplateMutationHookResult = ReturnType<typeof useDeleteMeetingTemplateMutation>;
export type DeleteMeetingTemplateMutationResult = Apollo.MutationResult<DeleteMeetingTemplateMutation>;
export type DeleteMeetingTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingTemplateMutation, DeleteMeetingTemplateMutationVariables>;
export const GetMemberDocument = gql`
    query getMember($id: uuid!) {
  member_by_pk(id: $id) {
    ...MemberFields
  }
}
    ${MemberFieldsFragmentDoc}`;

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
      }
export function useGetMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
        }
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>;
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>;
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>;
export function refetchGetMemberQuery(variables: GetMemberQueryVariables) {
      return { query: GetMemberDocument, variables: variables }
    }
export const GetOrgsMembersDocument = gql`
    query getOrgsMembers($orgsIds: [uuid!]!) {
  member(
    where: {orgId: {_in: $orgsIds}, archived: {_eq: false}}
    order_by: {name: asc}
  ) {
    ...MemberFields
  }
}
    ${MemberFieldsFragmentDoc}`;

/**
 * __useGetOrgsMembersQuery__
 *
 * To run a query within a React component, call `useGetOrgsMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsMembersQuery({
 *   variables: {
 *      orgsIds: // value for 'orgsIds'
 *   },
 * });
 */
export function useGetOrgsMembersQuery(baseOptions: Apollo.QueryHookOptions<GetOrgsMembersQuery, GetOrgsMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgsMembersQuery, GetOrgsMembersQueryVariables>(GetOrgsMembersDocument, options);
      }
export function useGetOrgsMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsMembersQuery, GetOrgsMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgsMembersQuery, GetOrgsMembersQueryVariables>(GetOrgsMembersDocument, options);
        }
export type GetOrgsMembersQueryHookResult = ReturnType<typeof useGetOrgsMembersQuery>;
export type GetOrgsMembersLazyQueryHookResult = ReturnType<typeof useGetOrgsMembersLazyQuery>;
export type GetOrgsMembersQueryResult = Apollo.QueryResult<GetOrgsMembersQuery, GetOrgsMembersQueryVariables>;
export function refetchGetOrgsMembersQuery(variables: GetOrgsMembersQueryVariables) {
      return { query: GetOrgsMembersDocument, variables: variables }
    }
export const SubscribeMembersDocument = gql`
    subscription subscribeMembers($orgId: uuid!, $archived: Boolean!) {
  member(
    where: {orgId: {_eq: $orgId}, archived: {_eq: $archived}}
    order_by: {name: asc}
  ) {
    ...MemberFields
  }
}
    ${MemberFieldsFragmentDoc}`;

/**
 * __useSubscribeMembersSubscription__
 *
 * To run a query within a React component, call `useSubscribeMembersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMembersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMembersSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSubscribeMembersSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeMembersSubscription, SubscribeMembersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeMembersSubscription, SubscribeMembersSubscriptionVariables>(SubscribeMembersDocument, options);
      }
export type SubscribeMembersSubscriptionHookResult = ReturnType<typeof useSubscribeMembersSubscription>;
export type SubscribeMembersSubscriptionResult = Apollo.SubscriptionResult<SubscribeMembersSubscription>;
export const CreateMemberDocument = gql`
    mutation createMember($orgId: uuid!, $name: String!) {
  insert_member_one(object: {orgId: $orgId, name: $name}) {
    ...MemberFields
  }
}
    ${MemberFieldsFragmentDoc}`;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const UpdateMemberDocument = gql`
    mutation updateMember($id: uuid!, $values: member_set_input!) {
  update_member_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...MemberFields
  }
}
    ${MemberFieldsFragmentDoc}`;
export type UpdateMemberMutationFn = Apollo.MutationFunction<UpdateMemberMutation, UpdateMemberMutationVariables>;

/**
 * __useUpdateMemberMutation__
 *
 * To run a mutation, you first call `useUpdateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberMutation, { data, loading, error }] = useUpdateMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberMutation, UpdateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, options);
      }
export type UpdateMemberMutationHookResult = ReturnType<typeof useUpdateMemberMutation>;
export type UpdateMemberMutationResult = Apollo.MutationResult<UpdateMemberMutation>;
export type UpdateMemberMutationOptions = Apollo.BaseMutationOptions<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const ArchiveMemberDocument = gql`
    mutation archiveMember($id: uuid!) {
  update_member_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveMemberMutationFn = Apollo.MutationFunction<ArchiveMemberMutation, ArchiveMemberMutationVariables>;

/**
 * __useArchiveMemberMutation__
 *
 * To run a mutation, you first call `useArchiveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveMemberMutation, { data, loading, error }] = useArchiveMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveMemberMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveMemberMutation, ArchiveMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveMemberMutation, ArchiveMemberMutationVariables>(ArchiveMemberDocument, options);
      }
export type ArchiveMemberMutationHookResult = ReturnType<typeof useArchiveMemberMutation>;
export type ArchiveMemberMutationResult = Apollo.MutationResult<ArchiveMemberMutation>;
export type ArchiveMemberMutationOptions = Apollo.BaseMutationOptions<ArchiveMemberMutation, ArchiveMemberMutationVariables>;
export const GetOrgDocument = gql`
    query getOrg($id: uuid!) {
  org_by_pk(id: $id) {
    ...Org
  }
}
    ${OrgFragmentDoc}`;

/**
 * __useGetOrgQuery__
 *
 * To run a query within a React component, call `useGetOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrgQuery(baseOptions: Apollo.QueryHookOptions<GetOrgQuery, GetOrgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgQuery, GetOrgQueryVariables>(GetOrgDocument, options);
      }
export function useGetOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgQuery, GetOrgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgQuery, GetOrgQueryVariables>(GetOrgDocument, options);
        }
export type GetOrgQueryHookResult = ReturnType<typeof useGetOrgQuery>;
export type GetOrgLazyQueryHookResult = ReturnType<typeof useGetOrgLazyQuery>;
export type GetOrgQueryResult = Apollo.QueryResult<GetOrgQuery, GetOrgQueryVariables>;
export function refetchGetOrgQuery(variables: GetOrgQueryVariables) {
      return { query: GetOrgDocument, variables: variables }
    }
export const SubscribeOrgsDocument = gql`
    subscription subscribeOrgs($archived: Boolean!) {
  org(where: {archived: {_eq: $archived}}, order_by: {createdAt: asc}) {
    ...Org
  }
}
    ${OrgFragmentDoc}`;

/**
 * __useSubscribeOrgsSubscription__
 *
 * To run a query within a React component, call `useSubscribeOrgsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeOrgsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeOrgsSubscription({
 *   variables: {
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSubscribeOrgsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeOrgsSubscription, SubscribeOrgsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeOrgsSubscription, SubscribeOrgsSubscriptionVariables>(SubscribeOrgsDocument, options);
      }
export type SubscribeOrgsSubscriptionHookResult = ReturnType<typeof useSubscribeOrgsSubscription>;
export type SubscribeOrgsSubscriptionResult = Apollo.SubscriptionResult<SubscribeOrgsSubscription>;
export const UpdateOrgDocument = gql`
    mutation updateOrg($id: uuid!, $name: String!, $defaultWorkedMinPerWeek: Int!) {
  update_org_by_pk(
    pk_columns: {id: $id}
    _set: {name: $name, defaultWorkedMinPerWeek: $defaultWorkedMinPerWeek}
  ) {
    id
  }
}
    `;
export type UpdateOrgMutationFn = Apollo.MutationFunction<UpdateOrgMutation, UpdateOrgMutationVariables>;

/**
 * __useUpdateOrgMutation__
 *
 * To run a mutation, you first call `useUpdateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgMutation, { data, loading, error }] = useUpdateOrgMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      defaultWorkedMinPerWeek: // value for 'defaultWorkedMinPerWeek'
 *   },
 * });
 */
export function useUpdateOrgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgMutation, UpdateOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrgMutation, UpdateOrgMutationVariables>(UpdateOrgDocument, options);
      }
export type UpdateOrgMutationHookResult = ReturnType<typeof useUpdateOrgMutation>;
export type UpdateOrgMutationResult = Apollo.MutationResult<UpdateOrgMutation>;
export type UpdateOrgMutationOptions = Apollo.BaseMutationOptions<UpdateOrgMutation, UpdateOrgMutationVariables>;
export const ChangeOrgSlugDocument = gql`
    mutation changeOrgSlug($id: uuid!, $slug: String!) {
  update_org_by_pk(pk_columns: {id: $id}, _set: {slug: $slug}) {
    id
  }
}
    `;
export type ChangeOrgSlugMutationFn = Apollo.MutationFunction<ChangeOrgSlugMutation, ChangeOrgSlugMutationVariables>;

/**
 * __useChangeOrgSlugMutation__
 *
 * To run a mutation, you first call `useChangeOrgSlugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrgSlugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrgSlugMutation, { data, loading, error }] = useChangeOrgSlugMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useChangeOrgSlugMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrgSlugMutation, ChangeOrgSlugMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrgSlugMutation, ChangeOrgSlugMutationVariables>(ChangeOrgSlugDocument, options);
      }
export type ChangeOrgSlugMutationHookResult = ReturnType<typeof useChangeOrgSlugMutation>;
export type ChangeOrgSlugMutationResult = Apollo.MutationResult<ChangeOrgSlugMutation>;
export type ChangeOrgSlugMutationOptions = Apollo.BaseMutationOptions<ChangeOrgSlugMutation, ChangeOrgSlugMutationVariables>;
export const ArchiveOrgDocument = gql`
    mutation archiveOrg($id: uuid!) {
  update_org_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveOrgMutationFn = Apollo.MutationFunction<ArchiveOrgMutation, ArchiveOrgMutationVariables>;

/**
 * __useArchiveOrgMutation__
 *
 * To run a mutation, you first call `useArchiveOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveOrgMutation, { data, loading, error }] = useArchiveOrgMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveOrgMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveOrgMutation, ArchiveOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveOrgMutation, ArchiveOrgMutationVariables>(ArchiveOrgDocument, options);
      }
export type ArchiveOrgMutationHookResult = ReturnType<typeof useArchiveOrgMutation>;
export type ArchiveOrgMutationResult = Apollo.MutationResult<ArchiveOrgMutation>;
export type ArchiveOrgMutationOptions = Apollo.BaseMutationOptions<ArchiveOrgMutation, ArchiveOrgMutationVariables>;
export const GetRoleDocument = gql`
    query getRole($id: uuid!) {
  role_by_pk(id: $id) {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export function refetchGetRoleQuery(variables: GetRoleQueryVariables) {
      return { query: GetRoleDocument, variables: variables }
    }
export const SubscribeRolesDocument = gql`
    subscription subscribeRoles($orgId: uuid!, $archived: Boolean!) {
  role(
    where: {orgId: {_eq: $orgId}, archived: {_eq: $archived}}
    order_by: {name: asc}
  ) {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;

/**
 * __useSubscribeRolesSubscription__
 *
 * To run a query within a React component, call `useSubscribeRolesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeRolesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeRolesSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSubscribeRolesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeRolesSubscription, SubscribeRolesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeRolesSubscription, SubscribeRolesSubscriptionVariables>(SubscribeRolesDocument, options);
      }
export type SubscribeRolesSubscriptionHookResult = ReturnType<typeof useSubscribeRolesSubscription>;
export type SubscribeRolesSubscriptionResult = Apollo.SubscriptionResult<SubscribeRolesSubscription>;
export const CreateRoleDocument = gql`
    mutation createRole($values: role_insert_input!) {
  insert_role_one(object: $values) {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation updateRole($id: uuid!, $values: role_set_input!) {
  update_role_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const ArchiveRoleDocument = gql`
    mutation archiveRole($id: uuid!) {
  update_role_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveRoleMutationFn = Apollo.MutationFunction<ArchiveRoleMutation, ArchiveRoleMutationVariables>;

/**
 * __useArchiveRoleMutation__
 *
 * To run a mutation, you first call `useArchiveRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveRoleMutation, { data, loading, error }] = useArchiveRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveRoleMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveRoleMutation, ArchiveRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveRoleMutation, ArchiveRoleMutationVariables>(ArchiveRoleDocument, options);
      }
export type ArchiveRoleMutationHookResult = ReturnType<typeof useArchiveRoleMutation>;
export type ArchiveRoleMutationResult = Apollo.MutationResult<ArchiveRoleMutation>;
export type ArchiveRoleMutationOptions = Apollo.BaseMutationOptions<ArchiveRoleMutation, ArchiveRoleMutationVariables>;
export const GetTaskDocument = gql`
    query getTask($id: uuid!) {
  task_by_pk(id: $id) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export function refetchGetTaskQuery(variables: GetTaskQueryVariables) {
      return { query: GetTaskDocument, variables: variables }
    }
export const SubscribeTaskDocument = gql`
    subscription subscribeTask($id: uuid!) {
  task_by_pk(id: $id) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useSubscribeTaskSubscription__
 *
 * To run a query within a React component, call `useSubscribeTaskSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTaskSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeTaskSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeTaskSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeTaskSubscription, SubscribeTaskSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeTaskSubscription, SubscribeTaskSubscriptionVariables>(SubscribeTaskDocument, options);
      }
export type SubscribeTaskSubscriptionHookResult = ReturnType<typeof useSubscribeTaskSubscription>;
export type SubscribeTaskSubscriptionResult = Apollo.SubscriptionResult<SubscribeTaskSubscription>;
export const SubscribeTasksDocument = gql`
    subscription subscribeTasks($filters: [task_bool_exp!]) {
  task(where: {_and: $filters}) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useSubscribeTasksSubscription__
 *
 * To run a query within a React component, call `useSubscribeTasksSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTasksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeTasksSubscription({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSubscribeTasksSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeTasksSubscription, SubscribeTasksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeTasksSubscription, SubscribeTasksSubscriptionVariables>(SubscribeTasksDocument, options);
      }
export type SubscribeTasksSubscriptionHookResult = ReturnType<typeof useSubscribeTasksSubscription>;
export type SubscribeTasksSubscriptionResult = Apollo.SubscriptionResult<SubscribeTasksSubscription>;
export const CreateTaskDocument = gql`
    mutation createTask($values: task_insert_input!) {
  insert_task_one(object: $values) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($id: uuid!, $values: task_set_input!) {
  update_task_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ArchiveTaskDocument = gql`
    mutation archiveTask($id: uuid!) {
  update_task_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveTaskMutationFn = Apollo.MutationFunction<ArchiveTaskMutation, ArchiveTaskMutationVariables>;

/**
 * __useArchiveTaskMutation__
 *
 * To run a mutation, you first call `useArchiveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTaskMutation, { data, loading, error }] = useArchiveTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveTaskMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveTaskMutation, ArchiveTaskMutationVariables>(ArchiveTaskDocument, options);
      }
export type ArchiveTaskMutationHookResult = ReturnType<typeof useArchiveTaskMutation>;
export type ArchiveTaskMutationResult = Apollo.MutationResult<ArchiveTaskMutation>;
export type ArchiveTaskMutationOptions = Apollo.BaseMutationOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>;
export const SubscribeTaskViewDocument = gql`
    subscription subscribeTaskView($orgId: uuid!, $key: String!) {
  task_view(where: {orgId: {_eq: $orgId}, key: {_eq: $key}}) {
    ...TaskView
  }
}
    ${TaskViewFragmentDoc}`;

/**
 * __useSubscribeTaskViewSubscription__
 *
 * To run a query within a React component, call `useSubscribeTaskViewSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTaskViewSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeTaskViewSubscription({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useSubscribeTaskViewSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeTaskViewSubscription, SubscribeTaskViewSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeTaskViewSubscription, SubscribeTaskViewSubscriptionVariables>(SubscribeTaskViewDocument, options);
      }
export type SubscribeTaskViewSubscriptionHookResult = ReturnType<typeof useSubscribeTaskViewSubscription>;
export type SubscribeTaskViewSubscriptionResult = Apollo.SubscriptionResult<SubscribeTaskViewSubscription>;
export const CreateTaskViewDocument = gql`
    mutation createTaskView($orgId: uuid!, $key: String!, $tasksIds: json) {
  insert_task_view_one(object: {orgId: $orgId, key: $key, tasksIds: $tasksIds}) {
    ...TaskView
  }
}
    ${TaskViewFragmentDoc}`;
export type CreateTaskViewMutationFn = Apollo.MutationFunction<CreateTaskViewMutation, CreateTaskViewMutationVariables>;

/**
 * __useCreateTaskViewMutation__
 *
 * To run a mutation, you first call `useCreateTaskViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskViewMutation, { data, loading, error }] = useCreateTaskViewMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      key: // value for 'key'
 *      tasksIds: // value for 'tasksIds'
 *   },
 * });
 */
export function useCreateTaskViewMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskViewMutation, CreateTaskViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskViewMutation, CreateTaskViewMutationVariables>(CreateTaskViewDocument, options);
      }
export type CreateTaskViewMutationHookResult = ReturnType<typeof useCreateTaskViewMutation>;
export type CreateTaskViewMutationResult = Apollo.MutationResult<CreateTaskViewMutation>;
export type CreateTaskViewMutationOptions = Apollo.BaseMutationOptions<CreateTaskViewMutation, CreateTaskViewMutationVariables>;
export const UpdateTaskViewDocument = gql`
    mutation updateTaskView($orgId: uuid!, $key: String!, $tasksIds: json) {
  update_task_view(
    where: {orgId: {_eq: $orgId}, key: {_eq: $key}}
    _set: {tasksIds: $tasksIds}
  ) {
    returning {
      ...TaskView
    }
  }
}
    ${TaskViewFragmentDoc}`;
export type UpdateTaskViewMutationFn = Apollo.MutationFunction<UpdateTaskViewMutation, UpdateTaskViewMutationVariables>;

/**
 * __useUpdateTaskViewMutation__
 *
 * To run a mutation, you first call `useUpdateTaskViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskViewMutation, { data, loading, error }] = useUpdateTaskViewMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      key: // value for 'key'
 *      tasksIds: // value for 'tasksIds'
 *   },
 * });
 */
export function useUpdateTaskViewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskViewMutation, UpdateTaskViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskViewMutation, UpdateTaskViewMutationVariables>(UpdateTaskViewDocument, options);
      }
export type UpdateTaskViewMutationHookResult = ReturnType<typeof useUpdateTaskViewMutation>;
export type UpdateTaskViewMutationResult = Apollo.MutationResult<UpdateTaskViewMutation>;
export type UpdateTaskViewMutationOptions = Apollo.BaseMutationOptions<UpdateTaskViewMutation, UpdateTaskViewMutationVariables>;
export const GetCircleThreadsIdsDocument = gql`
    query getCircleThreadsIds($circleId: uuid!) {
  thread(where: {circleId: {_eq: $circleId}, archived: {_eq: false}}) {
    id
  }
}
    `;

/**
 * __useGetCircleThreadsIdsQuery__
 *
 * To run a query within a React component, call `useGetCircleThreadsIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleThreadsIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleThreadsIdsQuery({
 *   variables: {
 *      circleId: // value for 'circleId'
 *   },
 * });
 */
export function useGetCircleThreadsIdsQuery(baseOptions: Apollo.QueryHookOptions<GetCircleThreadsIdsQuery, GetCircleThreadsIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCircleThreadsIdsQuery, GetCircleThreadsIdsQueryVariables>(GetCircleThreadsIdsDocument, options);
      }
export function useGetCircleThreadsIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCircleThreadsIdsQuery, GetCircleThreadsIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCircleThreadsIdsQuery, GetCircleThreadsIdsQueryVariables>(GetCircleThreadsIdsDocument, options);
        }
export type GetCircleThreadsIdsQueryHookResult = ReturnType<typeof useGetCircleThreadsIdsQuery>;
export type GetCircleThreadsIdsLazyQueryHookResult = ReturnType<typeof useGetCircleThreadsIdsLazyQuery>;
export type GetCircleThreadsIdsQueryResult = Apollo.QueryResult<GetCircleThreadsIdsQuery, GetCircleThreadsIdsQueryVariables>;
export function refetchGetCircleThreadsIdsQuery(variables: GetCircleThreadsIdsQueryVariables) {
      return { query: GetCircleThreadsIdsDocument, variables: variables }
    }
export const SubscribeThreadDocument = gql`
    subscription subscribeThread($id: uuid!, $memberId: uuid!) {
  thread_by_pk(id: $id) {
    ...Thread
    member_status(where: {memberId: {_eq: $memberId}}, limit: 1) {
      lastReadActivityId
      lastReadDate
    }
  }
}
    ${ThreadFragmentDoc}`;

/**
 * __useSubscribeThreadSubscription__
 *
 * To run a query within a React component, call `useSubscribeThreadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeThreadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeThreadSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useSubscribeThreadSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeThreadSubscription, SubscribeThreadSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeThreadSubscription, SubscribeThreadSubscriptionVariables>(SubscribeThreadDocument, options);
      }
export type SubscribeThreadSubscriptionHookResult = ReturnType<typeof useSubscribeThreadSubscription>;
export type SubscribeThreadSubscriptionResult = Apollo.SubscriptionResult<SubscribeThreadSubscription>;
export const SubscribeThreadsDocument = gql`
    subscription subscribeThreads($filters: [thread_bool_exp!], $memberId: uuid!) {
  thread(where: {_and: $filters}) {
    ...Thread
    member_status(where: {memberId: {_eq: $memberId}}, limit: 1) {
      lastReadActivityId
      lastReadDate
    }
  }
}
    ${ThreadFragmentDoc}`;

/**
 * __useSubscribeThreadsSubscription__
 *
 * To run a query within a React component, call `useSubscribeThreadsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeThreadsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeThreadsSubscription({
 *   variables: {
 *      filters: // value for 'filters'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useSubscribeThreadsSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeThreadsSubscription, SubscribeThreadsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeThreadsSubscription, SubscribeThreadsSubscriptionVariables>(SubscribeThreadsDocument, options);
      }
export type SubscribeThreadsSubscriptionHookResult = ReturnType<typeof useSubscribeThreadsSubscription>;
export type SubscribeThreadsSubscriptionResult = Apollo.SubscriptionResult<SubscribeThreadsSubscription>;
export const CreateThreadDocument = gql`
    mutation createThread($values: thread_insert_input!) {
  insert_thread_one(object: $values) {
    ...Thread
  }
}
    ${ThreadFragmentDoc}`;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, options);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
export const UpdateThreadDocument = gql`
    mutation updateThread($id: uuid!, $values: thread_set_input!) {
  update_thread_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...Thread
  }
}
    ${ThreadFragmentDoc}`;
export type UpdateThreadMutationFn = Apollo.MutationFunction<UpdateThreadMutation, UpdateThreadMutationVariables>;

/**
 * __useUpdateThreadMutation__
 *
 * To run a mutation, you first call `useUpdateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThreadMutation, { data, loading, error }] = useUpdateThreadMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateThreadMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThreadMutation, UpdateThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThreadMutation, UpdateThreadMutationVariables>(UpdateThreadDocument, options);
      }
export type UpdateThreadMutationHookResult = ReturnType<typeof useUpdateThreadMutation>;
export type UpdateThreadMutationResult = Apollo.MutationResult<UpdateThreadMutation>;
export type UpdateThreadMutationOptions = Apollo.BaseMutationOptions<UpdateThreadMutation, UpdateThreadMutationVariables>;
export const ArchiveThreadDocument = gql`
    mutation archiveThread($id: uuid!) {
  update_thread_by_pk(pk_columns: {id: $id}, _set: {archived: true}) {
    id
  }
}
    `;
export type ArchiveThreadMutationFn = Apollo.MutationFunction<ArchiveThreadMutation, ArchiveThreadMutationVariables>;

/**
 * __useArchiveThreadMutation__
 *
 * To run a mutation, you first call `useArchiveThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveThreadMutation, { data, loading, error }] = useArchiveThreadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveThreadMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveThreadMutation, ArchiveThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveThreadMutation, ArchiveThreadMutationVariables>(ArchiveThreadDocument, options);
      }
export type ArchiveThreadMutationHookResult = ReturnType<typeof useArchiveThreadMutation>;
export type ArchiveThreadMutationResult = Apollo.MutationResult<ArchiveThreadMutation>;
export type ArchiveThreadMutationOptions = Apollo.BaseMutationOptions<ArchiveThreadMutation, ArchiveThreadMutationVariables>;
export const GetLastThreadActivityDocument = gql`
    query getLastThreadActivity($threadId: uuid!) {
  thread_activity(
    where: {threadId: {_eq: $threadId}}
    order_by: {createdAt: desc}
    limit: 1
  ) {
    ...ThreadActivity
  }
}
    ${ThreadActivityFragmentDoc}`;

/**
 * __useGetLastThreadActivityQuery__
 *
 * To run a query within a React component, call `useGetLastThreadActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastThreadActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastThreadActivityQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useGetLastThreadActivityQuery(baseOptions: Apollo.QueryHookOptions<GetLastThreadActivityQuery, GetLastThreadActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastThreadActivityQuery, GetLastThreadActivityQueryVariables>(GetLastThreadActivityDocument, options);
      }
export function useGetLastThreadActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastThreadActivityQuery, GetLastThreadActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastThreadActivityQuery, GetLastThreadActivityQueryVariables>(GetLastThreadActivityDocument, options);
        }
export type GetLastThreadActivityQueryHookResult = ReturnType<typeof useGetLastThreadActivityQuery>;
export type GetLastThreadActivityLazyQueryHookResult = ReturnType<typeof useGetLastThreadActivityLazyQuery>;
export type GetLastThreadActivityQueryResult = Apollo.QueryResult<GetLastThreadActivityQuery, GetLastThreadActivityQueryVariables>;
export function refetchGetLastThreadActivityQuery(variables: GetLastThreadActivityQueryVariables) {
      return { query: GetLastThreadActivityDocument, variables: variables }
    }
export const SubscribeThreadActivityDocument = gql`
    subscription subscribeThreadActivity($id: uuid!) {
  thread_activity_by_pk(id: $id) {
    ...ThreadActivity
  }
}
    ${ThreadActivityFragmentDoc}`;

/**
 * __useSubscribeThreadActivitySubscription__
 *
 * To run a query within a React component, call `useSubscribeThreadActivitySubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeThreadActivitySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeThreadActivitySubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeThreadActivitySubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeThreadActivitySubscription, SubscribeThreadActivitySubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeThreadActivitySubscription, SubscribeThreadActivitySubscriptionVariables>(SubscribeThreadActivityDocument, options);
      }
export type SubscribeThreadActivitySubscriptionHookResult = ReturnType<typeof useSubscribeThreadActivitySubscription>;
export type SubscribeThreadActivitySubscriptionResult = Apollo.SubscriptionResult<SubscribeThreadActivitySubscription>;
export const SubscribeThreadActivitiesDocument = gql`
    subscription subscribeThreadActivities($threadId: uuid!) {
  thread_activity(where: {threadId: {_eq: $threadId}}, order_by: {createdAt: asc}) {
    ...ThreadActivity
  }
}
    ${ThreadActivityFragmentDoc}`;

/**
 * __useSubscribeThreadActivitiesSubscription__
 *
 * To run a query within a React component, call `useSubscribeThreadActivitiesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeThreadActivitiesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeThreadActivitiesSubscription({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useSubscribeThreadActivitiesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeThreadActivitiesSubscription, SubscribeThreadActivitiesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeThreadActivitiesSubscription, SubscribeThreadActivitiesSubscriptionVariables>(SubscribeThreadActivitiesDocument, options);
      }
export type SubscribeThreadActivitiesSubscriptionHookResult = ReturnType<typeof useSubscribeThreadActivitiesSubscription>;
export type SubscribeThreadActivitiesSubscriptionResult = Apollo.SubscriptionResult<SubscribeThreadActivitiesSubscription>;
export const CreateThreadActivityDocument = gql`
    mutation createThreadActivity($values: thread_activity_insert_input!) {
  insert_thread_activity_one(object: $values) {
    ...ThreadActivity
  }
}
    ${ThreadActivityFragmentDoc}`;
export type CreateThreadActivityMutationFn = Apollo.MutationFunction<CreateThreadActivityMutation, CreateThreadActivityMutationVariables>;

/**
 * __useCreateThreadActivityMutation__
 *
 * To run a mutation, you first call `useCreateThreadActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadActivityMutation, { data, loading, error }] = useCreateThreadActivityMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateThreadActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadActivityMutation, CreateThreadActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadActivityMutation, CreateThreadActivityMutationVariables>(CreateThreadActivityDocument, options);
      }
export type CreateThreadActivityMutationHookResult = ReturnType<typeof useCreateThreadActivityMutation>;
export type CreateThreadActivityMutationResult = Apollo.MutationResult<CreateThreadActivityMutation>;
export type CreateThreadActivityMutationOptions = Apollo.BaseMutationOptions<CreateThreadActivityMutation, CreateThreadActivityMutationVariables>;
export const UpdateThreadActivityDocument = gql`
    mutation updateThreadActivity($id: uuid!, $values: thread_activity_set_input!) {
  update_thread_activity_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...ThreadActivity
  }
}
    ${ThreadActivityFragmentDoc}`;
export type UpdateThreadActivityMutationFn = Apollo.MutationFunction<UpdateThreadActivityMutation, UpdateThreadActivityMutationVariables>;

/**
 * __useUpdateThreadActivityMutation__
 *
 * To run a mutation, you first call `useUpdateThreadActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThreadActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThreadActivityMutation, { data, loading, error }] = useUpdateThreadActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateThreadActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThreadActivityMutation, UpdateThreadActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThreadActivityMutation, UpdateThreadActivityMutationVariables>(UpdateThreadActivityDocument, options);
      }
export type UpdateThreadActivityMutationHookResult = ReturnType<typeof useUpdateThreadActivityMutation>;
export type UpdateThreadActivityMutationResult = Apollo.MutationResult<UpdateThreadActivityMutation>;
export type UpdateThreadActivityMutationOptions = Apollo.BaseMutationOptions<UpdateThreadActivityMutation, UpdateThreadActivityMutationVariables>;
export const DeleteThreadActivityDocument = gql`
    mutation deleteThreadActivity($id: uuid!) {
  delete_thread_activity_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteThreadActivityMutationFn = Apollo.MutationFunction<DeleteThreadActivityMutation, DeleteThreadActivityMutationVariables>;

/**
 * __useDeleteThreadActivityMutation__
 *
 * To run a mutation, you first call `useDeleteThreadActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadActivityMutation, { data, loading, error }] = useDeleteThreadActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteThreadActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThreadActivityMutation, DeleteThreadActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThreadActivityMutation, DeleteThreadActivityMutationVariables>(DeleteThreadActivityDocument, options);
      }
export type DeleteThreadActivityMutationHookResult = ReturnType<typeof useDeleteThreadActivityMutation>;
export type DeleteThreadActivityMutationResult = Apollo.MutationResult<DeleteThreadActivityMutation>;
export type DeleteThreadActivityMutationOptions = Apollo.BaseMutationOptions<DeleteThreadActivityMutation, DeleteThreadActivityMutationVariables>;
export const CreateThreadMemberStatusDocument = gql`
    mutation createThreadMemberStatus($values: thread_member_status_insert_input!) {
  insert_thread_member_status_one(object: $values) {
    ...ThreadMemberStatusFields
  }
}
    ${ThreadMemberStatusFieldsFragmentDoc}`;
export type CreateThreadMemberStatusMutationFn = Apollo.MutationFunction<CreateThreadMemberStatusMutation, CreateThreadMemberStatusMutationVariables>;

/**
 * __useCreateThreadMemberStatusMutation__
 *
 * To run a mutation, you first call `useCreateThreadMemberStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMemberStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMemberStatusMutation, { data, loading, error }] = useCreateThreadMemberStatusMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateThreadMemberStatusMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMemberStatusMutation, CreateThreadMemberStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadMemberStatusMutation, CreateThreadMemberStatusMutationVariables>(CreateThreadMemberStatusDocument, options);
      }
export type CreateThreadMemberStatusMutationHookResult = ReturnType<typeof useCreateThreadMemberStatusMutation>;
export type CreateThreadMemberStatusMutationResult = Apollo.MutationResult<CreateThreadMemberStatusMutation>;
export type CreateThreadMemberStatusMutationOptions = Apollo.BaseMutationOptions<CreateThreadMemberStatusMutation, CreateThreadMemberStatusMutationVariables>;
export const UpdateThreadMemberStatusDocument = gql`
    mutation updateThreadMemberStatus($threadId: uuid!, $memberId: uuid!, $values: thread_member_status_set_input!) {
  update_thread_member_status(
    where: {threadId: {_eq: $threadId}, memberId: {_eq: $memberId}}
    _set: $values
  ) {
    returning {
      ...ThreadMemberStatusFields
    }
  }
}
    ${ThreadMemberStatusFieldsFragmentDoc}`;
export type UpdateThreadMemberStatusMutationFn = Apollo.MutationFunction<UpdateThreadMemberStatusMutation, UpdateThreadMemberStatusMutationVariables>;

/**
 * __useUpdateThreadMemberStatusMutation__
 *
 * To run a mutation, you first call `useUpdateThreadMemberStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThreadMemberStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThreadMemberStatusMutation, { data, loading, error }] = useUpdateThreadMemberStatusMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *      memberId: // value for 'memberId'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateThreadMemberStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThreadMemberStatusMutation, UpdateThreadMemberStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThreadMemberStatusMutation, UpdateThreadMemberStatusMutationVariables>(UpdateThreadMemberStatusDocument, options);
      }
export type UpdateThreadMemberStatusMutationHookResult = ReturnType<typeof useUpdateThreadMemberStatusMutation>;
export type UpdateThreadMemberStatusMutationResult = Apollo.MutationResult<UpdateThreadMemberStatusMutation>;
export type UpdateThreadMemberStatusMutationOptions = Apollo.BaseMutationOptions<UpdateThreadMemberStatusMutation, UpdateThreadMemberStatusMutationVariables>;
export const SubscribeThreadPollAnswersDocument = gql`
    subscription subscribeThreadPollAnswers($activityId: uuid!) {
  thread_poll_answer(where: {activityId: {_eq: $activityId}}) {
    ...ThreadPollAnswer
  }
}
    ${ThreadPollAnswerFragmentDoc}`;

/**
 * __useSubscribeThreadPollAnswersSubscription__
 *
 * To run a query within a React component, call `useSubscribeThreadPollAnswersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeThreadPollAnswersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeThreadPollAnswersSubscription({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useSubscribeThreadPollAnswersSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeThreadPollAnswersSubscription, SubscribeThreadPollAnswersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeThreadPollAnswersSubscription, SubscribeThreadPollAnswersSubscriptionVariables>(SubscribeThreadPollAnswersDocument, options);
      }
export type SubscribeThreadPollAnswersSubscriptionHookResult = ReturnType<typeof useSubscribeThreadPollAnswersSubscription>;
export type SubscribeThreadPollAnswersSubscriptionResult = Apollo.SubscriptionResult<SubscribeThreadPollAnswersSubscription>;
export const CreateThreadPollAnswerDocument = gql`
    mutation createThreadPollAnswer($values: thread_poll_answer_insert_input!) {
  insert_thread_poll_answer_one(object: $values) {
    ...ThreadPollAnswer
  }
}
    ${ThreadPollAnswerFragmentDoc}`;
export type CreateThreadPollAnswerMutationFn = Apollo.MutationFunction<CreateThreadPollAnswerMutation, CreateThreadPollAnswerMutationVariables>;

/**
 * __useCreateThreadPollAnswerMutation__
 *
 * To run a mutation, you first call `useCreateThreadPollAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadPollAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadPollAnswerMutation, { data, loading, error }] = useCreateThreadPollAnswerMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateThreadPollAnswerMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadPollAnswerMutation, CreateThreadPollAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadPollAnswerMutation, CreateThreadPollAnswerMutationVariables>(CreateThreadPollAnswerDocument, options);
      }
export type CreateThreadPollAnswerMutationHookResult = ReturnType<typeof useCreateThreadPollAnswerMutation>;
export type CreateThreadPollAnswerMutationResult = Apollo.MutationResult<CreateThreadPollAnswerMutation>;
export type CreateThreadPollAnswerMutationOptions = Apollo.BaseMutationOptions<CreateThreadPollAnswerMutation, CreateThreadPollAnswerMutationVariables>;
export const UpdateThreadPollAnswerDocument = gql`
    mutation updateThreadPollAnswer($id: uuid!, $values: thread_poll_answer_set_input!) {
  update_thread_poll_answer_by_pk(pk_columns: {id: $id}, _set: $values) {
    ...ThreadPollAnswer
  }
}
    ${ThreadPollAnswerFragmentDoc}`;
export type UpdateThreadPollAnswerMutationFn = Apollo.MutationFunction<UpdateThreadPollAnswerMutation, UpdateThreadPollAnswerMutationVariables>;

/**
 * __useUpdateThreadPollAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateThreadPollAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThreadPollAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThreadPollAnswerMutation, { data, loading, error }] = useUpdateThreadPollAnswerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useUpdateThreadPollAnswerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThreadPollAnswerMutation, UpdateThreadPollAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThreadPollAnswerMutation, UpdateThreadPollAnswerMutationVariables>(UpdateThreadPollAnswerDocument, options);
      }
export type UpdateThreadPollAnswerMutationHookResult = ReturnType<typeof useUpdateThreadPollAnswerMutation>;
export type UpdateThreadPollAnswerMutationResult = Apollo.MutationResult<UpdateThreadPollAnswerMutation>;
export type UpdateThreadPollAnswerMutationOptions = Apollo.BaseMutationOptions<UpdateThreadPollAnswerMutation, UpdateThreadPollAnswerMutationVariables>;
export const DeleteThreadPollAnswersDocument = gql`
    mutation deleteThreadPollAnswers($activityId: uuid!) {
  delete_thread_poll_answer(where: {activityId: {_eq: $activityId}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteThreadPollAnswersMutationFn = Apollo.MutationFunction<DeleteThreadPollAnswersMutation, DeleteThreadPollAnswersMutationVariables>;

/**
 * __useDeleteThreadPollAnswersMutation__
 *
 * To run a mutation, you first call `useDeleteThreadPollAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadPollAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadPollAnswersMutation, { data, loading, error }] = useDeleteThreadPollAnswersMutation({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useDeleteThreadPollAnswersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThreadPollAnswersMutation, DeleteThreadPollAnswersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThreadPollAnswersMutation, DeleteThreadPollAnswersMutationVariables>(DeleteThreadPollAnswersDocument, options);
      }
export type DeleteThreadPollAnswersMutationHookResult = ReturnType<typeof useDeleteThreadPollAnswersMutation>;
export type DeleteThreadPollAnswersMutationResult = Apollo.MutationResult<DeleteThreadPollAnswersMutation>;
export type DeleteThreadPollAnswersMutationOptions = Apollo.BaseMutationOptions<DeleteThreadPollAnswersMutation, DeleteThreadPollAnswersMutationVariables>;
export const ChangeDisplayNameDocument = gql`
    mutation changeDisplayName($userId: uuid!, $displayName: String!) {
  updateUser(pk_columns: {id: $userId}, _set: {displayName: $displayName}) {
    id
    displayName
  }
}
    `;
export type ChangeDisplayNameMutationFn = Apollo.MutationFunction<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>;

/**
 * __useChangeDisplayNameMutation__
 *
 * To run a mutation, you first call `useChangeDisplayNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDisplayNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDisplayNameMutation, { data, loading, error }] = useChangeDisplayNameMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useChangeDisplayNameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>(ChangeDisplayNameDocument, options);
      }
export type ChangeDisplayNameMutationHookResult = ReturnType<typeof useChangeDisplayNameMutation>;
export type ChangeDisplayNameMutationResult = Apollo.MutationResult<ChangeDisplayNameMutation>;
export type ChangeDisplayNameMutationOptions = Apollo.BaseMutationOptions<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>;