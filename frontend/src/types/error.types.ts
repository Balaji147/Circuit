export interface ErrorReducerInterface{
    type?:"SET_ERROR" | "CLEAR_ERROR"
    payload?:string
}