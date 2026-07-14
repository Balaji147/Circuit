import { where } from "sequelize"
import UsersAuth from "../models/circuit_users_auth.js"

export const getUser = async(req, res)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"User Not Authorized"}})
        const {cid} = req.user
        const getAllUsers = await UsersAuth.findAll(
            {
                attributes:["circuit_users_auth_id", "name_of_user"],
                where:{
                    ct_company_id:cid
                }
            },
        )

        if(!getAllUsers)
            return res.status(404).json({message:"not avail"})
        return res.status(200).json({rows:getAllUsers})
        
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Failed To Load"}})
    }
}