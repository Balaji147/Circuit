import type { TaskReducerInterface, TaskInfoInterface } from "../../types/tasks_reducer.types"
export const selectUserTasks = (store:TaskReducerInterface)=>store?.tasks.user_tasks
export const selectAllTasks = (store:TaskReducerInterface)=>store.tasks.all_tasks
export const selectAllTasksCnt = (store)=>store.tasks.all_tasks?.all_tasks_cnt
export const selectLoading = (store:TaskReducerInterface)=>store.tasks.loading
export const selecError = (store:TaskReducerInterface)=>store.tasks.error