import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// User schema
export const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(350),
        allowNull: false,
        unique: "users_email_key"
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})