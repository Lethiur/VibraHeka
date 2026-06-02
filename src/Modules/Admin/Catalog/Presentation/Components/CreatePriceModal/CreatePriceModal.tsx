import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import UseCreatePrice from "@admin/catalog/Presentation/Hooks/UseCreatePrice";
import { BillingInterval, CreateSellableItemPriceEntity, PriceKind } from "@admin/catalog/Domain/Entities/CatalogEntities";

interface CreatePriceModalProps {
  show: boolean;
  sellableItemId: string;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreatePriceModal({ show, sellableItemId, onHide, onSuccess }: CreatePriceModalProps) {
  const { t } = useTranslation();
  const { ShowNotification } = UseToast();
  const { CreatePrice, loading, error } = UseCreatePrice();

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [kind, setKind] = useState<PriceKind>(PriceKind.OneTime);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(BillingInterval.Month);

  useEffect(() => {
    if (!error) return;
    ShowNotification(
      t("pages.admin.catalog.messages.error_title"),
      t(`errors.catalog.${error}`),
      NotificationVariant.Error,
    );
  }, [error, ShowNotification, t]);

  const resetForm = () => {
    setAmount("");
    setCurrency("EUR");
    setKind(PriceKind.OneTime);
    setBillingInterval(BillingInterval.Month);
  };

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const data: CreateSellableItemPriceEntity = {
      SellableItemID: sellableItemId,
      Amount: parsedAmount,
      Currency: currency,
      Kind: kind,
      BillingInterval: kind === PriceKind.Recurring ? billingInterval : undefined,
    };

    const result = await CreatePrice(data);
    if (result) {
      resetForm();
      ShowNotification(
        t("pages.admin.catalog.messages.price_created"),
        t("pages.admin.catalog.messages.price_created"),
        NotificationVariant.Success,
      );
      onSuccess();
    }
  };

  const handleHide = () => {
    if (loading) return;
    resetForm();
    onHide();
  };

  const getErrorMessage = (): string | null => {
    if (!error) return null;
    return t(`errors.catalog.${error}`);
  };

  return (
    <VHModal
      show={show}
      backdrop={loading ? "static" : true}
      keyboard={!loading}
      onHide={handleHide}
      centered
    >
      <VHModal.Header closeButton={!loading}>
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
        <ErrorBox message={getErrorMessage()} />
        <div className="d-flex justify-content-end mt-3">
          <PrimaryButton
            label={loading ? "..." : t("pages.admin.catalog.form.submit")}
            disabled={loading}
            onClick={handleSubmit}
          />
        </div>
      </VHModal.Body>
    </VHModal>
  );
}
