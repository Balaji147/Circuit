import { Router } from "express";
import {field_validation} from "../middlewares/auth_validation.middleware.js"
import { createNewTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController.js"

const router = Router()

router.post("/createTask", field_validation, createNewTask)

router.get("/getTasks", getAllTasks)

router.put("/updateTask/:taskId", updateTask)

router.delete("/deleteTask/:taskId", deleteTask)

export default router