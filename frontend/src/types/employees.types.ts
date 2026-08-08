export type UserRoleType = "admin" | "same_as_admin" | "not_admin"
export type GendersType = "M" | "F" | "O" | "N"

export interface EmployeesInterface{
    circuit_users_info_id:number
    name_of_user:string;
    user_mailid:string;
    user_role:UserRoleType;
    user_designation:string;
    employee_id:string;
    employee_gender:GendersType;
    employee_profile_pic:string;
    onboard_date:string;
    is_active_employee:boolean;
    is_edited_by_emp:boolean
}