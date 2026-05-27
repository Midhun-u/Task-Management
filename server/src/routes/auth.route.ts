import express from 'express'
import { signController } from '../controllers/auth/sign.controller.js'
import { loginController } from '../controllers/auth/login.controller.js'
import { getProfileController } from '../controllers/auth/getProfile.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const authRouter = express()

// Route for registering user
authRouter.post('/sign', signController)

// Route for loging
authRouter.post("/login", loginController)

// Route for getting user profile
authRouter.get("/get-profile", authMiddleware, getProfileController)