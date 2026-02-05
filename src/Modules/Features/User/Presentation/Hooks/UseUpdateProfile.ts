import { useContext, useState } from "react";
import { ProfileErrors } from "../../Domain/Errors/ProfileErrors";
import { UpdateUserProfileContext } from "../../Presentation/Context/UpdateUserProfileContext";
import { IUserprofile } from "../../Domain/Entities/IUserProfile";

/**
 * @description Hook para actualizar el perfil de un usuario
 * @returns Objeto con la función updateProfile y el estado de la operación
 */
export default function UseUpdateUserProfile() {

    const updateProfileUseCase = useContext(UpdateUserProfileContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ProfileErrors | null>(null);


    const UpdateProfile = async (user: IUserprofile) => {
        setLoading(true);
        const result = await updateProfileUseCase.Execute(user);
        result.mapErr(setError)
        setLoading(false);
        return result;
    }

    return {
        UpdateProfile,
        loading,
        error
    }
}