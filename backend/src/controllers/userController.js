import pool from "../../db.js"

export const getUser = async(req, res)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"User Not Authorized"}})
        const getAllUsers = `SELECT circuit_users_auth_id, name_of_user from circuit_users_auth`
        const {rowCount, rows} = await pool.query(getAllUsers)
        if(rowCount === 0)
            return res.status(404).json({message:"not avail"})
        return res.status(200).json({rows})
        
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Failed To Load"}})
    }
}