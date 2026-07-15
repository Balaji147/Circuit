import CompanyInfo from "./circuit_company_info.js";
import TasksInfo from "./circuit_task_info.js";
import UsersAuth from "./circuit_users_auth.js";

TasksInfo.belongsTo(CompanyInfo, {foreignKey:"ct_company_id", as:"company"})
CompanyInfo.hasMany(TasksInfo, {foreignKey:"ct_company_id", as:"tasks"})

TasksInfo.belongsTo(UsersAuth, {foreignKey:"task_allocated_by", as:"assigner"})
UsersAuth.hasMany(TasksInfo, {foreignKey:"task_allocated_by", as:"assigner_tasks"})

TasksInfo.belongsTo(UsersAuth, {foreignKey:"task_allocated_to", as:"assignee"})
UsersAuth.hasMany(TasksInfo, {foreignKey:"task_allocated_to", as:"assigned_tasks"})

UsersAuth.belongsTo(CompanyInfo, {foreignKey:"ct_company_id", as:"company"})
CompanyInfo.hasMany(UsersAuth, {foreignKey:"ct_company_id", as:"employee"})

export {CompanyInfo, TasksInfo, UsersAuth}