import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { useEffect, useState } from "react";
import ErrorBox from "@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import EmailTemplatesTable from "../../Components/Molecules/EmailTemplateTable";
import { EmailTemplate } from "../../../Domain/Models/EmailTemplate";
import EmailTemplateEditor from "../../Components/Organisms/EmailTemplateEditor/EmailTemplateEditor";
import { JSONContent } from "@tiptap/react";
import UseChangeTemplateContent from "../../Hooks/UseChangeTemplateContent";

/**
 * Template management screen
 * @returns JSX.Element
 */
export default function TemplateManagement(): JSX.Element {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { ChangeContent, loading: changeContentLoading, error: changeContentError } = UseChangeTemplateContent();
    const [emailTemplateSelected, setEmailTemplateSelected] = useState<EmailTemplate | null>(null);
    useEffect(() => {
        GetTemplates();
    }, []);

    const handleEdit = (template: EmailTemplate) => {
        setEmailTemplateSelected(template);
    };

    const handleDelete = (template: EmailTemplate) => {
        console.log("Delete", template);
    };

    const handleView = (template: EmailTemplate) => {
        console.log("View", template);
    };


    const onSaveTemplateContent = (content: JSONContent) => {
        if (!emailTemplateSelected) return;
        ChangeContent(emailTemplateSelected.ID, content);
    };

    return (
        <div>
            <ErrorBox message={error ?? changeContentError} />
            <h1 className="shrink-0 p-4">Plantillas de correo</h1>
            {templatesLoading || changeContentLoading ? <div>Loading...</div> : <div>Hay: {templates.length} plantillas</div>}
            {emailTemplateSelected ? <EmailTemplateEditor template={emailTemplateSelected} onSave={onSaveTemplateContent} /> : <EmailTemplatesTable templates={templates} isLoading={templatesLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        </div>
    );
}