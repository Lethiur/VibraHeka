import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { useEffect, useState } from "react";
import ErrorBox from "@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import EmailTemplatesTable from "@admin/emailTemplates/Presentation/Components/Molecules/EmailTemplateTable";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import EmailTemplateEditor from "@admin/emailTemplates/Presentation/Components/Organisms/EmailTemplateEditor/EmailTemplateEditor";
import { JSONContent } from "@tiptap/react";
import UseChangeTemplateContent from "@admin/emailTemplates/Presentation/Hooks/UseChangeTemplateContent";
import UseAddAttachmentToTemplate from "@admin/emailTemplates/Presentation/Hooks/UseAddAttachmentToTemplate";

/**
 * Template management screen
 * @returns JSX.Element
 */
export default function TemplateManagement(): JSX.Element {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { ChangeContent, loading: changeContentLoading, error: changeContentError } = UseChangeTemplateContent();

    const { AddAttachmentToTemplate, loading: addAttachmentLoading, error: addAttachmentError } = UseAddAttachmentToTemplate();
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

    const onAddAttachment = (attachment: File): Promise<string> => {
        try {
            if (!emailTemplateSelected) return Promise.reject("No template selected");
            return AddAttachmentToTemplate(emailTemplateSelected.ID, attachment);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    return (
        <div>
            <ErrorBox message={error ?? changeContentError ?? addAttachmentError} />
            <h1 className="shrink-0 p-4">Plantillas de correo</h1>
            {templatesLoading || changeContentLoading || addAttachmentLoading ? <div>Loading...</div> : <div>Hay: {templates.length} plantillas</div>}
            {emailTemplateSelected ? <EmailTemplateEditor template={emailTemplateSelected} onSave={onSaveTemplateContent} onUploadMedia={onAddAttachment} /> : <EmailTemplatesTable templates={templates} isLoading={templatesLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        </div>
    );
}