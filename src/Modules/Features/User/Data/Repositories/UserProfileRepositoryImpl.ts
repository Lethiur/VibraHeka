import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";
import GetProfileDatasource from "@/Modules/Features/User/Data/Datasources/ProfileDatasource";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import ChangePasswordCommand from "@auth/Domain/Commands/ChangePasswordCommand.ts";
import IUpdateProfileRequest from "@users/Data/Requests/IUpdateProfileRequest";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { mapUserProfileDTO } from "@users/Data/Mappers/UserMapper";
import AuthDatasource from "@auth/Data/Datasources/AuthDatasource.ts";

export default class UserProfileRepositoryImpl implements IProfileRepository {


    constructor(
        private readonly getProfileDatasource: GetProfileDatasource,
        private readonly authDatasource: AuthDatasource
    ) { }

    public async ChangePassword(data: IChangePasswordData): Promise<Result<void, ProfileErrors>> {
        const request: ChangePasswordCommand = {
            currentPassword: data.CurrentPassword,
            newPassword: data.NewPassword,
            newPasswordConfirmation: data.NewPasswordConfirmation
        };

        const result = await this.getProfileDatasource.ChangePassword(request);
        return result.mapErr(e => e as ProfileErrors);
    }

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async UpdateProfile(user: IUserprofile): Promise<Result<void, ProfileErrors>> {

        const request: IUpdateProfileRequest = {
            id: user.Id,
            firstName: user.FirstName,
            middleName: user.MiddleName,
            lastName: user.LastName,
            email: user.Email,
            phoneNumber: user.Phone,
            bio: user.Bio,
            avatarUrl: user.AvatarUrl,
            timeZoneID: user.TimeZone
        };

        const result = await this.getProfileDatasource.UpdateUserProfile(request);
        return result.mapErr(e => e as ProfileErrors);
    }

    /**
     * @description Obtiene el perfil de un usuario
     * @param userId ID del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async GetUserProfile(userId: string): Promise<Result<IUserprofile, ProfileErrors>> {
        const result = await this.getProfileDatasource.GetUserProfile(userId);
        return result.map(mapUserProfileDTO).mapErr(e => e as ProfileErrors);
    }





}
