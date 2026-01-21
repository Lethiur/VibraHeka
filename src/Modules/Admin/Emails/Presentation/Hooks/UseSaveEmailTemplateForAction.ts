import ISaveTemplateForActionUseCase from "@admin/emailTempaltes/Application/UseCases/SaveTemplateForAction/ISaveTemplateForActionUseCase";
import { SaveTemplateForActionContext } from "@admin/emailTempaltes/Presentation/Context/SaveTemplateForActionContex";
import { EmailTemplateForAction } from "@admin/emailTempaltes/Domain/Models/EmailTemplateForAction";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

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
