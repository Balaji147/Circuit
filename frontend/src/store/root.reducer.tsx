import {combineReducers} from "redux"
import {userReducer} from "./usersStore/user.reducer"
import { taskReducer } from "./tasksStore/tasks.reducer"
import { companyReducer } from "./companyStore/company.reducer"
import { employeesReducer } from "./employeesStore/employees.reducer"

export const rootReducer = combineReducers({
    users:userReducer,
    tasks:taskReducer,
    company:companyReducer,
    employees:employeesReducer
})
