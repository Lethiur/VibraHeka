import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import IUserDTO from "../ValueObjects/IUserProfileDTO";
import IUpdateProfileRequest from "../Requests/IUpdateProfileRequest";
import ChangePasswordCommand from "@auth/Domain/Commands/ChangePasswordCommand.ts";
import {Configuration} from "@/Generated/api/subscriptions";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";
import {UpdateProfileRequest, UserDTO, UsersApi} from "@/Generated/api/users";
import {BASE_PATH} from "@/Generated/api/users/base.ts";
import {mapToUpdateProfileRequest} from "@users/Data/Mappers/UserMapper.ts";


/**
 * @description Clase que implementa el datasource para obtener el perfil de un usuario
 */
export default class ProfileDatasource extends BackendDatasource {

    private readonly Api: UsersApi;

    constructor() {
        super();
        const config: Configuration = new Configuration({
            accessToken: () => this.StorageService.getString(STORAGE_KEYS.AUTH_TOKEN) || ''
        });
        this.Api = new UsersApi(config, BASE_PATH, this.AxiosInstance);
    }

    /**
     * @description Obtiene el perfil de un usuario
     * @param userId ID del usuario
     * @returns Resultado con el perfil del usuario o error
     */
    public async GetUserProfile(userId: string): Promise<Result<UserDTO, string>> {
        return this.PerformAndUnwrap( () => this.Api.getUserDetails(userId));
    }


    /**
     * Updates the user's profile with the provided information.
     *
     * @param {IUpdateProfileRequest} request The request object containing the user profile information to update.
     * @return {Promise<Result<void, string>>} A promise resolving to a Result object which indicates success or contains an error message.
     */
    public async UpdateUserProfile(request: IUpdateProfileRequest): Promise<Result<void, string>> {
        const updateProfileRequest :UpdateProfileRequest = mapToUpdateProfileRequest(request);
        return this.PerformAndUnwrap( () => this.Api.updateUserProfile(updateProfileRequest));
    }


}
