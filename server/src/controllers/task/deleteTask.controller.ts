import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { TaskModel } from "../../models/task.model.js";

// Controller for deleting task
export const deleteTaskController = handleError(async (request: RequestWithUser, response: Response) => {

    const { id: userId } = request.user as JWT_PAYLOAD
    const { id } = request.params as { id: string }

    if (!userId) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "User id is missing",
            statusCode: 400
        })
    }

    const task = await TaskModel.getTaskByIdAndUserId(id, userId)
    if(!task){
        return sendResponse({
            response: response,
            statusCode: 404,
            errorMessage: "Task is not found",
            success: false
        })
    }

    const deletedCount = await TaskModel.deleteTaskByIdAndUserId(id, userId)
    if(deletedCount){
        return sendResponse({
            response: response,
            statusCode: 200,
            message: "Task is deleted",
            success: true
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "Task is couldn't delete",
        success: false
    })

}, "deleteTaskController error")