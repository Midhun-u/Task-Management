import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Project schema
export const Project = sequelize.define("project", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})