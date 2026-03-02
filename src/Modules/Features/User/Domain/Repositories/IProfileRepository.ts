import { Result } from "neverthrow";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";

/**
 * @description Interfaz que representa el repositorio para obtener el perfil de un usuario
 */
export default interface IProfileRepository {

    /**
     * @description Obtiene el perfil de un usuario
     * @param userId ID del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    GetUserProfile(userId: string): Promise<Result<IUserprofile, ProfileErrors>>;

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    UpdateProfile(user: IUserprofile): Promise<Result<void, ProfileErrors>>;

    /**
     * @description Cambia la contrasena del usuario autenticado
     * @param data Datos del cambio de contrasena
     * @returns Resultado de la operacion
     */
    ChangePassword(data: IChangePasswordData): Promise<Result<void, ProfileErrors>>;

}
