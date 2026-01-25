import ISaveTemplateForActionUseCase from "@admin/emailTemplates/Application/UseCases/SaveTemplateForAction/ISaveTemplateForActionUseCase";
import { SaveTemplateForActionContext } from "@admin/emailTemplates/Presentation/Context/SaveTemplateForActionContex";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

import { Result } from "neverthrow";
import { useContext, useState } from "react";

/**
 * Hook to save the email template for action.
 * @returns An object containing the loading state, error state, and a function to save the email template for action.
 */
export default function UseSaveEmailTemplateForAction() {
    const usecase: ISaveTemplateForActionUseCase = useContext(SaveTemplateForActionContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<EmailTemplateErrors | null>(null);

    async function SaveTemplateForAction(template: EmailTemplateForAction) {
        setLoading(true);
        const result: Result<void, EmailTemplateErrors> = await usecase.execute(template);
        result.match((_) => { }, (err) => setError(err));
        setLoading(false);
    }

    return {
        loading,
        error,
        SaveTemplateForAction
    }
}
