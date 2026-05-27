import {type Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ProjectModel } from "../../models/project.model.js";

// Controller for getting specific project
export const getProjectController = handleError(async (request: RequestWithUser, response: Response) => {

    const {id} = request.params as {id: string}
    const {id: userId} = request.user as JWT_PAYLOAD

    const project = await ProjectModel.getProjectByIdAndUserId(id, userId)

    return sendResponse({
        response: response,
        success: true,
        data: project,
        statusCode: 200
    })

}, "getProjectController error")