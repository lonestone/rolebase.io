/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

import { CirclesGraphViews } from '@rolebase/shared/model/graph'
import { MeetingStepConfig, VideoConf } from '@rolebase/shared/model/meeting'
import { MeetingStepData } from '@rolebase/shared/model/meeting_step'
import { ParticipantsScope } from '@rolebase/shared/model/participants'
import { LogDisplay, EntitiesChanges } from '@rolebase/shared/model/log'
import { UserMetadata } from '@rolebase/shared/model/user'

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: number;
  bytea: any;
  citext: string;
  date: any;
  graph_views: CirclesGraphViews;
  json: any;
  jsonb: any;
  log_changes: EntitiesChanges;
  log_display: LogDisplay;
  meeting_step_config: MeetingStepConfig;
  meeting_step_data: MeetingStepData;
  participants_scope: ParticipantsScope;
  smallint: number;
  timestamptz: string;
  user_metadata: UserMetadata;
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

/** Users API keys */
export type Api_Key = {
  __typename?: 'api_key';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
  value: Scalars['String'];
};

/** aggregated selection of "api_key" */
export type Api_Key_Aggregate = {
  __typename?: 'api_key_aggregate';
  aggregate?: Maybe<Api_Key_Aggregate_Fields>;
  nodes: Array<Api_Key>;
};

/** aggregate fields of "api_key" */
export type Api_Key_Aggregate_Fields = {
  __typename?: 'api_key_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Api_Key_Max_Fields>;
  min?: Maybe<Api_Key_Min_Fields>;
};


/** aggregate fields of "api_key" */
export type Api_Key_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Api_Key_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "api_key". All fields are combined with a logical 'AND'. */
export type Api_Key_Bool_Exp = {
  _and?: InputMaybe<Array<Api_Key_Bool_Exp>>;
  _not?: InputMaybe<Api_Key_Bool_Exp>;
  _or?: InputMaybe<Array<Api_Key_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "api_key" */
export enum Api_Key_Constraint {
  /** unique or primary key constraint on columns "id" */
  ApiKeyPkey = 'api_key_pkey'
}

/** input type for inserting data into table "api_key" */
export type Api_Key_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Api_Key_Max_Fields = {
  __typename?: 'api_key_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Api_Key_Min_Fields = {
  __typename?: 'api_key_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "api_key" */
export type Api_Key_Mutation_Response = {
  __typename?: 'api_key_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Api_Key>;
};

/** on_conflict condition type for table "api_key" */
export type Api_Key_On_Conflict = {
  constraint: Api_Key_Constraint;
  update_columns?: Array<Api_Key_Update_Column>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};

/** Ordering options when selecting data from "api_key". */
export type Api_Key_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: api_key */
export type Api_Key_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "api_key" */
export enum Api_Key_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "api_key" */
export type Api_Key_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "api_key" */
export type Api_Key_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Api_Key_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Api_Key_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "api_key" */
export enum Api_Key_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
  /** column name */
  Value = 'value'
}

export type Api_Key_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Api_Key_Set_Input>;
  /** filter the rows which have to be updated */
  where: Api_Key_Bool_Exp;
};

/** columns and relationships of "app_type" */
export type App_Type = {
  __typename?: 'app_type';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "app_type" */
export type App_Type_Aggregate = {
  __typename?: 'app_type_aggregate';
  aggregate?: Maybe<App_Type_Aggregate_Fields>;
  nodes: Array<App_Type>;
};

/** aggregate fields of "app_type" */
export type App_Type_Aggregate_Fields = {
  __typename?: 'app_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<App_Type_Max_Fields>;
  min?: Maybe<App_Type_Min_Fields>;
};


/** aggregate fields of "app_type" */
export type App_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<App_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "app_type". All fields are combined with a logical 'AND'. */
export type App_Type_Bool_Exp = {
  _and?: InputMaybe<Array<App_Type_Bool_Exp>>;
  _not?: InputMaybe<App_Type_Bool_Exp>;
  _or?: InputMaybe<Array<App_Type_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "app_type" */
export enum App_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  AppTypePkey = 'app_type_pkey'
}

export enum App_Type_Enum {
  GoogleCalendar = 'GoogleCalendar',
  Office365 = 'Office365'
}

/** Boolean expression to compare columns of type "app_type_enum". All fields are combined with logical 'AND'. */
export type App_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<App_Type_Enum>;
  _in?: InputMaybe<Array<App_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<App_Type_Enum>;
  _nin?: InputMaybe<Array<App_Type_Enum>>;
};

/** input type for inserting data into table "app_type" */
export type App_Type_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type App_Type_Max_Fields = {
  __typename?: 'app_type_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type App_Type_Min_Fields = {
  __typename?: 'app_type_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "app_type" */
export type App_Type_Mutation_Response = {
  __typename?: 'app_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Type>;
};

/** on_conflict condition type for table "app_type" */
export type App_Type_On_Conflict = {
  constraint: App_Type_Constraint;
  update_columns?: Array<App_Type_Update_Column>;
  where?: InputMaybe<App_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "app_type". */
export type App_Type_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app_type */
export type App_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "app_type" */
export enum App_Type_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "app_type" */
export type App_Type_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "app_type" */
export type App_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Type_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "app_type" */
export enum App_Type_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type App_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: App_Type_Bool_Exp;
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
  where: AuthProviders_Bool_Exp;
};

/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes = {
  __typename?: 'authRefreshTokenTypes';
  comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokens_aggregate: AuthRefreshTokens_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypesRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypesRefreshTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};

/** aggregated selection of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate = {
  __typename?: 'authRefreshTokenTypes_aggregate';
  aggregate?: Maybe<AuthRefreshTokenTypes_Aggregate_Fields>;
  nodes: Array<AuthRefreshTokenTypes>;
};

/** aggregate fields of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate_Fields = {
  __typename?: 'authRefreshTokenTypes_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthRefreshTokenTypes_Max_Fields>;
  min?: Maybe<AuthRefreshTokenTypes_Min_Fields>;
};


/** aggregate fields of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.refresh_token_types". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokenTypes_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRefreshTokenTypes_Bool_Exp>>;
  _not?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRefreshTokenTypes_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Constraint {
  /** unique or primary key constraint on columns "value" */
  RefreshTokenTypesPkey = 'refresh_token_types_pkey'
}

export enum AuthRefreshTokenTypes_Enum {
  /** Personal access token */
  Pat = 'pat',
  /** Regular refresh token */
  Regular = 'regular'
}

/** Boolean expression to compare columns of type "authRefreshTokenTypes_enum". All fields are combined with logical 'AND'. */
export type AuthRefreshTokenTypes_Enum_Comparison_Exp = {
  _eq?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  _in?: InputMaybe<Array<AuthRefreshTokenTypes_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  _nin?: InputMaybe<Array<AuthRefreshTokenTypes_Enum>>;
};

/** input type for inserting data into table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AuthRefreshTokenTypes_Max_Fields = {
  __typename?: 'authRefreshTokenTypes_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthRefreshTokenTypes_Min_Fields = {
  __typename?: 'authRefreshTokenTypes_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Mutation_Response = {
  __typename?: 'authRefreshTokenTypes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokenTypes>;
};

/** on_conflict condition type for table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_On_Conflict = {
  constraint: AuthRefreshTokenTypes_Constraint;
  update_columns?: Array<AuthRefreshTokenTypes_Update_Column>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_token_types". */
export type AuthRefreshTokenTypes_Order_By = {
  comment?: InputMaybe<Order_By>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_token_types */
export type AuthRefreshTokenTypes_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "authRefreshTokenTypes" */
export type AuthRefreshTokenTypes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRefreshTokenTypes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRefreshTokenTypes_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type AuthRefreshTokenTypes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthRefreshTokenTypes_Bool_Exp;
};

/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokens = {
  __typename?: 'authRefreshTokens';
  createdAt: Scalars['timestamptz'];
  expiresAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata?: Maybe<Scalars['jsonb']>;
  refreshTokenHash?: Maybe<Scalars['String']>;
  type: AuthRefreshTokenTypes_Enum;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};


