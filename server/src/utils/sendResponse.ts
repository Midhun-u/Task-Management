import type { Response } from "express";

type SendResponseArguments = {
    response: Response
    success: boolean
    statusCode: number
    errorMessage?: string | null | undefined
    data?: Record<string, any> | null | undefined
    message?: string | null | undefined
}

export const sendResponse = ({response, success, statusCode, errorMessage, data, message}: SendResponseArguments) => {

    const responseData: Record<string, any> = {}

    if(errorMessage) responseData.error = errorMessage

    if(data) responseData.data = data

    if(message) responseData.message = message

    return response.status(statusCode).json({
        success: success,
        statusCode: statusCode,
        ...responseData
    })

}