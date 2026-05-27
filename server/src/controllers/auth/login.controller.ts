import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import type { AuthBody } from "../../types/authBody.js";
import { authValidator } from "../../validators/authValidator.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserModel } from "../../models/user.model.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { generateToken } from "../../utils/generateToken.js";
import { excludePassword } from "../../utils/excludePassword.js";

// Controller for loging
export const loginController = handleError(async (request: Request, response: Response) => {

    const body = request.body as AuthBody || {}

    const validator = authValidator(body, "login")
    if (!validator.success || !validator.fields || validator.error) {
        return sendResponse({
            response: response,
            statusCode: 400,
            success: false,
            errorMessage: validator.error
        })
    }

    // Checking if user registered
    const user = await UserModel.getUserByEmailWithPassword(validator.fields.email)
    if (!user) {
        return sendResponse({
            response: response,
            success: false,
            statusCode: 404,
            errorMessage: "Email or password is incorrect"
        })
    }

    // Checking if password is correct
    const isPasswordCorrect = await comparePassword(validator.fields.password, user.password)
    if (!isPasswordCorrect) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "Email or password is incorrect",
            statusCode: 400
        })
    }

    const authToken = await generateToken(user.id, user.email, user.fullname)
    return sendResponse({
        response: response,
        success: true,
        statusCode: 200,
        data: {
            user: excludePassword(user),
            authToken: authToken
        }
    })

}, "loginController error")