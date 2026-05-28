import express from 'express'
import { envVariables } from './utils/envVariables.js'
import { connectDatabase } from './config/sequelize.js'
import { authRouter } from './routes/auth.route.js'
import cors from 'cors'
import morgan from 'morgan'
import { projectRouter } from './routes/project.route.js'
import { taskRouter } from './routes/task.route.js'

// App instance
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: envVariables.APP_URL as string,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(morgan("dev"))

// Routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/task", taskRouter)
app.use("", (request, response) => response.status(404).json({success: false, error: "Route is not found", statusCode: 404}))

app.listen(envVariables.PORT, async () => {
    await connectDatabase()
    console.log(`Server is running on ${envVariables.PORT}`)
})