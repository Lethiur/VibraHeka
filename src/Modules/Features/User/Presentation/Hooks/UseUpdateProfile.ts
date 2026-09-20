import { useContext } from "react";
import { UpdateUserProfileContext } from "../../Presentation/Context/UpdateUserProfileContext";
import { IUserprofile } from "../../Domain/Entities/IUserProfile";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";
import { ProfileErrors } from "../../Domain/Errors/ProfileErrors";

/**
 * @description Hook para actualizar el perfil de un usuario
 * @returns Objeto con la función updateProfile y el estado de la operación
 */
export default function UseUpdateUserProfile() {

    const updateProfileUseCase = useContext(UpdateUserProfileContext);
    const mutation = GenericUseMutation<void, ProfileErrors, IUserprofile>(
        ["update-profile"],
        (user: IUserprofile) => updateProfileUseCase.Execute(user)
    );

    return {
        UpdateProfile: mutation.executeAsync,
        loading: mutation.loading,
        error: mutation.error,
        success: mutation.success,
    };
}