export interface NameValuesInterface{
    value:string | number
    name:string | number
}

export type PeriorityType = "" | "low" | "medium" | "high"
export type StatusType = "" | "todo" | "in progress" | "done"

export type DataActionType = string | null | UserTaskList | ""

export type NameIdType = {
    task_name:string
    task_id:number
}

export interface DropDownInterface{
    Status?:StatusType;
    Priority?:PeriorityType;
}

export interface InputTypeInterface{
    sr_name?:string;
    emp_name?:string
}

export type ValueInterface = DropDownInterface & InputTypeInterface


export interface FiltersProps <T extends HTMLSelectElement | HTMLInputElement = HTMLSelectElement>{
    filterModes?:ValueInterface
    tag?:string,
    onFilterChange:(e:React.ChangeEvent<T>) => void
    otherInfo?:Record<string, string>
}

export interface TaskDataProps{
    index_no:number
    circuit_task_info_id:number
    task_title:string;
    task_description?: string;
    task_priority_level: PeriorityType;
    task_status?: StatusType;
    task_allocated_by:number;
    task_allocated_to?:number;
    task_due_date:string;
    task_created_dttm:string
}

export interface UserTaskList {
    task_priority_level: PeriorityType
    circuit_task_info_id:number
    index_no:number
    task_name:string
    task_title:string
    task_id:number
    task_status: StatusType
    task_due_date:string
    task_created_dttm:string
}