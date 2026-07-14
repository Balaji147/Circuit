import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Set to console.log if you want to see the raw SQL queries in your terminal
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

export default sequelize