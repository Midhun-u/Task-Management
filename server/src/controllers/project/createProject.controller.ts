import type { Response } from "express";
import { handleError } from "../../utils/handleError.js";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { projectValidator } from "../../validators/projectValidator.js";
import { ProjectModel } from "../../models/project.model.js";

// Controller for creating project
export const createProjectController = handleError(async (request: RequestWithUser, response: Response) => {

    const { id: userId } = request.user || {}
    const body = request.body || {}

    if (!userId) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "User id is missing",
            statusCode: 400
        })
    }

    const validator = projectValidator(body)
    if (validator.error || !validator.fields || !validator.success) {
        return sendResponse({
            response: response,
            statusCode: 400,
            success: false,
            errorMessage: validator.error
        })
    }

    const newProject = await ProjectModel.addProject({
        title: validator.fields.title as string,
        description: validator.fields.description as string,  
        user_id: userId
    })

    if(newProject){
        return sendResponse({
            response: response,
            statusCode: 201,
            message: "Project is created",
            success: true,
            data: newProject,
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "Couldn't create project",
        success: false
    })

}, "createProjectController error")