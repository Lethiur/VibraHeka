import { useContext, useState } from "react";
import { GetUserProfileContext } from "@users/Presentation/Context/GetUserProfileContext";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";

export default function UseGetProfile() {

    const useCase = useContext(GetUserProfileContext);

    const [profile, setProfile] = useState<IUserprofile>({} as IUserprofile);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProfile = async (userId: string) => {
        setLoading(true);
        const result = await useCase.Execute(userId);
        result.match(
            (profile) => setProfile(profile),
            (error) => setError(error)
        );
        setLoading(false);
    };

    return {
        profile,
        loading,
        error,
        getProfile
    };
}