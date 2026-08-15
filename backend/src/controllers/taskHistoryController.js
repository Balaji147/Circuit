import { where } from "sequelize"
import { TaskHistory, TasksInfo, UsersAuth } from "../models/index.js"

export const getTaskHistory = async(req, res, next)=>{
    try{
        const {taskId} = req.params
        const {cid} = req.user
        const tasksHistList = await TaskHistory.findAll({
            include:[
                {
                    model:TasksInfo,
                    as:"task_info",
                    attributes:["task_title"]
                },
                {
                    model:UsersAuth,
                    as:"assigner_history",
                    attributes:["name_of_user"]
                },
                {
                    model:UsersAuth,
                    as:"assignee_history",
                    attributes:["name_of_user"]
                }
            ],
            where:{
                ref_task_id:taskId,
                ref_company_id:cid
            },
            nest:true,
            raw:true
        })
        console.log("dfs", tasksHistList)
        if(!tasksHistList) return res.status(404).json({errorInfo:{all:"Task Is't Available"}})
        res.status(202).json({tasksHistList})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed"})
    }
}