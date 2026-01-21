import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { EmailTemplate } from "@admin/emailTempaltes/Domain/Models/EmailTemplate";

interface EmailTemplatesTableProps {
    templates: EmailTemplate[] | undefined;
    isLoading: boolean;
    onEdit?: (template: EmailTemplate) => void;
    onDelete?: (template: EmailTemplate) => void;
    onView?: (template: EmailTemplate) => void;
}

export default function EmailTemplatesTable({
    templates,
    isLoading,
    onEdit,
    onDelete,
    onView,
}: EmailTemplatesTableProps) {
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-4">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!templates || templates.length === 0) {
        return <div className="text-muted">No hay plantillas</div>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Creado</th>
                    <th>Última modificación</th>
                    <th className="text-end">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {templates.map((template) => (
                    <tr key={template.ID}>
                        <td>{template.Name || <em className="text-muted">Sin nombre</em>}</td>

                        <td>{formatDate(template.Created)}</td>
                        <td>{formatDate(template.LastModified)}</td>
                        <td className="text-end">
                            <Stack direction="horizontal" gap={2} className="justify-content-end">
                                {onView && (
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => onView(template)}
                                    >
                                        Ver
                                    </Button>
                                )}
                                {onEdit && (
                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={() => onEdit(template)}
                                    >
                                        Editar
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => onDelete(template)}
                                    >
                                        Eliminar
                                    </Button>
                                )}
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

/* ============
   Utils
   ============ */

function formatDate(date: string): string {
    if (!date || date.startsWith("0001-01-01")) {
        return "—";
    }

    return new Date(date).toLocaleDateString();
}
