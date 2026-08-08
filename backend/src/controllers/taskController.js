import { Op, Sequelize, where } from "sequelize"
import pool from "../../db.js"
import CompanyInfo from "../models/circuit_company_info.js"
import UsersAuth from "../models/circuit_users_auth.js"
import TasksInfo from "../models/circuit_task_info.js"

export const createNewTask = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"You are Not Authorized to create Task"}})
        const {title, desc, allocated_to, status, dueDate, priority} = req.body
        const {userid, cid} = req.user

        const qryTaskIdString = await CompanyInfo.update(
            {
                next_task_number:Sequelize.literal('next_task_number + 1')
            },
            {
                where:{circuit_company_info_id: cid},
                returning:[
                    'next_task_number',
                    'task_id_string'
                ],
                plain:true
            }
        )

        await pool.query("BEGIN")
        
        let {task_id_string, next_task_number} = qryTaskIdString[1]?.dataValues
        let current_task_number = next_task_number - 1

        let insert_task_id = `${task_id_string}-${String(current_task_number).padStart(5, "0")}`
        const createNewTaskQry = await TasksInfo.create({
            task_title:title,
            task_description:desc,
            task_priority_level:priority,
            task_status:status,
            task_allocated_by:userid,
            task_allocated_to:allocated_to,
            task_due_date:dueDate,
            ct_company_id:cid,
            task_unique_id:insert_task_id
        })
        
        res.status(202).json({message:"New Task Has Been Created Successfully"})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Can't Create Task"}})
    }
}

export const getAllTasks = async(req, res)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"User is Not Authorized"}})
        
        const taskInfo = {}
        const {cid, userid, user_role} = req?.user
        
        const {Status, Priority, sr_name} = req.query
        let userValueArr = [cid]
        let whereConditions = {ct_company_id:cid}
        if(user_role != "admin")
            whereConditions.task_allocated_to = userid
        if(Status) whereConditions.task_status = Status
        if(Priority) whereConditions.task_priority_level = Priority
        if(sr_name){
            whereConditions.task_title = {
                [Op.iLike]:`%${sr_name.trim()}%`
            }
        }
        let getUserTasks = await TasksInfo.findAll({
            attributes:[
                [Sequelize.literal('ROW_NUMBER() OVER()'), 'index_no'],
                'circuit_task_info_id', 'task_title', 'task_description', 'task_priority_level', 'task_status',
                'task_allocated_by', 'task_allocated_to', 'task_due_date', 'task_created_dttm', 'task_unique_id'
            ],
            where:whereConditions,
            raw:true
        })
        taskInfo.user_tasks = getUserTasks
        
        whereConditions = {ct_company_id:cid}
        if(user_role != "admin")
            whereConditions.task_allocated_to = userid
        let countOfAllTasks = await TasksInfo.findAll({
            attributes:[
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'all_tasks_cnt'],
                [
                    Sequelize.literal(`count(*) FILTER (where task_due_date < now() and task_status != 'done')`),
                    'over_due_task'
                ],
                [
                    Sequelize.literal(`count(*) FILTER (where task_status = 'todo')`),
                    'todo_task'
                ],
                [
                    Sequelize.literal(`count(*) FILTER (where task_status = 'in_progress')`),
                    'in_progress_task'
                ],
                [
                    Sequelize.literal(`count(*) FILTER (where task_status = 'done')`),
                    'done_task'
                ],
            ],
            where:whereConditions,
            raw:true
        })
        
        taskInfo.all_tasks = countOfAllTasks
        
        return res.status(200).json({taskInfo})
    }catch(er){
        console.log(er)
        return res.status(500).json({errorInfo:{all:"Fetching Failed"}})
    }
}

export const updateTask = async(req, res)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"You are not authorized to update it"}})
        const {taskId} = req.params
        const {userid} = req.user
        if(!taskId) return res.status(404).json({errorInfo:{all:"There is No Task"}})
        const {title, desc, allocated_to, status, dueDate, priority} = req.body
        const getTaskInfo = await TasksInfo.findByPk(taskId,{attributes:['circuit_task_info_id', 'task_allocated_to']})
        if(!getTaskInfo) return res.status(404).json({errorInfo:{all:"There is No Task"}})

        if(getTaskInfo.task_allocated_to !== userid) 
            return res.status(401).json({errorInfo:{all:"You are not authorized to update it"}})
        await getTaskInfo.update({
                task_title:title,
                task_description:desc,
                task_priority_level:priority,
                task_allocated_by:userid,
                task_allocated_to:allocated_to,
                task_due_date:dueDate,
                task_status:status
            }
        )
        res.status(202).json({message:"Task Deatils Updated Successfully"})
    }catch(er){
        console.log(er)
        return res.status(500).json({errorInfo:{all:"Task updation Failed"}})
    }
}

export const deleteTask = async(req, res)=>{
    try{
        if(!req.user) 
            res.status(401).json({errorInfo:{all:"You are not authorized to delete it"}})
        const {taskId} = req.params
        const {user_role} = req.user
        if(!taskId) 
            return res.status(404).json({errorInfo:{all:"There is No Task"}})
        const getTaskInfo = await TasksInfo.findByPk(taskId)
        if(!getTaskInfo) return res.status(404).json({errorInfo:{all:"There is No Task to Delete"}})
        if(user_role !== "admin") 
            return res.status(401).json({errorInfo:{all:"You are not authorized to delete it"}})
        await getTaskInfo.destroy()
        return res.status(200).json({message:"Task Has Been Deleted Successfully"})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Task Deletion failed"}})
    }
}