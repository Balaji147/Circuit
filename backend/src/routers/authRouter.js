import { Router } from "express"
import {auth_validation, field_validation} from "../middlewares/auth_validation.middleware.js"
import { authCreateUser, authLoginUser, authGetMe, authLogoutUser } from "../controllers/authContoller.js"
import { auth } from "../middlewares/autheticate_user.middleware.js"

const router = Router()

router.post("/createUser", auth_validation("logon"), authCreateUser)

router.post("/loginUser", auth_validation("login"), authLoginUser)

router.get("/me", auth, authGetMe)

router.post("/logout", auth, authLogoutUser)

export default router