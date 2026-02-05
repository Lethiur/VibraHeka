import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";

/**
 * @description Interfaz que representa el caso de uso para obtener el perfil de un usuario
 */
export default interface IGetProfileUseCase {
    /**
     * @description Ejecuta el caso de uso para obtener el perfil de un usuario
     * @param userId ID del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    Execute(userId: string): Promise<Result<IUserprofile, ProfileErrors>>;
}