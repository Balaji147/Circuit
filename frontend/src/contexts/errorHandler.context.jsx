import { createContext, useReducer } from "react";

export const ErrorInfoContext = createContext({
    errorInfo:{},
    setErrorInfo:()=>{},
    clearErrorInfo:()=>{}
})

const INITIAL_VALUES = {errorInfo:{}}

const errorReducer = (state, action)=>{
    const {type, payload} = action

    switch(type){
        case "SET_ERROR":
            return {...state, errorInfo:{...state.errorInfo, ...payload}}
        case "CLEAR_ERROR":
            return INITIAL_VALUES
        default:
            return state
    }
}

export const ErrorInfoProvider = ({children})=>{
    const [state, dispatch] = useReducer(errorReducer, INITIAL_VALUES)

    const setErrorInfo = (payload)=>{
        dispatch({
            type:"SET_ERROR",
            payload
        })
    }

    const clearErrorInfo = ()=>{
        dispatch({
            type:"CLEAR_ERROR"
        })
    }

    return(
        <ErrorInfoContext.Provider value={{...state, setErrorInfo, clearErrorInfo}}>
            {children}
        </ErrorInfoContext.Provider>
    )
}