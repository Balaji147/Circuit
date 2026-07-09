import type { NullAllowedType } from "./common.types"

export interface UserReducerValues{
    userid:number
    user_name:string
    user_role:"admin" | "same_as_admin" | "not_admin"
    user_mailid:string
    cid:number
}

export interface UserInitStates {
    users:NullAllowedType<UserReducerValues>,
    cardOpen:boolean,
    loading:boolean
}