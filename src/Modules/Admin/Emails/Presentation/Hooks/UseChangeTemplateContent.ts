import IChangeTemplateContentUseCase from "../../Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import { useContext } from "react";
import { ChangeTemplateContentContext } from "../Context/ChangeTemplateContentContext";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { EmailTemplateErrors } from "../../Domain/Errors/EmailTemplateErrors";

export default function UseChangeTemplateContent() {

    const UseCase: IChangeTemplateContentUseCase = useContext(ChangeTemplateContentContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<EmailTemplateErrors | null>(null);

    async function ChangeContent(templateId: string, content: JSONContent) {
        setLoading(true);

        const jsonString = JSON.stringify(content, null)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const file = new File([blob], 'content.json', { type: 'application/json' });
        const result = await UseCase.Execute(templateId, file);
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