import type { TaskBody } from "../types/task.js"
import * as zod from 'zod'

// Function for validating task
export const taskValidator = <FieldType>(body: TaskBody, update?: boolean): {
    success: boolean
    error?: string
    fields?: FieldType
} => {

    try {

        if (update) {

            const object = zod.object({
                title: zod.string().trim().min(3).max(50).optional(),
                status: zod.enum(['pending', 'completed']).optional(),
            })

            const fields = object.parse(body) as FieldType
            return { success: true, fields: fields }

        }

        const object = zod.object({
            title: zod.string().trim().min(3).max(50),
            projectId: zod.string().max(100).nonoptional(),
        })

        const fields = object.parse(body) as FieldType
        return { success: true, fields: fields }

    } catch (error) {
        return { success: false, error: "Invalid fields" }
    }

}