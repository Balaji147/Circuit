import { DataTypes } from "sequelize";
import sequelize from "../db_.js";
import { allowedStatus } from "../helpers/constValues.js";

const TaskHistory = sequelize.define("TaskHistory", {
    circuit_task_history_id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    ref_company_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    ref_task_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    task_status: {
        type: DataTypes.ENUM(allowedStatus),
        allowNull: true
    },
    task_allocated_by: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    task_allocated_to: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    task_documents:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
    },
    task_status_desc:{
        type:DataTypes.STRING,
        allowNull:true
    },
    history_for:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"insert"
    }
},
{
    modelName:"TaskHistory",
    tableName:"circuit_task_history",
    timestamps:true
})

export default TaskHistory