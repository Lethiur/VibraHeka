import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";

/**
 * Props for the EmailTemplatesTable component.
 */
interface EmailTemplatesTableProps {
    /**
     * The list of email templates to display.
     */
    templates: EmailTemplate[] | undefined;
    /**
     * Whether the templates are currently loading.
     */
    isLoading: boolean;
    /**
     * Callback function for editing a template.
     */
    onEdit?: (template: EmailTemplate) => void;
    /**
     * Callback function for deleting a template.
     */
    onDelete?: (template: EmailTemplate) => void;
    /**
     * Callback function for viewing a template.
     */
    onView?: (template: EmailTemplate) => void;
}

/**
 * Table component for displaying and managing email templates.
 * @param props The component props.
 * @returns The rendered component.
 */
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
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Creado</th>
                    <th>Última modificación</th>
                    <th className="text-end">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {templates.map((template) => (
                    <tr key={template.ID}>
                        <td>{template.ID}</td>
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

/**
 * Formats a date string for display in the table.
 * @param date The date string to format.
 * @returns The formatted date string or a dash if the date is invalid or empty.
 */
function formatDate(date: string): string {
    if (!date || date.startsWith("0001-01-01")) {
        return "—";
    }

    return new Date(date).toLocaleDateString();
}
