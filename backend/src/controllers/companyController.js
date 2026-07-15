import { Sequelize } from "sequelize"
import pool from "../../db.js"
import sequelize from "../db_.js"
import CompanyInfo from "../models/circuit_company_info.js"
import UsersAuth from "../models/circuit_users_auth.js"

export const getCompanyInfo = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(403).json({warningInfo:"Not Authorized"})
        const {cid} = req.user

        const [companyData] = await sequelize.query(`SELECT 
            cci.*,
            (
                SELECT name_of_user
                FROM circuit_users_auth
                WHERE ct_company_id = cci.circuit_company_info_id
                AND user_role = 'admin'
                LIMIT 1
            ) AS admin_name,
            (
                SELECT COUNT(*)
                FROM circuit_users_auth
                WHERE ct_company_id = cci.circuit_company_info_id
            ) AS employee_cnt

        FROM circuit_company_info cci
        WHERE cci.circuit_company_info_id = :cid`,
        {
            replacements:{cid},
            type:Sequelize.QueryTypes.SELECT
        })
        
        if(!companyData)
            return res.status(404).json({warningInfo:"Seems There is no Company"})

        return res.status(202).json({companyData})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({warningInfo:"Can't get Company Info"})
    }
}

