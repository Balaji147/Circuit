import { DataTypes } from "sequelize";
import sequelize from "../db_.js";

const CompanyInfo = sequelize.define("CompanyInfo", {
    circuit_company_info_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Handles 'generated always as identity'
        allowNull: false
    },
    company_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type_of_company: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    company_sites_link: {
        type: DataTypes.JSONB, // Maps perfectly to Postgres JSONB
        allowNull: true
    },
    company_logo: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'https://shorturl.at/G8gt8'
    },
    task_id_string: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    next_task_number: {
        type: DataTypes.NUMERIC, // Maps perfectly to Postgres numeric
        allowNull: true,
        defaultValue: 1
    }
}, {
    modelName: 'CompanyInfo',
    tableName: 'circuit_company_info',
    timestamps: false,
    underscored: true
});

export default CompanyInfo;