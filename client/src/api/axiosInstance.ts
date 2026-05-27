import axios from "axios";
import { envVariables } from "../utils/envVariables";

const AUTH_BASE_URL = envVariables.AUTH_URL

// Auth Instance
export const authInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
    }
})