import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    host:process.env.HOST,
    user:process.env.USER,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
})

pool.connect().then(()=>{
    console.log("Connected at Circuit")
})

export default pool