import {combineReducers} from "redux"
import {userReducer} from "./usersStore/user.reducer"
import { taskReducer } from "./tasksStore/tasks.reducer"

export const rootReducer = combineReducers({
    users:userReducer,
    tasks:taskReducer
})
