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
add column user_temp_password text

select * from circuit_users_auth where user_mailid = 'mebala147@gmail.com'

delete from circuit_users_auth where circuit_users_auth_id = 50

SELECT cua.circuit_users_auth_id, cua.user_password, cua.name_of_user, cua.user_mailid, cci.circuit_company_info_id
FROM circuit_users_auth cua join circuit_company_info cci on cua.ct_company_id =  cci.circuit_company_info_id
WHERE cua.user_mailid = 'cristy@123.com'


update circuit_users_auth set user_role = 'not_admin' where user_role = 'false'

SELECT cua.circuit_users_auth_id, cua.user_password, cua.user_role,  cua.name_of_user, cua.user_mailid, cci.circuit_company_info_id
            FROM circuit_users_auth cua join circuit_company_info cci on cua.ct_company_id =  cci.circuit_company_info_id
            WHERE cua.user_mailid = 'mebala147@gmail.com'
