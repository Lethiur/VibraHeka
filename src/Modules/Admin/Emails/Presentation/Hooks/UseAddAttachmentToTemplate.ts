import { useContext, useState } from "react";
import addAttachmentToTemplateContext from "../Context/AddAttachmentToTemplateContext";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import { Result } from "neverthrow";

export default function UseAddAttachmentToTemplate() {

    const UseCase = useContext(addAttachmentToTemplateContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const AddAttachmentToTemplate = async (templateId: string, attachment: File): Promise<string> => {

        setLoading(true);

        const updateResult: Result<string, EmailTemplateErrors> = await UseCase.Execute(templateId, attachment, attachment.name);
        if (updateResult.isErr()) {
            setError(updateResult.error);
            throw new Error(updateResult.error);
        }
        setLoading(false);
        return updateResult.value;

    };

    return {
        loading,
        error,
        AddAttachmentToTemplate,
    };
}