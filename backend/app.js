import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./src/routers/authRouter.js"
import userRouter from "./src/routers/userRouter.js"
import taskRouter from "./src/routers/taskRouter.js"
import { auth } from "./src/middlewares/autheticate_user.middleware.js"

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/auth", authRouter)
app.use(auth)
app.use("/users", userRouter)
app.use("/tasks", taskRouter)

app.listen(port, ()=>{
    console.log(`Started At Port ${port}`)
})

