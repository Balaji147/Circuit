import { USER_TYPE } from "./user.type"

const createAction = (type, payload)=>({type, payload})

export const setUser = (userData)=>createAction(USER_TYPE.SET_USER, userData)
export const setLogoutUser = ()=>createAction(USER_TYPE.LOGOUT_USER, null)
export const setLoading = (load)=>createAction(USER_TYPE.SET_LOADING, load)