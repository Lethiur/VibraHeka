import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import CreateProductForm from "@admin/catalog/Presentation/Components/Organisms/CreateProductForm/CreateProductForm";
import ProductsTable from "@admin/catalog/Presentation/Components/Organisms/ProductsTable/ProductsTable";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import UseCreateProductUseCase from "@admin/catalog/Presentation/Hooks/UseCreateProductUseCase";
import UseGetProductsUseCase from "@admin/catalog/Presentation/Hooks/UseGetProductsUseCase";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import "./CatalogIndex.scss";

export default function CatalogIndex() {
    const { t } = useTranslation();
    const { loading: loadingProducts, products, error: loadError, refetch } = UseGetProductsUseCase();
    const { loading: submitting, productId, error: createError, formErrors, CreateProduct } = UseCreateProductUseCase();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (productId !== "") {
            setIsModalOpen(false);
            refetch();
        }
    }, [productId]);

    async function handleCreateProduct(data: CreateProductEntity): Promise<void> {
        await CreateProduct(data);
    }

    return (
        <Container fluid className="catalog-page py-4 py-md-5">
            <ErrorBox message={loadError} />

            <section className="catalog-page__header vh-surface-card mb-4 mb-md-5">
                <h1>{t("pages.admin.catalog.table.title")}</h1>
                <PrimaryButton
                    label={t("pages.admin.catalog.table.new_button")}
                    onClick={() => setIsModalOpen(true)}
                />
            </section>

            <section className="catalog-page__panel vh-surface-card">
                <ProductsTable products={products} isLoading={loadingProducts} />
            </section>

            <VHModal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
                <VHModal.Header closeButton>
                    <VHModal.Title>{t("pages.admin.catalog.form.title")}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body>
                    <ErrorBox message={createError} />
                    <CreateProductForm
                        onSubmit={handleCreateProduct}
                        isSubmitting={submitting}
                        errors={formErrors}
                    />
                </VHModal.Body>
            </VHModal>
        </Container>
    );
}
