import 'bootstrap/dist/css/bootstrap.min.css';
import UseGetEmailTemplates from '@admin/emailTempaltes/Presentation/Hooks/UseGetEmailTemplates';
import { EmailTemplate } from '@admin/emailTempaltes/Domain/Models/EmailTemplate';
import SearchableDropdown from '@/Core/Presentation/Components/molecules/Dropdown/Dropdown';
import ErrorBox from '@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox';
import UseSaveEmailTemplateForAction from '@admin/emailTempaltes/Presentation/Hooks/UseSaveEmailTemplateForAction';
import { ActionType } from '@admin/emailTempaltes/Domain/Models/ActionType';
import { EmailTemplateForAction } from '@admin/emailTempaltes/Domain/Models/EmailTemplateForAction';
import UseGetEmailTemplatesForActions from '@admin/emailTempaltes/Presentation/Hooks/UseGetEmailTemplatesForActions';
import PrimaryButton from '@/Core/Presentation/Components/atoms/PrimaryButton/PrimaryButton';

import { Col, Row } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import './Emails.scss'

/**
 * Emails configuration screen.
 * @returns Emails configuration screen.
 */
export default function EmailsConfiguration() {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();
    const { SaveTemplateForAction, loading: saveLoading, error: saveError } = UseSaveEmailTemplateForAction();
    const { templates: templatesForActions, loading: templatesForActionsLoading, error: templatesForActionsError, GetTemplatesForActions } = UseGetEmailTemplatesForActions();


    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [selectedRegistrationTemplate, setSelectedRegistrationTemplate] = useState<EmailTemplate | null>(null);

    useEffect(() => {
        GetTemplates();
        GetTemplatesForActions();
    }, []);

    const nomralizedTemplatesForActions = useMemo<EmailTemplate | null>(() => {

        if (selectedTemplate != null) {
            return selectedTemplate;
        }

        const templateForAction: EmailTemplateForAction | undefined = templatesForActions.find((tpl: EmailTemplateForAction) => tpl.ActionType === ActionType.UserVerification);

        if (templateForAction == undefined) {
            return null;
        }

        const template: EmailTemplate | null = templates.find((item: EmailTemplate) => item.ID === templateForAction.TemplateID) ?? null
        console.log(template);
        return template;
    }, [templatesForActions, templates, selectedTemplate]);



    return <div className="flex flex-col flex-1 min-h-0">
        <ErrorBox message={error ?? saveError ?? templatesForActionsError} />
        <h1 className="shrink-0 p-4">Emails configuration</h1>

        <div className="flex-1 min-h-0">
            <Row className='g-3'>
                <Col md={3}>
                    <SearchableDropdown<EmailTemplate>
                        label="Selecciona el template para enviar el codigo de verificacion"
                        options={templates}
                        isLoading={templatesLoading || templatesForActionsLoading}
                        value={nomralizedTemplatesForActions}
                        getId={(item) => item.ID}
                        getLabel={(item) => item.Name}
                        onChange={setSelectedTemplate}
                    />
                </Col>
                <Col md={3}>
                    <PrimaryButton
                        label="Guardar"
                        fullWidth={true}
                        disabled={selectedTemplate == null || saveLoading}
                        onClick={() => SaveTemplateForAction({ ActionType: ActionType.UserVerification, TemplateID: selectedTemplate?.ID ?? "" })}
                    />
                </Col>
                <Col md={3}>
                    <SearchableDropdown<EmailTemplate>
                        label="Selecciona un template para el correo de bienvenida"
                        options={templates}
                        isLoading={templatesLoading || templatesForActionsLoading}
                        getId={(item) => item.ID}
                        value={null}
                        getLabel={(item) => item.Name}
                        onChange={setSelectedRegistrationTemplate}
                    />
                </Col>
                <Col md={3}>
                    <PrimaryButton
                        label="Guardar"
                        fullWidth={true}
                        onClick={() => SaveTemplateForAction({ ActionType: ActionType.UserRegistered, TemplateID: selectedRegistrationTemplate?.ID ?? "" })}
                    />
                </Col>
            </Row>
        </div>

    </div>
}