/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokensMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
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

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthRefreshTokens_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  refreshTokenHash?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AuthRefreshTokens_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthRefreshTokens_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthRefreshTokens_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokens_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  refreshTokenHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthRefreshTokens_Max_Fields = {
  __typename?: 'authRefreshTokens_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  refreshTokenHash?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthRefreshTokens_Min_Fields = {
  __typename?: 'authRefreshTokens_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  refreshTokenHash?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
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
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_tokens */
export type AuthRefreshTokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthRefreshTokens_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  RefreshTokenHash = 'refreshTokenHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type AuthRefreshTokens_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  refreshTokenHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
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
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  refreshTokenHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  RefreshTokenHash = 'refreshTokenHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

export type AuthRefreshTokens_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
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
  /** unique or primary key constraint on columns "provider_user_id", "provider_id" */
  UserProvidersProviderIdProviderUserIdKey = 'user_providers_provider_id_provider_user_id_key'
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
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

export type Auth_Refresh_Tokens = {
  __typename?: 'auth_refresh_tokens';
  metadata: Scalars['user_metadata'];
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
  /** filter the rows which have to be updated */
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
  /** An array relationship */
  decisions: Array<Decision>;
  /** An aggregate relationship */
  decisions_aggregate: Decision_Aggregate;
  /** An array relationship */
  hostCircleLinks: Array<Circle_Link>;
  /** An aggregate relationship */
  hostCircleLinks_aggregate: Circle_Link_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  invitedCircleLinks: Array<Circle_Link>;
  /** An aggregate relationship */
  invitedCircleLinks_aggregate: Circle_Link_Aggregate;
  /** An array relationship */
  leaders: Array<Circle_Leader>;
  /** An aggregate relationship */
  leaders_aggregate: Circle_Leader_Aggregate;
  /** An array relationship */
  meetings: Array<Meeting>;
  /** An aggregate relationship */
  meetings_aggregate: Meeting_Aggregate;
  /** An array relationship */
  meetings_recurring: Array<Meeting_Recurring>;
  /** An aggregate relationship */
  meetings_recurring_aggregate: Meeting_Recurring_Aggregate;
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
  /** An array relationship */
  participants: Array<Circle_Participant_Cache>;
  /** An aggregate relationship */
  participants_aggregate: Circle_Participant_Cache_Aggregate;
  /** An object relationship */
  role: Role;
  roleId: Scalars['uuid'];
  /** An array relationship */
  tasks: Array<Task>;
  /** An aggregate relationship */
  tasks_aggregate: Task_Aggregate;
  /** An array relationship */
  threads: Array<Thread>;
  /** An aggregate relationship */
  threads_aggregate: Thread_Aggregate;
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
export type CircleDecisionsArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleDecisions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Decision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Decision_Order_By>>;
  where?: InputMaybe<Decision_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleHostCircleLinksArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleHostCircleLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleInvitedCircleLinksArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleInvitedCircleLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleLeadersArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleLeaders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMeetingsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMeetings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Order_By>>;
  where?: InputMaybe<Meeting_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMeetings_RecurringArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleMeetings_Recurring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Recurring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Recurring_Order_By>>;
  where?: InputMaybe<Meeting_Recurring_Bool_Exp>;
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


/** columns and relationships of "circle" */
export type CircleParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleParticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleTasksArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleTasks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleThreadsArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


/** columns and relationships of "circle" */
export type CircleThreads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
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
  decisions?: InputMaybe<Decision_Bool_Exp>;
  decisions_aggregate?: InputMaybe<Decision_Aggregate_Bool_Exp>;
  hostCircleLinks?: InputMaybe<Circle_Link_Bool_Exp>;
  hostCircleLinks_aggregate?: InputMaybe<Circle_Link_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitedCircleLinks?: InputMaybe<Circle_Link_Bool_Exp>;
  invitedCircleLinks_aggregate?: InputMaybe<Circle_Link_Aggregate_Bool_Exp>;
  leaders?: InputMaybe<Circle_Leader_Bool_Exp>;
  leaders_aggregate?: InputMaybe<Circle_Leader_Aggregate_Bool_Exp>;
  meetings?: InputMaybe<Meeting_Bool_Exp>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Bool_Exp>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp>;
  members?: InputMaybe<Circle_Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Circle_Member_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Circle_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  participants?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
  participants_aggregate?: InputMaybe<Circle_Participant_Cache_Aggregate_Bool_Exp>;
  role?: InputMaybe<Role_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  tasks?: InputMaybe<Task_Bool_Exp>;
  tasks_aggregate?: InputMaybe<Task_Aggregate_Bool_Exp>;
  threads?: InputMaybe<Thread_Bool_Exp>;
  threads_aggregate?: InputMaybe<Thread_Aggregate_Bool_Exp>;
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
  decisions?: InputMaybe<Decision_Arr_Rel_Insert_Input>;
  hostCircleLinks?: InputMaybe<Circle_Link_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedCircleLinks?: InputMaybe<Circle_Link_Arr_Rel_Insert_Input>;
  leaders?: InputMaybe<Circle_Leader_Arr_Rel_Insert_Input>;
  meetings?: InputMaybe<Meeting_Arr_Rel_Insert_Input>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Arr_Rel_Insert_Input>;
  members?: InputMaybe<Circle_Member_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parent?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']>;
  participants?: InputMaybe<Circle_Participant_Cache_Arr_Rel_Insert_Input>;
  role?: InputMaybe<Role_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']>;
  tasks?: InputMaybe<Task_Arr_Rel_Insert_Input>;
  threads?: InputMaybe<Thread_Arr_Rel_Insert_Input>;
};

/** columns and relationships of "circle_leader" */
export type Circle_Leader = {
  __typename?: 'circle_leader';
  /** An object relationship */
  circle?: Maybe<Circle>;
  circleId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "circle_leader" */
export type Circle_Leader_Aggregate = {
  __typename?: 'circle_leader_aggregate';
  aggregate?: Maybe<Circle_Leader_Aggregate_Fields>;
  nodes: Array<Circle_Leader>;
};

export type Circle_Leader_Aggregate_Bool_Exp = {
  count?: InputMaybe<Circle_Leader_Aggregate_Bool_Exp_Count>;
};

export type Circle_Leader_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Leader_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "circle_leader" */
export type Circle_Leader_Aggregate_Fields = {
  __typename?: 'circle_leader_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Circle_Leader_Max_Fields>;
  min?: Maybe<Circle_Leader_Min_Fields>;
};


/** aggregate fields of "circle_leader" */
export type Circle_Leader_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "circle_leader" */
export type Circle_Leader_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Circle_Leader_Max_Order_By>;
  min?: InputMaybe<Circle_Leader_Min_Order_By>;
};

/** input type for inserting array relation for remote table "circle_leader" */
export type Circle_Leader_Arr_Rel_Insert_Input = {
  data: Array<Circle_Leader_Insert_Input>;
};

/** Boolean expression to filter rows from the table "circle_leader". All fields are combined with a logical 'AND'. */
export type Circle_Leader_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Leader_Bool_Exp>>;
  _not?: InputMaybe<Circle_Leader_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Leader_Bool_Exp>>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "circle_leader" */
export type Circle_Leader_Insert_Input = {
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Circle_Leader_Max_Fields = {
  __typename?: 'circle_leader_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "circle_leader" */
export type Circle_Leader_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Circle_Leader_Min_Fields = {
  __typename?: 'circle_leader_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "circle_leader" */
export type Circle_Leader_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "circle_leader". */
export type Circle_Leader_Order_By = {
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** select columns of table "circle_leader" */
export enum Circle_Leader_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  OrgId = 'orgId'
}

/** Streaming cursor of the table "circle_leader" */
export type Circle_Leader_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Leader_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Leader_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** Members that represent a circle in another circle */
export type Circle_Link = {
  __typename?: 'circle_link';
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  hostCircle: Circle;
  id: Scalars['uuid'];
  /** An object relationship */
  invitedCircle: Circle;
  parentId: Scalars['uuid'];
};

/** aggregated selection of "circle_link" */
export type Circle_Link_Aggregate = {
  __typename?: 'circle_link_aggregate';
  aggregate?: Maybe<Circle_Link_Aggregate_Fields>;
  nodes: Array<Circle_Link>;
};

export type Circle_Link_Aggregate_Bool_Exp = {
  count?: InputMaybe<Circle_Link_Aggregate_Bool_Exp_Count>;
};

export type Circle_Link_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Circle_Link_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Link_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "circle_link" */
export type Circle_Link_Aggregate_Fields = {
  __typename?: 'circle_link_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Circle_Link_Max_Fields>;
  min?: Maybe<Circle_Link_Min_Fields>;
};


/** aggregate fields of "circle_link" */
export type Circle_Link_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Link_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "circle_link" */
export type Circle_Link_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Circle_Link_Max_Order_By>;
  min?: InputMaybe<Circle_Link_Min_Order_By>;
};

/** input type for inserting array relation for remote table "circle_link" */
export type Circle_Link_Arr_Rel_Insert_Input = {
  data: Array<Circle_Link_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Circle_Link_On_Conflict>;
};

/** Boolean expression to filter rows from the table "circle_link". All fields are combined with a logical 'AND'. */
export type Circle_Link_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Link_Bool_Exp>>;
  _not?: InputMaybe<Circle_Link_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Link_Bool_Exp>>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  hostCircle?: InputMaybe<Circle_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitedCircle?: InputMaybe<Circle_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "circle_link" */
export enum Circle_Link_Constraint {
  /** unique or primary key constraint on columns "parentId", "circleId" */
  CircleLinkParentIdCircleIdKey = 'circle_link_parentId_circleId_key',
  /** unique or primary key constraint on columns "id" */
  CircleLinkPkey = 'circle_link_pkey'
}

/** input type for inserting data into table "circle_link" */
export type Circle_Link_Insert_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  hostCircle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedCircle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Circle_Link_Max_Fields = {
  __typename?: 'circle_link_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "circle_link" */
export type Circle_Link_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Circle_Link_Min_Fields = {
  __typename?: 'circle_link_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  parentId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "circle_link" */
export type Circle_Link_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "circle_link" */
export type Circle_Link_Mutation_Response = {
  __typename?: 'circle_link_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Circle_Link>;
};

/** on_conflict condition type for table "circle_link" */
export type Circle_Link_On_Conflict = {
  constraint: Circle_Link_Constraint;
  update_columns?: Array<Circle_Link_Update_Column>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};

/** Ordering options when selecting data from "circle_link". */
export type Circle_Link_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  hostCircle?: InputMaybe<Circle_Order_By>;
  id?: InputMaybe<Order_By>;
  invitedCircle?: InputMaybe<Circle_Order_By>;
  parentId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circle_link */
export type Circle_Link_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "circle_link" */
export enum Circle_Link_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId'
}

/** input type for updating data in table "circle_link" */
export type Circle_Link_Set_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  parentId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "circle_link" */
export type Circle_Link_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Link_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Link_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  parentId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "circle_link" */
export enum Circle_Link_Update_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId'
}

export type Circle_Link_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circle_Link_Set_Input>;
  /** filter the rows which have to be updated */
  where: Circle_Link_Bool_Exp;
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
  /** filter the rows which have to be updated */
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
  decisions_aggregate?: InputMaybe<Decision_Aggregate_Order_By>;
  hostCircleLinks_aggregate?: InputMaybe<Circle_Link_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  invitedCircleLinks_aggregate?: InputMaybe<Circle_Link_Aggregate_Order_By>;
  leaders_aggregate?: InputMaybe<Circle_Leader_Aggregate_Order_By>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Order_By>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Order_By>;
  members_aggregate?: InputMaybe<Circle_Member_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  parent?: InputMaybe<Circle_Order_By>;
  parentId?: InputMaybe<Order_By>;
  participants_aggregate?: InputMaybe<Circle_Participant_Cache_Aggregate_Order_By>;
  role?: InputMaybe<Role_Order_By>;
  roleId?: InputMaybe<Order_By>;
  tasks_aggregate?: InputMaybe<Task_Aggregate_Order_By>;
  threads_aggregate?: InputMaybe<Thread_Aggregate_Order_By>;
};

/** columns and relationships of "circle_participant" */
export type Circle_Participant = {
  __typename?: 'circle_participant';
  /** An object relationship */
  circle?: Maybe<Circle>;
  circleId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "circle_participant" */
export type Circle_Participant_Aggregate = {
  __typename?: 'circle_participant_aggregate';
  aggregate?: Maybe<Circle_Participant_Aggregate_Fields>;
  nodes: Array<Circle_Participant>;
};

/** aggregate fields of "circle_participant" */
export type Circle_Participant_Aggregate_Fields = {
  __typename?: 'circle_participant_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Circle_Participant_Max_Fields>;
  min?: Maybe<Circle_Participant_Min_Fields>;
};


/** aggregate fields of "circle_participant" */
export type Circle_Participant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Participant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "circle_participant". All fields are combined with a logical 'AND'. */
export type Circle_Participant_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Participant_Bool_Exp>>;
  _not?: InputMaybe<Circle_Participant_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Participant_Bool_Exp>>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Cache of circle_participant for permissions optimization, updated by triggers */
export type Circle_Participant_Cache = {
  __typename?: 'circle_participant_cache';
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
};

/** aggregated selection of "circle_participant_cache" */
export type Circle_Participant_Cache_Aggregate = {
  __typename?: 'circle_participant_cache_aggregate';
  aggregate?: Maybe<Circle_Participant_Cache_Aggregate_Fields>;
  nodes: Array<Circle_Participant_Cache>;
};

export type Circle_Participant_Cache_Aggregate_Bool_Exp = {
  count?: InputMaybe<Circle_Participant_Cache_Aggregate_Bool_Exp_Count>;
};

export type Circle_Participant_Cache_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "circle_participant_cache" */
export type Circle_Participant_Cache_Aggregate_Fields = {
  __typename?: 'circle_participant_cache_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Circle_Participant_Cache_Max_Fields>;
  min?: Maybe<Circle_Participant_Cache_Min_Fields>;
};


/** aggregate fields of "circle_participant_cache" */
export type Circle_Participant_Cache_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "circle_participant_cache" */
export type Circle_Participant_Cache_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Circle_Participant_Cache_Max_Order_By>;
  min?: InputMaybe<Circle_Participant_Cache_Min_Order_By>;
};

/** input type for inserting array relation for remote table "circle_participant_cache" */
export type Circle_Participant_Cache_Arr_Rel_Insert_Input = {
  data: Array<Circle_Participant_Cache_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Circle_Participant_Cache_On_Conflict>;
};

/** Boolean expression to filter rows from the table "circle_participant_cache". All fields are combined with a logical 'AND'. */
export type Circle_Participant_Cache_Bool_Exp = {
  _and?: InputMaybe<Array<Circle_Participant_Cache_Bool_Exp>>;
  _not?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
  _or?: InputMaybe<Array<Circle_Participant_Cache_Bool_Exp>>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "circle_participant_cache" */
export enum Circle_Participant_Cache_Constraint {
  /** unique or primary key constraint on columns "id" */
  CircleParticipantCachePkey = 'circle_participant_cache_pkey'
}

/** input type for inserting data into table "circle_participant_cache" */
export type Circle_Participant_Cache_Insert_Input = {
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Circle_Participant_Cache_Max_Fields = {
  __typename?: 'circle_participant_cache_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "circle_participant_cache" */
export type Circle_Participant_Cache_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Circle_Participant_Cache_Min_Fields = {
  __typename?: 'circle_participant_cache_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "circle_participant_cache" */
export type Circle_Participant_Cache_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "circle_participant_cache" */
export type Circle_Participant_Cache_Mutation_Response = {
  __typename?: 'circle_participant_cache_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Circle_Participant_Cache>;
};

/** on_conflict condition type for table "circle_participant_cache" */
export type Circle_Participant_Cache_On_Conflict = {
  constraint: Circle_Participant_Cache_Constraint;
  update_columns?: Array<Circle_Participant_Cache_Update_Column>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};

/** Ordering options when selecting data from "circle_participant_cache". */
export type Circle_Participant_Cache_Order_By = {
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circle_participant_cache */
export type Circle_Participant_Cache_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "circle_participant_cache" */
export enum Circle_Participant_Cache_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId'
}

/** input type for updating data in table "circle_participant_cache" */
export type Circle_Participant_Cache_Set_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "circle_participant_cache" */
export type Circle_Participant_Cache_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Participant_Cache_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Participant_Cache_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "circle_participant_cache" */
export enum Circle_Participant_Cache_Update_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId'
}

export type Circle_Participant_Cache_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circle_Participant_Cache_Set_Input>;
  /** filter the rows which have to be updated */
  where: Circle_Participant_Cache_Bool_Exp;
};

/** aggregate max on columns */
export type Circle_Participant_Max_Fields = {
  __typename?: 'circle_participant_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Circle_Participant_Min_Fields = {
  __typename?: 'circle_participant_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "circle_participant". */
export type Circle_Participant_Order_By = {
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** select columns of table "circle_participant" */
export enum Circle_Participant_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  MemberId = 'memberId'
}

/** Streaming cursor of the table "circle_participant" */
export type Circle_Participant_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circle_Participant_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circle_Participant_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
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
  /** filter the rows which have to be updated */
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

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

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
  private: Scalars['Boolean'];
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
  private?: InputMaybe<Boolean_Comparison_Exp>;
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
  private?: InputMaybe<Scalars['Boolean']>;
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

/** input type for inserting object relation for remote table "decision" */
export type Decision_Obj_Rel_Insert_Input = {
  data: Decision_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Decision_On_Conflict>;
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
  private?: InputMaybe<Order_By>;
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
  Private = 'private',
  /** column name */
  Title = 'title'
}

/** select "decision_aggregate_bool_exp_bool_and_arguments_columns" columns of table "decision" */
export enum Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
}

/** select "decision_aggregate_bool_exp_bool_or_arguments_columns" columns of table "decision" */
export enum Decision_Select_Column_Decision_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
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
  private?: InputMaybe<Scalars['Boolean']>;
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
  private?: InputMaybe<Scalars['Boolean']>;
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
  Private = 'private',
  /** column name */
  Title = 'title'
}

export type Decision_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Decision_Set_Input>;
  /** filter the rows which have to be updated */
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
  metadata?: Maybe<Scalars['jsonb']>;
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
export type FilesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
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

/** append existing jsonb value of filtered columns with new jsonb value */
export type Files_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
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

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Files_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Files_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Files_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

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
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  metadata?: InputMaybe<Order_By>;
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

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Files_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  Metadata = 'metadata',
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
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  Metadata = 'metadata',
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
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Files_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Files_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Files_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Files_Set_Input>;
  /** filter the rows which have to be updated */
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
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  cancelMember?: Maybe<Member>;
  /** Member that did the action that's canceled */
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  canceled: Scalars['Boolean'];
  /** Log of changes to entities, useful to cancel */
  changes: Scalars['log_changes'];
  createdAt: Scalars['timestamptz'];
  /** Type of log and data to display */
  display: Scalars['log_display'];
  id: Scalars['uuid'];
  /** Meeting during which this log was created (optional) */
  meetingId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  /** Keep name for display, in case of deleted member */
  memberName: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  /** An object relationship */
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  thread?: Maybe<Thread>;
  threadId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  user: Users;
  /** User and member who made the change */
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

export type Log_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Log_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Log_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Log_Aggregate_Bool_Exp_Count>;
};

export type Log_Aggregate_Bool_Exp_Bool_And = {
  arguments: Log_Select_Column_Log_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Log_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Log_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Log_Select_Column_Log_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Log_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Log_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Log_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "log" */
export type Log_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Log_Max_Order_By>;
  min?: InputMaybe<Log_Min_Order_By>;
};

/** input type for inserting array relation for remote table "log" */
export type Log_Arr_Rel_Insert_Input = {
  data: Array<Log_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Log_On_Conflict>;
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
  task?: InputMaybe<Task_Bool_Exp>;
  taskId?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
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
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  cancelMember?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  /** Member that did the action that's canceled */
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  /** Log of changes to entities, useful to cancel */
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  /** Type of log and data to display */
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  /** Meeting during which this log was created (optional) */
  meetingId?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  /** Keep name for display, in case of deleted member */
  memberName?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  task?: InputMaybe<Task_Obj_Rel_Insert_Input>;
  taskId?: InputMaybe<Scalars['uuid']>;
  thread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  threadId?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  /** User and member who made the change */
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Log_Max_Fields = {
  __typename?: 'log_max_fields';
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: Maybe<Scalars['uuid']>;
  /** Member that did the action that's canceled */
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  /** Meeting during which this log was created (optional) */
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  /** Keep name for display, in case of deleted member */
  memberName?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  taskId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  /** User and member who made the change */
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "log" */
export type Log_Max_Order_By = {
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: InputMaybe<Order_By>;
  /** Member that did the action that's canceled */
  cancelMemberId?: InputMaybe<Order_By>;
  cancelMemberName?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** Meeting during which this log was created (optional) */
  meetingId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  /** Keep name for display, in case of deleted member */
  memberName?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  taskId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
  /** User and member who made the change */
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Log_Min_Fields = {
  __typename?: 'log_min_fields';
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: Maybe<Scalars['uuid']>;
  /** Member that did the action that's canceled */
  cancelMemberId?: Maybe<Scalars['uuid']>;
  cancelMemberName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  /** Meeting during which this log was created (optional) */
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  /** Keep name for display, in case of deleted member */
  memberName?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  taskId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  /** User and member who made the change */
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "log" */
export type Log_Min_Order_By = {
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: InputMaybe<Order_By>;
  /** Member that did the action that's canceled */
  cancelMemberId?: InputMaybe<Order_By>;
  cancelMemberName?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** Meeting during which this log was created (optional) */
  meetingId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  /** Keep name for display, in case of deleted member */
  memberName?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  taskId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
  /** User and member who made the change */
  userId?: InputMaybe<Order_By>;
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
  task?: InputMaybe<Task_Order_By>;
  taskId?: InputMaybe<Order_By>;
  thread?: InputMaybe<Thread_Order_By>;
  threadId?: InputMaybe<Order_By>;
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
  TaskId = 'taskId',
  /** column name */
  ThreadId = 'threadId',
  /** column name */
  UserId = 'userId'
}

/** select "log_aggregate_bool_exp_bool_and_arguments_columns" columns of table "log" */
export enum Log_Select_Column_Log_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Canceled = 'canceled'
}

/** select "log_aggregate_bool_exp_bool_or_arguments_columns" columns of table "log" */
export enum Log_Select_Column_Log_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Canceled = 'canceled'
}

/** input type for updating data in table "log" */
export type Log_Set_Input = {
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  /** Member that did the action that's canceled */
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  /** Log of changes to entities, useful to cancel */
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  /** Type of log and data to display */
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  /** Meeting during which this log was created (optional) */
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  /** Keep name for display, in case of deleted member */
  memberName?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  taskId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
  /** User and member who made the change */
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
  /** Id of canceled log, if it's a cancellation */
  cancelLogId?: InputMaybe<Scalars['uuid']>;
  /** Member that did the action that's canceled */
  cancelMemberId?: InputMaybe<Scalars['uuid']>;
  cancelMemberName?: InputMaybe<Scalars['String']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  /** Log of changes to entities, useful to cancel */
  changes?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  /** Type of log and data to display */
  display?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  /** Meeting during which this log was created (optional) */
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  /** Keep name for display, in case of deleted member */
  memberName?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  taskId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
  /** User and member who made the change */
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
  TaskId = 'taskId',
  /** column name */
  ThreadId = 'threadId',
  /** column name */
  UserId = 'userId'
}

export type Log_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Log_Set_Input>;
  /** filter the rows which have to be updated */
  where: Log_Bool_Exp;
};

/** columns and relationships of "meeting" */
export type Meeting = {
  __typename?: 'meeting';
  archived: Scalars['Boolean'];
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  currentStepId?: Maybe<Scalars['uuid']>;
  endDate: Scalars['timestamptz'];
  ended: Scalars['Boolean'];
  id: Scalars['uuid'];
  invitedReadonly: Scalars['Boolean'];
  lastUpdateSource?: Maybe<Scalars['String']>;
  /** An array relationship */
  meeting_attendees: Array<Meeting_Attendee>;
  /** An aggregate relationship */
  meeting_attendees_aggregate: Meeting_Attendee_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  private: Scalars['Boolean'];
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
  summary: Scalars['String'];
  title: Scalars['String'];
  videoConf?: Maybe<Scalars['videoconf']>;
};


/** columns and relationships of "meeting" */
export type MeetingMeeting_AttendeesArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


/** columns and relationships of "meeting" */
export type MeetingMeeting_Attendees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
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

/** columns and relationships of "meeting_attendee" */
export type Meeting_Attendee = {
  __typename?: 'meeting_attendee';
  id: Scalars['uuid'];
  /** An object relationship */
  meeting: Meeting;
  meetingId: Scalars['uuid'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  present?: Maybe<Scalars['Boolean']>;
  startNotified: Scalars['Boolean'];
};

/** aggregated selection of "meeting_attendee" */
export type Meeting_Attendee_Aggregate = {
  __typename?: 'meeting_attendee_aggregate';
  aggregate?: Maybe<Meeting_Attendee_Aggregate_Fields>;
  nodes: Array<Meeting_Attendee>;
};

export type Meeting_Attendee_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Meeting_Attendee_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Meeting_Attendee_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Meeting_Attendee_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Attendee_Aggregate_Bool_Exp_Bool_And = {
  arguments: Meeting_Attendee_Select_Column_Meeting_Attendee_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meeting_Attendee_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Meeting_Attendee_Select_Column_Meeting_Attendee_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meeting_Attendee_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meeting_attendee" */
export type Meeting_Attendee_Aggregate_Fields = {
  __typename?: 'meeting_attendee_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Meeting_Attendee_Max_Fields>;
  min?: Maybe<Meeting_Attendee_Min_Fields>;
};


/** aggregate fields of "meeting_attendee" */
export type Meeting_Attendee_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "meeting_attendee" */
export type Meeting_Attendee_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meeting_Attendee_Max_Order_By>;
  min?: InputMaybe<Meeting_Attendee_Min_Order_By>;
};

/** input type for inserting array relation for remote table "meeting_attendee" */
export type Meeting_Attendee_Arr_Rel_Insert_Input = {
  data: Array<Meeting_Attendee_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Attendee_On_Conflict>;
};

/** Boolean expression to filter rows from the table "meeting_attendee". All fields are combined with a logical 'AND'. */
export type Meeting_Attendee_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Attendee_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Attendee_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meeting?: InputMaybe<Meeting_Bool_Exp>;
  meetingId?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  present?: InputMaybe<Boolean_Comparison_Exp>;
  startNotified?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "meeting_attendee" */
export enum Meeting_Attendee_Constraint {
  /** unique or primary key constraint on columns "memberId", "meetingId" */
  MeetingAttendeeMeetingIdMemberIdKey = 'meeting_attendee_meetingId_memberId_key',
  /** unique or primary key constraint on columns "id" */
  MeetingAttendeePkey = 'meeting_attendee_pkey'
}

/** input type for inserting data into table "meeting_attendee" */
export type Meeting_Attendee_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  meeting?: InputMaybe<Meeting_Obj_Rel_Insert_Input>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  present?: InputMaybe<Scalars['Boolean']>;
  startNotified?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Meeting_Attendee_Max_Fields = {
  __typename?: 'meeting_attendee_max_fields';
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "meeting_attendee" */
export type Meeting_Attendee_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meeting_Attendee_Min_Fields = {
  __typename?: 'meeting_attendee_min_fields';
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "meeting_attendee" */
export type Meeting_Attendee_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meeting_attendee" */
export type Meeting_Attendee_Mutation_Response = {
  __typename?: 'meeting_attendee_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Meeting_Attendee>;
};

/** on_conflict condition type for table "meeting_attendee" */
export type Meeting_Attendee_On_Conflict = {
  constraint: Meeting_Attendee_Constraint;
  update_columns?: Array<Meeting_Attendee_Update_Column>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};

/** Ordering options when selecting data from "meeting_attendee". */
export type Meeting_Attendee_Order_By = {
  id?: InputMaybe<Order_By>;
  meeting?: InputMaybe<Meeting_Order_By>;
  meetingId?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  present?: InputMaybe<Order_By>;
  startNotified?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meeting_attendee */
export type Meeting_Attendee_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "meeting_attendee" */
export enum Meeting_Attendee_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  Present = 'present',
  /** column name */
  StartNotified = 'startNotified'
}

/** select "meeting_attendee_aggregate_bool_exp_bool_and_arguments_columns" columns of table "meeting_attendee" */
export enum Meeting_Attendee_Select_Column_Meeting_Attendee_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Present = 'present',
  /** column name */
  StartNotified = 'startNotified'
}

/** select "meeting_attendee_aggregate_bool_exp_bool_or_arguments_columns" columns of table "meeting_attendee" */
export enum Meeting_Attendee_Select_Column_Meeting_Attendee_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Present = 'present',
  /** column name */
  StartNotified = 'startNotified'
}

/** input type for updating data in table "meeting_attendee" */
export type Meeting_Attendee_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  present?: InputMaybe<Scalars['Boolean']>;
  startNotified?: InputMaybe<Scalars['Boolean']>;
};

/** Streaming cursor of the table "meeting_attendee" */
export type Meeting_Attendee_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Attendee_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Attendee_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  present?: InputMaybe<Scalars['Boolean']>;
  startNotified?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "meeting_attendee" */
export enum Meeting_Attendee_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  Present = 'present',
  /** column name */
  StartNotified = 'startNotified'
}

export type Meeting_Attendee_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Attendee_Set_Input>;
  /** filter the rows which have to be updated */
  where: Meeting_Attendee_Bool_Exp;
};

/** Boolean expression to filter rows from the table "meeting". All fields are combined with a logical 'AND'. */
export type Meeting_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Bool_Exp>>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentStepId?: InputMaybe<Uuid_Comparison_Exp>;
  endDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  ended?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitedReadonly?: InputMaybe<Boolean_Comparison_Exp>;
  lastUpdateSource?: InputMaybe<String_Comparison_Exp>;
  meeting_attendees?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  meeting_attendees_aggregate?: InputMaybe<Meeting_Attendee_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  private?: InputMaybe<Boolean_Comparison_Exp>;
  recurring?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  recurringDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  recurringId?: InputMaybe<Uuid_Comparison_Exp>;
  startDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  steps?: InputMaybe<Meeting_Step_Bool_Exp>;
  stepsConfig?: InputMaybe<Json_Comparison_Exp>;
  steps_aggregate?: InputMaybe<Meeting_Step_Aggregate_Bool_Exp>;
  summary?: InputMaybe<String_Comparison_Exp>;
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
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  lastUpdateSource?: InputMaybe<Scalars['String']>;
  meeting_attendees?: InputMaybe<Meeting_Attendee_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  recurring?: InputMaybe<Meeting_Recurring_Obj_Rel_Insert_Input>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  steps?: InputMaybe<Meeting_Step_Arr_Rel_Insert_Input>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  summary?: InputMaybe<Scalars['String']>;
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
  lastUpdateSource?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  recurringDate?: Maybe<Scalars['timestamptz']>;
  recurringId?: Maybe<Scalars['uuid']>;
  startDate?: Maybe<Scalars['timestamptz']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "meeting" */
export type Meeting_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdateSource?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  summary?: InputMaybe<Order_By>;
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
  lastUpdateSource?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
  recurringDate?: Maybe<Scalars['timestamptz']>;
  recurringId?: Maybe<Scalars['uuid']>;
  startDate?: Maybe<Scalars['timestamptz']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "meeting" */
export type Meeting_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdateSource?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  summary?: InputMaybe<Order_By>;
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
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentStepId?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  ended?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitedReadonly?: InputMaybe<Order_By>;
  lastUpdateSource?: InputMaybe<Order_By>;
  meeting_attendees_aggregate?: InputMaybe<Meeting_Attendee_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  private?: InputMaybe<Order_By>;
  recurring?: InputMaybe<Meeting_Recurring_Order_By>;
  recurringDate?: InputMaybe<Order_By>;
  recurringId?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  stepsConfig?: InputMaybe<Order_By>;
  steps_aggregate?: InputMaybe<Meeting_Step_Aggregate_Order_By>;
  summary?: InputMaybe<Order_By>;
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
  invitedReadonly: Scalars['Boolean'];
  /** An array relationship */
  meetings: Array<Meeting>;
  /** An aggregate relationship */
  meetings_aggregate: Meeting_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  private: Scalars['Boolean'];
  rrule: Scalars['String'];
  scope: Scalars['participants_scope'];
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
export type Meeting_RecurringScopeArgs = {
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
  bool_and?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Recurring_Aggregate_Bool_Exp_Bool_And = {
  arguments: Meeting_Recurring_Select_Column_Meeting_Recurring_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meeting_Recurring_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Meeting_Recurring_Select_Column_Meeting_Recurring_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
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
  invitedReadonly?: InputMaybe<Boolean_Comparison_Exp>;
  meetings?: InputMaybe<Meeting_Bool_Exp>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  private?: InputMaybe<Boolean_Comparison_Exp>;
  rrule?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Json_Comparison_Exp>;
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
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  meetings?: InputMaybe<Meeting_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  rrule?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['json']>;
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
  invitedReadonly?: InputMaybe<Order_By>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  private?: InputMaybe<Order_By>;
  rrule?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
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
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  Rrule = 'rrule',
  /** column name */
  Scope = 'scope',
  /** column name */
  TemplateId = 'templateId',
  /** column name */
  VideoConf = 'videoConf'
}

/** select "meeting_recurring_aggregate_bool_exp_bool_and_arguments_columns" columns of table "meeting_recurring" */
export enum Meeting_Recurring_Select_Column_Meeting_Recurring_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  Private = 'private'
}

/** select "meeting_recurring_aggregate_bool_exp_bool_or_arguments_columns" columns of table "meeting_recurring" */
export enum Meeting_Recurring_Select_Column_Meeting_Recurring_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  Private = 'private'
}

/** input type for updating data in table "meeting_recurring" */
export type Meeting_Recurring_Set_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  duration?: InputMaybe<Scalars['smallint']>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  rrule?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['json']>;
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
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  rrule?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['json']>;
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
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  Rrule = 'rrule',
  /** column name */
  Scope = 'scope',
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
  /** filter the rows which have to be updated */
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
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  LastUpdateSource = 'lastUpdateSource',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  RecurringDate = 'recurringDate',
  /** column name */
  RecurringId = 'recurringId',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Summary = 'summary',
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
  Ended = 'ended',
  /** column name */
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  Private = 'private'
}

/** select "meeting_aggregate_bool_exp_bool_or_arguments_columns" columns of table "meeting" */
export enum Meeting_Select_Column_Meeting_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Ended = 'ended',
  /** column name */
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  Private = 'private'
}

/** input type for updating data in table "meeting" */
export type Meeting_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  lastUpdateSource?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  videoConf?: InputMaybe<Scalars['json']>;
};

