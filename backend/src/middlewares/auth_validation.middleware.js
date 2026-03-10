import {isValidEmail, isValidString} from "../helpers/validation.function.js"
import pool from "../../db.js"

export const auth_validation = (endpoint="login")=>{
    return async(req, res, next)=>{
        try{
            let {name, email, password} = req.body
            const warningInfo = {}
            if(endpoint !== "login")
            {
                if(!name)
                    warningInfo.name = "Name can't be empty"
                else if(!isValidString(name))
                    warningInfo.name = "Give me the Valid Name"
            }
            
            if(!email)
                warningInfo.email = "Email can't be empty"
            else if(!isValidEmail(email))
                warningInfo.email = "Give the the Valid E-Mail"

            if(!password)
                warningInfo.password = "Password can't be empty"
            else if(password.length < 8)
                warningInfo.password = "Password should be atleast 8 character minimum"
            if(Object.keys(warningInfo).length > 0)
                return res.status(400).json({warningInfo})

            if(endpoint === "logon"){
                const existingUser = `SELECT circuit_users_auth_id from circuit_users_auth where user_mailid = $1`
                const {rowCount} = await pool.query(existingUser, [email])
                if(rowCount > 0){
                    return res.status(400).json({warningInfo:{all:"User Already Exist, Try to Login or Diffrent Mail id"}})
                }
            }
            
            next()
        }catch(er){
            console.log(er)
            next(er)
        }
    }
}

export const field_validation = (req, res, next)=>{
    try{
        const minDate = new Date().toISOString().split("T")[0]
        const {title, desc, allocated_to, status, dueDate, priority} = req.body
        const warningInfo = {}
        if(!title)
            warningInfo.title = "Title Can't be Empty"
        else if(title.length > 20)
            warningInfo.title = "Title Can't be More than 20 character"
        if(!allocated_to)
            warningInfo.allocated_to = "For Who need you need to allocate"
        if(!status)
            warningInfo.status = "Select Status of the Task"
        if(!priority)
            warningInfo.priority = "Select Priority of the Task"
        if(!dueDate)
            warningInfo.dueDate = "Select Due date of the Task"
        if(dueDate < minDate)
            warningInfo.dueDate = "Select Valid Due date"
        
        if(Object.keys(warningInfo).length > 0){
            return res.status(400).json({warningInfo})
        }
        next()
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Validation Failed"}})
    }
}