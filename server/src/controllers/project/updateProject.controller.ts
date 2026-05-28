import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ProjectModel } from "../../models/project.model.js";
import { projectValidator } from "../../validators/projectValidator.js";

// Controller for updating project
export const updateProjectController = handleError(async (request: RequestWithUser, response: Response) => {

    const { id: userId } = request.user as JWT_PAYLOAD
    const { id } = request.params as { id: string } || {}
    const body = request.body || {}

    if (!userId) {
        return sendResponse({
            response: response,
            statusCode: 400,
            errorMessage: "User id is missing",
            success: false
        })
    }

    const project = await ProjectModel.getProjectByIdAndUserId(id, userId)
    if (!project) {
        return sendResponse({
            response: response,
            statusCode: 404,
            errorMessage: "Project is not found",
            success: false
        })
    }


    if (body?.id || body?.createdAt || body?.updatedAt || body?.user_id) {
        return sendResponse({
            response: response,
            statusCode: 403,
            errorMessage: "These fields cannot editable",
            success: false
        })
    }

    const validator = projectValidator(body, true)
    if (validator.error || !validator.fields || !validator.success) {
        return sendResponse({
            response: response,
            statusCode: 400,
            success: false,
            errorMessage: validator.error
        })
    }

    const { updatedCount, updatedRows } = await ProjectModel.updateProjectByIdAndUserId(id, userId, validator.fields as Record<string, any>)
    if (updatedCount && updatedRows) {
        return sendResponse({
            response: response,
            statusCode: 200,
            message: "Project is updated",
            data: updatedRows[0],
            success: true
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "The project is couldn't update",
        success: false
    })

}, "updateProjectController error")