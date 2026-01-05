import { Table, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// Supongamos que User es una entidad de tu dominio



interface UserTableProps {
    users: [];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export default function TherapistList({ users, onDelete, onEdit }: UserTableProps)   {
    const navigate = useNavigate();
    return (  <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
            <Row className="align-items-center">
                <Col>
                    <h5 className="mb-0">Gestión de Usuarios</h5>
                </Col>
                <Col className="text-end">
                    {/* El botón que redirige a la página de creación */}
                    <Button
                        variant="primary"
                        onClick={() => navigate('create')} // Redirige a /admin/users/create
                    >
                        <i className="bi bi-plus-lg me-2"></i> Nuevo Usuario
                    </Button>
                </Col>
            </Row>
        </Card.Header>

        <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
                <thead className="bg-light">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id.substring(0, 8)}...</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                      {user.role}
                    </span>
                            </td>
                            <td className="text-center">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => onEdit(user.id)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center py-4 text-muted">
                            No se encontraron usuarios.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Card.Body>
    </Card>);
}