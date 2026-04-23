import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";
import GetProfileDatasource from "@/Modules/Features/User/Data/Datasources/ProfileDatasource";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import IChangePasswordRequest from "@users/Data/Requests/IChangePasswordRequest";
import IUpdateProfileRequest from "@users/Data/Requests/IUpdateProfileRequest";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";

export default class UserProfileRepositoryImpl implements IProfileRepository {


    constructor(
        private readonly getProfileDatasource: GetProfileDatasource
    ) { }

    public async ChangePassword(data: IChangePasswordData): Promise<Result<void, ProfileErrors>> {
        const request: IChangePasswordRequest = {
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
        return result.map(user => ({
            Id: user.id,
            FirstName: user.firstName,
            MiddleName: user.middleName,
            LastName: user.lastName,
            Email: user.email,
            Phone: user.phoneNumber,
            Bio: user.bio,
            AvatarUrl: user.avatarUrl,
            TimeZone: user.timeZoneID
        })).mapErr(e => e as ProfileErrors);
    }





}
