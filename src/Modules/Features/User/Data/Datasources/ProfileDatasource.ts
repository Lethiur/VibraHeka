import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import IUserDTO from "../Entities/IUserProfileDTO";
import IUpdateProfileRequest from "../Requests/IUpdateProfileRequest";
import IChangePasswordRequest from "../Requests/IChangePasswordRequest";


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
    public async UpdateUserProfile(request: IUpdateProfileRequest): Promise<Result<void, string>> {
        return await this.patch<void>(`users/update-profile`, request, true);
    }

    /**
     * @description Cambia la contrasena del usuario autenticado
     * @param data Datos del cambio de contrasena
     * @returns Resultado de la operacion
     */
    public async ChangePassword(data: IChangePasswordRequest): Promise<Result<void, string>> {
        return await this.patch<void>(`auth/change-password`, data, true);
    }

}
