import express from 'express'
import { envVariables } from './utils/envVariables.js'

// App instance
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(envVariables.PORT, () => {
    console.log(`Server is running on ${envVariables.PORT}`)
})