import UseGetEmailTemplates from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplates";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import UseSaveEmailTemplateForAction from "@admin/emailTemplates/Presentation/Hooks/UseSaveEmailTemplateForAction";
import { ActionType } from "@admin/emailTemplates/Domain/Models/ActionType";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import UseGetEmailTemplatesForActions from "@admin/emailTemplates/Presentation/Hooks/UseGetEmailTemplatesForActions";
import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Emails.scss";
import EmailActionTemplateSelector
    from "@admin/emailTemplates/Presentation/Components/Molecules/EmailActionTemplateSelector/EmailActionTemplateSelector.tsx";

interface ActionTemplateConfig {
    actionType: ActionType;
    title: string;
    description: string;
    selectorLabel: string;
}

const actionTemplateConfigs: ActionTemplateConfig[] = [
    {
        actionType: ActionType.UserVerification,
        title: "Verificacion de cuenta",
        description: "Email que se envia cuando el usuario necesita validar su cuenta.",
        selectorLabel: "Selecciona el template para verificacion",
    },
    {
        actionType: ActionType.UserRegistered,
        title: "Bienvenida",
        description: "Email inicial que confirma el registro y presenta el siguiente paso.",
        selectorLabel: "Selecciona el template de bienvenida",
    },
    {
        actionType: ActionType.PasswordReset,
        title: "Recuperacion de contrasena",
        description: "Email para restablecer el acceso cuando el usuario olvida su contrasena.",
        selectorLabel: "Selecciona el template de recuperacion",
    },
];

export default function EmailsConfiguration() {
    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { SaveTemplateForAction, loading: saveLoading, error: saveError } = UseSaveEmailTemplateForAction();
    const {
        templates: templatesForActions,
        loading: templatesForActionsLoading,
        error: templatesForActionsError,
        GetTemplatesForActions,
    } = UseGetEmailTemplatesForActions();

    const [selectedByActionType, setSelectedByActionType] = useState<Record<number, EmailTemplate | null>>({
        [ActionType.UserVerification]: null,
        [ActionType.UserRegistered]: null,
        [ActionType.PasswordReset]: null,
    });

    useEffect(() => {
        GetTemplates();
        GetTemplatesForActions();
    }, []);

    function getTemplateByActionType(actionType: ActionType): EmailTemplate | null {
        const templateForAction: EmailTemplateForAction | undefined = templatesForActions.find(
            (tpl: EmailTemplateForAction) => tpl.ActionType === actionType
        );

        if (templateForAction === undefined) {
            return null;
        }

        return templates.find((item: EmailTemplate) => item.ID === templateForAction.TemplateID) ?? null;
    }

    function getSelectorValue(actionType: ActionType): EmailTemplate | null {
        return selectedByActionType[actionType] ?? getTemplateByActionType(actionType);
    }

    function getCurrentTemplateName(actionType: ActionType): string {
        return getTemplateByActionType(actionType)?.Name ?? "Sin configurar";
    }

    function updateSelectedTemplate(actionType: ActionType, template: EmailTemplate): void {
        setSelectedByActionType((prevState) => ({
            ...prevState,
            [actionType]: template,
        }));
    }

    function saveActionTemplate(actionType: ActionType): void {
        const selectedTemplate = selectedByActionType[actionType];
        if (selectedTemplate == null) return;

        SaveTemplateForAction({
            ActionType: actionType,
            TemplateID: selectedTemplate.ID,
        });
    }

    const selectorsLoading = templatesLoading || templatesForActionsLoading;

    return (
        <Container fluid className="emails-config-page py-4 py-md-5">
            <ErrorBox message={error ?? saveError ?? templatesForActionsError} />

            <div className="emails-config-header vh-surface-card mb-4 mb-md-5">
                <h1 className="mb-2">Emails transaccionales</h1>
                <p className="mb-0">
                    Configura que mensaje se envia en cada momento clave del journey del usuario.
                </p>
            </div>

            <Row className="g-4">
                {actionTemplateConfigs.map((config: ActionTemplateConfig) => (
                    <EmailActionTemplateSelector
                        key={config.actionType}
                        title={config.title}
                        description={config.description}
                        label={config.selectorLabel}
                        selectedTemplateName={getCurrentTemplateName(config.actionType)}
                        options={templates}
                        isLoading={selectorsLoading}
                        isSaving={saveLoading}
                        value={getSelectorValue(config.actionType)}
                        saveDisabled={selectedByActionType[config.actionType] == null}
                        onChange={(template : EmailTemplate) => updateSelectedTemplate(config.actionType, template)}
                        onSave={() => saveActionTemplate(config.actionType)}
                    />
                ))}
            </Row>
        </Container>
    );
}
