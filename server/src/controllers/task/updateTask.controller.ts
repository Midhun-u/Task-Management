import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { TaskModel } from "../../models/task.model.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { taskValidator } from "../../validators/taskValidator.js";

// Controller for updating task
export const updateTaskController = handleError(async (request: RequestWithUser, response: Response) => {

    const { id: userId } = request.user as JWT_PAYLOAD
    const { id } = request.params as { id: string }
    const body = request.body || {}

    const task = await TaskModel.getTaskByIdAndUserId(id, userId)
    if (!task) {
        return sendResponse({
            response: response,
            statusCode: 404,
            errorMessage: "Task is not found",
            success: false
        })
    }

    if (body?.id || body?.createdAt || body?.updatedAt || body?.user_id || body?.project_id) {
        return sendResponse({
            response: response,
            statusCode: 403,
            errorMessage: "These fields cannot editable",
            success: false
        })
    }

    const validator = taskValidator(body, true)
    if (validator.error || !validator.fields || !validator.success) {
        return sendResponse({
            response: response,
            statusCode: 400,
            success: false,
            errorMessage: validator.error
        })
    }

    const {updatedCount, updatedRows} = await TaskModel.updateTaskByIdAndUserId(id, userId, validator.fields)
    if(updatedCount){
        return sendResponse({
            response: response,
            statusCode: 200,
            success: true,
            message: "Task is updated",
            data: updatedRows[0]
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "Task is couldn't update",
        success: false
    })

}, "updateTaskController error")