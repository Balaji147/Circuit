SELECT 
    cci.*,
    (
        SELECT name_of_user
        FROM circuit_users_auth
        WHERE ct_company_id = cci.circuit_company_info_id
        AND user_role = 'admin'
        LIMIT 1
    ) AS admin_name,
    (
        SELECT COUNT(*)
        FROM circuit_users_auth
        WHERE ct_company_id = cci.circuit_company_info_id
    ) AS employee_cnt

FROM circuit_company_info cci
WHERE cci.circuit_company_info_id = 13;

SELECT * from circuit_users_auth