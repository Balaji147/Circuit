create extension if not exists citext;
CREATE TABLE circuit_users_auth(
	circuit_users_auth_id bigint generated always as identity primary key,
	name_of_user text not null,
	user_mailid citext not null unique,
	user_password text not null,
	created_at timestamptz not null default now()
)

SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_name = 'circuit_users_auth';

select * from circuit_users_auth 

SELECT circuit_users_auth_id, user_password, name_of_user, user_mailid WHERE user_mailid = 'mebala147@gmail.com'

