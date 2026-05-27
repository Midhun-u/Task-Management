import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { ProjectModel } from "../../models/project.model.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { sendResponse } from "../../utils/sendResponse.js";

// Controller for getting user projects
export const getUserProjects = handleError(async (request: RequestWithUser, response: Response) => {

    const {page = 1, limit = 10, searchQuery = ""} = request.query as {page: string, limit: string, searchQuery?: string}
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)
    const {id: userId} = request.user as JWT_PAYLOAD 

    const projects = await ProjectModel.getUserProjectsByUserId(userId, pageNumber, limitNumber, searchQuery)
    return sendResponse({
        response: response,
        statusCode: 200,
        data: projects,
        success: true
    })

}, "getUserProjects error")