import { handlError } from "../utils/handleError";
import { authInstance } from "./axiosInstance";

// Api for signing
export const signApi = handlError(async (body: {
    email: string,
    fullname: string,
    password: string
}) => {

    const result = await authInstance.post("/sign", body)
    return result.data

})

// Api for login
export const loginApi = handlError(async (body: {email: string, password: string}) => {

    const result = await authInstance.post("/login", body)
    return result.data

})

// Api for getting profile
export const getProfileApi = handlError(async () => {

    const result = await authInstance.get("/get-profile")
    return result.data

})