import pool from "../../db.js"

export const getCompanyInfo = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(403).json({warningInfo:"Not Authorized"})
        const {cid} = req.user
        const companyDataQry = `SELECT 
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
        WHERE cci.circuit_company_info_id = $1;`
        const {rows, rowCount} = await pool.query(companyDataQry, [cid])
        
        if(rowCount === 0)
            return res.status(404).json({warningInfo:"Seems There is no Company"})

        return res.status(202).json({companyData:rows[0]})
        
    }catch(err){
        return res.status(500).json({warningInfo:"Can't get Company Info"})
    }
}

