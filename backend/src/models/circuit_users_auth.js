import { DataTypes } from "sequelize";
import sequelize from "../db_.js"
import { allowedUserRoles } from "../helpers/constValues.js";

const UsersAuth = sequelize.define("UsersAuth", {
    circuit_users_auth_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Handles 'generated always as identity'
        allowNull: false
    },
    name_of_user: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_mailid: {
        type: DataTypes.STRING, // Sequelize uses standard types, PostgreSQL will treat it as 'citext' via your DB
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE, // Maps directly to 'timestamp with time zone'
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    user_role: {
        type: DataTypes.ENUM(allowedUserRoles),
        allowNull: false,
        defaultValue: 'admin'
    },
    ct_company_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    user_designation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_temp_password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    employee_id: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    }, {
        modelName: 'UsersAuth',
        tableName: 'circuit_users_auth', // Exact table name from your DB
        timestamps: false, // Prevents Sequelize from forcing its default 'updatedAt' and 'createdAt' columns
        underscored: true  // Keeps column naming conventions clean
    }
)

export default UsersAuth