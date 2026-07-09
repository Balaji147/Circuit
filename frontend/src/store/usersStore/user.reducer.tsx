import {createSlice} from "@reduxjs/toolkit"
import type { UserInitStates } from "../../types/users.type"

export const USERS_INIT_STATE:UserInitStates = {
    users:null,
    cardOpen:false,
    loading:true
}

export const usersSlicer = createSlice({
    name:"users",
    initialState:USERS_INIT_STATE,
    reducers:{
        setUsers(state, action){
            state.users = action.payload
            state.loading = false
        },
        setLoading(state){
            state.loading = true
        },
        setLogoutUser(state){
            state.users = null
        },
        setCardOpen(state, action){
            state.cardOpen = action.payload
        }
    }
})

export const {setUsers, setLoading, setLogoutUser, setCardOpen} = usersSlicer.actions

export const userReducer = usersSlicer.reducer