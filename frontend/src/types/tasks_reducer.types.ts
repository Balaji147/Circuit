import type { NullAllowedType } from "./common.types";
import type { PeriorityType, StatusType } from "./filter.types"
export interface TaskInitInterface{
    user_tasks:NullAllowedType<TaskInfoInterface>,
    all_tasks:NullAllowedType<AllTaskInterface>,
    loading:boolean,
    error:null | boolean | unknown
}

type TaskKeys = "all_tasks" | "over_due_task" | "todo_task" | "in_progress_task" | "done_task";

export type AllTaskInterface = Record<TaskKeys, number>;

export interface TaskInfoInterface{
    index_no:number
    circuit_task_info_id:number
    task_title:string
    task_description:string
    task_priority_level:PeriorityType
    task_status:StatusType
    task_allocated_by:number
    task_allocated_to:number
    task_due_date:string
    task_created_dttm:string
}