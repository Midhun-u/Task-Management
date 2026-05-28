import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { TaskModel } from "../../models/task.model.js";
import { sendResponse } from "../../utils/sendResponse.js";

// Controller for getting specific task
export const getTaskController = handleError(async (request: RequestWithUser, response: Response) => {

    const {id: userId} = request.user as JWT_PAYLOAD
    const {id} = request.params as {id: string}

    const task = await TaskModel.getTaskByIdAndUserId(id, userId)
    return sendResponse({
        response: response,
        statusCode: 200,
        success: true,
        data: task
    })

}, "getTaskController error")