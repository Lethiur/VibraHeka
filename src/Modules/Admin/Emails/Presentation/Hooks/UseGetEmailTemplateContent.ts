import { IGetEmailTemplateContentUseCase } from "../../Application/UseCases/GetEmailTemplateContent/IGetEmailTemplateContentUseCase";
import { useContext, useState } from "react";
import { GetEmailTemplateContentContext } from "../Context/GetEmailTemplateContentContext";


export function UseGetEmailTemplateContent() {

    const UseCase: IGetEmailTemplateContentUseCase = useContext(GetEmailTemplateContentContext);

    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function GetContent(templateId: string) {
        setLoading(true);
        const result = await UseCase.Execute(templateId);
        result.match((content) => setContent(content), (error) => setError(error));
        setLoading(false);
    }

    return {
        content,
        loading,
        error,
        GetContent
    }
}