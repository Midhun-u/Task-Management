import type { Response } from "express";
import type { RequestWithUser } from "../../types/requestWithUser.js";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwtPayload.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { TaskModel } from "../../models/task.model.js";

// Controller for getting project tasks
export const getProjectTaskController = handleError(async (request: RequestWithUser, response: Response) => {

    const { projectId } = request.params as { projectId: string }
    const { id: userId } = request.user as JWT_PAYLOAD
    const {page = 1, limit = 10, searchQuery = ""} = request.query as {page: string, limit: string, searchQuery: string}
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    if (!userId) {
        return sendResponse({
            response: response,
            success: false,
            errorMessage: "User id is missing",
            statusCode: 400
        })
    }
    console.log(searchQuery)

    const tasks = await TaskModel.getProjectTasksByProjectIdAndUserId(projectId, userId, pageNumber, limitNumber, searchQuery)
    return sendResponse({
        response: response,
        statusCode: 200,
        data: tasks,
        success: true
    })

}, "getProjectTaskController error")