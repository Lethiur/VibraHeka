import {
    AuthenticateUserRequest, AuthenticateUserResponse, AuthenticateUserResponseRoleEnum, ChangePasswordRequest,
    ConfirmResetPasswordRequest,
    RegisterUserRequest, RegisterUserResponse,
    VerifyUserRequest
} from "@/Generated/api/authentication";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";
import {VerificationCommand} from "@auth/Domain/Commands/VerificationCommand.ts";
import {LoginCommand} from "@auth/Domain/Commands/LoginCommand.ts";
import {ResetPasswordCommand} from "@auth/Domain/Commands/ResetPasswordCommand.ts";
import ChangePasswordCommand from "@auth/Domain/Commands/ChangePasswordCommand.ts";
import {UserRoles} from "@auth/Domain/Enums/UserRoles.ts";
import {RegistrationResult} from "@auth/Domain/ValueObjects/RegistrationResult.ts";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";

export function mapToRegistrationRequestDTO(command: RegistrationCommand): RegisterUserRequest {

    return {
        email: command.email,
        password: command.password,
        firstName: command.firstName,
        lastName: "",
        timezoneID: command.timezone,
        middleName: ""
    }
}

export function mapToVerificationRequest(command: VerificationCommand): VerifyUserRequest {
    return {
        encryptedCode: command.encryptedCode
    }
}

export function mapToLoginRequestRequest(command: LoginCommand): AuthenticateUserRequest {
    return {
        email: command.email,
        password: command.password
    };
}

export function mapToConfirmPasswordRequest(command: ResetPasswordCommand): ConfirmResetPasswordRequest {
    return {
        newPasswordConfirmation: command.newPasswordConfirmation,
        newPassword: command.newPassword,
        encryptedToken: command.encryptedToken
    }
}

export function mapToChangePasswordRequest(command: ChangePasswordCommand): ChangePasswordRequest {
    return {
        newPasswordConfirmation: command.newPasswordConfirmation,
        newPassword: command.newPassword,
        currentPassword: command.currentPassword
    }
}

export function mapToRegistrationResult(response: RegisterUserResponse): RegistrationResult {
    return {
        userId: response.userId,
        needsConfirmation: response.needsConfirmation,
    }
}

export function mapToLoginResult(response: AuthenticateUserResponse): AuthenticationResult {
    return {
        role: mapToDomainRole(response.role),
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
    }
}

export function mapToDomainRole(role: AuthenticateUserResponseRoleEnum) : UserRoles {
    console.log("Mapping role:", role);
    switch (role) {
        case AuthenticateUserResponseRoleEnum.Admin:
            return UserRoles.Admin;
        case AuthenticateUserResponseRoleEnum.User:
            return UserRoles.User;
        case AuthenticateUserResponseRoleEnum.Therapist:
            return UserRoles.Therapist;
        default:
            throw new Error(`Unknown role: ${role}`);
    }
}


