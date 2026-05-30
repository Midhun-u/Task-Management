import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Task schema
export const Task = sequelize.define("task", {
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
    project_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed"),
        defaultValue: "pending"
    }
})