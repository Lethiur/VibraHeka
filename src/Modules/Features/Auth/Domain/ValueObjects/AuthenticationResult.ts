import {UserRoles} from "@auth/Domain/Enums/UserRoles.ts";

export interface AuthenticationResult {
    accessToken: string;
    refreshToken: string;
    role: UserRoles;
}
