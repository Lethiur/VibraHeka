import { Result } from "neverthrow";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";

export default interface IChangePasswordUseCase {
    Execute(data: IChangePasswordData): Promise<Result<void, ProfileErrors>>;
}

