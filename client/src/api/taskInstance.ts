import { handlError } from "../utils/handleError";
import { taskInstance } from "./axiosInstance";

// Api for creating task
export const createTaskApi = handlError(async (data: {
    projectId: string
    title: string
}) => {

    const result = await taskInstance.post("/create-task", data)
    return result.data

})

// Api for getting tasks
export const getProjectTasksApi = handlError(async (projectId: string, page: number, limit: number, searchQuery: string = "") => {

    const result = await taskInstance.get(`/get-project-tasks/${projectId}/?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
    return result.data

})

// Api for getting specific task
export const getTaskApi = handlError(async (id: string) => {

    const result = await taskInstance.get(`/get-task/${id}`)
    return result.data

})

// Api for updating tasks
export const updateTaskApi = handlError(async (id: string, updateData: {title?: string, status?: "completed" | "pending"}) => {

    const data: Record<string, any> = {}

    if(updateData.title) data.title = updateData.title

    if(updateData.status) data.status = updateData.status

    const result = await taskInstance.patch(`/update-task/${id}`, data)
    return result.data

})

// Api for deleting task
export const deleteTaskApi = handlError(async (id: string) => {
    const result = await taskInstance.delete(`/delete-task/${id}`)
    return result.data
})