import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import type { AuthBody } from "../../types/authBody.js";
import { authValidator } from "../../validators/authValidator.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserModel } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/generateToken.js";

// Controller for registering user
export const signController = handleError(async (request: Request, response: Response) => {

    const body = request.body as AuthBody || {}

    const validator = authValidator(body, "sign")
    if (!validator.success || validator.error || !validator.fields) {
        return sendResponse({
            response: response,
            statusCode: 400,
            errorMessage: validator.error,
            success: false
        })
    }

    // Checking if email already exists
    const user = await UserModel.getUserByEmail(validator.fields.email)
    if (user) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "Email is already exists",
            statusCode: 400
        })
    }

    // Hashing password
    const hashedPassword = await hashPassword(validator.fields.password)
    const newUser = await UserModel.addUser({
        fullname: validator.fields.fullname as string,
        email: validator.fields.email,
        password: hashedPassword
    })


    if (newUser) {

        // Generating token
        const authToken = await generateToken(newUser.id, newUser.email, newUser.fullname)

        return sendResponse({
            response: response,
            statusCode: 201,
            message: "User is created",
            data: {
                user: newUser,
                authToken: authToken
            },
            success: true,
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "User couldn't create",
        success: false
    })

}, "signController error")