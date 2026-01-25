import { Table, Button, Card, Row, Col } from 'react-bootstrap';
import Therapist from "@admin/addTherapist/Domain/Entities/Therapist";
import {useTranslation} from "react-i18next";
// Supongamos que User es una entidad de tu dominio



interface UserTableProps {
    users: Therapist[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    isLoading : boolean
}

export default function TherapistList({ users, onDelete, onEdit, isLoading }: UserTableProps) {
    
    const {t} = useTranslation();
    
    const SkeletonRow = () => (
        <tr className="placeholder-glow">
            <td><span className="placeholder col-8 opacity-25"></span></td>
            <td><span className="placeholder col-10 opacity-25"></span></td>
            <td><span className="placeholder col-12 opacity-25"></span></td>
            <td><span className="placeholder col-4 opacity-25"></span></td>
            <td className="text-center">
                <span className="placeholder col-12 opacity-25"></span>
            </td>
        </tr>
    );

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
                <Row className="align-items-center">
                    <Col>
                        <h5 className="mb-0">{t('pages.therapists.list_title')}</h5>
                    </Col>
                </Row>
            </Card.Header>

            <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                    <tr>
                        <th>{t('pages.therapists.list_id')}</th>
                        <th>{t('pages.therapists.list_name')}</th>
                        <th>{t('pages.therapists.list_email')}</th>
                        <th>{t('pages.therapists.list_role')}</th>
                        <th className="text-center">{t('pages.therapists.list_actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.Id}>
                                <td>{user.Id.substring(0, 8)}...</td>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>
                                    <span className={`badge ${user.Role === 1 ? 'bg-danger' : 'bg-info'}`}>
                                      {user.Role === 1 ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(user.Id)}
                                    >
                                        {t('pages.therapists.options.edit')}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onDelete(user.Id)}
                                    >
                                        {t('pages.therapists.options.delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-muted">
                                No se encontraron terapeutas.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}