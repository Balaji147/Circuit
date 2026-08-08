import { DataTypes } from "sequelize";
import sequelize from "../db_.js";
import { allowedGenders } from "../helpers/constValues.js";

const UsersInfo = sequelize.define("UsersInfo", {
    circuit_users_info_id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    ref_users_auth_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    ref_company_info_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    user_designation:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    employee_id:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    employee_gender:{
        type:DataTypes.ENUM(allowedGenders),
        allowNull:true
    },
    employee_profile_pic:{
        type:DataTypes.TEXT,
        allowNull:false,
        defaultValue:'https://shorturl.at/tiu0I'
    },
    onboard_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    edited_by_emp:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    is_active_employee:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},
{
    modelName:'UsersInfo',
    tableName:'circuit_users_info',
    timestamps:true,
    underscored:true
})

export default UsersInfo