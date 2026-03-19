import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { useCallback, useEffect, useState } from "react";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import EmailTemplateEditor from "@admin/emailTemplates/Presentation/Components/Organisms/EmailTemplateEditor/EmailTemplateEditor";
import UseChangeTemplateContent from "@admin/emailTemplates/Presentation/Hooks/UseChangeTemplateContent";
import UseAddAttachmentToTemplate from "@admin/emailTemplates/Presentation/Hooks/UseAddAttachmentToTemplate";
import CreateTemplateForm from "@admin/emailTemplates/Presentation/Components/Organisms/CreateTemplateForm/CreateTemplateForm";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { useTranslation } from "react-i18next";
import { Badge, Col, Container, Row } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import "./TemplateManagement.scss";
import EmailTemplatesTable
    from "@admin/emailTemplates/Presentation/Components/Molecules/EmailTemplateTable/EmailTemplateTable.tsx";

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

    const isBusy = templatesLoading || changeContentLoading || addAttachmentLoading;

    const handleEdit = (template: EmailTemplate) => {
        setEmailTemplateSelected(template);
    };

    const handleDelete = (template: EmailTemplate) => {
        console.log("Delete", template);
    };
    
    const onSaveTemplateContent = async (content: string) => {
        if (!emailTemplateSelected) return;

        const result = await ChangeContent(emailTemplateSelected.ID, content);

        if (result.isOk()) {
            ShowNotification(
                t("pages.admin.emails.messages.saved_title"),
                t("pages.admin.emails.messages.saved_content"),
                NotificationVariant.Success
            );
            return;
        }

        ShowNotification(
            t("pages.admin.emails.messages.error_title"),
            t("pages.admin.emails.messages.save_error"),
            NotificationVariant.Error
        );
    };

    const onTemplateSaved = useCallback((templateID: string) => {
        console.log("Template created with ID: ", templateID);
        ShowNotification(
            t("pages.admin.emails.messages.created_title"),
            t("pages.admin.emails.messages.created_content"),
            NotificationVariant.Success
        );
        GetTemplates();
    }, [GetTemplates, ShowNotification, t]);

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
        <Container fluid className="template-management-page py-4 py-md-5">
            <ErrorBox message={error ?? changeContentError ?? addAttachmentError} />

            <section className="template-management-page__header vh-surface-card mb-4 mb-md-5">
                <div>
                    <h1 className="mb-2">{t("pages.admin.emails.title")}</h1>
                    <p className="mb-0">
                        Administra tus plantillas y mant�n un tono consistente en cada email transaccional.
                    </p>
                </div>

                <div className="template-management-page__status mt-3 mt-md-0">
                    <Badge bg={isBusy ? "secondary" : "success"}>
                        {isBusy ? t("pages.admin.emails.loading") : "Actualizado"}
                    </Badge>
                    <span>{t("pages.admin.emails.count_text", { count: templates.length })}</span>
                </div>
            </section>

            {emailTemplateSelected ? (
                <section className="template-management-page__editor vh-surface-card">
                    <div className="template-management-page__editor-top">
                        <div>
                            <h2 className="mb-1">Editando plantilla</h2>
                            <p className="mb-0">{emailTemplateSelected.Name}</p>
                        </div>

                        <PrimaryButton
                            label="Volver al listado"
                            variant="outline-secondary"
                            onClick={() => setEmailTemplateSelected(null)}
                        />
                    </div>

                    <div className="template-management-page__editor-body">
                        <EmailTemplateEditor
                            template={emailTemplateSelected}
                            onSave={onSaveTemplateContent}
                            onUploadMedia={onAddAttachment}
                        />
                    </div>
                </section>
            ) : (
                <Row className="g-4">
                    <Col xl={4} lg={5}>
                        <section className="template-management-page__panel vh-surface-card h-100">
                            <h2>{t("pages.admin.emails.form.create_title")}</h2>
                            <p className="template-management-page__panel-copy">
                                Crea una base y luego personaliza el contenido desde el editor.
                            </p>
                            <CreateTemplateForm onTemplateSaved={onTemplateSaved} />
                        </section>
                    </Col>

                    <Col xl={8} lg={7}>
                        <section className="template-management-page__panel vh-surface-card h-100">
                            <h2>{t("pages.admin.emails.templates_list_title")}</h2>
                            <p className="template-management-page__panel-copy">
                                Selecciona una plantilla para editar su contenido y mantener trazabilidad de cambios.
                            </p>
                            <EmailTemplatesTable
                                templates={templates}
                                isLoading={templatesLoading}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </section>
                    </Col>
                </Row>
            )}
        </Container>
    );
}


