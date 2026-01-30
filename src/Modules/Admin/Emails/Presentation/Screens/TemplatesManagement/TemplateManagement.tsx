import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { useEffect, useState } from "react";
import ErrorBox from "@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import EmailTemplatesTable from "@admin/emailTemplates/Presentation/Components/Molecules/EmailTemplateTable";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import EmailTemplateEditor from "@admin/emailTemplates/Presentation/Components/Organisms/EmailTemplateEditor/EmailTemplateEditor";
import { JSONContent } from "@tiptap/react";
import UseChangeTemplateContent from "@admin/emailTemplates/Presentation/Hooks/UseChangeTemplateContent";
import UseAddAttachmentToTemplate from "@admin/emailTemplates/Presentation/Hooks/UseAddAttachmentToTemplate";
import CreateTemplateForm from "@admin/emailTemplates/Presentation/Components/Organisms/CreateTemplateForm/CreateTemplateForm";
import { UseToast } from "@/core/Presentation/Hooks/UseToast";
import { NotificationVariant } from "@/core/Domain/Notifications/INotificationProvider";


/**
 * Template management screen
 * @returns JSX.Element
 */
export default function TemplateManagement(): JSX.Element {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { ChangeContent, loading: changeContentLoading, error: changeContentError } = UseChangeTemplateContent();
    const { AddAttachmentToTemplate, loading: addAttachmentLoading, error: addAttachmentError } = UseAddAttachmentToTemplate();
    const { ShowNotification } = UseToast();

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

    const onSaveTemplateContent = async (content: JSONContent) => {
        if (!emailTemplateSelected) return;
        const result = await ChangeContent(emailTemplateSelected.ID, content);
        if (result.isOk()) {
            ShowNotification("Guardado", "Contenido guardado correctamente", NotificationVariant.Success);
        } else {
            ShowNotification("Error", "Error al guardar el contenido", NotificationVariant.Error);
        }
    };

    const onTemplateSaved = (templateID: string) => {
        console.log("Template created with ID: ", templateID);
        ShowNotification("Éxito", "Plantilla creada correctamente", NotificationVariant.Success);
        GetTemplates();
    };

    const onAddAttachment = async (attachment: File): Promise<string> => {
        try {
            if (!emailTemplateSelected) throw new Error("No template selected");
            const res = await AddAttachmentToTemplate(emailTemplateSelected.ID, attachment);
            ShowNotification("Éxito", "Archivo adjunto subido", NotificationVariant.Success);
            return res;
        } catch (e) {
            ShowNotification("Error", "Error al subir adjunto", NotificationVariant.Error);
            throw e;
        }
    };

    return (
        <div>
            <ErrorBox message={error ?? changeContentError ?? addAttachmentError} />
            <h1 className="shrink-0 p-4">Plantillas de correo</h1>
            {templatesLoading || changeContentLoading || addAttachmentLoading ? <div>Loading...</div> : <div>Hay: {templates.length} plantillas</div>}
            {emailTemplateSelected ? <EmailTemplateEditor template={emailTemplateSelected} onSave={onSaveTemplateContent} onUploadMedia={onAddAttachment} /> :
                <><CreateTemplateForm onTemplateSaved={onTemplateSaved} />
                    <h1>Plantillas</h1>
                    <EmailTemplatesTable templates={templates} isLoading={templatesLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} /></>}
        </div>
    );
}

