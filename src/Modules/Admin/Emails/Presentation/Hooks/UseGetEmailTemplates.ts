import { useContext, useState } from "react";
import { IGetAllTemplatesUseCase } from "@admin/emailTempaltes/Application/UseCases/GetAllTemplates/IGetAllTemplatesUseCase";
import { GetEmailTemplatsContext } from "@admin/emailTempaltes/Presentation/Context/GetEmailTemplatsContext";
import { EmailTemplate } from "@admin/emailTempaltes/Domain/Models/EmailTemplate";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";
import { Result } from "neverthrow";


export default function UseGetEmailTemplates() {
    const UseCase: IGetAllTemplatesUseCase = useContext(GetEmailTemplatsContext);

    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<EmailTemplateErrors | null>(null);

    async function GetTemplates() {
        setLoading(true);
        const result: Result<EmailTemplate[], EmailTemplateErrors> = await UseCase.execute();
        result.match((templates) => setTemplates(templates), (err) => setError(err));
        setLoading(false);
    }

    return {
        templates,
        loading,
        error,
        GetTemplates
    }
}