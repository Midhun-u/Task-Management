import { handlError } from "../utils/handleError";
import { taskInstance } from "./axiosInstance";

// Api for creating task
export const createTaskApi = handlError(async (data: {
    project_id: string
    title: string
    status: "completed" | "pending"
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