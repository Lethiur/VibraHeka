import { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import UseGetSellableItem from "@admin/catalog/Presentation/Hooks/UseGetSellableItem";
import UseTogglePriceActive from "@admin/catalog/Presentation/Hooks/UseTogglePriceActive";
import CreatePriceModal from "@admin/catalog/Presentation/Components/CreatePriceModal/CreatePriceModal";
import PricesTable from "@admin/catalog/Presentation/Components/PricesTable/PricesTable";
import "./ProductInfoPage.scss";

export default function ProductInfoPage() {
  const { refId = "" } = useParams<{ refId: string }>();
  const { t } = useTranslation();
  const { ShowNotification } = UseToast();

  const { item, loading, error, refetch } = UseGetSellableItem(refId);
  const { TogglePrice, loading: toggleLoading } = UseTogglePriceActive();

  const [showModal, setShowModal] = useState(false);

  const handleToggle = async (priceId: string) => {
    const success = await TogglePrice(priceId);
    if (success) {
      ShowNotification(
        t("pages.admin.catalog.messages.price_toggled"),
        t("pages.admin.catalog.messages.price_toggled"),
        NotificationVariant.Success,
      );
      refetch();
    } else {
      ShowNotification(
        t("pages.admin.catalog.messages.error_title"),
        t("errors.catalog.TOGGLE_FAILED"),
        NotificationVariant.Error,
      );
    }
  };

  return (
    <>
      <CreatePriceModal
        show={showModal}
        sellableItemId={item?.SellableItemID ?? ""}
        onHide={() => setShowModal(false)}
        onSuccess={() => { setShowModal(false); refetch(); }}
      />

      <Container fluid className="py-4 py-md-5 product-info-page">
        <section className="vh-surface-card mb-4 product-info-page__header">
          <div className="product-info-page__header-content">
            <div>
              <h1>{loading ? t("pages.admin.catalog.loading") : (item?.Name ?? t("pages.admin.catalog.title"))}</h1>
            </div>
            <PrimaryButton
              label={t("pages.admin.catalog.add_price")}
              onClick={() => setShowModal(true)}
              disabled={loading || !item}
            />
          </div>
        </section>

        <Row className="g-4">
          <Col lg={12}>
            <section className="vh-surface-card product-info-page__prices-panel">
              <h2>{t("pages.admin.catalog.prices_title")}</h2>
              <PricesTable
                prices={item?.Prices ?? []}
                loading={loading}
                error={error}
                toggleLoading={toggleLoading}
                onToggle={handleToggle}
              />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}


