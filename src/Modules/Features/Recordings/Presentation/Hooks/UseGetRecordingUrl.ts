import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import GetRecordingUrlContext from "@recordings/Presentation/Context/GetRecordingUrlContext";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { useTranslation } from "react-i18next";

export default function UseGetRecordingUrl() {
    const UseCase = useContext(GetRecordingUrlContext);
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const mutation = useMutation<string, RecordingsErrors, string>({
        mutationFn: async (recordingId: string) => {
            const result = await UseCase.Execute(recordingId);
            if (result.isErr()) throw result.error;
            return result.value;
        },
        onError: (error) => {
            ShowNotification(
                t("pages.recordings.messages.error_url_title", "Error"),
                t(`errors.recordings.${error}`, "No se pudo obtener la URL de la grabación."),
                NotificationVariant.Error
            );
        }
    });

    const getRecordingUrl = async (recordingId: string) => {
        if (!isAuthenticated) return "";
        return mutation.mutateAsync(recordingId);
    };

    return {
        getRecordingUrl,
        loading: isAuthenticated ? mutation.isPending : false,
        error: isAuthenticated ? (mutation.error as RecordingsErrors | null) : null,
    };
}
