import { useContext, useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import CreateEventContext from "@admin/events/Presentation/Context/CreateEventContext";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export default function UseCreateEvent() {
    const UseCase = useContext(CreateEventContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [createdId, setCreatedId] = useState<string | null>(null);
    const [error, setError] = useState<EventsErrors | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors<CreateEventEntity>>({});

    const CreateEvent = async (data: CreateEventEntity): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const result = await UseCase.Execute(data);
            setValidationErrors({});
            result.match(setCreatedId, setError);
        } catch (e: unknown) {
            if (e instanceof InvalidEntityError) {
                setValidationErrors(e.fieldErrors as ValidationErrors<CreateEventEntity>);
                return;
            }
            setError(EventsErrors.GENERAL_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return {
        CreateEvent,
        createdId,
        loading,
        error,
        validationErrors,
    };
}
