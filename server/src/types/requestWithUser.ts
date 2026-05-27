import type { Request } from "express";
import type { JWT_PAYLOAD } from "./jwtPayload.js";

export interface RequestWithUser extends Request{
    user?: JWT_PAYLOAD
}