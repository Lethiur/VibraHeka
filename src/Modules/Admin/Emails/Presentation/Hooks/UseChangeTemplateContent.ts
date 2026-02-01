import IChangeTemplateContentUseCase from "../../Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import { useContext } from "react";
import { ChangeTemplateContentContext } from "../Context/ChangeTemplateContentContext";
import { useState } from "react";
import { EmailTemplateErrors } from "../../Domain/Errors/EmailTemplateErrors";

export default function UseChangeTemplateContent() {

    const UseCase: IChangeTemplateContentUseCase = useContext(ChangeTemplateContentContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<EmailTemplateErrors | null>(null);

    async function ChangeContent(templateId: string, content: string) {
        setLoading(true);

        const result = await UseCase.Execute(templateId, content);
        if (result.isErr()) {
            setError(result.error);
        }
        setLoading(false);
        return result;
    }

    return {
        loading,
        error,
        ChangeContent
    }
}