create table circuit_company_info(
	circuit_company_info_id bigint generated always as identity primary key,
	company_name text not null,
	company_logo text null,
	type_of_company text null,
	company_sites_link jsonb
)

select * from circuit_company_info

delete from circuit_company_info

alter table circuit_company_info 
drop column company_logo

alter table circuit_company_info 
add column company_logo text
default 'https://shorturl.at/G8gt8'

SELECT cci.* FROM circuit_company_info cci 
JOIN circuit_users_auth cua
ON cci.circuit_company_info_id = cua.ct_company_id WHERE circuit_company_info_id = 13

select * from circuit_users_auth where circuit_users_auth_id = 51;

select count(cua.*) as employee_cnt, max(name_of_user) filter(where user_role = 'admin') 
as admin_name from circuit_users_auth cua where ct_company_id = 13;

select company_name, type_of_company, company_sites_link, company_logo
from circuit_company_info where circuit_company_info_id = 13;


select * from circuit_company_info where ct_company_id = 13

