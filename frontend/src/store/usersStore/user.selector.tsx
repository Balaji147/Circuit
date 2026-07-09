import type { RootReducerInterface } from "../../types/reducer.types"
export const selectCurrentUser = (store:RootReducerInterface)=>store.users.users
export const selectLoading = (store:RootReducerInterface)=>store.users.loading
export const selectCardOpen = (store:RootReducerInterface)=>store.users.cardOpen