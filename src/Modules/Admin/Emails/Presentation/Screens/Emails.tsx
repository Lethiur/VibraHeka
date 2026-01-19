import 'bootstrap/dist/css/bootstrap.min.css';
import UseGetEmailTemplates from '../Hooks/UseGetEmailTemplates';
import { useEffect } from 'react';
import { EmailTemplate } from '../../Domain/Models/EmailTemplate';
import './Emails.scss'
import SearchableDropdown from '@/Core/Presentation/Components/molecules/Dropdown/Dropdown';
import ErrorBox from '@/Core/Presentation/Components/atoms/ErrorBox/ErrorBox';
import { Col, Row } from 'react-bootstrap';

export default function EmailsConfiguration() {

    const { templates, loading: templatesLoading, error, GetTemplates } = UseGetEmailTemplates();


    useEffect(() => {
        GetTemplates();
    }, []);

    return <div className="flex flex-col flex-1 min-h-0">
        <ErrorBox message={error} />
        <h1 className="shrink-0 p-4">Emails configuration</h1>

        <div className="flex-1 min-h-0">
            <Row className='g-3'>
                <Col md={6}>
                    <SearchableDropdown<EmailTemplate>
                        label="Selecciona el template para enviar el codigo de verificacion"
                        options={templates}
                        isLoading={templatesLoading}
                        getId={(item) => item.ID}
                        getLabel={(item) => item.Name}
                        onChange={(item) => console.log(item)}
                    />
                </Col>
                <Col md={6}>
                    <SearchableDropdown<EmailTemplate>
                        label="Selecciona un template para el correo de bienvenida"
                        options={templates}
                        isLoading={templatesLoading}
                        getId={(item) => item.ID}
                        getLabel={(item) => item.Name}
                        onChange={(item) => console.log(item)}
                    />
                </Col>
            </Row>
        </div>

    </div>
}