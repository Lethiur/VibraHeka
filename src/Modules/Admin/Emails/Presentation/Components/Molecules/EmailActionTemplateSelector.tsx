import { Card, Col } from "react-bootstrap";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import SearchableDropdown from "@core/Presentation/Components/molecules/Dropdown/Dropdown";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import "./EmailActionTemplateSelector.scss";

interface EmailActionTemplateSelectorProps {
    title: string;
    description: string;
    label: string;
    selectedTemplateName: string;
    options: EmailTemplate[];
    value: EmailTemplate | null;
    isLoading: boolean;
    isSaving: boolean;
    saveDisabled: boolean;
    onChange: (template: EmailTemplate) => void;
    onSave: () => void;
}

export default function EmailActionTemplateSelector({
    title,
    description,
    label,
    selectedTemplateName,
    options,
    value,
    isLoading,
    isSaving,
    saveDisabled,
    onChange,
    onSave,
}: EmailActionTemplateSelectorProps): JSX.Element {
    return (
        <Col lg={4} md={6}>
            <Card className="email-action-card vh-surface-card h-100 border-0">
                <Card.Body className="d-flex flex-column gap-3">
                    <div>
                        <h2 className="email-action-card__title mb-2">{title}</h2>
                        <p className="email-action-card__description mb-0">{description}</p>
                    </div>

                    <div className="email-action-card__current">
                        <span className="email-action-card__current-label">Template activo</span>
                        <span className="email-action-card__current-name">
                            {selectedTemplateName}
                        </span>
                    </div>

                    <div className="email-action-card__selector">
                        <SearchableDropdown<EmailTemplate>
                            label={label}
                            options={options}
                            isLoading={isLoading}
                            value={value}
                            getId={(item) => item.ID}
                            getLabel={(item) => item.Name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mt-auto">
                        <PrimaryButton
                            label="Guardar configuracion"
                            fullWidth={true}
                            disabled={saveDisabled || isSaving}
                            onClick={onSave}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}
