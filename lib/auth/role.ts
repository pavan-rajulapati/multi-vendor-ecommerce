export interface AuthUser {
    userId: number;
    role: string;
}

import { AppError } from "../error/app-error";

export function RBAC(user : AuthUser, allowedRoles : string[]) {
    if(!allowedRoles.includes(user.role)){
        throw new AppError("Access Denied", 403, "ACCESS_DENIED")
    }
}