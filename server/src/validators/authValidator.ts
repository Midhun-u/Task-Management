import type { AuthBody } from "../types/authBody.js"
import * as zod from 'zod'

// Function for validating authentication
export const authValidator = (body: AuthBody, type: "login" | "sign") => {

    try {

        const fullnameValidator = type === "sign"? {
            fullname: zod.string().trim().min(3).max(30)
        }: {}
        
        const object = zod.object({
            ...fullnameValidator,
            email: zod.string().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // testing email by email regex
            password: zod.string().trim().min(6).max(50).trim()
        })

        const fields = object.parse(body)
        return {success: true, fields: fields}

    } catch {
        return {success: false, error: "Invalid fields"}
    }

}