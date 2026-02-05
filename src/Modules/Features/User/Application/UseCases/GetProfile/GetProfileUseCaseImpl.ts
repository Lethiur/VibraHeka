import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import IGetProfileUseCase from "@users/Application/UseCases/GetProfile/IGetProfileUseCase";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";

export default class GetProfileUseCaseImpl implements IGetProfileUseCase {

    constructor(
        private readonly profileRepository: IProfileRepository
    ) { }

    public async Execute(userId: string): Promise<Result<IUserprofile, ProfileErrors>> {
        return this.profileRepository.GetUserProfile(userId);
    }

}