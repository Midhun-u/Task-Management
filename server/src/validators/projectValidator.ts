import type { ProjectBody } from "../types/project.js"
import * as zod from 'zod'

// Function for validating projects
export const projectValidator = (body: ProjectBody) => {

    try {
        
        const object = zod.object({
            title: zod.string().trim().min(3).max(50),
            description: zod.string().trim().min(10).max(255)
        })

        const fields = object.parse(body)
        return {success: true, fields: fields}

    } catch (error) {
        return {success: false, error: "Invalid fields"}
    }

}