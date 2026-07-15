create extension if not exists citext;
CREATE TABLE circuit_users_auth(
	circuit_users_auth_id bigint generated always as identity primary key,
	name_of_user text not null,
	user_mailid citext not null unique,
	user_password text not null,
	created_at timestamptz not null default now()
	ct_company_id bigint, 
	add constraint fk_ct_company
	foreign key (ct_company_id)
	references circuit_company_info(circuit_company_info_id)
	on delete cascade
)

alter table circuit_users_auth 
add column ct_company_id bigint, 
add constraint fk_ct_company
foreign key (ct_company_id)
references circuit_company_info(circuit_company_info_id)
on delete cascade

alter table circuit_users_auth
add column user_designation text

alter table circuit_users_auth
add column employee_id text

alter table circuit_users_auth
add column user_designation text

alter table circuit_users_auth
add column user_temp_password text

SELECT * from circuit_users_auth where ct_company_id = 13

delete from circuit_users_auth where circuit_users_auth_id = 57

SELECT cua.circuit_users_auth_id, cua.user_password, cua.name_of_user, cua.user_mailid, cci.circuit_company_info_id
FROM circuit_users_auth cua join circuit_company_info cci on cua.ct_company_id =  cci.circuit_company_info_id
WHERE cua.user_mailid = 'cristy@123.com'


SELECT column_name, column_default, is_nullable, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'circuit_users_auth'
ORDER BY ordinal_position;

update circuit_users_auth set user_role = 'no'

