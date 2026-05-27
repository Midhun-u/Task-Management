import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ProjectModel } from "../../models/project.model.js";

// Controller for deleting project
export const deleteProjectController = handleError(async (request: RequestWithUser, response: Response) => {

    const {id: userId} = request.user as JWT_PAYLOAD
    const {id} = request.params as {id: string}
    
    if(!userId){
        return sendResponse({
            response: response,
            statusCode: 400,
            errorMessage: "User is missing",
            success: false
        })
    }

    const project = await ProjectModel.getProjectByIdAndUserId(id, userId)
    if(!project){
        return sendResponse({
            response: response,
            statusCode: 404,
            errorMessage: "Project is not found",
            success: false
        })
    }

    const deletedCount = await ProjectModel.deleteProjectBytIdAndUserId(id, userId)
    if(deletedCount){
        return sendResponse({
            response: response,
            statusCode: 200,
            message: "Project is deleted",
            success: true
        })
    }

    return sendResponse({
        response: response,
        statusCode: 400,
        errorMessage: "Project is couldn't delete",
        success: false
    })

}, "deleteProjectController error")