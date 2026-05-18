import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../helpers/axios.config"

export const COMPANY_INIT_STATE = {
    company_data:null,
    loading:true,
    error:null
}

export const fetchCompanyInfo = createAsyncThunk(
    "company/getCompanyInfo",
    async(_, thunkAPI)=>{
        try{
            const getCompanyInfo = await api.get("company/getCompanyInfo")
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