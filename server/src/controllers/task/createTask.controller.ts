import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import type { TaskBody } from "../../types/task.js";
import { taskValidator } from "../../validators/taskValidator.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ProjectModel } from "../../models/project.model.js";
import { TaskModel } from "../../models/task.model.js";

// Controller for creating task
export const createTaskController = handleError(async (request: RequestWithUser, response: Response) => {

    const { id: userId } = request.user as JWT_PAYLOAD
    const body = request.body as TaskBody

    if (!userId) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "User id is missing",
            statusCode: 400
        })
    }

    const validator = taskValidator<{title: string, description: string, projectId: string}>(body)

    if (validator.error || !validator.fields || !validator.success) {
        return sendResponse({
            response: response,
            statusCode: 400,
            success: false,
            errorMessage: validator.error
        })
    }

    const project = await ProjectModel.getProjectByIdAndUserId(validator.fields.projectId, userId)
    if (!project) {
        return sendResponse({
            response: response,
            statusCode: 404,
            errorMessage: "Project is not found",
            success: false
        })
    }

    const newTask = await TaskModel.addTask({
        title: validator.fields.title as string,
        description: validator.fields.description as string,
        project_id: validator.fields.projectId as string,
        user_id: userId
    })

    if (newTask) {
        return sendResponse({
            response: response,
            statusCode: 201,
            message: "Task is created",
            data: newTask,
            success: true
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        success: false,
        errorMessage: "Task is couldn't create"
    })

}, "createTaskController error")