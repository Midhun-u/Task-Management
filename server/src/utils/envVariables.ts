import 'dotenv/config'

export const envVariables = {
    PORT: Number(process.env.PORT) || 5000,
    DB_USER_NAME: process.env.DB_USER_NAME as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PASSWORD:  process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_PORT: Number(process.env.DB_PORT),
    JWT_SECRET: process.env.JWT_SECRET as string,
    APP_URL: process.env.APP_URL as string
}