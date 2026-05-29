import axios from "axios";
import { envVariables } from "../utils/envVariables";

const AUTH_BASE_URL = envVariables.AUTH_URL
const PROJECT_BASE_URL = envVariables.PROJECT_URL

// Auth Instance
export const authInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
    }
})

// Project instance
export const projectInstance = axios.create({
    baseURL: PROJECT_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
    } 
})