import {Router} from "express";
import { getTaskHistory } from "../controllers/taskHistoryController.js";

const router = Router()

router.get("/getTaskHist/:taskId", getTaskHistory)

export default router