/** columns and relationships of "meeting_stats" */
export type Meeting_Stats = {
  __typename?: 'meeting_stats';
  count?: Maybe<Scalars['bigint']>;
  day?: Maybe<Scalars['timestamptz']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "meeting_stats" */
export type Meeting_Stats_Aggregate = {
  __typename?: 'meeting_stats_aggregate';
  aggregate?: Maybe<Meeting_Stats_Aggregate_Fields>;
  nodes: Array<Meeting_Stats>;
};

/** aggregate fields of "meeting_stats" */
export type Meeting_Stats_Aggregate_Fields = {
  __typename?: 'meeting_stats_aggregate_fields';
  avg?: Maybe<Meeting_Stats_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Meeting_Stats_Max_Fields>;
  min?: Maybe<Meeting_Stats_Min_Fields>;
  stddev?: Maybe<Meeting_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Meeting_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meeting_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Meeting_Stats_Sum_Fields>;
  var_pop?: Maybe<Meeting_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Meeting_Stats_Var_Samp_Fields>;
  variance?: Maybe<Meeting_Stats_Variance_Fields>;
};


/** aggregate fields of "meeting_stats" */
export type Meeting_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meeting_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Meeting_Stats_Avg_Fields = {
  __typename?: 'meeting_stats_avg_fields';
  count?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "meeting_stats". All fields are combined with a logical 'AND'. */
export type Meeting_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Meeting_Stats_Bool_Exp>>;
  _not?: InputMaybe<Meeting_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Meeting_Stats_Bool_Exp>>;
  count?: InputMaybe<Bigint_Comparison_Exp>;
  day?: InputMaybe<Timestamptz_Comparison_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Meeting_Stats_Max_Fields = {
  __typename?: 'meeting_stats_max_fields';
  count?: Maybe<Scalars['bigint']>;
  day?: Maybe<Scalars['timestamptz']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Meeting_Stats_Min_Fields = {
  __typename?: 'meeting_stats_min_fields';
  count?: Maybe<Scalars['bigint']>;
  day?: Maybe<Scalars['timestamptz']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "meeting_stats". */
export type Meeting_Stats_Order_By = {
  count?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** select columns of table "meeting_stats" */
export enum Meeting_Stats_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  Day = 'day',
  /** column name */
  OrgId = 'orgId'
}

/** aggregate stddev on columns */
export type Meeting_Stats_Stddev_Fields = {
  __typename?: 'meeting_stats_stddev_fields';
  count?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Meeting_Stats_Stddev_Pop_Fields = {
  __typename?: 'meeting_stats_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Meeting_Stats_Stddev_Samp_Fields = {
  __typename?: 'meeting_stats_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "meeting_stats" */
export type Meeting_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meeting_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meeting_Stats_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars['bigint']>;
  day?: InputMaybe<Scalars['timestamptz']>;
  orgId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Meeting_Stats_Sum_Fields = {
  __typename?: 'meeting_stats_sum_fields';
  count?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type Meeting_Stats_Var_Pop_Fields = {
  __typename?: 'meeting_stats_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Meeting_Stats_Var_Samp_Fields = {
  __typename?: 'meeting_stats_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Meeting_Stats_Variance_Fields = {
  __typename?: 'meeting_stats_variance_fields';
  count?: Maybe<Scalars['Float']>;
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
  /** unique or primary key constraint on columns "meetingId", "stepConfigId" */
  MeetingStepMeetingIdStepConfigIdKey = 'meeting_step_meetingId_stepConfigId_key',
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
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
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  currentStepId?: InputMaybe<Scalars['uuid']>;
  endDate?: InputMaybe<Scalars['timestamptz']>;
  ended?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  invitedReadonly?: InputMaybe<Scalars['Boolean']>;
  lastUpdateSource?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  recurringDate?: InputMaybe<Scalars['timestamptz']>;
  recurringId?: InputMaybe<Scalars['uuid']>;
  startDate?: InputMaybe<Scalars['timestamptz']>;
  stepsConfig?: InputMaybe<Scalars['json']>;
  summary?: InputMaybe<Scalars['String']>;
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

export type Meeting_Template_Aggregate_Bool_Exp = {
  count?: InputMaybe<Meeting_Template_Aggregate_Bool_Exp_Count>;
};

export type Meeting_Template_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Meeting_Template_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "meeting_template" */
export type Meeting_Template_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meeting_Template_Max_Order_By>;
  min?: InputMaybe<Meeting_Template_Min_Order_By>;
};

/** input type for inserting array relation for remote table "meeting_template" */
export type Meeting_Template_Arr_Rel_Insert_Input = {
  data: Array<Meeting_Template_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meeting_Template_On_Conflict>;
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

/** order by max() on columns of table "meeting_template" */
export type Meeting_Template_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meeting_Template_Min_Fields = {
  __typename?: 'meeting_template_min_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "meeting_template" */
export type Meeting_Template_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
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
  /** filter the rows which have to be updated */
  where: Meeting_Template_Bool_Exp;
};

/** update columns of table "meeting" */
export enum Meeting_Update_Column {
  /** column name */
  Archived = 'archived',
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
  InvitedReadonly = 'invitedReadonly',
  /** column name */
  LastUpdateSource = 'lastUpdateSource',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  RecurringDate = 'recurringDate',
  /** column name */
  RecurringId = 'recurringId',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  StepsConfig = 'stepsConfig',
  /** column name */
  Summary = 'summary',
  /** column name */
  Title = 'title',
  /** column name */
  VideoConf = 'videoConf'
}

export type Meeting_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meeting_Set_Input>;
  /** filter the rows which have to be updated */
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
  /** An array relationship */
  meeting_attendees: Array<Meeting_Attendee>;
  /** An aggregate relationship */
  meeting_attendees_aggregate: Meeting_Attendee_Aggregate;
  name: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  picture?: Maybe<Scalars['String']>;
  /** An object relationship */
  pictureFile?: Maybe<Files>;
  pictureFileId?: Maybe<Scalars['uuid']>;
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
export type MemberMeeting_AttendeesArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


/** columns and relationships of "member" */
export type MemberMeeting_Attendees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
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
  meeting_attendees?: InputMaybe<Meeting_Attendee_Bool_Exp>;
  meeting_attendees_aggregate?: InputMaybe<Meeting_Attendee_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  pictureFile?: InputMaybe<Files_Bool_Exp>;
  pictureFileId?: InputMaybe<Uuid_Comparison_Exp>;
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
  meeting_attendees?: InputMaybe<Meeting_Attendee_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFile?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
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
  meeting_attendees_aggregate?: InputMaybe<Meeting_Attendee_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  pictureFile?: InputMaybe<Files_Order_By>;
  pictureFileId?: InputMaybe<Order_By>;
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
  /** filter the rows which have to be updated */
  where: Member_Role_Bool_Exp;
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
  Name = 'name',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Picture = 'picture',
  /** column name */
  PictureFileId = 'pictureFileId',
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
  name?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
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
  name?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Scalars['String']>;
  pictureFileId?: InputMaybe<Scalars['uuid']>;
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
  Name = 'name',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Picture = 'picture',
  /** column name */
  PictureFileId = 'pictureFileId',
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
  /** filter the rows which have to be updated */
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
  /** delete single row from the table: "auth.refresh_token_types" */
  deleteAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** delete data from the table: "auth.refresh_token_types" */
  deleteAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
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
  /** delete single row from the table: "storage.virus" */
  deleteVirus?: Maybe<Virus>;
  /** delete data from the table: "storage.virus" */
  deleteViruses?: Maybe<Virus_Mutation_Response>;
  /** delete data from the table: "api_key" */
  delete_api_key?: Maybe<Api_Key_Mutation_Response>;
  /** delete single row from the table: "api_key" */
  delete_api_key_by_pk?: Maybe<Api_Key>;
  /** delete data from the table: "app_type" */
  delete_app_type?: Maybe<App_Type_Mutation_Response>;
  /** delete single row from the table: "app_type" */
  delete_app_type_by_pk?: Maybe<App_Type>;
  /** delete data from the table: "circle" */
  delete_circle?: Maybe<Circle_Mutation_Response>;
  /** delete single row from the table: "circle" */
  delete_circle_by_pk?: Maybe<Circle>;
  /** delete data from the table: "circle_link" */
  delete_circle_link?: Maybe<Circle_Link_Mutation_Response>;
  /** delete single row from the table: "circle_link" */
  delete_circle_link_by_pk?: Maybe<Circle_Link>;
  /** delete data from the table: "circle_member" */
  delete_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** delete single row from the table: "circle_member" */
  delete_circle_member_by_pk?: Maybe<Circle_Member>;
  /** delete data from the table: "circle_participant_cache" */
  delete_circle_participant_cache?: Maybe<Circle_Participant_Cache_Mutation_Response>;
  /** delete single row from the table: "circle_participant_cache" */
  delete_circle_participant_cache_by_pk?: Maybe<Circle_Participant_Cache>;
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
  /** delete data from the table: "meeting_attendee" */
  delete_meeting_attendee?: Maybe<Meeting_Attendee_Mutation_Response>;
  /** delete single row from the table: "meeting_attendee" */
  delete_meeting_attendee_by_pk?: Maybe<Meeting_Attendee>;
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
  /** delete data from the table: "org_subscription" */
  delete_org_subscription?: Maybe<Org_Subscription_Mutation_Response>;
  /** delete single row from the table: "org_subscription" */
  delete_org_subscription_by_pk?: Maybe<Org_Subscription>;
  /** delete data from the table: "role" */
  delete_role?: Maybe<Role_Mutation_Response>;
  /** delete data from the table: "role_ai" */
  delete_role_ai?: Maybe<Role_Ai_Mutation_Response>;
  /** delete single row from the table: "role_ai" */
  delete_role_ai_by_pk?: Maybe<Role_Ai>;
  /** delete single row from the table: "role" */
  delete_role_by_pk?: Maybe<Role>;
  /** delete data from the table: "subscription_payment_status" */
  delete_subscription_payment_status?: Maybe<Subscription_Payment_Status_Mutation_Response>;
  /** delete single row from the table: "subscription_payment_status" */
  delete_subscription_payment_status_by_pk?: Maybe<Subscription_Payment_Status>;
  /** delete data from the table: "subscription_plan_type" */
  delete_subscription_plan_type?: Maybe<Subscription_Plan_Type_Mutation_Response>;
  /** delete single row from the table: "subscription_plan_type" */
  delete_subscription_plan_type_by_pk?: Maybe<Subscription_Plan_Type>;
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
  /** delete data from the table: "thread_activity_reaction" */
  delete_thread_activity_reaction?: Maybe<Thread_Activity_Reaction_Mutation_Response>;
  /** delete single row from the table: "thread_activity_reaction" */
  delete_thread_activity_reaction_by_pk?: Maybe<Thread_Activity_Reaction>;
  /** delete data from the table: "thread_activity_type" */
  delete_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** delete single row from the table: "thread_activity_type" */
  delete_thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** delete single row from the table: "thread" */
  delete_thread_by_pk?: Maybe<Thread>;
  /** delete data from the table: "thread_extra_member" */
  delete_thread_extra_member?: Maybe<Thread_Extra_Member_Mutation_Response>;
  /** delete single row from the table: "thread_extra_member" */
  delete_thread_extra_member_by_pk?: Maybe<Thread_Extra_Member>;
  /** delete data from the table: "thread_member_status" */
  delete_thread_member_status?: Maybe<Thread_Member_Status_Mutation_Response>;
  /** delete single row from the table: "thread_member_status" */
  delete_thread_member_status_by_pk?: Maybe<Thread_Member_Status>;
  /** delete data from the table: "thread_poll_answer" */
  delete_thread_poll_answer?: Maybe<Thread_Poll_Answer_Mutation_Response>;
  /** delete single row from the table: "thread_poll_answer" */
  delete_thread_poll_answer_by_pk?: Maybe<Thread_Poll_Answer>;
  /** delete data from the table: "thread_status" */
  delete_thread_status?: Maybe<Thread_Status_Mutation_Response>;
  /** delete single row from the table: "thread_status" */
  delete_thread_status_by_pk?: Maybe<Thread_Status>;
  /** delete data from the table: "user_app" */
  delete_user_app?: Maybe<User_App_Mutation_Response>;
  /** delete single row from the table: "user_app" */
  delete_user_app_by_pk?: Maybe<User_App>;
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
  /** insert a single row into the table: "auth.refresh_token_types" */
  insertAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** insert data into the table: "auth.refresh_token_types" */
  insertAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
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
  /** insert a single row into the table: "storage.virus" */
  insertVirus?: Maybe<Virus>;
  /** insert data into the table: "storage.virus" */
  insertViruses?: Maybe<Virus_Mutation_Response>;
  /** insert data into the table: "api_key" */
  insert_api_key?: Maybe<Api_Key_Mutation_Response>;
  /** insert a single row into the table: "api_key" */
  insert_api_key_one?: Maybe<Api_Key>;
  /** insert data into the table: "app_type" */
  insert_app_type?: Maybe<App_Type_Mutation_Response>;
  /** insert a single row into the table: "app_type" */
  insert_app_type_one?: Maybe<App_Type>;
  /** insert data into the table: "circle" */
  insert_circle?: Maybe<Circle_Mutation_Response>;
  /** insert data into the table: "circle_link" */
  insert_circle_link?: Maybe<Circle_Link_Mutation_Response>;
  /** insert a single row into the table: "circle_link" */
  insert_circle_link_one?: Maybe<Circle_Link>;
  /** insert data into the table: "circle_member" */
  insert_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** insert a single row into the table: "circle_member" */
  insert_circle_member_one?: Maybe<Circle_Member>;
  /** insert a single row into the table: "circle" */
  insert_circle_one?: Maybe<Circle>;
  /** insert data into the table: "circle_participant_cache" */
  insert_circle_participant_cache?: Maybe<Circle_Participant_Cache_Mutation_Response>;
  /** insert a single row into the table: "circle_participant_cache" */
  insert_circle_participant_cache_one?: Maybe<Circle_Participant_Cache>;
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
  /** insert data into the table: "meeting_attendee" */
  insert_meeting_attendee?: Maybe<Meeting_Attendee_Mutation_Response>;
  /** insert a single row into the table: "meeting_attendee" */
  insert_meeting_attendee_one?: Maybe<Meeting_Attendee>;
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
  /** insert data into the table: "org_subscription" */
  insert_org_subscription?: Maybe<Org_Subscription_Mutation_Response>;
  /** insert a single row into the table: "org_subscription" */
  insert_org_subscription_one?: Maybe<Org_Subscription>;
  /** insert data into the table: "role" */
  insert_role?: Maybe<Role_Mutation_Response>;
  /** insert data into the table: "role_ai" */
  insert_role_ai?: Maybe<Role_Ai_Mutation_Response>;
  /** insert a single row into the table: "role_ai" */
  insert_role_ai_one?: Maybe<Role_Ai>;
  /** insert a single row into the table: "role" */
  insert_role_one?: Maybe<Role>;
  /** insert data into the table: "subscription_payment_status" */
  insert_subscription_payment_status?: Maybe<Subscription_Payment_Status_Mutation_Response>;
  /** insert a single row into the table: "subscription_payment_status" */
  insert_subscription_payment_status_one?: Maybe<Subscription_Payment_Status>;
  /** insert data into the table: "subscription_plan_type" */
  insert_subscription_plan_type?: Maybe<Subscription_Plan_Type_Mutation_Response>;
  /** insert a single row into the table: "subscription_plan_type" */
  insert_subscription_plan_type_one?: Maybe<Subscription_Plan_Type>;
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
  /** insert data into the table: "thread_activity_reaction" */
  insert_thread_activity_reaction?: Maybe<Thread_Activity_Reaction_Mutation_Response>;
  /** insert a single row into the table: "thread_activity_reaction" */
  insert_thread_activity_reaction_one?: Maybe<Thread_Activity_Reaction>;
  /** insert data into the table: "thread_activity_type" */
  insert_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** insert a single row into the table: "thread_activity_type" */
  insert_thread_activity_type_one?: Maybe<Thread_Activity_Type>;
  /** insert data into the table: "thread_extra_member" */
  insert_thread_extra_member?: Maybe<Thread_Extra_Member_Mutation_Response>;
  /** insert a single row into the table: "thread_extra_member" */
  insert_thread_extra_member_one?: Maybe<Thread_Extra_Member>;
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
  /** insert data into the table: "thread_status" */
  insert_thread_status?: Maybe<Thread_Status_Mutation_Response>;
  /** insert a single row into the table: "thread_status" */
  insert_thread_status_one?: Maybe<Thread_Status>;
  /** insert data into the table: "user_app" */
  insert_user_app?: Maybe<User_App_Mutation_Response>;
  /** insert a single row into the table: "user_app" */
  insert_user_app_one?: Maybe<User_App>;
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
  /** update single row of the table: "auth.refresh_token_types" */
  updateAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** update data of the table: "auth.refresh_token_types" */
  updateAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
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
  /** update single row of the table: "storage.virus" */
  updateVirus?: Maybe<Virus>;
  /** update data of the table: "storage.virus" */
  updateViruses?: Maybe<Virus_Mutation_Response>;
  /** update data of the table: "api_key" */
  update_api_key?: Maybe<Api_Key_Mutation_Response>;
  /** update single row of the table: "api_key" */
  update_api_key_by_pk?: Maybe<Api_Key>;
  /** update multiples rows of table: "api_key" */
  update_api_key_many?: Maybe<Array<Maybe<Api_Key_Mutation_Response>>>;
  /** update data of the table: "app_type" */
  update_app_type?: Maybe<App_Type_Mutation_Response>;
  /** update single row of the table: "app_type" */
  update_app_type_by_pk?: Maybe<App_Type>;
  /** update multiples rows of table: "app_type" */
  update_app_type_many?: Maybe<Array<Maybe<App_Type_Mutation_Response>>>;
  /** update multiples rows of table: "auth.provider_requests" */
  update_authProviderRequests_many?: Maybe<Array<Maybe<AuthProviderRequests_Mutation_Response>>>;
  /** update multiples rows of table: "auth.providers" */
  update_authProviders_many?: Maybe<Array<Maybe<AuthProviders_Mutation_Response>>>;
  /** update multiples rows of table: "auth.refresh_token_types" */
  update_authRefreshTokenTypes_many?: Maybe<Array<Maybe<AuthRefreshTokenTypes_Mutation_Response>>>;
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
  /** update data of the table: "circle_link" */
  update_circle_link?: Maybe<Circle_Link_Mutation_Response>;
  /** update single row of the table: "circle_link" */
  update_circle_link_by_pk?: Maybe<Circle_Link>;
  /** update multiples rows of table: "circle_link" */
  update_circle_link_many?: Maybe<Array<Maybe<Circle_Link_Mutation_Response>>>;
  /** update multiples rows of table: "circle" */
  update_circle_many?: Maybe<Array<Maybe<Circle_Mutation_Response>>>;
  /** update data of the table: "circle_member" */
  update_circle_member?: Maybe<Circle_Member_Mutation_Response>;
  /** update single row of the table: "circle_member" */
  update_circle_member_by_pk?: Maybe<Circle_Member>;
  /** update multiples rows of table: "circle_member" */
  update_circle_member_many?: Maybe<Array<Maybe<Circle_Member_Mutation_Response>>>;
  /** update data of the table: "circle_participant_cache" */
  update_circle_participant_cache?: Maybe<Circle_Participant_Cache_Mutation_Response>;
  /** update single row of the table: "circle_participant_cache" */
  update_circle_participant_cache_by_pk?: Maybe<Circle_Participant_Cache>;
  /** update multiples rows of table: "circle_participant_cache" */
  update_circle_participant_cache_many?: Maybe<Array<Maybe<Circle_Participant_Cache_Mutation_Response>>>;
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
  /** update data of the table: "meeting_attendee" */
  update_meeting_attendee?: Maybe<Meeting_Attendee_Mutation_Response>;
  /** update single row of the table: "meeting_attendee" */
  update_meeting_attendee_by_pk?: Maybe<Meeting_Attendee>;
  /** update multiples rows of table: "meeting_attendee" */
  update_meeting_attendee_many?: Maybe<Array<Maybe<Meeting_Attendee_Mutation_Response>>>;
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
  /** update data of the table: "org_subscription" */
  update_org_subscription?: Maybe<Org_Subscription_Mutation_Response>;
  /** update single row of the table: "org_subscription" */
  update_org_subscription_by_pk?: Maybe<Org_Subscription>;
  /** update multiples rows of table: "org_subscription" */
  update_org_subscription_many?: Maybe<Array<Maybe<Org_Subscription_Mutation_Response>>>;
  /** update data of the table: "role" */
  update_role?: Maybe<Role_Mutation_Response>;
  /** update data of the table: "role_ai" */
  update_role_ai?: Maybe<Role_Ai_Mutation_Response>;
  /** update single row of the table: "role_ai" */
  update_role_ai_by_pk?: Maybe<Role_Ai>;
  /** update multiples rows of table: "role_ai" */
  update_role_ai_many?: Maybe<Array<Maybe<Role_Ai_Mutation_Response>>>;
  /** update single row of the table: "role" */
  update_role_by_pk?: Maybe<Role>;
  /** update multiples rows of table: "role" */
  update_role_many?: Maybe<Array<Maybe<Role_Mutation_Response>>>;
  /** update data of the table: "subscription_payment_status" */
  update_subscription_payment_status?: Maybe<Subscription_Payment_Status_Mutation_Response>;
  /** update single row of the table: "subscription_payment_status" */
  update_subscription_payment_status_by_pk?: Maybe<Subscription_Payment_Status>;
  /** update multiples rows of table: "subscription_payment_status" */
  update_subscription_payment_status_many?: Maybe<Array<Maybe<Subscription_Payment_Status_Mutation_Response>>>;
  /** update data of the table: "subscription_plan_type" */
  update_subscription_plan_type?: Maybe<Subscription_Plan_Type_Mutation_Response>;
  /** update single row of the table: "subscription_plan_type" */
  update_subscription_plan_type_by_pk?: Maybe<Subscription_Plan_Type>;
  /** update multiples rows of table: "subscription_plan_type" */
  update_subscription_plan_type_many?: Maybe<Array<Maybe<Subscription_Plan_Type_Mutation_Response>>>;
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
  /** update data of the table: "thread_activity_reaction" */
  update_thread_activity_reaction?: Maybe<Thread_Activity_Reaction_Mutation_Response>;
  /** update single row of the table: "thread_activity_reaction" */
  update_thread_activity_reaction_by_pk?: Maybe<Thread_Activity_Reaction>;
  /** update multiples rows of table: "thread_activity_reaction" */
  update_thread_activity_reaction_many?: Maybe<Array<Maybe<Thread_Activity_Reaction_Mutation_Response>>>;
  /** update data of the table: "thread_activity_type" */
  update_thread_activity_type?: Maybe<Thread_Activity_Type_Mutation_Response>;
  /** update single row of the table: "thread_activity_type" */
  update_thread_activity_type_by_pk?: Maybe<Thread_Activity_Type>;
  /** update multiples rows of table: "thread_activity_type" */
  update_thread_activity_type_many?: Maybe<Array<Maybe<Thread_Activity_Type_Mutation_Response>>>;
  /** update single row of the table: "thread" */
  update_thread_by_pk?: Maybe<Thread>;
  /** update data of the table: "thread_extra_member" */
  update_thread_extra_member?: Maybe<Thread_Extra_Member_Mutation_Response>;
  /** update single row of the table: "thread_extra_member" */
  update_thread_extra_member_by_pk?: Maybe<Thread_Extra_Member>;
  /** update multiples rows of table: "thread_extra_member" */
  update_thread_extra_member_many?: Maybe<Array<Maybe<Thread_Extra_Member_Mutation_Response>>>;
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
  /** update data of the table: "thread_status" */
  update_thread_status?: Maybe<Thread_Status_Mutation_Response>;
  /** update single row of the table: "thread_status" */
  update_thread_status_by_pk?: Maybe<Thread_Status>;
  /** update multiples rows of table: "thread_status" */
  update_thread_status_many?: Maybe<Array<Maybe<Thread_Status_Mutation_Response>>>;
  /** update data of the table: "user_app" */
  update_user_app?: Maybe<User_App_Mutation_Response>;
  /** update single row of the table: "user_app" */
  update_user_app_by_pk?: Maybe<User_App>;
  /** update multiples rows of table: "user_app" */
  update_user_app_many?: Maybe<Array<Maybe<User_App_Mutation_Response>>>;
  /** update multiples rows of table: "auth.users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update multiples rows of table: "storage.virus" */
  update_virus_many?: Maybe<Array<Maybe<Virus_Mutation_Response>>>;
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
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenTypeArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenTypesArgs = {
  where: AuthRefreshTokenTypes_Bool_Exp;
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
export type Mutation_RootDeleteVirusArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteVirusesArgs = {
  where: Virus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Api_KeyArgs = {
  where: Api_Key_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Api_Key_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_App_TypeArgs = {
  where: App_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Type_By_PkArgs = {
  value: Scalars['String'];
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
export type Mutation_RootDelete_Circle_LinkArgs = {
  where: Circle_Link_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Circle_Link_By_PkArgs = {
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
export type Mutation_RootDelete_Circle_Participant_CacheArgs = {
  where: Circle_Participant_Cache_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Circle_Participant_Cache_By_PkArgs = {
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
export type Mutation_RootDelete_Meeting_AttendeeArgs = {
  where: Meeting_Attendee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meeting_Attendee_By_PkArgs = {
  id: Scalars['uuid'];
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
export type Mutation_RootDelete_Org_SubscriptionArgs = {
  where: Org_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Org_Subscription_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_RoleArgs = {
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_AiArgs = {
  where: Role_Ai_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_Ai_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Role_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Subscription_Payment_StatusArgs = {
  where: Subscription_Payment_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Subscription_Payment_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Subscription_Plan_TypeArgs = {
  where: Subscription_Plan_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Subscription_Plan_Type_By_PkArgs = {
  value: Scalars['String'];
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
export type Mutation_RootDelete_Thread_Activity_ReactionArgs = {
  where: Thread_Activity_Reaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Activity_Reaction_By_PkArgs = {
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
export type Mutation_RootDelete_Thread_Extra_MemberArgs = {
  where: Thread_Extra_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Extra_Member_By_PkArgs = {
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
export type Mutation_RootDelete_Thread_StatusArgs = {
  where: Thread_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Thread_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_AppArgs = {
  where: User_App_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_App_By_PkArgs = {
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
export type Mutation_RootInsertAuthRefreshTokenTypeArgs = {
  object: AuthRefreshTokenTypes_Insert_Input;
  on_conflict?: InputMaybe<AuthRefreshTokenTypes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenTypesArgs = {
  objects: Array<AuthRefreshTokenTypes_Insert_Input>;
  on_conflict?: InputMaybe<AuthRefreshTokenTypes_On_Conflict>;
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
export type Mutation_RootInsertVirusArgs = {
  object: Virus_Insert_Input;
  on_conflict?: InputMaybe<Virus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertVirusesArgs = {
  objects: Array<Virus_Insert_Input>;
  on_conflict?: InputMaybe<Virus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Api_KeyArgs = {
  objects: Array<Api_Key_Insert_Input>;
  on_conflict?: InputMaybe<Api_Key_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Api_Key_OneArgs = {
  object: Api_Key_Insert_Input;
  on_conflict?: InputMaybe<Api_Key_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_TypeArgs = {
  objects: Array<App_Type_Insert_Input>;
  on_conflict?: InputMaybe<App_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Type_OneArgs = {
  object: App_Type_Insert_Input;
  on_conflict?: InputMaybe<App_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CircleArgs = {
  objects: Array<Circle_Insert_Input>;
  on_conflict?: InputMaybe<Circle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_LinkArgs = {
  objects: Array<Circle_Link_Insert_Input>;
  on_conflict?: InputMaybe<Circle_Link_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_Link_OneArgs = {
  object: Circle_Link_Insert_Input;
  on_conflict?: InputMaybe<Circle_Link_On_Conflict>;
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
export type Mutation_RootInsert_Circle_Participant_CacheArgs = {
  objects: Array<Circle_Participant_Cache_Insert_Input>;
  on_conflict?: InputMaybe<Circle_Participant_Cache_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Circle_Participant_Cache_OneArgs = {
  object: Circle_Participant_Cache_Insert_Input;
  on_conflict?: InputMaybe<Circle_Participant_Cache_On_Conflict>;
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
export type Mutation_RootInsert_Meeting_AttendeeArgs = {
  objects: Array<Meeting_Attendee_Insert_Input>;
  on_conflict?: InputMaybe<Meeting_Attendee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meeting_Attendee_OneArgs = {
  object: Meeting_Attendee_Insert_Input;
  on_conflict?: InputMaybe<Meeting_Attendee_On_Conflict>;
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
export type Mutation_RootInsert_Org_SubscriptionArgs = {
  objects: Array<Org_Subscription_Insert_Input>;
  on_conflict?: InputMaybe<Org_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Org_Subscription_OneArgs = {
  object: Org_Subscription_Insert_Input;
  on_conflict?: InputMaybe<Org_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoleArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_AiArgs = {
  objects: Array<Role_Ai_Insert_Input>;
  on_conflict?: InputMaybe<Role_Ai_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_Ai_OneArgs = {
  object: Role_Ai_Insert_Input;
  on_conflict?: InputMaybe<Role_Ai_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_OneArgs = {
  object: Role_Insert_Input;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subscription_Payment_StatusArgs = {
  objects: Array<Subscription_Payment_Status_Insert_Input>;
  on_conflict?: InputMaybe<Subscription_Payment_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subscription_Payment_Status_OneArgs = {
  object: Subscription_Payment_Status_Insert_Input;
  on_conflict?: InputMaybe<Subscription_Payment_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subscription_Plan_TypeArgs = {
  objects: Array<Subscription_Plan_Type_Insert_Input>;
  on_conflict?: InputMaybe<Subscription_Plan_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subscription_Plan_Type_OneArgs = {
  object: Subscription_Plan_Type_Insert_Input;
  on_conflict?: InputMaybe<Subscription_Plan_Type_On_Conflict>;
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
export type Mutation_RootInsert_Thread_Activity_ReactionArgs = {
  objects: Array<Thread_Activity_Reaction_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Activity_Reaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Activity_Reaction_OneArgs = {
  object: Thread_Activity_Reaction_Insert_Input;
  on_conflict?: InputMaybe<Thread_Activity_Reaction_On_Conflict>;
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
export type Mutation_RootInsert_Thread_Extra_MemberArgs = {
  objects: Array<Thread_Extra_Member_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Extra_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Extra_Member_OneArgs = {
  object: Thread_Extra_Member_Insert_Input;
  on_conflict?: InputMaybe<Thread_Extra_Member_On_Conflict>;
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
export type Mutation_RootInsert_Thread_StatusArgs = {
  objects: Array<Thread_Status_Insert_Input>;
  on_conflict?: InputMaybe<Thread_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Thread_Status_OneArgs = {
  object: Thread_Status_Insert_Input;
  on_conflict?: InputMaybe<Thread_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_AppArgs = {
  objects: Array<User_App_Insert_Input>;
  on_conflict?: InputMaybe<User_App_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_App_OneArgs = {
  object: User_App_Insert_Input;
  on_conflict?: InputMaybe<User_App_On_Conflict>;
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
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  pk_columns: AuthRefreshTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenTypeArgs = {
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  pk_columns: AuthRefreshTokenTypes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenTypesArgs = {
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  where: AuthRefreshTokenTypes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensArgs = {
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
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
  _append?: InputMaybe<Files_Append_Input>;
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  _inc?: InputMaybe<Files_Inc_Input>;
  _prepend?: InputMaybe<Files_Prepend_Input>;
  _set?: InputMaybe<Files_Set_Input>;
  pk_columns: Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateFilesArgs = {
  _append?: InputMaybe<Files_Append_Input>;
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  _inc?: InputMaybe<Files_Inc_Input>;
  _prepend?: InputMaybe<Files_Prepend_Input>;
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
export type Mutation_RootUpdateVirusArgs = {
  _append?: InputMaybe<Virus_Append_Input>;
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  _set?: InputMaybe<Virus_Set_Input>;
  pk_columns: Virus_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateVirusesArgs = {
  _append?: InputMaybe<Virus_Append_Input>;
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  _set?: InputMaybe<Virus_Set_Input>;
  where: Virus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Api_KeyArgs = {
  _set?: InputMaybe<Api_Key_Set_Input>;
  where: Api_Key_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Api_Key_By_PkArgs = {
  _set?: InputMaybe<Api_Key_Set_Input>;
  pk_columns: Api_Key_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Api_Key_ManyArgs = {
  updates: Array<Api_Key_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_TypeArgs = {
  _set?: InputMaybe<App_Type_Set_Input>;
  where: App_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Type_By_PkArgs = {
  _set?: InputMaybe<App_Type_Set_Input>;
  pk_columns: App_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Type_ManyArgs = {
  updates: Array<App_Type_Updates>;
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
export type Mutation_RootUpdate_AuthRefreshTokenTypes_ManyArgs = {
  updates: Array<AuthRefreshTokenTypes_Updates>;
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
export type Mutation_RootUpdate_Circle_LinkArgs = {
  _set?: InputMaybe<Circle_Link_Set_Input>;
  where: Circle_Link_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Link_By_PkArgs = {
  _set?: InputMaybe<Circle_Link_Set_Input>;
  pk_columns: Circle_Link_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Link_ManyArgs = {
  updates: Array<Circle_Link_Updates>;
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
export type Mutation_RootUpdate_Circle_Participant_CacheArgs = {
  _set?: InputMaybe<Circle_Participant_Cache_Set_Input>;
  where: Circle_Participant_Cache_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Participant_Cache_By_PkArgs = {
  _set?: InputMaybe<Circle_Participant_Cache_Set_Input>;
  pk_columns: Circle_Participant_Cache_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Circle_Participant_Cache_ManyArgs = {
  updates: Array<Circle_Participant_Cache_Updates>;
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
export type Mutation_RootUpdate_Meeting_AttendeeArgs = {
  _set?: InputMaybe<Meeting_Attendee_Set_Input>;
  where: Meeting_Attendee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Attendee_By_PkArgs = {
  _set?: InputMaybe<Meeting_Attendee_Set_Input>;
  pk_columns: Meeting_Attendee_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meeting_Attendee_ManyArgs = {
  updates: Array<Meeting_Attendee_Updates>;
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
export type Mutation_RootUpdate_Org_SubscriptionArgs = {
  _set?: InputMaybe<Org_Subscription_Set_Input>;
  where: Org_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Org_Subscription_By_PkArgs = {
  _set?: InputMaybe<Org_Subscription_Set_Input>;
  pk_columns: Org_Subscription_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Org_Subscription_ManyArgs = {
  updates: Array<Org_Subscription_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RoleArgs = {
  _inc?: InputMaybe<Role_Inc_Input>;
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_AiArgs = {
  _set?: InputMaybe<Role_Ai_Set_Input>;
  where: Role_Ai_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_Ai_By_PkArgs = {
  _set?: InputMaybe<Role_Ai_Set_Input>;
  pk_columns: Role_Ai_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Role_Ai_ManyArgs = {
  updates: Array<Role_Ai_Updates>;
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
export type Mutation_RootUpdate_Subscription_Payment_StatusArgs = {
  _set?: InputMaybe<Subscription_Payment_Status_Set_Input>;
  where: Subscription_Payment_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Subscription_Payment_Status_By_PkArgs = {
  _set?: InputMaybe<Subscription_Payment_Status_Set_Input>;
  pk_columns: Subscription_Payment_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Subscription_Payment_Status_ManyArgs = {
  updates: Array<Subscription_Payment_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Subscription_Plan_TypeArgs = {
  _set?: InputMaybe<Subscription_Plan_Type_Set_Input>;
  where: Subscription_Plan_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Subscription_Plan_Type_By_PkArgs = {
  _set?: InputMaybe<Subscription_Plan_Type_Set_Input>;
  pk_columns: Subscription_Plan_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Subscription_Plan_Type_ManyArgs = {
  updates: Array<Subscription_Plan_Type_Updates>;
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
export type Mutation_RootUpdate_Thread_Activity_ReactionArgs = {
  _set?: InputMaybe<Thread_Activity_Reaction_Set_Input>;
  where: Thread_Activity_Reaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_Reaction_By_PkArgs = {
  _set?: InputMaybe<Thread_Activity_Reaction_Set_Input>;
  pk_columns: Thread_Activity_Reaction_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Activity_Reaction_ManyArgs = {
  updates: Array<Thread_Activity_Reaction_Updates>;
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
export type Mutation_RootUpdate_Thread_Extra_MemberArgs = {
  _set?: InputMaybe<Thread_Extra_Member_Set_Input>;
  where: Thread_Extra_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Extra_Member_By_PkArgs = {
  _set?: InputMaybe<Thread_Extra_Member_Set_Input>;
  pk_columns: Thread_Extra_Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Extra_Member_ManyArgs = {
  updates: Array<Thread_Extra_Member_Updates>;
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
export type Mutation_RootUpdate_Thread_StatusArgs = {
  _set?: InputMaybe<Thread_Status_Set_Input>;
  where: Thread_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Status_By_PkArgs = {
  _set?: InputMaybe<Thread_Status_Set_Input>;
  pk_columns: Thread_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Thread_Status_ManyArgs = {
  updates: Array<Thread_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_AppArgs = {
  _set?: InputMaybe<User_App_Set_Input>;
  where: User_App_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_App_By_PkArgs = {
  _set?: InputMaybe<User_App_Set_Input>;
  pk_columns: User_App_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_App_ManyArgs = {
  updates: Array<User_App_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Virus_ManyArgs = {
  updates: Array<Virus_Updates>;
};

/** columns and relationships of "news" */
export type News = {
  __typename?: 'news';
  /** An object relationship */
  circle?: Maybe<Circle>;
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  decision?: Maybe<Decision>;
  decisionId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  org?: Maybe<Org>;
  orgId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  thread?: Maybe<Thread>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "news" */
export type News_Aggregate = {
  __typename?: 'news_aggregate';
  aggregate?: Maybe<News_Aggregate_Fields>;
  nodes: Array<News>;
};

export type News_Aggregate_Bool_Exp = {
  count?: InputMaybe<News_Aggregate_Bool_Exp_Count>;
};

export type News_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<News_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<News_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "news" */
export type News_Aggregate_Fields = {
  __typename?: 'news_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<News_Max_Fields>;
  min?: Maybe<News_Min_Fields>;
};


/** aggregate fields of "news" */
export type News_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<News_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "news" */
export type News_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<News_Max_Order_By>;
  min?: InputMaybe<News_Min_Order_By>;
};

/** input type for inserting array relation for remote table "news" */
export type News_Arr_Rel_Insert_Input = {
  data: Array<News_Insert_Input>;
};

/** Boolean expression to filter rows from the table "news". All fields are combined with a logical 'AND'. */
export type News_Bool_Exp = {
  _and?: InputMaybe<Array<News_Bool_Exp>>;
  _not?: InputMaybe<News_Bool_Exp>;
  _or?: InputMaybe<Array<News_Bool_Exp>>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  decision?: InputMaybe<Decision_Bool_Exp>;
  decisionId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meeting?: InputMaybe<Meeting_Bool_Exp>;
  meetingId?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "news" */
export type News_Insert_Input = {
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  decision?: InputMaybe<Decision_Obj_Rel_Insert_Input>;
  decisionId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  meeting?: InputMaybe<Meeting_Obj_Rel_Insert_Input>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  thread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type News_Max_Fields = {
  __typename?: 'news_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  decisionId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "news" */
export type News_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  decisionId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type News_Min_Fields = {
  __typename?: 'news_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  decisionId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  meetingId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "news" */
export type News_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  decisionId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meetingId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "news". */
export type News_Order_By = {
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  decision?: InputMaybe<Decision_Order_By>;
  decisionId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meeting?: InputMaybe<Meeting_Order_By>;
  meetingId?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  thread?: InputMaybe<Thread_Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** select columns of table "news" */
export enum News_Select_Column {
  /** column name */
  CircleId = 'circleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DecisionId = 'decisionId',
  /** column name */
  Id = 'id',
  /** column name */
  MeetingId = 'meetingId',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ThreadId = 'threadId'
}

/** Streaming cursor of the table "news" */
export type News_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: News_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type News_Stream_Cursor_Value_Input = {
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  decisionId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  meetingId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
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
  /** filter the rows which have to be updated */
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
  defaultGraphView: Scalars['graph_views'];
  defaultWorkedMinPerWeek: Scalars['Int'];
  /** An array relationship */
  files: Array<Org_File>;
  /** An aggregate relationship */
  files_aggregate: Org_File_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  logs: Array<Log>;
  /** An aggregate relationship */
  logs_aggregate: Log_Aggregate;
  /** An array relationship */
  meeting_templates: Array<Meeting_Template>;
  /** An aggregate relationship */
  meeting_templates_aggregate: Meeting_Template_Aggregate;
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
  news: Array<News>;
  /** An aggregate relationship */
  news_aggregate: News_Aggregate;
  /** An object relationship */
  org_subscription?: Maybe<Org_Subscription>;
  protectGovernance: Scalars['Boolean'];
  /** An array relationship */
  roles: Array<Role>;
  /** An aggregate relationship */
  roles_aggregate: Role_Aggregate;
  shareMembers: Scalars['Boolean'];
  shareOrg: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
  /** An array relationship */
  task_views: Array<Task_View>;
  /** An aggregate relationship */
  task_views_aggregate: Task_View_Aggregate;
  /** An array relationship */
  tasks: Array<Task>;
  /** An aggregate relationship */
  tasks_aggregate: Task_Aggregate;
  /** An array relationship */
  threads: Array<Thread>;
  /** An aggregate relationship */
  threads_aggregate: Thread_Aggregate;
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
export type OrgLogsArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgLogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeeting_TemplatesArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgMeeting_Templates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Template_Order_By>>;
  where?: InputMaybe<Meeting_Template_Bool_Exp>;
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
export type OrgNewsArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgNews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
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


/** columns and relationships of "org" */
export type OrgTask_ViewsArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgTask_Views_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_View_Order_By>>;
  where?: InputMaybe<Task_View_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgTasksArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgTasks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Task_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Task_Order_By>>;
  where?: InputMaybe<Task_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgThreadsArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


/** columns and relationships of "org" */
export type OrgThreads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Order_By>>;
  where?: InputMaybe<Thread_Bool_Exp>;
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
  defaultGraphView?: InputMaybe<String_Comparison_Exp>;
  defaultWorkedMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
  files?: InputMaybe<Org_File_Bool_Exp>;
  files_aggregate?: InputMaybe<Org_File_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  logs?: InputMaybe<Log_Bool_Exp>;
  logs_aggregate?: InputMaybe<Log_Aggregate_Bool_Exp>;
  meeting_templates?: InputMaybe<Meeting_Template_Bool_Exp>;
  meeting_templates_aggregate?: InputMaybe<Meeting_Template_Aggregate_Bool_Exp>;
  meetings?: InputMaybe<Meeting_Bool_Exp>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Bool_Exp>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Bool_Exp>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Bool_Exp>;
  members?: InputMaybe<Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Member_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  news?: InputMaybe<News_Bool_Exp>;
  news_aggregate?: InputMaybe<News_Aggregate_Bool_Exp>;
  org_subscription?: InputMaybe<Org_Subscription_Bool_Exp>;
  protectGovernance?: InputMaybe<Boolean_Comparison_Exp>;
  roles?: InputMaybe<Role_Bool_Exp>;
  roles_aggregate?: InputMaybe<Role_Aggregate_Bool_Exp>;
  shareMembers?: InputMaybe<Boolean_Comparison_Exp>;
  shareOrg?: InputMaybe<Boolean_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  task_views?: InputMaybe<Task_View_Bool_Exp>;
  task_views_aggregate?: InputMaybe<Task_View_Aggregate_Bool_Exp>;
  tasks?: InputMaybe<Task_Bool_Exp>;
  tasks_aggregate?: InputMaybe<Task_Aggregate_Bool_Exp>;
  threads?: InputMaybe<Thread_Bool_Exp>;
  threads_aggregate?: InputMaybe<Thread_Aggregate_Bool_Exp>;
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
  /** filter the rows which have to be updated */
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
  defaultGraphView?: InputMaybe<Scalars['String']>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  files?: InputMaybe<Org_File_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  logs?: InputMaybe<Log_Arr_Rel_Insert_Input>;
  meeting_templates?: InputMaybe<Meeting_Template_Arr_Rel_Insert_Input>;
  meetings?: InputMaybe<Meeting_Arr_Rel_Insert_Input>;
  meetings_recurring?: InputMaybe<Meeting_Recurring_Arr_Rel_Insert_Input>;
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  news?: InputMaybe<News_Arr_Rel_Insert_Input>;
  org_subscription?: InputMaybe<Org_Subscription_Obj_Rel_Insert_Input>;
  protectGovernance?: InputMaybe<Scalars['Boolean']>;
  roles?: InputMaybe<Role_Arr_Rel_Insert_Input>;
  shareMembers?: InputMaybe<Scalars['Boolean']>;
  shareOrg?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  task_views?: InputMaybe<Task_View_Arr_Rel_Insert_Input>;
  tasks?: InputMaybe<Task_Arr_Rel_Insert_Input>;
  threads?: InputMaybe<Thread_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Org_Max_Fields = {
  __typename?: 'org_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultGraphView?: Maybe<Scalars['String']>;
  defaultWorkedMinPerWeek?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Org_Min_Fields = {
  __typename?: 'org_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultGraphView?: Maybe<Scalars['String']>;
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
  defaultGraphView?: InputMaybe<Order_By>;
  defaultWorkedMinPerWeek?: InputMaybe<Order_By>;
  files_aggregate?: InputMaybe<Org_File_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  logs_aggregate?: InputMaybe<Log_Aggregate_Order_By>;
  meeting_templates_aggregate?: InputMaybe<Meeting_Template_Aggregate_Order_By>;
  meetings_aggregate?: InputMaybe<Meeting_Aggregate_Order_By>;
  meetings_recurring_aggregate?: InputMaybe<Meeting_Recurring_Aggregate_Order_By>;
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  news_aggregate?: InputMaybe<News_Aggregate_Order_By>;
  org_subscription?: InputMaybe<Org_Subscription_Order_By>;
  protectGovernance?: InputMaybe<Order_By>;
  roles_aggregate?: InputMaybe<Role_Aggregate_Order_By>;
  shareMembers?: InputMaybe<Order_By>;
  shareOrg?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  task_views_aggregate?: InputMaybe<Task_View_Aggregate_Order_By>;
  tasks_aggregate?: InputMaybe<Task_Aggregate_Order_By>;
  threads_aggregate?: InputMaybe<Thread_Aggregate_Order_By>;
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
  DefaultGraphView = 'defaultGraphView',
  /** column name */
  DefaultWorkedMinPerWeek = 'defaultWorkedMinPerWeek',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProtectGovernance = 'protectGovernance',
  /** column name */
  ShareMembers = 'shareMembers',
  /** column name */
  ShareOrg = 'shareOrg',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "org" */
export type Org_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultGraphView?: InputMaybe<Scalars['String']>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  protectGovernance?: InputMaybe<Scalars['Boolean']>;
  shareMembers?: InputMaybe<Scalars['Boolean']>;
  shareOrg?: InputMaybe<Scalars['Boolean']>;
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
  defaultGraphView?: InputMaybe<Scalars['String']>;
  defaultWorkedMinPerWeek?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  protectGovernance?: InputMaybe<Scalars['Boolean']>;
  shareMembers?: InputMaybe<Scalars['Boolean']>;
  shareOrg?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Abonnement lié à une organisation */
export type Org_Subscription = {
  __typename?: 'org_subscription';
  id: Scalars['uuid'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  status: Subscription_Payment_Status_Enum;
  stripeCustomerId: Scalars['String'];
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  type: Subscription_Plan_Type_Enum;
};

/** aggregated selection of "org_subscription" */
export type Org_Subscription_Aggregate = {
  __typename?: 'org_subscription_aggregate';
  aggregate?: Maybe<Org_Subscription_Aggregate_Fields>;
  nodes: Array<Org_Subscription>;
};

/** aggregate fields of "org_subscription" */
export type Org_Subscription_Aggregate_Fields = {
  __typename?: 'org_subscription_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Org_Subscription_Max_Fields>;
  min?: Maybe<Org_Subscription_Min_Fields>;
};


/** aggregate fields of "org_subscription" */
export type Org_Subscription_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Org_Subscription_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "org_subscription". All fields are combined with a logical 'AND'. */
export type Org_Subscription_Bool_Exp = {
  _and?: InputMaybe<Array<Org_Subscription_Bool_Exp>>;
  _not?: InputMaybe<Org_Subscription_Bool_Exp>;
  _or?: InputMaybe<Array<Org_Subscription_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Subscription_Payment_Status_Enum_Comparison_Exp>;
  stripeCustomerId?: InputMaybe<String_Comparison_Exp>;
  stripeSubscriptionId?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Subscription_Plan_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "org_subscription" */
export enum Org_Subscription_Constraint {
  /** unique or primary key constraint on columns "orgId" */
  OrgSubscriptionOrgIdKey = 'org_subscription_orgId_key',
  /** unique or primary key constraint on columns "id" */
  OrgSubscriptionPkey = 'org_subscription_pkey',
  /** unique or primary key constraint on columns "stripeCustomerId" */
  OrgSubscriptionStripeCustomerIdKey = 'org_subscription_stripeCustomerId_key',
  /** unique or primary key constraint on columns "stripeSubscriptionId" */
  OrgSubscriptionStripeSubscriptionIdKey = 'org_subscription_stripeSubscriptionId_key'
}

/** input type for inserting data into table "org_subscription" */
export type Org_Subscription_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Subscription_Payment_Status_Enum>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Subscription_Plan_Type_Enum>;
};

/** aggregate max on columns */
export type Org_Subscription_Max_Fields = {
  __typename?: 'org_subscription_max_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Org_Subscription_Min_Fields = {
  __typename?: 'org_subscription_min_fields';
  id?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "org_subscription" */
export type Org_Subscription_Mutation_Response = {
  __typename?: 'org_subscription_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Org_Subscription>;
};

/** input type for inserting object relation for remote table "org_subscription" */
export type Org_Subscription_Obj_Rel_Insert_Input = {
  data: Org_Subscription_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Org_Subscription_On_Conflict>;
};

/** on_conflict condition type for table "org_subscription" */
export type Org_Subscription_On_Conflict = {
  constraint: Org_Subscription_Constraint;
  update_columns?: Array<Org_Subscription_Update_Column>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
};

/** Ordering options when selecting data from "org_subscription". */
export type Org_Subscription_Order_By = {
  id?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  stripeCustomerId?: InputMaybe<Order_By>;
  stripeSubscriptionId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: org_subscription */
export type Org_Subscription_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "org_subscription" */
export enum Org_Subscription_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Status = 'status',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "org_subscription" */
export type Org_Subscription_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Subscription_Payment_Status_Enum>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Subscription_Plan_Type_Enum>;
};

/** Streaming cursor of the table "org_subscription" */
export type Org_Subscription_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Org_Subscription_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Org_Subscription_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Subscription_Payment_Status_Enum>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Subscription_Plan_Type_Enum>;
};

/** update columns of table "org_subscription" */
export enum Org_Subscription_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  Status = 'status',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  Type = 'type'
}

export type Org_Subscription_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Org_Subscription_Set_Input>;
  /** filter the rows which have to be updated */
  where: Org_Subscription_Bool_Exp;
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
  DefaultGraphView = 'defaultGraphView',
  /** column name */
  DefaultWorkedMinPerWeek = 'defaultWorkedMinPerWeek',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProtectGovernance = 'protectGovernance',
  /** column name */
  ShareMembers = 'shareMembers',
  /** column name */
  ShareOrg = 'shareOrg',
  /** column name */
  Slug = 'slug'
}

export type Org_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Org_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Org_Set_Input>;
  /** filter the rows which have to be updated */
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
  /** fetch data from the table: "api_key" */
  api_key: Array<Api_Key>;
  /** fetch aggregated fields from the table: "api_key" */
  api_key_aggregate: Api_Key_Aggregate;
  /** fetch data from the table: "api_key" using primary key columns */
  api_key_by_pk?: Maybe<Api_Key>;
  /** fetch data from the table: "app_type" */
  app_type: Array<App_Type>;
  /** fetch aggregated fields from the table: "app_type" */
  app_type_aggregate: App_Type_Aggregate;
  /** fetch data from the table: "app_type" using primary key columns */
  app_type_by_pk?: Maybe<App_Type>;
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
  /** fetch data from the table: "auth.refresh_token_types" using primary key columns */
  authRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** fetch data from the table: "auth.refresh_token_types" */
  authRefreshTokenTypes: Array<AuthRefreshTokenTypes>;
  /** fetch aggregated fields from the table: "auth.refresh_token_types" */
  authRefreshTokenTypesAggregate: AuthRefreshTokenTypes_Aggregate;
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
  /** fetch data from the table: "circle_leader" */
  circle_leader: Array<Circle_Leader>;
  /** fetch aggregated fields from the table: "circle_leader" */
  circle_leader_aggregate: Circle_Leader_Aggregate;
  /** fetch data from the table: "circle_link" */
  circle_link: Array<Circle_Link>;
  /** fetch aggregated fields from the table: "circle_link" */
  circle_link_aggregate: Circle_Link_Aggregate;
  /** fetch data from the table: "circle_link" using primary key columns */
  circle_link_by_pk?: Maybe<Circle_Link>;
  /** fetch data from the table: "circle_member" */
  circle_member: Array<Circle_Member>;
  /** fetch aggregated fields from the table: "circle_member" */
  circle_member_aggregate: Circle_Member_Aggregate;
  /** fetch data from the table: "circle_member" using primary key columns */
  circle_member_by_pk?: Maybe<Circle_Member>;
  /** fetch data from the table: "circle_participant" */
  circle_participant: Array<Circle_Participant>;
  /** fetch aggregated fields from the table: "circle_participant" */
  circle_participant_aggregate: Circle_Participant_Aggregate;
  /** fetch data from the table: "circle_participant_cache" */
  circle_participant_cache: Array<Circle_Participant_Cache>;
  /** fetch aggregated fields from the table: "circle_participant_cache" */
  circle_participant_cache_aggregate: Circle_Participant_Cache_Aggregate;
  /** fetch data from the table: "circle_participant_cache" using primary key columns */
  circle_participant_cache_by_pk?: Maybe<Circle_Participant_Cache>;
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
  /** fetch data from the table: "meeting_attendee" */
  meeting_attendee: Array<Meeting_Attendee>;
  /** fetch aggregated fields from the table: "meeting_attendee" */
  meeting_attendee_aggregate: Meeting_Attendee_Aggregate;
  /** fetch data from the table: "meeting_attendee" using primary key columns */
  meeting_attendee_by_pk?: Maybe<Meeting_Attendee>;
  /** fetch data from the table: "meeting" using primary key columns */
  meeting_by_pk?: Maybe<Meeting>;
  /** fetch data from the table: "meeting_recurring" */
  meeting_recurring: Array<Meeting_Recurring>;
  /** fetch aggregated fields from the table: "meeting_recurring" */
  meeting_recurring_aggregate: Meeting_Recurring_Aggregate;
  /** fetch data from the table: "meeting_recurring" using primary key columns */
  meeting_recurring_by_pk?: Maybe<Meeting_Recurring>;
  /** fetch data from the table: "meeting_stats" */
  meeting_stats: Array<Meeting_Stats>;
  /** fetch aggregated fields from the table: "meeting_stats" */
  meeting_stats_aggregate: Meeting_Stats_Aggregate;
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
  /** An array relationship */
  news: Array<News>;
  /** An aggregate relationship */
  news_aggregate: News_Aggregate;
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
  /** fetch data from the table: "org_subscription" */
  org_subscription: Array<Org_Subscription>;
  /** fetch aggregated fields from the table: "org_subscription" */
  org_subscription_aggregate: Org_Subscription_Aggregate;
  /** fetch data from the table: "org_subscription" using primary key columns */
  org_subscription_by_pk?: Maybe<Org_Subscription>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role_ai" */
  role_ai: Array<Role_Ai>;
  /** fetch aggregated fields from the table: "role_ai" */
  role_ai_aggregate: Role_Ai_Aggregate;
  /** fetch data from the table: "role_ai" using primary key columns */
  role_ai_by_pk?: Maybe<Role_Ai>;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table: "subscription_payment_status" */
  subscription_payment_status: Array<Subscription_Payment_Status>;
  /** fetch aggregated fields from the table: "subscription_payment_status" */
  subscription_payment_status_aggregate: Subscription_Payment_Status_Aggregate;
  /** fetch data from the table: "subscription_payment_status" using primary key columns */
  subscription_payment_status_by_pk?: Maybe<Subscription_Payment_Status>;
  /** fetch data from the table: "subscription_plan_type" */
  subscription_plan_type: Array<Subscription_Plan_Type>;
  /** fetch aggregated fields from the table: "subscription_plan_type" */
  subscription_plan_type_aggregate: Subscription_Plan_Type_Aggregate;
  /** fetch data from the table: "subscription_plan_type" using primary key columns */
  subscription_plan_type_by_pk?: Maybe<Subscription_Plan_Type>;
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
  /** fetch data from the table: "thread_activity_reaction" */
  thread_activity_reaction: Array<Thread_Activity_Reaction>;
  /** fetch aggregated fields from the table: "thread_activity_reaction" */
  thread_activity_reaction_aggregate: Thread_Activity_Reaction_Aggregate;
  /** fetch data from the table: "thread_activity_reaction" using primary key columns */
  thread_activity_reaction_by_pk?: Maybe<Thread_Activity_Reaction>;
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
  /** fetch data from the table: "thread_extra_member" */
  thread_extra_member: Array<Thread_Extra_Member>;
  /** fetch aggregated fields from the table: "thread_extra_member" */
  thread_extra_member_aggregate: Thread_Extra_Member_Aggregate;
  /** fetch data from the table: "thread_extra_member" using primary key columns */
  thread_extra_member_by_pk?: Maybe<Thread_Extra_Member>;
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
  /** fetch data from the table: "thread_status" */
  thread_status: Array<Thread_Status>;
  /** fetch aggregated fields from the table: "thread_status" */
  thread_status_aggregate: Thread_Status_Aggregate;
  /** fetch data from the table: "thread_status" using primary key columns */
  thread_status_by_pk?: Maybe<Thread_Status>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "user_app" */
  user_app: Array<User_App>;
  /** fetch aggregated fields from the table: "user_app" */
  user_app_aggregate: User_App_Aggregate;
  /** fetch data from the table: "user_app" using primary key columns */
  user_app_by_pk?: Maybe<User_App>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
  /** fetch data from the table: "storage.virus" using primary key columns */
  virus?: Maybe<Virus>;
  /** fetch data from the table: "storage.virus" */
  viruses: Array<Virus>;
  /** fetch aggregated fields from the table: "storage.virus" */
  virusesAggregate: Virus_Aggregate;
};


export type Query_RootApi_KeyArgs = {
  distinct_on?: InputMaybe<Array<Api_Key_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Api_Key_Order_By>>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};


export type Query_RootApi_Key_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Key_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Api_Key_Order_By>>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};


export type Query_RootApi_Key_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_TypeArgs = {
  distinct_on?: InputMaybe<Array<App_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<App_Type_Order_By>>;
  where?: InputMaybe<App_Type_Bool_Exp>;
};


export type Query_RootApp_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<App_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<App_Type_Order_By>>;
  where?: InputMaybe<App_Type_Bool_Exp>;
};


export type Query_RootApp_Type_By_PkArgs = {
  value: Scalars['String'];
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
  id: Scalars['uuid'];
};


export type Query_RootAuthRefreshTokenTypeArgs = {
  value: Scalars['String'];
};


export type Query_RootAuthRefreshTokenTypesArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Query_RootAuthRefreshTokenTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
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


export type Query_RootCircle_LeaderArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


export type Query_RootCircle_Leader_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


export type Query_RootCircle_LinkArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


export type Query_RootCircle_Link_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


export type Query_RootCircle_Link_By_PkArgs = {
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


export type Query_RootCircle_ParticipantArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Order_By>>;
  where?: InputMaybe<Circle_Participant_Bool_Exp>;
};


export type Query_RootCircle_Participant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Order_By>>;
  where?: InputMaybe<Circle_Participant_Bool_Exp>;
};


export type Query_RootCircle_Participant_CacheArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


export type Query_RootCircle_Participant_Cache_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


export type Query_RootCircle_Participant_Cache_By_PkArgs = {
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


export type Query_RootMeeting_AttendeeArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


export type Query_RootMeeting_Attendee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


export type Query_RootMeeting_Attendee_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Query_RootMeeting_StatsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Stats_Order_By>>;
  where?: InputMaybe<Meeting_Stats_Bool_Exp>;
};


export type Query_RootMeeting_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Stats_Order_By>>;
  where?: InputMaybe<Meeting_Stats_Bool_Exp>;
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


export type Query_RootNewsArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
};


export type Query_RootNews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
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


export type Query_RootOrg_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Org_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Subscription_Order_By>>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
};


export type Query_RootOrg_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Subscription_Order_By>>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
};


export type Query_RootOrg_Subscription_By_PkArgs = {
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


export type Query_RootRole_AiArgs = {
  distinct_on?: InputMaybe<Array<Role_Ai_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Ai_Order_By>>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};


export type Query_RootRole_Ai_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Ai_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Ai_Order_By>>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};


export type Query_RootRole_Ai_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRole_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSubscription_Payment_StatusArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Payment_Status_Order_By>>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};


export type Query_RootSubscription_Payment_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Payment_Status_Order_By>>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};


export type Query_RootSubscription_Payment_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootSubscription_Plan_TypeArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Plan_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Plan_Type_Order_By>>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
};


export type Query_RootSubscription_Plan_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Plan_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Plan_Type_Order_By>>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
};


export type Query_RootSubscription_Plan_Type_By_PkArgs = {
  value: Scalars['String'];
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


export type Query_RootThread_Activity_ReactionArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};


export type Query_RootThread_Activity_Reaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};


export type Query_RootThread_Activity_Reaction_By_PkArgs = {
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


export type Query_RootThread_Extra_MemberArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


export type Query_RootThread_Extra_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


export type Query_RootThread_Extra_Member_By_PkArgs = {
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


export type Query_RootThread_StatusArgs = {
  distinct_on?: InputMaybe<Array<Thread_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Status_Order_By>>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};


export type Query_RootThread_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Status_Order_By>>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};


export type Query_RootThread_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUser_AppArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


export type Query_RootUser_App_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


export type Query_RootUser_App_By_PkArgs = {
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


export type Query_RootVirusArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVirusesArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Query_RootVirusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};

/** columns and relationships of "role" */
export type Role = {
  __typename?: 'role';
  accountabilities: Scalars['String'];
  archived: Scalars['Boolean'];
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
  name: Scalars['String'];
  notes: Scalars['String'];
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  parentLink: Scalars['Boolean'];
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

/** Role properties generated by AI */
export type Role_Ai = {
  __typename?: 'role_ai';
  accountabilities: Scalars['String'];
  checklist: Scalars['String'];
  domain: Scalars['String'];
  id: Scalars['uuid'];
  indicators: Scalars['String'];
  lang: Scalars['String'];
  name: Scalars['String'];
  notes: Scalars['String'];
  purpose: Scalars['String'];
};

/** aggregated selection of "role_ai" */
export type Role_Ai_Aggregate = {
  __typename?: 'role_ai_aggregate';
  aggregate?: Maybe<Role_Ai_Aggregate_Fields>;
  nodes: Array<Role_Ai>;
};

/** aggregate fields of "role_ai" */
export type Role_Ai_Aggregate_Fields = {
  __typename?: 'role_ai_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Role_Ai_Max_Fields>;
  min?: Maybe<Role_Ai_Min_Fields>;
};


/** aggregate fields of "role_ai" */
export type Role_Ai_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Ai_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "role_ai". All fields are combined with a logical 'AND'. */
export type Role_Ai_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Ai_Bool_Exp>>;
  _not?: InputMaybe<Role_Ai_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Ai_Bool_Exp>>;
  accountabilities?: InputMaybe<String_Comparison_Exp>;
  checklist?: InputMaybe<String_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  indicators?: InputMaybe<String_Comparison_Exp>;
  lang?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  purpose?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "role_ai" */
export enum Role_Ai_Constraint {
  /** unique or primary key constraint on columns "lang", "name" */
  RoleAiNameLangKey = 'role_ai_name_lang_key',
  /** unique or primary key constraint on columns "id" */
  RoleAiPkey = 'role_ai_pkey'
}

/** input type for inserting data into table "role_ai" */
export type Role_Ai_Insert_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  checklist?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Role_Ai_Max_Fields = {
  __typename?: 'role_ai_max_fields';
  accountabilities?: Maybe<Scalars['String']>;
  checklist?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  indicators?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  purpose?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Role_Ai_Min_Fields = {
  __typename?: 'role_ai_min_fields';
  accountabilities?: Maybe<Scalars['String']>;
  checklist?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  indicators?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  purpose?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "role_ai" */
export type Role_Ai_Mutation_Response = {
  __typename?: 'role_ai_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Role_Ai>;
};

/** on_conflict condition type for table "role_ai" */
export type Role_Ai_On_Conflict = {
  constraint: Role_Ai_Constraint;
  update_columns?: Array<Role_Ai_Update_Column>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};

/** Ordering options when selecting data from "role_ai". */
export type Role_Ai_Order_By = {
  accountabilities?: InputMaybe<Order_By>;
  checklist?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indicators?: InputMaybe<Order_By>;
  lang?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  purpose?: InputMaybe<Order_By>;
};

/** primary key columns input for table: role_ai */
export type Role_Ai_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "role_ai" */
export enum Role_Ai_Select_Column {
  /** column name */
  Accountabilities = 'accountabilities',
  /** column name */
  Checklist = 'checklist',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Indicators = 'indicators',
  /** column name */
  Lang = 'lang',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Purpose = 'purpose'
}

/** input type for updating data in table "role_ai" */
export type Role_Ai_Set_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  checklist?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "role_ai" */
export type Role_Ai_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Role_Ai_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Ai_Stream_Cursor_Value_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  checklist?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<Scalars['String']>;
};

/** update columns of table "role_ai" */
export enum Role_Ai_Update_Column {
  /** column name */
  Accountabilities = 'accountabilities',
  /** column name */
  Checklist = 'checklist',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Indicators = 'indicators',
  /** column name */
  Lang = 'lang',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Purpose = 'purpose'
}

export type Role_Ai_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Role_Ai_Set_Input>;
  /** filter the rows which have to be updated */
  where: Role_Ai_Bool_Exp;
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
  base?: InputMaybe<Boolean_Comparison_Exp>;
  checklist?: InputMaybe<String_Comparison_Exp>;
  circles?: InputMaybe<Circle_Bool_Exp>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Bool_Exp>;
  colorHue?: InputMaybe<Smallint_Comparison_Exp>;
  defaultMinPerWeek?: InputMaybe<Int_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  indicators?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  parentLink?: InputMaybe<Boolean_Comparison_Exp>;
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
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  circles?: InputMaybe<Circle_Arr_Rel_Insert_Input>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parentLink?: InputMaybe<Scalars['Boolean']>;
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
  base?: InputMaybe<Order_By>;
  checklist?: InputMaybe<Order_By>;
  circles_aggregate?: InputMaybe<Circle_Aggregate_Order_By>;
  colorHue?: InputMaybe<Order_By>;
  defaultMinPerWeek?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indicators?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  parentLink?: InputMaybe<Order_By>;
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
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParentLink = 'parentLink',
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
  Base = 'base',
  /** column name */
  ParentLink = 'parentLink',
  /** column name */
  SingleMember = 'singleMember'
}

/** select "role_aggregate_bool_exp_bool_or_arguments_columns" columns of table "role" */
export enum Role_Select_Column_Role_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Base = 'base',
  /** column name */
  ParentLink = 'parentLink',
  /** column name */
  SingleMember = 'singleMember'
}

/** input type for updating data in table "role" */
export type Role_Set_Input = {
  accountabilities?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parentLink?: InputMaybe<Scalars['Boolean']>;
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
  base?: InputMaybe<Scalars['Boolean']>;
  checklist?: InputMaybe<Scalars['String']>;
  colorHue?: InputMaybe<Scalars['smallint']>;
  defaultMinPerWeek?: InputMaybe<Scalars['Int']>;
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  indicators?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  parentLink?: InputMaybe<Scalars['Boolean']>;
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
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  OrgId = 'orgId',
  /** column name */
  ParentLink = 'parentLink',
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
  /** filter the rows which have to be updated */
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

/** columns and relationships of "subscription_payment_status" */
export type Subscription_Payment_Status = {
  __typename?: 'subscription_payment_status';
  value: Scalars['String'];
};

/** aggregated selection of "subscription_payment_status" */
export type Subscription_Payment_Status_Aggregate = {
  __typename?: 'subscription_payment_status_aggregate';
  aggregate?: Maybe<Subscription_Payment_Status_Aggregate_Fields>;
  nodes: Array<Subscription_Payment_Status>;
};

/** aggregate fields of "subscription_payment_status" */
export type Subscription_Payment_Status_Aggregate_Fields = {
  __typename?: 'subscription_payment_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Subscription_Payment_Status_Max_Fields>;
  min?: Maybe<Subscription_Payment_Status_Min_Fields>;
};


/** aggregate fields of "subscription_payment_status" */
export type Subscription_Payment_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Subscription_Payment_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "subscription_payment_status". All fields are combined with a logical 'AND'. */
export type Subscription_Payment_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Subscription_Payment_Status_Bool_Exp>>;
  _not?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Subscription_Payment_Status_Bool_Exp>>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "subscription_payment_status" */
export enum Subscription_Payment_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  SubscriptionPaymentStatusPkey = 'subscription_payment_status_pkey'
}

export enum Subscription_Payment_Status_Enum {
  Active = 'active',
  Canceled = 'canceled',
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  PastDue = 'past_due',
  Paused = 'paused',
  Trialing = 'trialing',
  Unpaid = 'unpaid'
}

/** Boolean expression to compare columns of type "subscription_payment_status_enum". All fields are combined with logical 'AND'. */
export type Subscription_Payment_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Subscription_Payment_Status_Enum>;
  _in?: InputMaybe<Array<Subscription_Payment_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Subscription_Payment_Status_Enum>;
  _nin?: InputMaybe<Array<Subscription_Payment_Status_Enum>>;
};

/** input type for inserting data into table "subscription_payment_status" */
export type Subscription_Payment_Status_Insert_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Subscription_Payment_Status_Max_Fields = {
  __typename?: 'subscription_payment_status_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Subscription_Payment_Status_Min_Fields = {
  __typename?: 'subscription_payment_status_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "subscription_payment_status" */
export type Subscription_Payment_Status_Mutation_Response = {
  __typename?: 'subscription_payment_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Subscription_Payment_Status>;
};

/** on_conflict condition type for table "subscription_payment_status" */
export type Subscription_Payment_Status_On_Conflict = {
  constraint: Subscription_Payment_Status_Constraint;
  update_columns?: Array<Subscription_Payment_Status_Update_Column>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "subscription_payment_status". */
export type Subscription_Payment_Status_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: subscription_payment_status */
export type Subscription_Payment_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "subscription_payment_status" */
export enum Subscription_Payment_Status_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "subscription_payment_status" */
export type Subscription_Payment_Status_Set_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "subscription_payment_status" */
export type Subscription_Payment_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Subscription_Payment_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Subscription_Payment_Status_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "subscription_payment_status" */
export enum Subscription_Payment_Status_Update_Column {
  /** column name */
  Value = 'value'
}

export type Subscription_Payment_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Subscription_Payment_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Subscription_Payment_Status_Bool_Exp;
};

/** columns and relationships of "subscription_plan_type" */
export type Subscription_Plan_Type = {
  __typename?: 'subscription_plan_type';
  value: Scalars['String'];
};

/** aggregated selection of "subscription_plan_type" */
export type Subscription_Plan_Type_Aggregate = {
  __typename?: 'subscription_plan_type_aggregate';
  aggregate?: Maybe<Subscription_Plan_Type_Aggregate_Fields>;
  nodes: Array<Subscription_Plan_Type>;
};

/** aggregate fields of "subscription_plan_type" */
export type Subscription_Plan_Type_Aggregate_Fields = {
  __typename?: 'subscription_plan_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Subscription_Plan_Type_Max_Fields>;
  min?: Maybe<Subscription_Plan_Type_Min_Fields>;
};


/** aggregate fields of "subscription_plan_type" */
export type Subscription_Plan_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Subscription_Plan_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "subscription_plan_type". All fields are combined with a logical 'AND'. */
export type Subscription_Plan_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Subscription_Plan_Type_Bool_Exp>>;
  _not?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Subscription_Plan_Type_Bool_Exp>>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "subscription_plan_type" */
export enum Subscription_Plan_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  SubscriptionPlanTypePkey = 'subscription_plan_type_pkey'
}

export enum Subscription_Plan_Type_Enum {
  Business = 'Business',
  Startup = 'Startup'
}

/** Boolean expression to compare columns of type "subscription_plan_type_enum". All fields are combined with logical 'AND'. */
export type Subscription_Plan_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Subscription_Plan_Type_Enum>;
  _in?: InputMaybe<Array<Subscription_Plan_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Subscription_Plan_Type_Enum>;
  _nin?: InputMaybe<Array<Subscription_Plan_Type_Enum>>;
};

/** input type for inserting data into table "subscription_plan_type" */
export type Subscription_Plan_Type_Insert_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Subscription_Plan_Type_Max_Fields = {
  __typename?: 'subscription_plan_type_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Subscription_Plan_Type_Min_Fields = {
  __typename?: 'subscription_plan_type_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "subscription_plan_type" */
export type Subscription_Plan_Type_Mutation_Response = {
  __typename?: 'subscription_plan_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Subscription_Plan_Type>;
};

/** on_conflict condition type for table "subscription_plan_type" */
export type Subscription_Plan_Type_On_Conflict = {
  constraint: Subscription_Plan_Type_Constraint;
  update_columns?: Array<Subscription_Plan_Type_Update_Column>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "subscription_plan_type". */
export type Subscription_Plan_Type_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: subscription_plan_type */
export type Subscription_Plan_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "subscription_plan_type" */
export enum Subscription_Plan_Type_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "subscription_plan_type" */
export type Subscription_Plan_Type_Set_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "subscription_plan_type" */
export type Subscription_Plan_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Subscription_Plan_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Subscription_Plan_Type_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "subscription_plan_type" */
export enum Subscription_Plan_Type_Update_Column {
  /** column name */
  Value = 'value'
}

export type Subscription_Plan_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Subscription_Plan_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Subscription_Plan_Type_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "api_key" */
  api_key: Array<Api_Key>;
  /** fetch aggregated fields from the table: "api_key" */
  api_key_aggregate: Api_Key_Aggregate;
  /** fetch data from the table: "api_key" using primary key columns */
  api_key_by_pk?: Maybe<Api_Key>;
  /** fetch data from the table in a streaming manner: "api_key" */
  api_key_stream: Array<Api_Key>;
  /** fetch data from the table: "app_type" */
  app_type: Array<App_Type>;
  /** fetch aggregated fields from the table: "app_type" */
  app_type_aggregate: App_Type_Aggregate;
  /** fetch data from the table: "app_type" using primary key columns */
  app_type_by_pk?: Maybe<App_Type>;
  /** fetch data from the table in a streaming manner: "app_type" */
  app_type_stream: Array<App_Type>;
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
  /** fetch data from the table: "auth.refresh_token_types" using primary key columns */
  authRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** fetch data from the table: "auth.refresh_token_types" */
  authRefreshTokenTypes: Array<AuthRefreshTokenTypes>;
  /** fetch aggregated fields from the table: "auth.refresh_token_types" */
  authRefreshTokenTypesAggregate: AuthRefreshTokenTypes_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.refresh_token_types" */
  authRefreshTokenTypes_stream: Array<AuthRefreshTokenTypes>;
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
  /** fetch data from the table: "circle_leader" */
  circle_leader: Array<Circle_Leader>;
  /** fetch aggregated fields from the table: "circle_leader" */
  circle_leader_aggregate: Circle_Leader_Aggregate;
  /** fetch data from the table in a streaming manner: "circle_leader" */
  circle_leader_stream: Array<Circle_Leader>;
  /** fetch data from the table: "circle_link" */
  circle_link: Array<Circle_Link>;
  /** fetch aggregated fields from the table: "circle_link" */
  circle_link_aggregate: Circle_Link_Aggregate;
  /** fetch data from the table: "circle_link" using primary key columns */
  circle_link_by_pk?: Maybe<Circle_Link>;
  /** fetch data from the table in a streaming manner: "circle_link" */
  circle_link_stream: Array<Circle_Link>;
  /** fetch data from the table: "circle_member" */
  circle_member: Array<Circle_Member>;
  /** fetch aggregated fields from the table: "circle_member" */
  circle_member_aggregate: Circle_Member_Aggregate;
  /** fetch data from the table: "circle_member" using primary key columns */
  circle_member_by_pk?: Maybe<Circle_Member>;
  /** fetch data from the table in a streaming manner: "circle_member" */
  circle_member_stream: Array<Circle_Member>;
  /** fetch data from the table: "circle_participant" */
  circle_participant: Array<Circle_Participant>;
  /** fetch aggregated fields from the table: "circle_participant" */
  circle_participant_aggregate: Circle_Participant_Aggregate;
  /** fetch data from the table: "circle_participant_cache" */
  circle_participant_cache: Array<Circle_Participant_Cache>;
  /** fetch aggregated fields from the table: "circle_participant_cache" */
  circle_participant_cache_aggregate: Circle_Participant_Cache_Aggregate;
  /** fetch data from the table: "circle_participant_cache" using primary key columns */
  circle_participant_cache_by_pk?: Maybe<Circle_Participant_Cache>;
  /** fetch data from the table in a streaming manner: "circle_participant_cache" */
  circle_participant_cache_stream: Array<Circle_Participant_Cache>;
  /** fetch data from the table in a streaming manner: "circle_participant" */
  circle_participant_stream: Array<Circle_Participant>;
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
  /** fetch data from the table: "meeting_attendee" */
  meeting_attendee: Array<Meeting_Attendee>;
  /** fetch aggregated fields from the table: "meeting_attendee" */
  meeting_attendee_aggregate: Meeting_Attendee_Aggregate;
  /** fetch data from the table: "meeting_attendee" using primary key columns */
  meeting_attendee_by_pk?: Maybe<Meeting_Attendee>;
  /** fetch data from the table in a streaming manner: "meeting_attendee" */
  meeting_attendee_stream: Array<Meeting_Attendee>;
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
  /** fetch data from the table: "meeting_stats" */
  meeting_stats: Array<Meeting_Stats>;
  /** fetch aggregated fields from the table: "meeting_stats" */
  meeting_stats_aggregate: Meeting_Stats_Aggregate;
  /** fetch data from the table in a streaming manner: "meeting_stats" */
  meeting_stats_stream: Array<Meeting_Stats>;
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
  /** fetch data from the table in a streaming manner: "member" */
  member_stream: Array<Member>;
  /** An array relationship */
  news: Array<News>;
  /** An aggregate relationship */
  news_aggregate: News_Aggregate;
  /** fetch data from the table in a streaming manner: "news" */
  news_stream: Array<News>;
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
  /** fetch data from the table: "org_subscription" */
  org_subscription: Array<Org_Subscription>;
  /** fetch aggregated fields from the table: "org_subscription" */
  org_subscription_aggregate: Org_Subscription_Aggregate;
  /** fetch data from the table: "org_subscription" using primary key columns */
  org_subscription_by_pk?: Maybe<Org_Subscription>;
  /** fetch data from the table in a streaming manner: "org_subscription" */
  org_subscription_stream: Array<Org_Subscription>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role_ai" */
  role_ai: Array<Role_Ai>;
  /** fetch aggregated fields from the table: "role_ai" */
  role_ai_aggregate: Role_Ai_Aggregate;
  /** fetch data from the table: "role_ai" using primary key columns */
  role_ai_by_pk?: Maybe<Role_Ai>;
  /** fetch data from the table in a streaming manner: "role_ai" */
  role_ai_stream: Array<Role_Ai>;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "role" */
  role_stream: Array<Role>;
  /** fetch data from the table: "subscription_payment_status" */
  subscription_payment_status: Array<Subscription_Payment_Status>;
  /** fetch aggregated fields from the table: "subscription_payment_status" */
  subscription_payment_status_aggregate: Subscription_Payment_Status_Aggregate;
  /** fetch data from the table: "subscription_payment_status" using primary key columns */
  subscription_payment_status_by_pk?: Maybe<Subscription_Payment_Status>;
  /** fetch data from the table in a streaming manner: "subscription_payment_status" */
  subscription_payment_status_stream: Array<Subscription_Payment_Status>;
  /** fetch data from the table: "subscription_plan_type" */
  subscription_plan_type: Array<Subscription_Plan_Type>;
  /** fetch aggregated fields from the table: "subscription_plan_type" */
  subscription_plan_type_aggregate: Subscription_Plan_Type_Aggregate;
  /** fetch data from the table: "subscription_plan_type" using primary key columns */
  subscription_plan_type_by_pk?: Maybe<Subscription_Plan_Type>;
  /** fetch data from the table in a streaming manner: "subscription_plan_type" */
  subscription_plan_type_stream: Array<Subscription_Plan_Type>;
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
  /** fetch data from the table: "thread_activity_reaction" */
  thread_activity_reaction: Array<Thread_Activity_Reaction>;
  /** fetch aggregated fields from the table: "thread_activity_reaction" */
  thread_activity_reaction_aggregate: Thread_Activity_Reaction_Aggregate;
  /** fetch data from the table: "thread_activity_reaction" using primary key columns */
  thread_activity_reaction_by_pk?: Maybe<Thread_Activity_Reaction>;
  /** fetch data from the table in a streaming manner: "thread_activity_reaction" */
  thread_activity_reaction_stream: Array<Thread_Activity_Reaction>;
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
  /** fetch data from the table: "thread_extra_member" */
  thread_extra_member: Array<Thread_Extra_Member>;
  /** fetch aggregated fields from the table: "thread_extra_member" */
  thread_extra_member_aggregate: Thread_Extra_Member_Aggregate;
  /** fetch data from the table: "thread_extra_member" using primary key columns */
  thread_extra_member_by_pk?: Maybe<Thread_Extra_Member>;
  /** fetch data from the table in a streaming manner: "thread_extra_member" */
  thread_extra_member_stream: Array<Thread_Extra_Member>;
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
  /** fetch data from the table: "thread_status" */
  thread_status: Array<Thread_Status>;
  /** fetch aggregated fields from the table: "thread_status" */
  thread_status_aggregate: Thread_Status_Aggregate;
  /** fetch data from the table: "thread_status" using primary key columns */
  thread_status_by_pk?: Maybe<Thread_Status>;
  /** fetch data from the table in a streaming manner: "thread_status" */
  thread_status_stream: Array<Thread_Status>;
  /** fetch data from the table in a streaming manner: "thread" */
  thread_stream: Array<Thread>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "user_app" */
  user_app: Array<User_App>;
  /** fetch aggregated fields from the table: "user_app" */
  user_app_aggregate: User_App_Aggregate;
  /** fetch data from the table: "user_app" using primary key columns */
  user_app_by_pk?: Maybe<User_App>;
  /** fetch data from the table in a streaming manner: "user_app" */
  user_app_stream: Array<User_App>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.users" */
  users_stream: Array<Users>;
  /** fetch data from the table: "storage.virus" using primary key columns */
  virus?: Maybe<Virus>;
  /** fetch data from the table in a streaming manner: "storage.virus" */
  virus_stream: Array<Virus>;
  /** fetch data from the table: "storage.virus" */
  viruses: Array<Virus>;
  /** fetch aggregated fields from the table: "storage.virus" */
  virusesAggregate: Virus_Aggregate;
};


export type Subscription_RootApi_KeyArgs = {
  distinct_on?: InputMaybe<Array<Api_Key_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Api_Key_Order_By>>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};


export type Subscription_RootApi_Key_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Key_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Api_Key_Order_By>>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};


export type Subscription_RootApi_Key_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApi_Key_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Api_Key_Stream_Cursor_Input>>;
  where?: InputMaybe<Api_Key_Bool_Exp>;
};


export type Subscription_RootApp_TypeArgs = {
  distinct_on?: InputMaybe<Array<App_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<App_Type_Order_By>>;
  where?: InputMaybe<App_Type_Bool_Exp>;
};


export type Subscription_RootApp_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<App_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<App_Type_Order_By>>;
  where?: InputMaybe<App_Type_Bool_Exp>;
};


export type Subscription_RootApp_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootApp_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<App_Type_Bool_Exp>;
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
  id: Scalars['uuid'];
};


export type Subscription_RootAuthRefreshTokenTypeArgs = {
  value: Scalars['String'];
};


export type Subscription_RootAuthRefreshTokenTypesArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenTypes_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AuthRefreshTokenTypes_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
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


export type Subscription_RootCircle_LeaderArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


export type Subscription_RootCircle_Leader_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Leader_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Leader_Order_By>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


export type Subscription_RootCircle_Leader_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Leader_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Leader_Bool_Exp>;
};


export type Subscription_RootCircle_LinkArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


export type Subscription_RootCircle_Link_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Link_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Link_Order_By>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
};


export type Subscription_RootCircle_Link_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCircle_Link_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Link_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Link_Bool_Exp>;
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


export type Subscription_RootCircle_ParticipantArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Order_By>>;
  where?: InputMaybe<Circle_Participant_Bool_Exp>;
};


export type Subscription_RootCircle_Participant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Order_By>>;
  where?: InputMaybe<Circle_Participant_Bool_Exp>;
};


export type Subscription_RootCircle_Participant_CacheArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


export type Subscription_RootCircle_Participant_Cache_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circle_Participant_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Circle_Participant_Cache_Order_By>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


export type Subscription_RootCircle_Participant_Cache_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCircle_Participant_Cache_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Participant_Cache_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Participant_Cache_Bool_Exp>;
};


export type Subscription_RootCircle_Participant_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Circle_Participant_Stream_Cursor_Input>>;
  where?: InputMaybe<Circle_Participant_Bool_Exp>;
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


export type Subscription_RootMeeting_AttendeeArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


export type Subscription_RootMeeting_Attendee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Attendee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Attendee_Order_By>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
};


export type Subscription_RootMeeting_Attendee_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeeting_Attendee_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Attendee_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Attendee_Bool_Exp>;
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


export type Subscription_RootMeeting_StatsArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Stats_Order_By>>;
  where?: InputMaybe<Meeting_Stats_Bool_Exp>;
};


export type Subscription_RootMeeting_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meeting_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Meeting_Stats_Order_By>>;
  where?: InputMaybe<Meeting_Stats_Bool_Exp>;
};


export type Subscription_RootMeeting_Stats_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Meeting_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Meeting_Stats_Bool_Exp>;
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


export type Subscription_RootMember_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Member_Stream_Cursor_Input>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


export type Subscription_RootNewsArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
};


export type Subscription_RootNews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<News_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Order_By>>;
  where?: InputMaybe<News_Bool_Exp>;
};


export type Subscription_RootNews_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<News_Stream_Cursor_Input>>;
  where?: InputMaybe<News_Bool_Exp>;
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


export type Subscription_RootOrg_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Org_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Subscription_Order_By>>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
};


export type Subscription_RootOrg_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Org_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Org_Subscription_Order_By>>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
};


export type Subscription_RootOrg_Subscription_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrg_Subscription_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Org_Subscription_Stream_Cursor_Input>>;
  where?: InputMaybe<Org_Subscription_Bool_Exp>;
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


export type Subscription_RootRole_AiArgs = {
  distinct_on?: InputMaybe<Array<Role_Ai_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Ai_Order_By>>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};


export type Subscription_RootRole_Ai_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Ai_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Ai_Order_By>>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};


export type Subscription_RootRole_Ai_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRole_Ai_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Role_Ai_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Ai_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootSubscription_Payment_StatusArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Payment_Status_Order_By>>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};


export type Subscription_RootSubscription_Payment_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Payment_Status_Order_By>>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};


export type Subscription_RootSubscription_Payment_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootSubscription_Payment_Status_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Subscription_Payment_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Subscription_Payment_Status_Bool_Exp>;
};


export type Subscription_RootSubscription_Plan_TypeArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Plan_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Plan_Type_Order_By>>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
};


export type Subscription_RootSubscription_Plan_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subscription_Plan_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscription_Plan_Type_Order_By>>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
};


export type Subscription_RootSubscription_Plan_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootSubscription_Plan_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Subscription_Plan_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Subscription_Plan_Type_Bool_Exp>;
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


export type Subscription_RootThread_Activity_ReactionArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};


export type Subscription_RootThread_Activity_Reaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};


export type Subscription_RootThread_Activity_Reaction_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Activity_Reaction_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Activity_Reaction_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
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


export type Subscription_RootThread_Extra_MemberArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


export type Subscription_RootThread_Extra_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


export type Subscription_RootThread_Extra_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThread_Extra_Member_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Extra_Member_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
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


export type Subscription_RootThread_StatusArgs = {
  distinct_on?: InputMaybe<Array<Thread_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Status_Order_By>>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};


export type Subscription_RootThread_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Status_Order_By>>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};


export type Subscription_RootThread_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootThread_Status_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};


export type Subscription_RootThread_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Thread_Stream_Cursor_Input>>;
  where?: InputMaybe<Thread_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_AppArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


export type Subscription_RootUser_App_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


export type Subscription_RootUser_App_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_App_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_App_Stream_Cursor_Input>>;
  where?: InputMaybe<User_App_Bool_Exp>;
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


export type Subscription_RootVirusArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVirus_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Virus_Stream_Cursor_Input>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Subscription_RootVirusesArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Subscription_RootVirusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
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
  /** An array relationship */
  logs: Array<Log>;
  /** An aggregate relationship */
  logs_aggregate: Log_Aggregate;
  /** An object relationship */
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  private: Scalars['Boolean'];
  status: Task_Status_Enum;
  title: Scalars['String'];
};


/** columns and relationships of "task" */
export type TaskLogsArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


/** columns and relationships of "task" */
export type TaskLogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};

/** aggregated selection of "task" */
export type Task_Aggregate = {
  __typename?: 'task_aggregate';
  aggregate?: Maybe<Task_Aggregate_Fields>;
  nodes: Array<Task>;
};

export type Task_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Task_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Task_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Task_Aggregate_Bool_Exp_Count>;
};

export type Task_Aggregate_Bool_Exp_Bool_And = {
  arguments: Task_Select_Column_Task_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Task_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Task_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Task_Select_Column_Task_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Task_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Task_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Task_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Task_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "task" */
export type Task_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Task_Max_Order_By>;
  min?: InputMaybe<Task_Min_Order_By>;
};

/** input type for inserting array relation for remote table "task" */
export type Task_Arr_Rel_Insert_Input = {
  data: Array<Task_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Task_On_Conflict>;
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
  logs?: InputMaybe<Log_Bool_Exp>;
  logs_aggregate?: InputMaybe<Log_Aggregate_Bool_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  private?: InputMaybe<Boolean_Comparison_Exp>;
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
  logs?: InputMaybe<Log_Arr_Rel_Insert_Input>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
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

/** order by max() on columns of table "task" */
export type Task_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  dueDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
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

/** order by min() on columns of table "task" */
export type Task_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  dueDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "task" */
export type Task_Mutation_Response = {
  __typename?: 'task_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Task>;
};

/** input type for inserting object relation for remote table "task" */
export type Task_Obj_Rel_Insert_Input = {
  data: Task_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Task_On_Conflict>;
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
  logs_aggregate?: InputMaybe<Log_Aggregate_Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  private?: InputMaybe<Order_By>;
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
  Private = 'private',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

/** select "task_aggregate_bool_exp_bool_and_arguments_columns" columns of table "task" */
export enum Task_Select_Column_Task_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
}

/** select "task_aggregate_bool_exp_bool_or_arguments_columns" columns of table "task" */
export enum Task_Select_Column_Task_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
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
  private?: InputMaybe<Scalars['Boolean']>;
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
  /** filter the rows which have to be updated */
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
  private?: InputMaybe<Scalars['Boolean']>;
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
  Private = 'private',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

export type Task_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Task_Set_Input>;
  /** filter the rows which have to be updated */
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
  tasksIds: Array<Scalars['uuid']>;
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

export type Task_View_Aggregate_Bool_Exp = {
  count?: InputMaybe<Task_View_Aggregate_Bool_Exp_Count>;
};

export type Task_View_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Task_View_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Task_View_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "task_view" */
export type Task_View_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Task_View_Max_Order_By>;
  min?: InputMaybe<Task_View_Min_Order_By>;
};

/** input type for inserting array relation for remote table "task_view" */
export type Task_View_Arr_Rel_Insert_Input = {
  data: Array<Task_View_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Task_View_On_Conflict>;
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
  /** unique or primary key constraint on columns "orgId", "key" */
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

/** order by max() on columns of table "task_view" */
export type Task_View_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Task_View_Min_Fields = {
  __typename?: 'task_view_min_fields';
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "task_view" */
export type Task_View_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
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
  /** filter the rows which have to be updated */
  where: Task_View_Bool_Exp;
};

/** columns and relationships of "thread" */
export type Thread = {
  __typename?: 'thread';
  /** An array relationship */
  activities: Array<Thread_Activity>;
  /** An aggregate relationship */
  activities_aggregate: Thread_Activity_Aggregate;
  archived: Scalars['Boolean'];
  /** An object relationship */
  circle: Circle;
  circleId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  extra_members: Array<Thread_Extra_Member>;
  /** An aggregate relationship */
  extra_members_aggregate: Thread_Extra_Member_Aggregate;
  id: Scalars['uuid'];
  /** An object relationship */
  initiatorMember: Member;
  initiatorMemberId: Scalars['uuid'];
  /** An array relationship */
  logs: Array<Log>;
  /** An aggregate relationship */
  logs_aggregate: Log_Aggregate;
  /** An array relationship */
  member_status: Array<Thread_Member_Status>;
  /** An aggregate relationship */
  member_status_aggregate: Thread_Member_Status_Aggregate;
  /** An object relationship */
  org: Org;
  orgId: Scalars['uuid'];
  private: Scalars['Boolean'];
  status: Thread_Status_Enum;
  title: Scalars['String'];
};


/** columns and relationships of "thread" */
export type ThreadActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadActivities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Order_By>>;
  where?: InputMaybe<Thread_Activity_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadExtra_MembersArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadExtra_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Extra_Member_Order_By>>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadLogsArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
};


/** columns and relationships of "thread" */
export type ThreadLogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Log_Order_By>>;
  where?: InputMaybe<Log_Bool_Exp>;
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

/** columns and relationships of "thread_activity" */
export type Thread_Activity = {
  __typename?: 'thread_activity';
  createdAt: Scalars['timestamptz'];
  data: Scalars['json'];
  id: Scalars['uuid'];
  /** An array relationship */
  reactions: Array<Thread_Activity_Reaction>;
  /** An aggregate relationship */
  reactions_aggregate: Thread_Activity_Reaction_Aggregate;
  /** An object relationship */
  refDecision?: Maybe<Decision>;
  refDecisionId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  refMeeting?: Maybe<Meeting>;
  refMeetingId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  refTask?: Maybe<Task>;
  refTaskId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  refThread?: Maybe<Thread>;
  refThreadId?: Maybe<Scalars['uuid']>;
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


/** columns and relationships of "thread_activity" */
export type Thread_ActivityReactionsArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};


/** columns and relationships of "thread_activity" */
export type Thread_ActivityReactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Thread_Activity_Reaction_Order_By>>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};

/** aggregated selection of "thread_activity" */
export type Thread_Activity_Aggregate = {
  __typename?: 'thread_activity_aggregate';
  aggregate?: Maybe<Thread_Activity_Aggregate_Fields>;
  nodes: Array<Thread_Activity>;
};

export type Thread_Activity_Aggregate_Bool_Exp = {
  count?: InputMaybe<Thread_Activity_Aggregate_Bool_Exp_Count>;
};

export type Thread_Activity_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Thread_Activity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Activity_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "thread_activity" */
export type Thread_Activity_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Thread_Activity_Max_Order_By>;
  min?: InputMaybe<Thread_Activity_Min_Order_By>;
};

/** input type for inserting array relation for remote table "thread_activity" */
export type Thread_Activity_Arr_Rel_Insert_Input = {
  data: Array<Thread_Activity_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_Activity_On_Conflict>;
};

/** Boolean expression to filter rows from the table "thread_activity". All fields are combined with a logical 'AND'. */
export type Thread_Activity_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Activity_Bool_Exp>>;
  _not?: InputMaybe<Thread_Activity_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Activity_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  reactions?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
  reactions_aggregate?: InputMaybe<Thread_Activity_Reaction_Aggregate_Bool_Exp>;
  refDecision?: InputMaybe<Decision_Bool_Exp>;
  refDecisionId?: InputMaybe<Uuid_Comparison_Exp>;
  refMeeting?: InputMaybe<Meeting_Bool_Exp>;
  refMeetingId?: InputMaybe<Uuid_Comparison_Exp>;
  refTask?: InputMaybe<Task_Bool_Exp>;
  refTaskId?: InputMaybe<Uuid_Comparison_Exp>;
  refThread?: InputMaybe<Thread_Bool_Exp>;
  refThreadId?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Thread_Activity_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_activity" */
export enum Thread_Activity_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadActivityPkey = 'thread_activity_pkey',
  /** unique or primary key constraint on columns "refMeetingId", "type", "threadId" */
  ThreadActivityThreadIdRefMeetingIdTypeKey = 'thread_activity_threadId_refMeetingId_type_key'
}

/** input type for inserting data into table "thread_activity" */
export type Thread_Activity_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['uuid']>;
  reactions?: InputMaybe<Thread_Activity_Reaction_Arr_Rel_Insert_Input>;
  refDecision?: InputMaybe<Decision_Obj_Rel_Insert_Input>;
  refDecisionId?: InputMaybe<Scalars['uuid']>;
  refMeeting?: InputMaybe<Meeting_Obj_Rel_Insert_Input>;
  refMeetingId?: InputMaybe<Scalars['uuid']>;
  refTask?: InputMaybe<Task_Obj_Rel_Insert_Input>;
  refTaskId?: InputMaybe<Scalars['uuid']>;
  refThread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  refThreadId?: InputMaybe<Scalars['uuid']>;
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
  refDecisionId?: Maybe<Scalars['uuid']>;
  refMeetingId?: Maybe<Scalars['uuid']>;
  refTaskId?: Maybe<Scalars['uuid']>;
  refThreadId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "thread_activity" */
export type Thread_Activity_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refDecisionId?: InputMaybe<Order_By>;
  refMeetingId?: InputMaybe<Order_By>;
  refTaskId?: InputMaybe<Order_By>;
  refThreadId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Thread_Activity_Min_Fields = {
  __typename?: 'thread_activity_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  refDecisionId?: Maybe<Scalars['uuid']>;
  refMeetingId?: Maybe<Scalars['uuid']>;
  refTaskId?: Maybe<Scalars['uuid']>;
  refThreadId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "thread_activity" */
export type Thread_Activity_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refDecisionId?: InputMaybe<Order_By>;
  refMeetingId?: InputMaybe<Order_By>;
  refTaskId?: InputMaybe<Order_By>;
  refThreadId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
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
  reactions_aggregate?: InputMaybe<Thread_Activity_Reaction_Aggregate_Order_By>;
  refDecision?: InputMaybe<Decision_Order_By>;
  refDecisionId?: InputMaybe<Order_By>;
  refMeeting?: InputMaybe<Meeting_Order_By>;
  refMeetingId?: InputMaybe<Order_By>;
  refTask?: InputMaybe<Task_Order_By>;
  refTaskId?: InputMaybe<Order_By>;
  refThread?: InputMaybe<Thread_Order_By>;
  refThreadId?: InputMaybe<Order_By>;
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

/** columns and relationships of "thread_activity_reaction" */
export type Thread_Activity_Reaction = {
  __typename?: 'thread_activity_reaction';
  /** An object relationship */
  activity: Thread_Activity;
  activityId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  shortcode: Scalars['String'];
  userId: Scalars['uuid'];
};

/** aggregated selection of "thread_activity_reaction" */
export type Thread_Activity_Reaction_Aggregate = {
  __typename?: 'thread_activity_reaction_aggregate';
  aggregate?: Maybe<Thread_Activity_Reaction_Aggregate_Fields>;
  nodes: Array<Thread_Activity_Reaction>;
};

export type Thread_Activity_Reaction_Aggregate_Bool_Exp = {
  count?: InputMaybe<Thread_Activity_Reaction_Aggregate_Bool_Exp_Count>;
};

export type Thread_Activity_Reaction_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "thread_activity_reaction" */
export type Thread_Activity_Reaction_Aggregate_Fields = {
  __typename?: 'thread_activity_reaction_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Activity_Reaction_Max_Fields>;
  min?: Maybe<Thread_Activity_Reaction_Min_Fields>;
};


/** aggregate fields of "thread_activity_reaction" */
export type Thread_Activity_Reaction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Activity_Reaction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Thread_Activity_Reaction_Max_Order_By>;
  min?: InputMaybe<Thread_Activity_Reaction_Min_Order_By>;
};

/** input type for inserting array relation for remote table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Arr_Rel_Insert_Input = {
  data: Array<Thread_Activity_Reaction_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_Activity_Reaction_On_Conflict>;
};

/** Boolean expression to filter rows from the table "thread_activity_reaction". All fields are combined with a logical 'AND'. */
export type Thread_Activity_Reaction_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Activity_Reaction_Bool_Exp>>;
  _not?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Activity_Reaction_Bool_Exp>>;
  activity?: InputMaybe<Thread_Activity_Bool_Exp>;
  activityId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  shortcode?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_activity_reaction" */
export enum Thread_Activity_Reaction_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadActivityReactionPkey = 'thread_activity_reaction_pkey'
}

/** input type for inserting data into table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Insert_Input = {
  activity?: InputMaybe<Thread_Activity_Obj_Rel_Insert_Input>;
  activityId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  shortcode?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Thread_Activity_Reaction_Max_Fields = {
  __typename?: 'thread_activity_reaction_max_fields';
  activityId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  shortcode?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Max_Order_By = {
  activityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shortcode?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Thread_Activity_Reaction_Min_Fields = {
  __typename?: 'thread_activity_reaction_min_fields';
  activityId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  shortcode?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Min_Order_By = {
  activityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shortcode?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Mutation_Response = {
  __typename?: 'thread_activity_reaction_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Activity_Reaction>;
};

/** on_conflict condition type for table "thread_activity_reaction" */
export type Thread_Activity_Reaction_On_Conflict = {
  constraint: Thread_Activity_Reaction_Constraint;
  update_columns?: Array<Thread_Activity_Reaction_Update_Column>;
  where?: InputMaybe<Thread_Activity_Reaction_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_activity_reaction". */
export type Thread_Activity_Reaction_Order_By = {
  activity?: InputMaybe<Thread_Activity_Order_By>;
  activityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shortcode?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_activity_reaction */
export type Thread_Activity_Reaction_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "thread_activity_reaction" */
export enum Thread_Activity_Reaction_Select_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Shortcode = 'shortcode',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  shortcode?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "thread_activity_reaction" */
export type Thread_Activity_Reaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Activity_Reaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Activity_Reaction_Stream_Cursor_Value_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  shortcode?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "thread_activity_reaction" */
export enum Thread_Activity_Reaction_Update_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Shortcode = 'shortcode',
  /** column name */
  UserId = 'userId'
}

export type Thread_Activity_Reaction_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Activity_Reaction_Set_Input>;
  /** filter the rows which have to be updated */
  where: Thread_Activity_Reaction_Bool_Exp;
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
  RefDecisionId = 'refDecisionId',
  /** column name */
  RefMeetingId = 'refMeetingId',
  /** column name */
  RefTaskId = 'refTaskId',
  /** column name */
  RefThreadId = 'refThreadId',
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
  refDecisionId?: InputMaybe<Scalars['uuid']>;
  refMeetingId?: InputMaybe<Scalars['uuid']>;
  refTaskId?: InputMaybe<Scalars['uuid']>;
  refThreadId?: InputMaybe<Scalars['uuid']>;
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
  refDecisionId?: InputMaybe<Scalars['uuid']>;
  refMeetingId?: InputMaybe<Scalars['uuid']>;
  refTaskId?: InputMaybe<Scalars['uuid']>;
  refThreadId?: InputMaybe<Scalars['uuid']>;
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
  ChangeStatus = 'ChangeStatus',
  Decision = 'Decision',
  Meeting = 'Meeting',
  MeetingNote = 'MeetingNote',
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
  /** filter the rows which have to be updated */
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
  RefDecisionId = 'refDecisionId',
  /** column name */
  RefMeetingId = 'refMeetingId',
  /** column name */
  RefTaskId = 'refTaskId',
  /** column name */
  RefThreadId = 'refThreadId',
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
  /** filter the rows which have to be updated */
  where: Thread_Activity_Bool_Exp;
};

/** aggregated selection of "thread" */
export type Thread_Aggregate = {
  __typename?: 'thread_aggregate';
  aggregate?: Maybe<Thread_Aggregate_Fields>;
  nodes: Array<Thread>;
};

export type Thread_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Thread_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Thread_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Thread_Aggregate_Bool_Exp_Count>;
};

export type Thread_Aggregate_Bool_Exp_Bool_And = {
  arguments: Thread_Select_Column_Thread_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Thread_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Thread_Select_Column_Thread_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Thread_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Thread_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "thread" */
export type Thread_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Thread_Max_Order_By>;
  min?: InputMaybe<Thread_Min_Order_By>;
};

/** input type for inserting array relation for remote table "thread" */
export type Thread_Arr_Rel_Insert_Input = {
  data: Array<Thread_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_On_Conflict>;
};

/** Boolean expression to filter rows from the table "thread". All fields are combined with a logical 'AND'. */
export type Thread_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Bool_Exp>>;
  _not?: InputMaybe<Thread_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Bool_Exp>>;
  activities?: InputMaybe<Thread_Activity_Bool_Exp>;
  activities_aggregate?: InputMaybe<Thread_Activity_Aggregate_Bool_Exp>;
  archived?: InputMaybe<Boolean_Comparison_Exp>;
  circle?: InputMaybe<Circle_Bool_Exp>;
  circleId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  extra_members?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
  extra_members_aggregate?: InputMaybe<Thread_Extra_Member_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  initiatorMember?: InputMaybe<Member_Bool_Exp>;
  initiatorMemberId?: InputMaybe<Uuid_Comparison_Exp>;
  logs?: InputMaybe<Log_Bool_Exp>;
  logs_aggregate?: InputMaybe<Log_Aggregate_Bool_Exp>;
  member_status?: InputMaybe<Thread_Member_Status_Bool_Exp>;
  member_status_aggregate?: InputMaybe<Thread_Member_Status_Aggregate_Bool_Exp>;
  org?: InputMaybe<Org_Bool_Exp>;
  orgId?: InputMaybe<Uuid_Comparison_Exp>;
  private?: InputMaybe<Boolean_Comparison_Exp>;
  status?: InputMaybe<Thread_Status_Enum_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread" */
export enum Thread_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadPkey = 'thread_pkey'
}

/** columns and relationships of "thread_extra_member" */
export type Thread_Extra_Member = {
  __typename?: 'thread_extra_member';
  id: Scalars['uuid'];
  /** An object relationship */
  member: Member;
  memberId: Scalars['uuid'];
  /** An object relationship */
  thread: Thread;
  threadId: Scalars['uuid'];
};

/** aggregated selection of "thread_extra_member" */
export type Thread_Extra_Member_Aggregate = {
  __typename?: 'thread_extra_member_aggregate';
  aggregate?: Maybe<Thread_Extra_Member_Aggregate_Fields>;
  nodes: Array<Thread_Extra_Member>;
};

export type Thread_Extra_Member_Aggregate_Bool_Exp = {
  count?: InputMaybe<Thread_Extra_Member_Aggregate_Bool_Exp_Count>;
};

export type Thread_Extra_Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "thread_extra_member" */
export type Thread_Extra_Member_Aggregate_Fields = {
  __typename?: 'thread_extra_member_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Extra_Member_Max_Fields>;
  min?: Maybe<Thread_Extra_Member_Min_Fields>;
};


/** aggregate fields of "thread_extra_member" */
export type Thread_Extra_Member_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Extra_Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "thread_extra_member" */
export type Thread_Extra_Member_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Thread_Extra_Member_Max_Order_By>;
  min?: InputMaybe<Thread_Extra_Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "thread_extra_member" */
export type Thread_Extra_Member_Arr_Rel_Insert_Input = {
  data: Array<Thread_Extra_Member_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Thread_Extra_Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "thread_extra_member". All fields are combined with a logical 'AND'. */
export type Thread_Extra_Member_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Extra_Member_Bool_Exp>>;
  _not?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Extra_Member_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Member_Bool_Exp>;
  memberId?: InputMaybe<Uuid_Comparison_Exp>;
  thread?: InputMaybe<Thread_Bool_Exp>;
  threadId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_extra_member" */
export enum Thread_Extra_Member_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThreadExtraMemberPkey = 'thread_extra_member_pkey',
  /** unique or primary key constraint on columns "memberId", "threadId" */
  ThreadExtraMemberThreadIdMemberIdKey = 'thread_extra_member_threadId_memberId_key'
}

/** input type for inserting data into table "thread_extra_member" */
export type Thread_Extra_Member_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  memberId?: InputMaybe<Scalars['uuid']>;
  thread?: InputMaybe<Thread_Obj_Rel_Insert_Input>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Thread_Extra_Member_Max_Fields = {
  __typename?: 'thread_extra_member_max_fields';
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "thread_extra_member" */
export type Thread_Extra_Member_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Thread_Extra_Member_Min_Fields = {
  __typename?: 'thread_extra_member_min_fields';
  id?: Maybe<Scalars['uuid']>;
  memberId?: Maybe<Scalars['uuid']>;
  threadId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "thread_extra_member" */
export type Thread_Extra_Member_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  memberId?: InputMaybe<Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "thread_extra_member" */
export type Thread_Extra_Member_Mutation_Response = {
  __typename?: 'thread_extra_member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Extra_Member>;
};

/** on_conflict condition type for table "thread_extra_member" */
export type Thread_Extra_Member_On_Conflict = {
  constraint: Thread_Extra_Member_Constraint;
  update_columns?: Array<Thread_Extra_Member_Update_Column>;
  where?: InputMaybe<Thread_Extra_Member_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_extra_member". */
export type Thread_Extra_Member_Order_By = {
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Member_Order_By>;
  memberId?: InputMaybe<Order_By>;
  thread?: InputMaybe<Thread_Order_By>;
  threadId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_extra_member */
export type Thread_Extra_Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "thread_extra_member" */
export enum Thread_Extra_Member_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  ThreadId = 'threadId'
}

/** input type for updating data in table "thread_extra_member" */
export type Thread_Extra_Member_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "thread_extra_member" */
export type Thread_Extra_Member_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Extra_Member_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Extra_Member_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  memberId?: InputMaybe<Scalars['uuid']>;
  threadId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "thread_extra_member" */
export enum Thread_Extra_Member_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MemberId = 'memberId',
  /** column name */
  ThreadId = 'threadId'
}

export type Thread_Extra_Member_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Extra_Member_Set_Input>;
  /** filter the rows which have to be updated */
  where: Thread_Extra_Member_Bool_Exp;
};

/** input type for inserting data into table "thread" */
export type Thread_Insert_Input = {
  activities?: InputMaybe<Thread_Activity_Arr_Rel_Insert_Input>;
  archived?: InputMaybe<Scalars['Boolean']>;
  circle?: InputMaybe<Circle_Obj_Rel_Insert_Input>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  extra_members?: InputMaybe<Thread_Extra_Member_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  initiatorMember?: InputMaybe<Member_Obj_Rel_Insert_Input>;
  initiatorMemberId?: InputMaybe<Scalars['uuid']>;
  logs?: InputMaybe<Log_Arr_Rel_Insert_Input>;
  member_status?: InputMaybe<Thread_Member_Status_Arr_Rel_Insert_Input>;
  org?: InputMaybe<Org_Obj_Rel_Insert_Input>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Thread_Status_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Thread_Max_Fields = {
  __typename?: 'thread_max_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiatorMemberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "thread" */
export type Thread_Max_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initiatorMemberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
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
  /** filter the rows which have to be updated */
  where: Thread_Member_Status_Bool_Exp;
};

/** aggregate min on columns */
export type Thread_Min_Fields = {
  __typename?: 'thread_min_fields';
  circleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiatorMemberId?: Maybe<Scalars['uuid']>;
  orgId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "thread" */
export type Thread_Min_Order_By = {
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initiatorMemberId?: InputMaybe<Order_By>;
  orgId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
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
  activities_aggregate?: InputMaybe<Thread_Activity_Aggregate_Order_By>;
  archived?: InputMaybe<Order_By>;
  circle?: InputMaybe<Circle_Order_By>;
  circleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  extra_members_aggregate?: InputMaybe<Thread_Extra_Member_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  initiatorMember?: InputMaybe<Member_Order_By>;
  initiatorMemberId?: InputMaybe<Order_By>;
  logs_aggregate?: InputMaybe<Log_Aggregate_Order_By>;
  member_status_aggregate?: InputMaybe<Thread_Member_Status_Aggregate_Order_By>;
  org?: InputMaybe<Org_Order_By>;
  orgId?: InputMaybe<Order_By>;
  private?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
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
  /** filter the rows which have to be updated */
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
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

/** select "thread_aggregate_bool_exp_bool_and_arguments_columns" columns of table "thread" */
export enum Thread_Select_Column_Thread_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
}

/** select "thread_aggregate_bool_exp_bool_or_arguments_columns" columns of table "thread" */
export enum Thread_Select_Column_Thread_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Archived = 'archived',
  /** column name */
  Private = 'private'
}

/** input type for updating data in table "thread" */
export type Thread_Set_Input = {
  archived?: InputMaybe<Scalars['Boolean']>;
  circleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  initiatorMemberId?: InputMaybe<Scalars['uuid']>;
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Thread_Status_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "thread_status" */
export type Thread_Status = {
  __typename?: 'thread_status';
  comment?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

/** aggregated selection of "thread_status" */
export type Thread_Status_Aggregate = {
  __typename?: 'thread_status_aggregate';
  aggregate?: Maybe<Thread_Status_Aggregate_Fields>;
  nodes: Array<Thread_Status>;
};

/** aggregate fields of "thread_status" */
export type Thread_Status_Aggregate_Fields = {
  __typename?: 'thread_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Thread_Status_Max_Fields>;
  min?: Maybe<Thread_Status_Min_Fields>;
};


/** aggregate fields of "thread_status" */
export type Thread_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Thread_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "thread_status". All fields are combined with a logical 'AND'. */
export type Thread_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Thread_Status_Bool_Exp>>;
  _not?: InputMaybe<Thread_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Thread_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "thread_status" */
export enum Thread_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  ThreadStatusPkey = 'thread_status_pkey'
}

export enum Thread_Status_Enum {
  Active = 'Active',
  Blocked = 'Blocked',
  Closed = 'Closed',
  Preparation = 'Preparation'
}

/** Boolean expression to compare columns of type "thread_status_enum". All fields are combined with logical 'AND'. */
export type Thread_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Thread_Status_Enum>;
  _in?: InputMaybe<Array<Thread_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Thread_Status_Enum>;
  _nin?: InputMaybe<Array<Thread_Status_Enum>>;
};

/** input type for inserting data into table "thread_status" */
export type Thread_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Thread_Status_Max_Fields = {
  __typename?: 'thread_status_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Thread_Status_Min_Fields = {
  __typename?: 'thread_status_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "thread_status" */
export type Thread_Status_Mutation_Response = {
  __typename?: 'thread_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Thread_Status>;
};

/** on_conflict condition type for table "thread_status" */
export type Thread_Status_On_Conflict = {
  constraint: Thread_Status_Constraint;
  update_columns?: Array<Thread_Status_Update_Column>;
  where?: InputMaybe<Thread_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "thread_status". */
export type Thread_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: thread_status */
export type Thread_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "thread_status" */
export enum Thread_Status_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "thread_status" */
export type Thread_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "thread_status" */
export type Thread_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Thread_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Thread_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "thread_status" */
export enum Thread_Status_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Thread_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Thread_Status_Bool_Exp;
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
  orgId?: InputMaybe<Scalars['uuid']>;
  private?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Thread_Status_Enum>;
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
  OrgId = 'orgId',
  /** column name */
  Private = 'private',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

export type Thread_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Thread_Set_Input>;
  /** filter the rows which have to be updated */
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

/** columns and relationships of "user_app" */
export type User_App = {
  __typename?: 'user_app';
  config: Scalars['json'];
  createdAt: Scalars['date'];
  id: Scalars['uuid'];
  secretConfig: Scalars['json'];
  tmpData?: Maybe<Scalars['json']>;
  type: App_Type_Enum;
  /** An object relationship */
  user?: Maybe<Users>;
  userId: Scalars['uuid'];
};


/** columns and relationships of "user_app" */
export type User_AppConfigArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_app" */
export type User_AppSecretConfigArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_app" */
export type User_AppTmpDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "user_app" */
export type User_App_Aggregate = {
  __typename?: 'user_app_aggregate';
  aggregate?: Maybe<User_App_Aggregate_Fields>;
  nodes: Array<User_App>;
};

export type User_App_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_App_Aggregate_Bool_Exp_Count>;
};

export type User_App_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_App_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<User_App_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_app" */
export type User_App_Aggregate_Fields = {
  __typename?: 'user_app_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_App_Max_Fields>;
  min?: Maybe<User_App_Min_Fields>;
};


/** aggregate fields of "user_app" */
export type User_App_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_App_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_app" */
export type User_App_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_App_Max_Order_By>;
  min?: InputMaybe<User_App_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_app" */
export type User_App_Arr_Rel_Insert_Input = {
  data: Array<User_App_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_App_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_app". All fields are combined with a logical 'AND'. */
export type User_App_Bool_Exp = {
  _and?: InputMaybe<Array<User_App_Bool_Exp>>;
  _not?: InputMaybe<User_App_Bool_Exp>;
  _or?: InputMaybe<Array<User_App_Bool_Exp>>;
  config?: InputMaybe<Json_Comparison_Exp>;
  createdAt?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  secretConfig?: InputMaybe<Json_Comparison_Exp>;
  tmpData?: InputMaybe<Json_Comparison_Exp>;
  type?: InputMaybe<App_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_app" */
export enum User_App_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserAppPkey = 'user_app_pkey',
  /** unique or primary key constraint on columns "userId", "type" */
  UserAppUserIdTypeKey = 'user_app_userId_type_key'
}

/** input type for inserting data into table "user_app" */
export type User_App_Insert_Input = {
  config?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['uuid']>;
  secretConfig?: InputMaybe<Scalars['json']>;
  tmpData?: InputMaybe<Scalars['json']>;
  type?: InputMaybe<App_Type_Enum>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_App_Max_Fields = {
  __typename?: 'user_app_max_fields';
  createdAt?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user_app" */
export type User_App_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_App_Min_Fields = {
  __typename?: 'user_app_min_fields';
  createdAt?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user_app" */
export type User_App_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_app" */
export type User_App_Mutation_Response = {
  __typename?: 'user_app_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_App>;
};

/** on_conflict condition type for table "user_app" */
export type User_App_On_Conflict = {
  constraint: User_App_Constraint;
  update_columns?: Array<User_App_Update_Column>;
  where?: InputMaybe<User_App_Bool_Exp>;
};

/** Ordering options when selecting data from "user_app". */
export type User_App_Order_By = {
  config?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  secretConfig?: InputMaybe<Order_By>;
  tmpData?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_app */
export type User_App_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user_app" */
export enum User_App_Select_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  SecretConfig = 'secretConfig',
  /** column name */
  TmpData = 'tmpData',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "user_app" */
export type User_App_Set_Input = {
  config?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['uuid']>;
  secretConfig?: InputMaybe<Scalars['json']>;
  tmpData?: InputMaybe<Scalars['json']>;
  type?: InputMaybe<App_Type_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "user_app" */
export type User_App_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_App_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_App_Stream_Cursor_Value_Input = {
  config?: InputMaybe<Scalars['json']>;
  createdAt?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['uuid']>;
  secretConfig?: InputMaybe<Scalars['json']>;
  tmpData?: InputMaybe<Scalars['json']>;
  type?: InputMaybe<App_Type_Enum>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_app" */
export enum User_App_Update_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  SecretConfig = 'secretConfig',
  /** column name */
  TmpData = 'tmpData',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

export type User_App_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_App_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_App_Bool_Exp;
};

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType?: Maybe<Scalars['String']>;
  /** An array relationship */
  apps: Array<User_App>;
  /** An aggregate relationship */
  apps_aggregate: User_App_Aggregate;
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
  /** An array relationship */
  members: Array<Member>;
  /** An aggregate relationship */
  members_aggregate: Member_Aggregate;
  metadata: Scalars['user_metadata'];
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
export type UsersAppsArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersApps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_App_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_App_Order_By>>;
  where?: InputMaybe<User_App_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMembersArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Member_Order_By>>;
  where?: InputMaybe<Member_Bool_Exp>;
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
  apps?: InputMaybe<User_App_Bool_Exp>;
  apps_aggregate?: InputMaybe<User_App_Aggregate_Bool_Exp>;
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
  members?: InputMaybe<Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Member_Aggregate_Bool_Exp>;
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
  apps?: InputMaybe<User_App_Arr_Rel_Insert_Input>;
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
  members?: InputMaybe<Member_Arr_Rel_Insert_Input>;
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
  apps_aggregate?: InputMaybe<User_App_Aggregate_Order_By>;
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
  members_aggregate?: InputMaybe<Member_Aggregate_Order_By>;
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
  /** filter the rows which have to be updated */
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

/** columns and relationships of "storage.virus" */
export type Virus = {
  __typename?: 'virus';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  file: Files;
  fileId: Scalars['uuid'];
  filename: Scalars['String'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  userSession: Scalars['jsonb'];
  virus: Scalars['String'];
};


/** columns and relationships of "storage.virus" */
export type VirusUserSessionArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "storage.virus" */
export type Virus_Aggregate = {
  __typename?: 'virus_aggregate';
  aggregate?: Maybe<Virus_Aggregate_Fields>;
  nodes: Array<Virus>;
};

/** aggregate fields of "storage.virus" */
export type Virus_Aggregate_Fields = {
  __typename?: 'virus_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Virus_Max_Fields>;
  min?: Maybe<Virus_Min_Fields>;
};


/** aggregate fields of "storage.virus" */
export type Virus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Virus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Virus_Append_Input = {
  userSession?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "storage.virus". All fields are combined with a logical 'AND'. */
export type Virus_Bool_Exp = {
  _and?: InputMaybe<Array<Virus_Bool_Exp>>;
  _not?: InputMaybe<Virus_Bool_Exp>;
  _or?: InputMaybe<Array<Virus_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  file?: InputMaybe<Files_Bool_Exp>;
  fileId?: InputMaybe<Uuid_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userSession?: InputMaybe<Jsonb_Comparison_Exp>;
  virus?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.virus" */
export enum Virus_Constraint {
  /** unique or primary key constraint on columns "id" */
  VirusPkey = 'virus_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Virus_Delete_At_Path_Input = {
  userSession?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Virus_Delete_Elem_Input = {
  userSession?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Virus_Delete_Key_Input = {
  userSession?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "storage.virus" */
export type Virus_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  file?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  fileId?: InputMaybe<Scalars['uuid']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userSession?: InputMaybe<Scalars['jsonb']>;
  virus?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Virus_Max_Fields = {
  __typename?: 'virus_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileId?: Maybe<Scalars['uuid']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  virus?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Virus_Min_Fields = {
  __typename?: 'virus_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  fileId?: Maybe<Scalars['uuid']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  virus?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "storage.virus" */
export type Virus_Mutation_Response = {
  __typename?: 'virus_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Virus>;
};

/** on_conflict condition type for table "storage.virus" */
export type Virus_On_Conflict = {
  constraint: Virus_Constraint;
  update_columns?: Array<Virus_Update_Column>;
  where?: InputMaybe<Virus_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.virus". */
export type Virus_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  file?: InputMaybe<Files_Order_By>;
  fileId?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userSession?: InputMaybe<Order_By>;
  virus?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.virus */
export type Virus_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Virus_Prepend_Input = {
  userSession?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "storage.virus" */
export enum Virus_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FileId = 'fileId',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserSession = 'userSession',
  /** column name */
  Virus = 'virus'
}

/** input type for updating data in table "storage.virus" */
export type Virus_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  fileId?: InputMaybe<Scalars['uuid']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userSession?: InputMaybe<Scalars['jsonb']>;
  virus?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "virus" */
export type Virus_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Virus_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Virus_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  fileId?: InputMaybe<Scalars['uuid']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userSession?: InputMaybe<Scalars['jsonb']>;
  virus?: InputMaybe<Scalars['String']>;
};

/** update columns of table "storage.virus" */
export enum Virus_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FileId = 'fileId',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserSession = 'userSession',
  /** column name */
  Virus = 'virus'
}

export type Virus_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Virus_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Virus_Set_Input>;
  /** filter the rows which have to be updated */
  where: Virus_Bool_Exp;
};

export type ApiKeyFragment = { __typename?: 'api_key', id: string, name: string, value: string, createdAt: string };

export type CircleFragment = { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean };

export type CircleSummaryFragment = { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, role: { __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null } };

export type CircleFullFragment = { __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, members: Array<{ __typename?: 'circle_member', id: string, avgMinPerWeek?: number | null, member: { __typename?: 'member', id: string, userId?: string | null, name: string, picture?: string | null } }>, invitedCircleLinks: Array<{ __typename?: 'circle_link', invitedCircle: { __typename?: 'circle', id: string } }>, role: { __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null } };

export type CircleLinkFragment = { __typename?: 'circle_link', id: string, parentId: string, circleId: string, createdAt: string };

export type CircleMemberFragment = { __typename?: 'circle_member', id: string, circleId: string, memberId: string, avgMinPerWeek?: number | null, createdAt: string, archived: boolean };

export type DecisionFragment = { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string, private: boolean };

export type LogFragment = { __typename?: 'log', id: string, orgId: string, userId: string, memberId: string, memberName: string, meetingId?: string | null, createdAt: string, display: LogDisplay, changes: EntitiesChanges, cancelLogId?: string | null, cancelMemberId?: string | null, cancelMemberName?: string | null, canceled: boolean, threadId?: string | null, taskId?: string | null };

export type MeetingSummaryFragment = { __typename?: 'meeting', id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> };

export type MeetingFragment = { __typename?: 'meeting', createdAt: string, stepsConfig: Array<MeetingStepConfig>, archived: boolean, videoConf?: VideoConf | null, recurringId?: string | null, recurringDate?: string | null, invitedReadonly: boolean, id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> };

export type MeetingAttendeeFragment = { __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean };

export type MeetingRecurringFragment = { __typename?: 'meeting_recurring', id: string, orgId: string, circleId: string, scope: ParticipantsScope, templateId: string, rrule: string, duration: number, videoConf?: any | null, createdAt: string, circle: { __typename?: 'circle', role: { __typename?: 'role', name: string, colorHue?: number | null } }, template: { __typename?: 'meeting_template', title: string, stepsConfig: Array<MeetingStepConfig> } };

export type MeetingStepFragment = { __typename?: 'meeting_step', id: string, meetingId: string, stepConfigId: string, notes: string, type: Meeting_Step_Type_Enum, data: MeetingStepData };

export type MemberFragment = { __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null };

export type MemberSummaryFragment = { __typename?: 'member', id: string, userId?: string | null, name: string, picture?: string | null };

export type NewsFragment = { __typename?: 'news', id?: string | null, createdAt?: string | null, decision?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string, private: boolean } | null, meeting?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> } | null, thread?: { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, activities: Array<{ __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: any, reactions: Array<{ __typename?: 'thread_activity_reaction', id: string, userId: string, shortcode: string }>, refThread?: { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> } | null, refMeeting?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> } | null, refTask?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum, private: boolean } | null, refDecision?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string, private: boolean } | null }>, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> } | null };

export type OrgFragment = { __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null, shareOrg: boolean, shareMembers: boolean, protectGovernance: boolean, defaultGraphView: CirclesGraphViews };

export type OrgFullFragment = { __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null, shareOrg: boolean, shareMembers: boolean, protectGovernance: boolean, defaultGraphView: CirclesGraphViews, circles: Array<{ __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, members: Array<{ __typename?: 'circle_member', id: string, avgMinPerWeek?: number | null, member: { __typename?: 'member', id: string, userId?: string | null, name: string, picture?: string | null } }>, invitedCircleLinks: Array<{ __typename?: 'circle_link', invitedCircle: { __typename?: 'circle', id: string } }>, role: { __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null } }>, roles: Array<{ __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null }>, members: Array<{ __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null }> };

export type OrgFullLightFragment = { __typename?: 'org', id: string, name: string, archived: boolean, createdAt: string, defaultWorkedMinPerWeek: number, slug?: string | null, shareOrg: boolean, shareMembers: boolean, protectGovernance: boolean, defaultGraphView: CirclesGraphViews, circles: Array<{ __typename?: 'circle', id: string, orgId: string, roleId: string, parentId?: string | null, archived: boolean, members: Array<{ __typename?: 'circle_member', id: string, memberId: string, avgMinPerWeek?: number | null }>, invitedCircleLinks: Array<{ __typename?: 'circle_link', invitedCircle: { __typename?: 'circle', id: string } }> }>, roles: Array<{ __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null }>, members: Array<{ __typename?: 'member', id: string, orgId: string, archived: boolean, name: string, description: string, pictureFileId?: string | null, picture?: string | null, userId?: string | null, inviteEmail?: string | null, inviteDate?: string | null, workedMinPerWeek?: number | null, role?: Member_Role_Enum | null }> };

export type RoleFragment = { __typename?: 'role', id: string, orgId: string, archived: boolean, base: boolean, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null };

export type RoleSummaryFragment = { __typename?: 'role', id: string, base: boolean, name: string, singleMember: boolean, parentLink: boolean, defaultMinPerWeek?: number | null, colorHue?: number | null };

export type RoleAiFragment = { __typename?: 'role_ai', id: string, name: string, purpose: string, domain: string, accountabilities: string, checklist: string, indicators: string, notes: string };

export type TaskFragment = { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum, private: boolean };

export type ThreadFragment = { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> };

export type ThreadMemberStatusFragment = { __typename?: 'thread_member_status', lastReadActivityId?: string | null, lastReadDate: string };

export type ThreadWithFirstActivityFragment = { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, activities: Array<{ __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: any, reactions: Array<{ __typename?: 'thread_activity_reaction', id: string, userId: string, shortcode: string }>, refThread?: { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> } | null, refMeeting?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> } | null, refTask?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum, private: boolean } | null, refDecision?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string, private: boolean } | null }>, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> };

export type ThreadActivityFragment = { __typename?: 'thread_activity', id: string, threadId: string, userId: string, createdAt: string, type: Thread_Activity_Type_Enum, data: any, reactions: Array<{ __typename?: 'thread_activity_reaction', id: string, userId: string, shortcode: string }>, refThread?: { __typename?: 'thread', id: string, orgId: string, circleId: string, initiatorMemberId: string, title: string, createdAt: string, archived: boolean, status: Thread_Status_Enum, private: boolean, extra_members: Array<{ __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string }> } | null, refMeeting?: { __typename?: 'meeting', id: string, orgId: string, circleId: string, startDate: string, endDate: string, ended: boolean, title: string, currentStepId?: string | null, summary: string, private: boolean, meeting_attendees: Array<{ __typename?: 'meeting_attendee', id: string, meetingId: string, memberId: string, present?: boolean | null, startNotified: boolean }> } | null, refTask?: { __typename?: 'task', id: string, orgId: string, circleId: string, memberId?: string | null, title: string, description: string, archived: boolean, createdAt: string, dueDate?: string | null, status: Task_Status_Enum, private: boolean } | null, refDecision?: { __typename?: 'decision', id: string, orgId: string, circleId: string, memberId: string, title: string, description: string, archived: boolean, createdAt: string, private: boolean } | null };

export type ThreadActivityReactionFragment = { __typename?: 'thread_activity_reaction', id: string, userId: string, shortcode: string };

export type ThreadExtraMemberFragment = { __typename?: 'thread_extra_member', id: string, threadId: string, memberId: string };

export type UserAppFragment = { __typename?: 'user_app', id: string, userId: string, type: App_Type_Enum, config: any };

export type UserAppFullFragment = { __typename?: 'user_app', id: string, userId: string, type: App_Type_Enum, secretConfig: any, config: any, tmpData?: any | null, createdAt: any, user?: { __typename?: 'users', metadata: UserMetadata } | null };

export const ApiKeyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ApiKey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"api_key"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ApiKeyFragment, unknown>;
export const CircleLinkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleLink"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle_link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<CircleLinkFragment, unknown>;
export const CircleMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"avgMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]} as unknown as DocumentNode<CircleMemberFragment, unknown>;
export const LogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Log"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"memberName"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"changes"}},{"kind":"Field","name":{"kind":"Name","value":"cancelLogId"}},{"kind":"Field","name":{"kind":"Name","value":"cancelMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"cancelMemberName"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]} as unknown as DocumentNode<LogFragment, unknown>;
export const MeetingAttendeeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}}]} as unknown as DocumentNode<MeetingAttendeeFragment, unknown>;
export const MeetingSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currentStepId"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_attendees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingAttendee"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}}]} as unknown as DocumentNode<MeetingSummaryFragment, unknown>;
export const MeetingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meeting"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingSummary"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"stepsConfig"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"videoConf"}},{"kind":"Field","name":{"kind":"Name","value":"recurringId"}},{"kind":"Field","name":{"kind":"Name","value":"recurringDate"}},{"kind":"Field","name":{"kind":"Name","value":"invitedReadonly"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currentStepId"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_attendees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingAttendee"}}]}}]}}]} as unknown as DocumentNode<MeetingFragment, unknown>;
export const MeetingRecurringFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingRecurring"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_recurring"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"circle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stepsConfig"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rrule"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"videoConf"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MeetingRecurringFragment, unknown>;
export const MeetingStepFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingStep"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_step"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"stepConfigId"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]} as unknown as DocumentNode<MeetingStepFragment, unknown>;
export const DecisionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Decision"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"decision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]} as unknown as DocumentNode<DecisionFragment, unknown>;
export const ThreadExtraMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadExtraMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_extra_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}}]} as unknown as DocumentNode<ThreadExtraMemberFragment, unknown>;
export const ThreadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Thread"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"initiatorMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"extra_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadExtraMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadExtraMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_extra_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}}]} as unknown as DocumentNode<ThreadFragment, unknown>;
export const ThreadActivityReactionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivityReaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity_reaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"shortcode"}}]}}]} as unknown as DocumentNode<ThreadActivityReactionFragment, unknown>;
export const TaskFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]} as unknown as DocumentNode<TaskFragment, unknown>;
export const ThreadActivityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadActivityReaction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refThread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Thread"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refMeeting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refDecision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Decision"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadExtraMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_extra_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivityReaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity_reaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"shortcode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Thread"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"initiatorMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"extra_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadExtraMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currentStepId"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_attendees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingAttendee"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Decision"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"decision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]} as unknown as DocumentNode<ThreadActivityFragment, unknown>;
export const ThreadWithFirstActivityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadWithFirstActivity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Thread"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"Message"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"asc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadActivity"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadExtraMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_extra_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivityReaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity_reaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"shortcode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Thread"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"initiatorMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"extra_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadExtraMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currentStepId"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_attendees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingAttendee"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Decision"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"decision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadActivityReaction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refThread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Thread"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refMeeting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refDecision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Decision"}}]}}]}}]} as unknown as DocumentNode<ThreadWithFirstActivityFragment, unknown>;
export const NewsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"News"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"news"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"decision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Decision"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meeting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadWithFirstActivity"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingAttendee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting_attendee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"present"}},{"kind":"Field","name":{"kind":"Name","value":"startNotified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadExtraMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_extra_member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Thread"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"initiatorMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"extra_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadExtraMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivityReaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity_reaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"shortcode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeetingSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"meeting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currentStepId"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_attendees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingAttendee"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Decision"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"decision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"circleId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadActivity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadActivityReaction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refThread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Thread"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refMeeting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeetingSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refDecision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Decision"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadWithFirstActivity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Thread"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"Message"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"asc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThreadActivity"}}]}}]}}]} as unknown as DocumentNode<NewsFragment, unknown>;
export const OrgFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Org"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"org"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultWorkedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"shareOrg"}},{"kind":"Field","name":{"kind":"Name","value":"shareMembers"}},{"kind":"Field","name":{"kind":"Name","value":"protectGovernance"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGraphView"}}]}}]} as unknown as DocumentNode<OrgFragment, unknown>;
export const CircleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Circle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]} as unknown as DocumentNode<CircleFragment, unknown>;
export const RoleSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}}]} as unknown as DocumentNode<RoleSummaryFragment, unknown>;
export const CircleSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Circle"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Circle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}}]} as unknown as DocumentNode<CircleSummaryFragment, unknown>;
export const MemberSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]} as unknown as DocumentNode<MemberSummaryFragment, unknown>;
export const CircleFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CircleSummary"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"member"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avgMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberSummary"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedCircleLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedCircle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Circle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Circle"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]} as unknown as DocumentNode<CircleFullFragment, unknown>;
export const MemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Member"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pictureFileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"inviteEmail"}},{"kind":"Field","name":{"kind":"Name","value":"inviteDate"}},{"kind":"Field","name":{"kind":"Name","value":"workedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<MemberFragment, unknown>;
export const OrgFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrgFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"org"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Org"}},{"kind":"Field","name":{"kind":"Name","value":"circles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CircleFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"base"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Member"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Circle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Circle"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSummary"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Org"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"org"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultWorkedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"shareOrg"}},{"kind":"Field","name":{"kind":"Name","value":"shareMembers"}},{"kind":"Field","name":{"kind":"Name","value":"protectGovernance"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGraphView"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CircleFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CircleSummary"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"member"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avgMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberSummary"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedCircleLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedCircle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Member"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pictureFileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"inviteEmail"}},{"kind":"Field","name":{"kind":"Name","value":"inviteDate"}},{"kind":"Field","name":{"kind":"Name","value":"workedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<OrgFullFragment, unknown>;
export const OrgFullLightFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrgFullLight"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"org"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Org"}},{"kind":"Field","name":{"kind":"Name","value":"circles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Circle"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"avgMinPerWeek"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedCircleLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedCircle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSummary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Member"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Org"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"org"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultWorkedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"shareOrg"}},{"kind":"Field","name":{"kind":"Name","value":"shareMembers"}},{"kind":"Field","name":{"kind":"Name","value":"protectGovernance"}},{"kind":"Field","name":{"kind":"Name","value":"defaultGraphView"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Circle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"circle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Member"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pictureFileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"inviteEmail"}},{"kind":"Field","name":{"kind":"Name","value":"inviteDate"}},{"kind":"Field","name":{"kind":"Name","value":"workedMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<OrgFullLightFragment, unknown>;
export const RoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"accountabilities"}},{"kind":"Field","name":{"kind":"Name","value":"checklist"}},{"kind":"Field","name":{"kind":"Name","value":"indicators"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"singleMember"}},{"kind":"Field","name":{"kind":"Name","value":"parentLink"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMinPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"colorHue"}}]}}]} as unknown as DocumentNode<RoleFragment, unknown>;
export const RoleAiFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleAI"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"role_ai"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"accountabilities"}},{"kind":"Field","name":{"kind":"Name","value":"checklist"}},{"kind":"Field","name":{"kind":"Name","value":"indicators"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<RoleAiFragment, unknown>;
export const ThreadMemberStatusFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThreadMemberStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"thread_member_status"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastReadActivityId"}},{"kind":"Field","name":{"kind":"Name","value":"lastReadDate"}}]}}]} as unknown as DocumentNode<ThreadMemberStatusFragment, unknown>;
export const UserAppFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserApp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user_app"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"config"}}]}}]} as unknown as DocumentNode<UserAppFragment, unknown>;
export const UserAppFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAppFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user_app"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"secretConfig"}},{"kind":"Field","name":{"kind":"Name","value":"config"}},{"kind":"Field","name":{"kind":"Name","value":"tmpData"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}}]} as unknown as DocumentNode<UserAppFullFragment, unknown>;