import { IGetTemplatesForActionUseCase } from "@admin/emailTemplates/Application/UseCases/GetTemplatesForAction/IGetTemplatesForActionUseCase";
import { GetEmailTemplateForActionContext } from "@admin/emailTemplates/Presentation/Context/GetEmailTemplateForAction";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

import { Result } from "neverthrow";
import { useContext, useState } from "react";

/**
 * Hook to get the email templates for actions.
 * @returns An object containing the email templates for actions, loading state, error state, and a function to get the email templates for actions.
 */
export default function useGetEmailTemplatesForActions() {

    const usecase: IGetTemplatesForActionUseCase = useContext(GetEmailTemplateForActionContext);

    const [templates, setTemplates] = useState<EmailTemplateForAction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<EmailTemplateErrors | null>(null);
    async function GetTemplatesForActions() {
        setLoading(true);
        const result: Result<EmailTemplateForAction[], EmailTemplateErrors> = await usecase.execute();
        result.match((templates) => setTemplates(templates), (err) => setError(err));
        setLoading(false);
    }

    return {
        templates,
        loading,
        error,
        GetTemplatesForActions
    }
}