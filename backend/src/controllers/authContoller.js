import bcrypt from "bcryptjs"
import pool from "../../db.js"
import jwt from "jsonwebtoken"

const jwt_key = process.env.JWT_SECRET_KEY

export const authCreateUser = async(req, res, next)=>{
    const client = await pool.connect()
    try{
        let {name, company_name, email, password} = req.body
        const hashedPWD = await bcrypt.hash(password, 10)
        await client.query("BEGIN")
        const createNewCompany = `INSERT INTO circuit_company_info (company_name) values
        ($1) RETURNING circuit_company_info_id`
        const company_info = await pool.query(createNewCompany, [company_name])
        const company_id = company_info.rows[0].circuit_company_info_id
        
        const createNewUser = `INSERT INTO circuit_users_auth (name_of_user, user_mailid, user_password, ct_company_id) values
        ($1, $2, $3, $4) RETURNING circuit_users_auth_id, name_of_user, user_mailid`
        const {rows} = await client.query(createNewUser, [name, email, hashedPWD, company_id])
        await client.query("COMMIT")
        const payload = {userid:rows[0].circuit_users_auth_id, user_name:rows[0].name_of_user, user_name:rows[0].user_role, user_mailid:rows[0].user_mailid, cid:company_id}
        const token = jwt.sign(payload, jwt_key, {expiresIn:'20m'})
        
        if(token){
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 20 * 60 * 1000
                })
            
            return res.json({message:"User Registration Successfull"})
        }

        return res.status(500).json({errorInfo:{all:"Registration Failed"}})
    }catch(er){
        await client.query("ROLLBACK")
        next(er)
    }finally{
        client.release()
    }
}

export const authLoginUser = async(req, res, next)=>{
    try{
        let {email, password} = req.body
        const existingUser = `SELECT cua.circuit_users_auth_id, cua.user_password, cua.user_role,  cua.name_of_user, cua.user_mailid, cci.circuit_company_info_id
            FROM circuit_users_auth cua join circuit_company_info cci on cua.ct_company_id =  cci.circuit_company_info_id
            WHERE cua.user_mailid = $1`

        const {rowCount, rows} = await pool.query(existingUser, [email])
        console.log("erer", email)
        if(rowCount === 0)
            return res.status(404).json({errorInfo:{all:"User Doesn't Exist"}})
        
        const rowValues = rows[0]
        const user_password = rowValues.user_password
        const isMatchFound = await bcrypt.compare(password, user_password)
        
        if(!isMatchFound) return res.status(401).json({errorInfo:{all:"User Credential is Wrong"}})
        
        const payload = {userid:rowValues.circuit_users_auth_id, user_name:rowValues.name_of_user, user_role:rowValues.user_role, user_mailid:rowValues.user_mailid, cid:rowValues.circuit_company_info_id}
        console.log("pay", payload)
        const token = jwt.sign(payload, jwt_key, {expiresIn:"60m"})
        
        if(token){
            res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"?"none":"lax",
            maxAge: 20 * 60 * 1000
            })
            return res.status(200).json({message:"Loged In Successfully"})
        }

        return res.status(500).json({errorInfo:{all:"Login Failed"}})
    }catch(er){
        return res.status(500).json({errorInfo:er})
    }
}

export const authGetMe = async(req, res)=>{
    try{
        const user_id = req.user.userid
        if(!user_id) return res.status(404).json({errorInfo:{all:"Invalid User"}})
            console.log("getauth", req.user)
        return res.status(200).json({user_data:req.user})
    }catch(err){
        console.log(err)
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