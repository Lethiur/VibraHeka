import UseGetEmailTemplates from "@admin/emailTempaltes/Presentation/Hooks/UseGetEmailTemplates";
import { useEffect } from "react";
import ErrorBox from "@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import EmailTemplatesTable from "../../Components/Molecules/EmailTemplateTable";

/**
 * Template management screen
 * @returns JSX.Element
 */
export default function TemplateManagement(): JSX.Element {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();

    useEffect(() => {
        GetTemplates();
    }, []);

    return (
        <div>
            <ErrorBox message={error} />
            <h1 className="shrink-0 p-4">Plantillas de correo</h1>
            {templatesLoading ? <div>Loading...</div> : <div>Hay: {templates.length} plantillas</div>}
            <EmailTemplatesTable templates={templates} isLoading={templatesLoading} onDelete={(template) => { }} onEdit={(template) => { }} onView={(template) => { }} />
        </div>
    );
}