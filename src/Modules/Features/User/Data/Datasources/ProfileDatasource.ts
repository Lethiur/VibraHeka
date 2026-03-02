import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import IUserDTO from "../Entities/IUserProfileDTO";
import IChangePasswordDTO from "../Entities/IChangePasswordDTO";


/**
 * @description Clase que implementa el datasource para obtener el perfil de un usuario
 */
export default class ProfileDatasource extends BackendDatasource {


    /**
     * @description Obtiene el perfil de un usuario
     * @param userId ID del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async GetUserProfile(userId: string): Promise<Result<IUserDTO, string>> {
        return await this.get<IUserDTO>(`users/${userId}`, true);
    }

    /**
     * @description Actualiza el perfil de un usuario
     * @param user Datos del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async UpdateUserProfile(user: IUserDTO): Promise<Result<void, string>> {
        return await this.patch<void>(`users/update-profile`, user, true);
    }

    /**
     * @description Cambia la contrasena del usuario autenticado
     * @param data Datos del cambio de contrasena
     * @returns Resultado de la operacion
     */
    public async ChangePassword(data: IChangePasswordDTO): Promise<Result<void, string>> {
        return await this.patch<void>(`auth/change-password`, data, true);
    }

}
