import type { Response } from "express";
import { sendResponse } from "./sendResponse.js";
import type { RequestWithUser } from "../types/requestWithUser.js";

// Function for handling error
export const handleError = (fn: (request: RequestWithUser, response: Response) => any, errorMessage: string) => {

    return async function (request: RequestWithUser, response: Response) {
        try {

            return await fn(request, response)

        } catch (error) {
            console.log(`${errorMessage} ${error}`)
            return sendResponse({
                response: response,
                statusCode: 500,
                errorMessage: "Server error",
                success: false
            })
        }
    }

}