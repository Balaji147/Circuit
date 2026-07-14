import { DataTypes } from "sequelize";
import sequelize from "../db_.js";
import { allowedPeriorities, allowedStatus } from "../helpers/constValues.js";

const TasksInfo = sequelize.define("TasksInfo", {
    circuit_task_info_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    task_title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    task_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    task_priority_level: {
        // Mapping your custom Postgres ENUM type
        type: DataTypes.ENUM(allowedPeriorities), 
        allowNull: true,
        defaultValue: 'low'
    },
    task_status: {
        // Mapping your custom Postgres ENUM type
        type: DataTypes.ENUM(allowedStatus), // Add any other statuses you have defined in your DB
        allowNull: true,
        defaultValue: 'todo'
    },
    task_allocated_by: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    task_allocated_to: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    task_due_date: {
        type: DataTypes.DATEONLY, // Maps perfectly to Postgres 'date' (ignores the time portion)
        allowNull: true
    },
    task_created_dttm: {
        type: DataTypes.DATE, // Maps to 'timestamp with time zone'
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    ct_company_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    task_unique_id: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    modelName: 'TasksInfo',
    tableName: 'circuit_task_info',
    timestamps: false,
    underscored: true
});

export default TasksInfo;