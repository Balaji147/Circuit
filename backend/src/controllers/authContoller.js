import bcrypt from "bcryptjs"
import pool from "../../db.js"
import jwt from "jsonwebtoken"

const jwt_key = process.env.JWT_SECRET_KEY

export const authCreateUser = async(req, res, next)=>{
    try{
        let {name, email, password} = req.body
        const hashedPWD = await bcrypt.hash(password, 10)
        await pool.query("BEGIN")
        const createNewUser = `INSERT INTO circuit_users_auth (name_of_user, user_mailid, user_password) values
        ($1, $2, $3) RETURNING circuit_users_auth_id, name_of_user, user_mailid`
        const {rows} = await pool.query(createNewUser, [name, email, hashedPWD])
        await pool.query("COMMIT")
        const payload = {id:rows[0].circuit_users_auth_id, user_name:rows[0].name_of_user, user_mailid:rows[0].user_mailid}
        const token = jwt.sign(payload, jwt_key, {expiresIn:'20m'})
        
        if(token){
            res.cookie("accessToken", token, {
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:"lax",
                maxAge:20*60*1000
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
        const existingUser = `SELECT circuit_users_auth_id, user_password, name_of_user, user_mailid FROM circuit_users_auth WHERE user_mailid = $1`

        const {rowCount, rows} = await pool.query(existingUser, [email])

        if(rowCount === 0)
            return res.status(404).json({errorInfo:{all:"User Doesn't Exist"}})
        const rowValues = rows[0]
        const user_password = rowValues.user_password
        const isMatchFound = await bcrypt.compare(password, user_password)
        
        if(!isMatchFound) return res.status(401).json({errorInfo:{all:"User Credential is Wrong"}})
        
        const payload = {id:rowValues.circuit_users_auth_id, user_name:rowValues.name_of_user, user_mailid:rowValues.user_mailid,}
        const token = jwt.sign(payload, jwt_key, {expiresIn:"60m"})
        
        if(token){
            res.cookie("accessToken", token, {
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:"lax",
                maxAge:60*60*1000
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
        const user_id = req.user.id
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