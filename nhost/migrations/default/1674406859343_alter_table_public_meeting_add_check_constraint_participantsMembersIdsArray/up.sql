alter table "public"."meeting" add constraint "participantsMembersIds_array" check (json_typeof("participantsMembersIds") = 'array');
alter table "public"."meeting_recurring" add constraint "participantsMembersIds_array" check (json_typeof("participantsMembersIds") = 'array');
alter table "public"."thread" add constraint "participantsMembersIds_array" check (json_typeof("participantsMembersIds") = 'array');
