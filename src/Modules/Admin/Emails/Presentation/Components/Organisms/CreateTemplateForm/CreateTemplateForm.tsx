import { Form } from "react-bootstrap";
import UseCreateTemplateSkeleton from "@admin/emailTemplates/Presentation/Hooks/UseCreateTemplateSkeleton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";

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
    const processedTemplateIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (templateId && templateId !== processedTemplateIdRef.current) {
            processedTemplateIdRef.current = templateId;
            onTemplateSaved(templateId);
        }
    }, [templateId, onTemplateSaved]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const templateName = event.currentTarget.templateName.value;
        await CreateTemplateSkeleton(templateName);
    };

    return (
        <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <ErrorBox message={error} />

            <PrimaryTextInput
                label={t("pages.admin.emails.form.name_label")}
                name="templateName"
                disabled={loading}
                error={validationErrors.Name?.toString()}
            />

            <PrimaryButton
                label={t("pages.admin.emails.form.submit_button")}
                type="submit"
                variant="primary"
                disabled={loading}
                fullWidth={true}
            />
        </Form>
    );
}
