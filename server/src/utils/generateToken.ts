import jwt from 'jsonwebtoken'
import { envVariables } from "./envVariables.js";

// Function for generating token
export const generateToken = async (id: string, email: string, fullname: string) => {

    const authToken = await jwt.sign({
        id: id,
        email: email,
        fullname: fullname
    }, envVariables.JWT_SECRET) 

    return authToken

}