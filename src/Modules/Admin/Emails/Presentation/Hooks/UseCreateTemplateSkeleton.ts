import { useContext, useState } from "react";
import { CreateTemplateSkeletonContext } from "../Context/CreateTemplateSkeletonContext";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import { Result } from "neverthrow";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { ValidationErrors } from "fluentvalidation-ts";
import CreateTemplateSkeleton from "../../Application/Entities/TemplateSkeleton";

/**
 * Custom hook to manage the creation of an email template skeleton.
 *
 * @returns An object containing the created template ID, loading state, error message, and the function to execute the creation.
 */
export default function UseCreateTemplateSkeleton() {

    const UseCase = useContext(CreateTemplateSkeletonContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors<CreateTemplateSkeleton>>({});
    const [templateId, setTemplateId] = useState<string | null>(null);

    const CreateTemplateSkeleton = async (templateName: string): Promise<void> => {
        setLoading(true);
        try {
            const result: Result<string, EmailTemplateErrors> = await UseCase.Execute(templateName);
            setValidationErrors({});
            result.match(setTemplateId, setError);
        } catch (error: any) {
            if (error instanceof InvalidEntityError) {
                setValidationErrors(error.fieldErrors);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        templateId,
        loading,
        error,
        validationErrors,
        CreateTemplateSkeleton,
    };
}