import { Result } from "neverthrow";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import IUpdateProfileUseCase from "./IUpdateProfileUseCase";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";

export default class UpdateProfileUseCaseImpl implements IUpdateProfileUseCase {

    constructor(
        private readonly profileRepository: IProfileRepository
    ) { }

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async Execute(user: IUserprofile): Promise<Result<void, ProfileErrors>> {
        return await this.profileRepository.UpdateProfile(user);
    }

}   