import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../../helpers/axios.config";
import type { EmployeesInterface } from "../../types/employees.types";
import type { NullAllowedType } from "../../types/common.types";

export interface EmployeesStateInterface{
    employees_data:NullAllowedType<EmployeesInterface[]> | undefined
    loading:Boolean,
    error:unknown | null
}

export const EMPLOYEES_INIT_STATE:EmployeesStateInterface = {
    employees_data:[],
    loading:false,
    error:null,
}

export const fetchEmployeesInfo = createAsyncThunk(
    "employees/getEmployeesList",
    async(_, thunkApi)=>{
        try{
            const getEmployees = await api.get("employees/getEmployeesList")
            return getEmployees.data.rows
        }catch(err){
            return thunkApi.rejectWithValue(err)
        }
    }
)

const getEmployeeWithId = (employeesList, empId) => {
    const list = Array.isArray(employeesList) 
        ? employeesList 
        : (employeesList ? [employeesList] : []);
    const employeeInfo = list?.find((employee)=>employee?.circuit_users_auth_id === empId)
    return employeeInfo
}

export const employeeSlicer = createSlice({
    name:"employees",
    initialState:EMPLOYEES_INIT_STATE,
    reducers:{
        setEmployeesInfo(state, action){
            console.log("payload",current(state.employees_data))
            state.employees_data = getEmployeeWithId(state.employees_data, action.payload)
            state.loading = false,
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder.
            addCase(fetchEmployeesInfo.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchEmployeesInfo.fulfilled, (state, action)=>{
                state.employees_data = action.payload,
                state.loading = false,
                state.error = null
            })
            .addCase(fetchEmployeesInfo.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload
            })
    }
})

export const { setEmployeesInfo} = employeeSlicer.actions

export const employeesReducer = employeeSlicer.reducer