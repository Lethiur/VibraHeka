import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { useEffect, useState } from "react";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import EmailTemplatesTable from "@admin/emailTemplates/Presentation/Components/Molecules/EmailTemplateTable";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import EmailTemplateEditor from "@admin/emailTemplates/Presentation/Components/Organisms/EmailTemplateEditor/EmailTemplateEditor";
import { JSONContent } from "@tiptap/react";
import UseChangeTemplateContent from "@admin/emailTemplates/Presentation/Hooks/UseChangeTemplateContent";
import UseAddAttachmentToTemplate from "@admin/emailTemplates/Presentation/Hooks/UseAddAttachmentToTemplate";
import CreateTemplateForm from "@admin/emailTemplates/Presentation/Components/Organisms/CreateTemplateForm/CreateTemplateForm";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { useTranslation } from "react-i18next";


/**
 * Screen for managing email templates, including creation, listing, and content editing.
 * @returns The rendered screen.
 */
export default function TemplateManagement(): JSX.Element {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { ChangeContent, loading: changeContentLoading, error: changeContentError } = UseChangeTemplateContent();
    const { AddAttachmentToTemplate, loading: addAttachmentLoading, error: addAttachmentError } = UseAddAttachmentToTemplate();
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();

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
            ShowNotification(
                t("pages.admin.emails.messages.saved_title"),
                t("pages.admin.emails.messages.saved_content"),
                NotificationVariant.Success
            );
        } else {
            ShowNotification(
                t("pages.admin.emails.messages.error_title"),
                t("pages.admin.emails.messages.save_error"),
                NotificationVariant.Error
            );
        }
    };

    const onTemplateSaved = (templateID: string) => {
        console.log("Template created with ID: ", templateID);
        ShowNotification(
            t("pages.admin.emails.messages.created_title"),
            t("pages.admin.emails.messages.created_content"),
            NotificationVariant.Success
        );
        GetTemplates();
    };

    const onAddAttachment = async (attachment: File): Promise<string> => {
        try {
            if (!emailTemplateSelected) throw new Error(t("pages.admin.emails.messages.no_template_selected"));
            const res = await AddAttachmentToTemplate(emailTemplateSelected.ID, attachment);
            ShowNotification(
                t("pages.admin.emails.messages.upload_success_title"),
                t("pages.admin.emails.messages.upload_success_content"),
                NotificationVariant.Success
            );
            return res;
        } catch (e) {
            ShowNotification(
                t("pages.admin.emails.messages.error_title"),
                t("pages.admin.emails.messages.upload_error"),
                NotificationVariant.Error
            );
            throw e;
        }
    };

    return (
        <div>
            <ErrorBox message={error ?? changeContentError ?? addAttachmentError} />
            <h1 className="shrink-0 p-4">{t("pages.admin.emails.title")}</h1>
            {templatesLoading || changeContentLoading || addAttachmentLoading ?
                <div>{t("pages.admin.emails.loading")}</div> :
                <div>{t("pages.admin.emails.count_text", { count: templates.length })}</div>}
            {emailTemplateSelected ? <EmailTemplateEditor template={emailTemplateSelected} onSave={onSaveTemplateContent} onUploadMedia={onAddAttachment} /> :
                <><CreateTemplateForm onTemplateSaved={onTemplateSaved} />
                    <h1>{t("pages.admin.emails.templates_list_title")}</h1>
                    <EmailTemplatesTable templates={templates} isLoading={templatesLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} /></>}
        </div>
    );
}

