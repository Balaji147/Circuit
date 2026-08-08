import { Router } from "express";
import { getEmployeesList, insertEmployee } from "../controllers/employeeController.js";
import {auth_validation} from "../middlewares/auth_validation.middleware.js"
const router = Router()

router.get("/getEmployeesList", getEmployeesList)

router.post("/insertEmployee", insertEmployee)

export default router