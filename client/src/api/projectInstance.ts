import { handlError } from "../utils/handleError";
import { projectInstance } from "./axiosInstance";

// Api for getting projects
export const getProjectsApi = handlError(async (page: number, limit: number, searchQuery: string = "") =>  {

    const result = await projectInstance.get(`/get-user-projects/?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
    return result.data

})

// Api for updating project
export const updateProjectApi = handlError(async (id: string, title: string, description: string) => {

    const result = await projectInstance.patch(`/update-project/${id}`, {
        title: title,
        description: description
    })

    return result.data

})

// Api for deleting project
export const deleteProjectApi = handlError(async (id: string) => {

    const result = await projectInstance.delete(`/delete-project/${id}`)
    return result.data

})

// Api for adding new project
export const addProjectApi = handlError(async (data: {title: string, description: string}) => {

    const result = await projectInstance.post('create-project', data)
    return result.data

})