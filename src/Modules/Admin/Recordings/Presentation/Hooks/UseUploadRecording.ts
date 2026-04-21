import { useContext, useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { Result } from "neverthrow";
import UploadRecordingContext from "@admin/recordings/Presentation/Context/UploadRecordingContext";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export default function UseUploadRecording() {
    const UseCase = useContext(UploadRecordingContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [recordingID, setRecordingID] = useState<string | null>(null);
    const [error, setError] = useState<RecordingsErrors | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors<CreateRecordingEntity>>({});

    const UploadRecording = async (data: CreateRecordingEntity): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const result: Result<string, RecordingsErrors> = await UseCase.Execute(data);
            setValidationErrors({});
            result.match(setRecordingID, setError);
        } catch (error: unknown) {
            if (error instanceof InvalidEntityError) {
                setValidationErrors(error.fieldErrors as ValidationErrors<CreateRecordingEntity>);
                return;
            }

            setError(RecordingsErrors.GENERAL_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return {
        UploadRecording,
        recordingID,
        loading,
        error,
        validationErrors,
    };
}

