import pool from "../../db.js"

export const createNewTask = async(req, res, next)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"You are Not Authorized to create Task"}})
        const {title, desc, allocated_to, status, dueDate, priority} = req.body
        const allocated_by = req.user.id
        
        const createNewTask = `INSERT INTO circuit_task_info (task_title, task_description, task_priority_level, task_status,
        task_allocated_by, task_allocated_to, task_due_date) values
        ($1, $2, $3, $4, $5, $6, $7)`
        await pool.query("BEGIN")
        await pool.query(createNewTask, [title, desc, priority, status, allocated_by, allocated_to, dueDate])
        await pool.query("COMMIT")
        res.status(202).json({message:"New Task Has Been Created Successfully"})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Can't Create Task"}})
    }
}

export const getAllTasks = async(req, res)=>{
    console.log("body", req.user.id)
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"User is Not Authorized"}})
        const taskInfo = {}
        const queryValues = req.query
        const valueArr = [req.user.id]
        let getUserTasks = `SELECT ROW_NUMBER() OVER () AS index_no, circuit_task_info_id, task_title, task_description, task_priority_level, task_status,
        task_allocated_by, task_allocated_to, task_due_date, task_created_dttm from circuit_task_info where task_allocated_to = $1`
        let index = 2
        if(queryValues.Status){
            getUserTasks += ` and task_status = $${index}`
            valueArr.push(queryValues.Status)
            index++
        }
        if(queryValues.Priority){
            getUserTasks += ` and task_priority_level = $${index}`
            valueArr.push(queryValues.Priority)
        }
        let user_tasks = await pool.query(getUserTasks, valueArr)
        taskInfo.user_tasks = user_tasks.rows
        const countOfAllTasks = `SELECT COUNT(*) AS all_tasks,
        count(*) FILTER (where task_due_date < now() and task_status != 'done') as over_due_task,
        count(*) FILTER (where task_status = 'todo') as todo_task,
        count(*) FILTER (where task_status = 'in_progress') as in_progress_task,
        count(*) FILTER (where task_status = 'done') as done_task
        FROM circuit_task_info`
        let all_tasks = await pool.query(countOfAllTasks)
        taskInfo.all_tasks = all_tasks.rows
        
        return res.status(200).json({taskInfo})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Fetching Failed"}})
    }
}

export const updateTask = async(req, res)=>{
    try{
        if(!req.user)
            return res.status(401).json({errorInfo:{all:"You are not authorized to update it"}})
        const {taskId} = req.params
        const {id} = req.user
        if(!taskId) return res.status(404).json({errorInfo:{all:"There is No Task"}})
        const {title, desc, allocated_to, status, dueDate, priority} = req.body
        const getTaskInfo = `SELECT task_allocated_to FROM circuit_task_info WHERE circuit_task_info_id = $1`
        const {rows, rowCount} = await pool.query(getTaskInfo, [taskId])
        if(rowCount === 0) return res.status(404).json({errorInfo:{all:"There is No Task"}})
        if(rows[0].task_allocated_to !== id) 
            return res.status(401).json({errorInfo:{all:"You are not authorized to update it"}})
        const updateQry = `UPDATE circuit_task_info SET task_title = $1, task_description = $2, task_priority_level = $3
        , task_allocated_by = $4, task_allocated_to = $5, task_due_date = $6, task_status = $7  WHERE circuit_task_info_id = $8`        
        await pool.query(updateQry, [title, desc, priority, id, allocated_to, dueDate, status, taskId])
        res.status(202).json({message:"Task Deatils Updated Successfully"})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Task updation Failed"}})
    }
}

export const deleteTask = async(req, res)=>{
    try{
        if(!req.user) res.status(401).json({errorInfo:{all:"You are not authorized to delete it"}})
            const {taskId} = req.params
        const {id} = req.user
        if(!taskId) return res.status(404).json({errorInfo:{all:"There is No Task"}})
        const getTaskInfo = `SELECT task_allocated_to FROM circuit_task_info WHERE circuit_task_info_id = $1`
        const {rows, rowCount} = await pool.query(getTaskInfo, [taskId])
        if(rowCount === 0) return res.status(404).json({errorInfo:{all:"There is No Task to Delete"}})
        if(rows[0].task_allocated_to !== id) 
            return res.status(401).json({errorInfo:{all:"You are not authorized to update it"}})
        const deleteQry = `DELETE FROM circuit_task_info WHERE circuit_task_info_id = $1`
        await pool.query(deleteQry, [taskId])
        return res.status(200).json({message:"Task Has Been Deleted Successfully"})
    }catch(er){
        return res.status(500).json({errorInfo:{all:"Task Deletion failed"}})
    }
}