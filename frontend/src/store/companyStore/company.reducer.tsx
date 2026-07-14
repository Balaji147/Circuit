import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../helpers/axios.config"
import type { NullAllowedType } from "../../types/common.types"

export interface CompanyInfoInterface{
    circuit_company_info_id:number
    company_name:string
    type_of_company:string | null
    company_sites_link: string | null
    company_logo: string | "https://shorturl.at/G8gt8"
    task_id_string:string
    next_task_number:number
    admin_name:string
    employee_cnt:number
}

export interface CompanyInitValues{
    company_data:NullAllowedType<CompanyInfoInterface>
    loading:boolean
    error:null | boolean | unknown
}

export interface CompanyInterface{
    company:CompanyInitValues
}

export const COMPANY_INIT_STATE:CompanyInitValues = {
    company_data:null,
    loading:true,
    error:null
}

export const fetchCompanyInfo = createAsyncThunk(
    "company/getCompanyInfo",
    async(_, thunkAPI)=>{
        try{
            const getCompanyInfo = await api.get("company/getCompanyInfo")
            console.log(getCompanyInfo.data.companyData)
            return getCompanyInfo.data.companyData
        }catch(err){
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const companySlicer = createSlice({
    name:"company",
    initialState:COMPANY_INIT_STATE,
    reducers:{
        setCompanyInfo(state, action){
            state.company_data = action.payload
            state.loading = false
        },
        setCompanyLoading(state){
            state.loading = true
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCompanyInfo.pending, (state)=>{
                state.loading = true
                state.error = false
            })
            .addCase(fetchCompanyInfo.fulfilled, (state, action)=>{
                state.company_data = action.payload
                state.error = null,
                state.loading = false
            })
            .addCase(fetchCompanyInfo.rejected, (state, action)=>{
                state.company_data = null,
                state.error = action.payload,
                state.loading = false
            })
    }
})

export const {setCompanyInfo, setCompanyLoading} = companySlicer.actions

export const companyReducer = companySlicer.reducer