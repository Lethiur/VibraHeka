import { Badge, Button, Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";
import { ProductType } from "@admin/catalog/Domain/Entities/ProductType";

interface ProductsTableProps {
    products: ProductEntity[] | null;
    isLoading: boolean;
}

function SkeletonRow() {
    return (
        <tr className="placeholder-glow">
            <td><span className="placeholder col-8 opacity-25"></span></td>
            <td><span className="placeholder col-10 opacity-25"></span></td>
            <td><span className="placeholder col-4 opacity-25"></span></td>
            <td><span className="placeholder col-4 opacity-25"></span></td>
            <td className="text-center"><span className="placeholder col-8 opacity-25"></span></td>
        </tr>
    );
}

export default function ProductsTable({ products, isLoading }: ProductsTableProps) {
    const { t } = useTranslation();

    function resolveTypeLabel(type: ProductType): string {
        if (type === ProductType.DigitalRecording) {
            return t("pages.admin.catalog.table.type_digital_recording");
        }
        return t("pages.admin.catalog.table.type_therapy");
    }

    return (
        <Table responsive hover className="mb-0">
            <thead>
                <tr>
                    <th>{t("pages.admin.catalog.table.col_name")}</th>
                    <th>{t("pages.admin.catalog.table.col_description")}</th>
                    <th>{t("pages.admin.catalog.table.col_type")}</th>
                    <th>{t("pages.admin.catalog.table.col_status")}</th>
                    <th className="text-center">{t("pages.admin.catalog.table.col_actions")}</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                ) : products && products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.ProductID}>
                            <td>{product.Name}</td>
                            <td>{product.Description}</td>
                            <td>{resolveTypeLabel(product.Type)}</td>
                            <td>
                                <Badge bg={product.IsActive ? "success" : "secondary"}>
                                    {product.IsActive
                                        ? t("pages.admin.catalog.table.status_active")
                                        : t("pages.admin.catalog.table.status_inactive")}
                                </Badge>
                            </td>
                            <td className="text-center">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => {
                                        // TODO: implementar vista detalle
                                        console.log(product);
                                    }}
                                >
                                    {t("pages.admin.catalog.table.action_view")}
                                </Button>
                                {/* TODO: conectar con endpoint toggle cuando esté disponible */}
                                <Form.Check
                                    type="switch"
                                    inline
                                    checked={product.IsActive}
                                    disabled
                                    onChange={() => undefined}
                                    aria-label={t("pages.admin.catalog.table.col_status")}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                            {t("pages.admin.catalog.table.empty")}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
