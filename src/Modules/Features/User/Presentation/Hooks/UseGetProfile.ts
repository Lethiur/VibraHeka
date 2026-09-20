import { useContext } from "react";
import { GetUserProfileContext } from "@users/Presentation/Context/GetUserProfileContext";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import GenericUseQuery from "@core/Presentation/Hooks/GenericUseQuery.ts";

export default function UseGetProfile(userId: string) {
    const useCase = useContext(GetUserProfileContext);

    const { data, isLoading, error, refetch } = GenericUseQuery<IUserprofile, string>(
        ["profile", userId],
        () => useCase.Execute(userId),
        {
            enabled: Boolean(userId),
            refetchOnMount: "always",
            refetchOnWindowFocus: true,
        }
    );

    return {
        profile: data ?? null,
        loading: isLoading,
        error: error ?? null,
        getProfile: refetch,
    };
}
