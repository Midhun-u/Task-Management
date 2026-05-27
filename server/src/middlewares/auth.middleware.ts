import type { NextFunction, Response } from "express"
import { sendResponse } from "../utils/sendResponse.js"
import jwt from 'jsonwebtoken'
import { envVariables } from "../utils/envVariables.js"
import type { JWT_PAYLOAD } from "../types/jwtPayload.js"
import type { RequestWithUser } from "../types/requestWithUser.js"
import { UserModel } from "../models/user.model.js"

// Middleware for checking authentication
export const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {

    try {

        const bearerAuthToken = request.headers.authorization
        if (!bearerAuthToken) {
            return sendResponse({
                response: response,
                statusCode: 401,
                errorMessage: "Unauthorized user",
                success: false
            })
        }

        const authToken = bearerAuthToken.split(" ")[1] as string
        const payload = jwt.verify(authToken, envVariables.JWT_SECRET) as JWT_PAYLOAD

        if (!payload || !authToken) {
            return sendResponse({
                response: response,
                statusCode: 401,
                errorMessage: "Unauthorized user",
                success: false
            })
        }

        const user = await UserModel.getUserById(payload.id)
        if(user){
            request.user = payload
            return next()
        }

        throw new Error("Unauthorized user")

    } catch (error) {
        return sendResponse({
            response: response,
            statusCode: 401,
            errorMessage: "Unauthorized user",
            success: false
        })
    }

}