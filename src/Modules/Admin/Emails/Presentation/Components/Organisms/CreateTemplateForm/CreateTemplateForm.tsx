import { Form, Row } from "react-bootstrap";
import UseCreateTemplateSkeleton from "@admin/emailTemplates/Presentation/Hooks/UseCreateTemplateSkeleton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ErrorBox from "@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox";


interface CreateTemplateFormProps {
    onTemplateSaved: (templateID: string) => void;
}


export default function CreateTemplateForm({ onTemplateSaved }: CreateTemplateFormProps) {

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
                <h1>Crear plantilla</h1>
            </Row>
            <Row md={12}>
                <ErrorBox message={error} />
            </Row>

            <Form noValidate onSubmit={handleSubmit}>

                <Row md={12}>
                    <div className="p-4">
                        <PrimaryTextInput
                            id="templateName"
                            label="Nombre"
                            name="templateName"
                            disabled={loading}
                            error={validationErrors.Name?.toString()}
                        />
                        <div className="p-1"></div>
                        <PrimaryButton
                            label="Crear plantilla"
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