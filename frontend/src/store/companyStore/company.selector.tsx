import type { CompanyInterface } from "./company.reducer"
export const selectCompanyInfo = (store:CompanyInterface)=>store.company.company_data
export const selectLoading = (store:CompanyInterface)=>store.company.loading
export const selecError = (store:CompanyInterface)=>store.company.error