import pool from "../../db.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import UsersAuth from "../models/circuit_users_auth.js"
import { Op, Sequelize } from "sequelize"
const client = await pool.connect()

export const getEmployeesList = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(404).json({warningInfo:"User Not Available"})

        const {cid} = req.user
        const {emp_name} = req?.query
        
        let whereConditions = {ct_company_id:cid}
        if(emp_name){
            whereConditions.name_of_user = {
                [Op.iLike]: `%${emp_name}%`
            }
        }
        let resEmplQry = await UsersAuth.findAll({
            attributes:[
                [Sequelize.literal(`ROW_NUMBER() OVER()`), 'index_no'],
                'circuit_users_auth_id',
                'name_of_user',
                'user_mailid', 
                'employee_id', 
                'created_at',
                'user_designation',
                'user_role'
            ],
            where:whereConditions
        })
        
        if(!resEmplQry)
            return res.status(404).json({warningInfo:"Employees Not Available"})

        return res.status(200).json({rows:resEmplQry})
    }catch(err){
        console.log(err)
        return res.status(500).json({warningInfo:"Something went wrong"})
    }
}

export const insertEmployee = async(req, res, next)=>{
    try{
        if(!req.user)return res.status(404).json({warningInfo:"User Not Available"})

        const {userid, cid, user_role} = req.user

        if(user_role === "admin"){
            const {name_of_user, emp_designation, emp_mailid, emp_password, admin_ind, auto_pwd_ind} = req.body
            const final_password = auto_pwd_ind ? crypto.randomBytes(6).toString("base64").slice(0, 8) : emp_password
            const is_as_admin = admin_ind ? "same_as_admin" : "not_admin"
            const hashedPWD = await bcrypt.hash(final_password, 10)
            await UsersAuth.create({
                name_of_user:name_of_user,
                user_mailid:emp_mailid,
                user_password:hashedPWD,
                ct_company_id:cid,
                user_temp_password:final_password,
                user_designation:emp_designation,
                user_role:is_as_admin
            })
            return res.status(202).json({message:"New Employee Created Successfully"})
        }
        else 
            return res.status(404).json({message:"You can't Create Employee"})

    }
    catch(err){
        return res.status(500).json({warningInfo:"Something Went Wrong"})
    }
}