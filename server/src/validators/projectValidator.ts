import type { ProjectBody } from "../types/project.js"
import * as zod from 'zod'

// Function for validating project
export const projectValidator = (body: ProjectBody, update?: boolean) => {

    try {

        if (update) {

            const object = zod.object({
                title: zod.string().trim().min(3).max(50).optional(),
                description: zod.string().trim().min(10).max(255).optional()
            })

            const fields = object.parse(body)
            return { success: true, fields: fields }

        }

        const object = zod.object({
            title: zod.string().trim().min(3).max(50),
            description: zod.string().trim().min(10).max(255)
        })

        const fields = object.parse(body)
        return { success: true, fields: fields }

    } catch (error) {
        return { success: false, error: "Invalid fields" }
    }

}