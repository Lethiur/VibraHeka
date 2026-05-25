import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import UseGetSellableItem from "@admin/catalog/Presentation/Hooks/UseGetSellableItem";
import UseCreatePrice from "@admin/catalog/Presentation/Hooks/UseCreatePrice";
import UseTogglePriceActive from "@admin/catalog/Presentation/Hooks/UseTogglePriceActive";
import { BillingInterval, CreateSellableItemPriceEntity, PriceKind } from "@admin/catalog/Domain/Entities/CatalogEntities";
import "./ProductInfoPage.scss";

export default function ProductInfoPage() {
  const { refId = "" } = useParams<{ refId: string }>();
  const { t } = useTranslation();
  const { ShowNotification } = UseToast();

  const { item, loading, error, refetch } = UseGetSellableItem(refId);
  const { CreatePrice, loading: createLoading, error: createError } = UseCreatePrice();
  const { TogglePrice, loading: toggleLoading } = UseTogglePriceActive();

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [kind, setKind] = useState<PriceKind>(PriceKind.OneTime);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(BillingInterval.Month);

  useEffect(() => {
    if (!createError) return;
    ShowNotification(
      t("pages.admin.catalog.messages.error_title"),
      t(`errors.catalog.${createError}`),
      NotificationVariant.Error,
    );
  }, [createError, ShowNotification, t]);

  const resetForm = () => {
    setAmount("");
    setCurrency("EUR");
    setKind(PriceKind.OneTime);
    setBillingInterval(BillingInterval.Month);
  };

  const handleCreatePrice = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const data: CreateSellableItemPriceEntity = {
      ReferenceID: refId,
      Amount: parsedAmount,
      Currency: currency,
      Kind: kind,
      BillingInterval: kind === PriceKind.Recurring ? billingInterval : undefined,
    };

    const result = await CreatePrice(data);
    if (result) {
      setShowModal(false);
      resetForm();
      ShowNotification(
        t("pages.admin.catalog.messages.price_created"),
        t("pages.admin.catalog.messages.price_created"),
        NotificationVariant.Success,
      );
      refetch();
    }
  };

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
        t(`errors.catalog.TOGGLE_FAILED`),
        NotificationVariant.Error,
      );
    }
  };

  const getErrorMessage = (code: string | null): string | null => {
    if (!code) return null;
    return t(`errors.catalog.${code}`);
  };

  return (
    <>
      <VHModal
        show={showModal}
        backdrop={createLoading ? "static" : true}
        keyboard={!createLoading}
        onHide={() => { if (!createLoading) { setShowModal(false); resetForm(); } }}
        centered
      >
        <VHModal.Header closeButton={!createLoading}>
          <VHModal.Title>{t("pages.admin.catalog.form.title")}</VHModal.Title>
        </VHModal.Header>
        <VHModal.Body>
          <PrimaryTextInput
            name="amount"
            label={t("pages.admin.catalog.form.amount")}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="mb-3">
            <label className="form-label">{t("pages.admin.catalog.form.currency")}</label>
            <select className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{t("pages.admin.catalog.form.kind")}</label>
            <select
              className="form-select"
              value={kind}
              onChange={(e) => setKind(parseInt(e.target.value) as PriceKind)}
            >
              <option value={PriceKind.OneTime}>{t("pages.admin.catalog.form.kinds.0")}</option>
              <option value={PriceKind.Recurring}>{t("pages.admin.catalog.form.kinds.1")}</option>
            </select>
          </div>
          {kind === PriceKind.Recurring && (
            <div className="mb-3">
              <label className="form-label">{t("pages.admin.catalog.form.billing_interval")}</label>
              <select
                className="form-select"
                value={billingInterval}
                onChange={(e) => setBillingInterval(parseInt(e.target.value) as BillingInterval)}
              >
                <option value={BillingInterval.Month}>{t("pages.admin.catalog.form.intervals.0")}</option>
                <option value={BillingInterval.Year}>{t("pages.admin.catalog.form.intervals.1")}</option>
              </select>
            </div>
          )}
          <ErrorBox message={getErrorMessage(createError)} />
          <div className="d-flex justify-content-end mt-3">
            <PrimaryButton
              label={createLoading ? "..." : t("pages.admin.catalog.form.submit")}
              disabled={createLoading}
              onClick={handleCreatePrice}
            />
          </div>
        </VHModal.Body>
      </VHModal>

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
            <section className="vh-surface-card">
              <h2 className="h5 mb-3">{t("pages.admin.catalog.prices_title")}</h2>

              <ErrorBox message={getErrorMessage(error)} />

              {loading ? (
                <AppLoader message={t("pages.admin.catalog.loading")} />
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>{t("pages.admin.catalog.table.amount")}</th>
                      <th>{t("pages.admin.catalog.table.kind")}</th>
                      <th>{t("pages.admin.catalog.table.interval")}</th>
                      <th>{t("pages.admin.catalog.table.active")}</th>
                      <th>{t("pages.admin.catalog.table.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!item || item.Prices.length === 0 ? (
                      <tr>
                        <td colSpan={5}>{t("pages.admin.catalog.prices_empty")}</td>
                      </tr>
                    ) : (
                      item.Prices.map((price) => (
                        <tr key={price.SellableItemPriceID}>
                          <td>{price.Amount} {price.Currency}</td>
                          <td>{t(`pages.admin.catalog.form.kinds.${price.Kind}`)}</td>
                          <td>
                            {price.BillingInterval !== undefined
                              ? t(`pages.admin.catalog.form.intervals.${price.BillingInterval}`)
                              : "—"}
                          </td>
                          <td>
                            <Badge bg={price.IsActive ? "success" : "secondary"}>
                              {price.IsActive ? t("pages.admin.catalog.table.activate") : t("pages.admin.catalog.table.deactivate")}
                            </Badge>
                          </td>
                          <td>
                            <PrimaryButton
                              variant="dark-outline"
                              disabled={toggleLoading}
                              label={price.IsActive
                                ? t("pages.admin.catalog.table.deactivate")
                                : t("pages.admin.catalog.table.activate")}
                              onClick={() => handleToggle(price.SellableItemPriceID)}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}


