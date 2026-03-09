import {createSlice} from "@reduxjs/toolkit"

export const USERS_INIT_STATE = {
    users:null,
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
        }
    }
})

export const {setUsers, setLoading, setLogoutUser} = usersSlicer.actions

export const userReducer = usersSlicer.reducer