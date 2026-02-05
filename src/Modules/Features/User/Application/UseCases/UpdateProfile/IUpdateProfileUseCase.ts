import { Result } from "neverthrow";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";

/**
 * @description Interfaz que representa el caso de uso para actualizar el perfil de un usuario
 */
export default interface IUpdateProfileUseCase {

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    Execute(user: IUserprofile): Promise<Result<void, ProfileErrors>>;
}