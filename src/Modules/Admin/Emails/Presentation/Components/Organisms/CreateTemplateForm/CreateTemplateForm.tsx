import { Form, Row } from "react-bootstrap";
import UseCreateTemplateSkeleton from "@admin/emailTemplates/Presentation/Hooks/UseCreateTemplateSkeleton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import { useTranslation } from "react-i18next";


/**
 * Props for the CreateTemplateForm component.
 */
interface CreateTemplateFormProps {
    /**
     * Callback function triggered when a template is successfully saved.
     * @param templateID The ID of the newly created template.
     */
    onTemplateSaved: (templateID: string) => void;
}

/**
 * Form component for creating a new email template skeleton.
 * @param props The component props.
 * @returns The rendered component.
 */
export default function CreateTemplateForm({ onTemplateSaved }: CreateTemplateFormProps) {
    const { t } = useTranslation();
    const { CreateTemplateSkeleton, loading, error, validationErrors, templateId } = UseCreateTemplateSkeleton();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        CreateTemplateSkeleton(event.currentTarget.templateName.value).then(() => {
            if (templateId) {
                onTemplateSaved(templateId);
            }
        });
    };

    return (
        <>
            <Row md={12}>
                <h1>{t("pages.admin.emails.form.create_title")}</h1>
            </Row>
            <Row md={12}>
                <ErrorBox message={error} />
            </Row>

            <Form noValidate onSubmit={handleSubmit}>

                <Row md={12}>
                    <div className="p-4">
                        <PrimaryTextInput
                            id="templateName"
                            label={t("pages.admin.emails.form.name_label")}
                            name="templateName"
                            disabled={loading}
                            error={validationErrors.Name?.toString()}
                        />
                        <div className="p-1"></div>
                        <PrimaryButton
                            label={t("pages.admin.emails.form.submit_button")}
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            fullWidth={true}
                        />
                    </div>
                </Row>
            </Form >

        </>
    )
}