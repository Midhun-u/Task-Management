import { Sequelize } from "sequelize";
import { envVariables } from "../utils/envVariables.js";

// Sequelize Instance
export const sequelize = new Sequelize({
    dialect: "postgres",
    username: envVariables.DB_USER_NAME,
    host: envVariables.DB_HOST,
    password: envVariables.DB_PASSWORD,
    database: envVariables.DB_NAME,
    port: envVariables.DB_PORT,
    logging: false,
})

// Function for connecting database 
export const connectDatabase = async () => {

    try {
        
        await sequelize.authenticate()
        await sequelize.sync({alter: true}) 

        console.log(`Database is connected`)

    } catch (error) {
        console.log(`Database is couldn't connect due to ${error}`)
    }

}