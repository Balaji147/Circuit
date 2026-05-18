import { Router } from "express";
import { getCompanyInfo } from "../controllers/companyController.js";
const router = Router()

router.get("/getCompanyInfo", getCompanyInfo)

export default router