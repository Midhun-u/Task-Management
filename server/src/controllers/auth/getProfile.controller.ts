import type { Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserModel } from "../../models/user.model.js";
import type { RequestWithUser } from "../../types/requestWithUser.js";

// Controller for getting user profile
export const getProfileController = handleError(async (request: RequestWithUser, response: Response) => {

    const {id} = request.user || {}

    if (!id) {
        return sendResponse({
            response: response,
            statusCode: 400,
            errorMessage: "User id is missing",
            success: false
        })
    }

    const user = await UserModel.getUserById(id)
    if (!user) {
        return sendResponse({
            response: response,
            success: false, 
            errorMessage: "User is not found", 
            statusCode: 404
        })
    }

    return sendResponse({
        response: response,
        success: true, 
        data: user, 
        statusCode: 200
    })

}, "getProfileController error")