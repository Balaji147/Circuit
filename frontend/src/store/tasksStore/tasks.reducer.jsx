import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../helpers/axios.config";

export const TASKS_INIT_STATE = {
    user_tasks:null,
    all_tasks:null,
    loading:true,
    error:null
}

export const fetchTaskList = createAsyncThunk(
    "tasks/fetchUserTasks",
    async(_, thunkAPI)=>{
        try{
            const getTasksDetails = await api.get("tasks/getTasks")
            return getTasksDetails.data.taskInfo
        }catch(er){
            return thunkAPI.rejectWithValue(er)
        }
    }
)

export const tasksSlicer = createSlice({
    name:"tasks",
    initialState:TASKS_INIT_STATE,
    reducers:{
        setUserTasks(state, action){
            state.user_tasks = action.payload
            state.loading = false
        },
        setAllTasks(state, action){
            state.all_tasks = action.payload
            state.loading = false
        },
        setTasksLoading(state){
            state.loading = true
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTaskList.pending, (state)=>{
                state.loading = true
                state.error = false
            })
            .addCase(fetchTaskList.fulfilled, (state, action)=>{
                state.user_tasks = action.payload.user_tasks
                state.all_tasks = action.payload.all_tasks[0]
                state.loading = false
            })
            .addCase(fetchTaskList.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {setUserTasks, setAllTasks, setTasksLoading} = tasksSlicer.actions

export const taskReducer = tasksSlicer.reducer