import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";
import GetProfileDatasource from "@/Modules/Features/User/Data/Datasources/ProfileDatasource";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import IUserDTO from "@users/Data/Entities/IUserProfileDTO";

export default class UserProfileRepositoryImpl implements IProfileRepository {


    constructor(
        private readonly getProfileDatasource: GetProfileDatasource
    ) { }

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async UpdateProfile(user: IUserprofile): Promise<Result<void, ProfileErrors>> {

        const userDTO: IUserDTO = {
            id: user.Id,
            firstName: user.FirstName,
            middleName: user.MiddleName,
            lastName: user.LastName,
            email: user.Email,
            phoneNumber: user.Phone,
            bio: user.Bio,
            avatarUrl: user.AvatarUrl
        };

        const result = await this.getProfileDatasource.UpdateUserProfile(userDTO);
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
            AvatarUrl: user.avatarUrl
        })).mapErr(e => e as ProfileErrors);
    }

}