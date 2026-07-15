import bcrypt from "bcryptjs"
import pool from "../../db.js"
import jwt from "jsonwebtoken"
import {generateCompanyId} from "../helpers/partner.functions.js"
import {CompanyInfo, UsersAuth} from "../models/index.js"

const jwt_key = process.env.JWT_SECRET_KEY

export const authCreateUser = async(req, res, next)=>{
    const client = await pool.connect()
    try{
        let {name, company_name, email, password} = req.body
        const hashedPWD = await bcrypt.hash(password, 10)
        await client.query("BEGIN")
        const unique_id = generateCompanyId(company_name)
        const createNewCompany = await CompanyInfo.create(
            {company_name}
        )
        
        const company_id = createNewCompany.circuit_company_info_id
        const {circuit_users_auth_id, name_of_user, user_role, user_mailid, ct_company_id} = await UsersAuth.create({
            name_of_user:name,
            user_mailid:email,
            user_role:"admin",
            user_password:hashedPWD,
            ct_company_id:company_id
        })
        
        const payload = {userid:circuit_users_auth_id, user_name:name_of_user, user_role:user_role, user_mailid:user_mailid, cid:ct_company_id}
    
        const token = jwt.sign(payload, jwt_key, {expiresIn:'60m'})
        
        if(token){
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 20 * 60 * 1000
                })
            
            return res.json({message:"User Registration Successfull"})
        }

        return res.status(500).json({errorInfo:{all:"Registration Failed"}})
    }catch(er){
        next(er)
    }
}

export const authLoginUser = async(req, res, next)=>{
    try{
        let {email, password} = req.body
        const existingUser = await UsersAuth.findOne({
            attributes:[
                "circuit_users_auth_id",
                "user_password",
                "user_role",
                "name_of_user",
                "user_mailid"
            ],
            include:{
                model:CompanyInfo,
                as:"company",
                attributes:["circuit_company_info_id"]
            },
            where:{user_mailid:email}
        })
        
        if(!existingUser)
            return res.status(404).json({warningInfo:{all:"User Doesn't Exist"}})
        
        const rowValues = existingUser
        const user_password = existingUser.user_password
        const isMatchFound = await bcrypt.compare(password, user_password)
        
        if(!isMatchFound) return res.status(401).json({warningInfo:{all:"User Credential is Wrong"}})
        
        const payload = {userid:rowValues.circuit_users_auth_id, user_name:rowValues.name_of_user, user_role:rowValues.user_role, user_mailid:rowValues.user_mailid, cid:rowValues.company.circuit_company_info_id}
        
        const token = jwt.sign(payload, jwt_key, {expiresIn:"60m"})
        
        if(token){
            res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"?"none":"lax",
            maxAge: 60 * 60 * 1000
            })
            return res.status(200).json({message:"Loged In Successfully"})
        }

        return res.status(500).json({warningInfo:{all:"Login Failed"}})
    }catch(er){
        console.log(er)
        return res.status(500).json({warningInfo:er})
    }
}

export const authGetMe = async(req, res)=>{
    try{
        const user_id = req.user.userid
        if(!user_id) return res.status(404).json({errorInfo:{all:"Invalid User"}})
        return res.status(200).json({user_data:req.user})
    }catch(err){
        return res.status(500).json({errorInfo:{all:err}})
    }
}

export const authLogoutUser = async(req, res)=>{
    try{
        res.clearCookie("accessToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax"
        })

        return res.json({
            message:"Logout Successfully"
        })
    }catch(err){
        return res.status(500).json({errorInfo:{all:err}})
    }
}