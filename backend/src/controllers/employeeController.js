import pool from "../../db.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import {UsersAuth, UsersInfo} from "../models/index.js"
import { Op, Sequelize } from "sequelize"
import sequelize from "../db_.js"
const client = await pool.connect()

export const getEmployeesList = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(404).json({warningInfo:"User Not Available"})

        const {cid, user_role, userid} = req.user
        const {emp_name} = req?.query
        
        let whereConditions = {ct_company_id:cid}
        if(user_role != "admin")
            whereConditions.circuit_users_auth_id = userid
        // if(emp_name){
        //     whereConditions.name_of_user = {
        //         [Op.iLike]: `%${emp_name}%`
        //     }
        // }
        let resEmplQry = await UsersAuth.findAll({
            attributes:[
                // [Sequelize.literal(`ROW_NUMBER() OVER()`), 'index_no'],
                'circuit_users_auth_id',
                'name_of_user',
                'user_mailid',
                'created_at',
                'user_role'
            ],
            include:{
                model:UsersInfo,
                required:true,
                as:'userInfo',
                attributes:['circuit_users_info_id', 'user_designation', 'employee_id', 
                    'employee_gender', 'employee_profile_pic', 'onboard_date', 'is_active_employee']
            },
            where:whereConditions,
            nest:true
        })

        if(!resEmplQry)
            return res.status(404).json({warningInfo:"Employees Not Available"})

        return res.status(200).json({rows:resEmplQry})
    }catch(err){
        return res.status(500).json({warningInfo:"Something went wrong"})
    }
}

export const insertEmployee = async(req, res, next)=>{
    const transaction = await sequelize.transaction()
    try{
        if(!req.user)return res.status(404).json({warningInfo:"User Not Available"})
        
        const {cid, user_role} = req.user
        if(user_role === "admin"){
            const {name_of_user, emp_designation, emp_mailid, admin_ind, employee_id, onboard_date} = req.body
            const temp_password = crypto.randomBytes(6).toString("base64").slice(0, 8)
            const is_as_admin = admin_ind ? "same_as_admin" : "not_admin"
            const hashedPWD = await bcrypt.hash(temp_password, 10)
            
            const userAuth = await UsersAuth.create(
                {
                    name_of_user,
                    user_mailid:emp_mailid,
                    user_password:hashedPWD,
                    ct_company_id:cid,
                    user_temp_password:temp_password,
                    user_role:is_as_admin
                }
                ,{transaction}
            )

            await UsersInfo.create(
                {
                    ref_users_auth_id:userAuth.circuit_users_auth_id,
                    ref_company_info_id:cid,
                    user_designation:emp_designation,
                    employee_id,
                    onboard_date
                },
                {transaction}
            )
            await transaction.commit()
            return res.status(202).json({message:"New Employee Created Successfully"})
        }
        else 
            return res.status(404).json({message:"You can't Create Employee"})

    }
    catch(err){
        await transaction.rollback()
        console.log(err)
        return res.status(500).json({warningInfo:"Something Went Wrong"})
    }
}