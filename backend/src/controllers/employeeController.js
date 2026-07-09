import pool from "../../db.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"
const client = await pool.connect()

export const getEmployeesList = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(404).json({warningInfo:"User Not Available"})

        const {cid} = req.user
        const {emp_name} = req?.query
        
        const paramsArr = [cid]
        let emplQry = `SELECT ROW_NUMBER() OVER() as index_no, circuit_users_auth_id, 
                        name_of_user, user_mailid, employee_id, created_at, 
                        user_designation, user_role from circuit_users_auth where ct_company_id = $1`
        if(emp_name){
            emplQry +=` and name_of_user ilike $2`
            paramsArr.push(`%${emp_name}%`)
        }
        
        const {rows, rowCount} = await pool.query(emplQry, paramsArr)
        if(rowCount === 0)
            return res.status(404).json({warningInfo:"Employees Not Available"})

        return res.status(200).json({rows})
    }catch(err){
        return res.status(500).json({warningInfo:"Something went wrong"})
    }
}

export const insertEmployee = async(req, res, next)=>{
    try{
        if(!req.user)return res.status(404).json({warningInfo:"User Not Available"})

        const {userid, cid} = req.user

        const chkAdminUser = `SELECT user_role from circuit_users_auth where circuit_users_auth_id = $1`
        const {rows, rowCount} = await pool.query(chkAdminUser, [userid])
        
        if(rowCount === 0)
            return res.status(404).json({warningInfo:"Employees Not Available"})

        if(rows[0].user_role === "admin"){
            const {name_of_user, emp_designation, emp_mailid, emp_password, admin_ind, auto_pwd_ind} = req.body
            const final_password = auto_pwd_ind ? crypto.randomBytes(6).toString("base64").slice(0, 8) : emp_password
            const is_as_admin = admin_ind && "same_as_admin"
            const hashedPWD = await bcrypt.hash(final_password, 10)
            await client.query("BEGIN")
            const createNewUser = `INSERT INTO circuit_users_auth (name_of_user, user_mailid, user_password, ct_company_id, user_temp_password,
            user_designation, user_role) values
            ($1, $2, $3, $4, $5, $6, $7)`
            await client.query(createNewUser, [name_of_user, emp_mailid, hashedPWD, cid, final_password, emp_designation, is_as_admin])
            await client.query("COMMIT")
            return res.status(202).json({message:"New Employee Created Successfully"})
        }
        else 
            return res.status(404).json({message:"You can't Create Employee"})

    }
    catch(err){
        await client.query("ROLLBACK")
        return res.status(500).json({warningInfo:"Something Went Wrong"})
    }
}