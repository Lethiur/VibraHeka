import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { SellableItemPriceEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

interface PricesTableProps {
  prices: SellableItemPriceEntity[];
  loading: boolean;
  error: CatalogErrors | null;
  activationLoading: boolean;
  onActivate: (sellableItemPriceID: string, sellableItemID: string) => void;
}

export default function PricesTable({ prices, loading, error, activationLoading, onActivate }: PricesTableProps) {
  const { t } = useTranslation();

  if (loading) {
    return <AppLoader message={t("pages.admin.catalog.loading")} />;
  }

  if (error) {
    return <ErrorBox message={t(`errors.catalog.${error}`)} />;
  }

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>{t("pages.admin.catalog.table.amount")}</th>
          <th>{t("pages.admin.catalog.table.currency")}</th>
          <th>{t("pages.admin.catalog.table.kind")}</th>
          <th>{t("pages.admin.catalog.table.interval")}</th>
          <th>{t("pages.admin.catalog.table.active")}</th>
          <th>{t("pages.admin.catalog.table.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {prices.length === 0 ? (
          <tr>
            <td colSpan={6}>{t("pages.admin.catalog.prices_empty")}</td>
          </tr>
        ) : (
          prices.map((price) => (
            <tr key={price.SellableItemPriceID}>
              <td>{price.Amount}</td>
              <td>{price.Currency}</td>
              <td>{t(`pages.admin.catalog.form.kinds.${price.Kind}`)}</td>
              <td>
                {price.BillingInterval !== undefined
                  ? t(`pages.admin.catalog.form.intervals.${price.BillingInterval}`)
                  : "—"}
              </td>
              <td>
                <span
                  className={`product-info-page__badge ${
                    price.IsActive
                      ? "product-info-page__badge--active"
                      : "product-info-page__badge--inactive"
                  }`}
                >
                  {price.IsActive
                    ? t("pages.admin.catalog.table.active")
                    : t("pages.admin.catalog.table.inactive")}
                </span>
              </td>
              <td>
                <div className="product-info-page__actions">
                  {!price.IsActive && (
                    <PrimaryButton
                      variant="dark-outline"
                      disabled={activationLoading}
                      label={t("pages.admin.catalog.table.activate")}
                      onClick={() => onActivate(price.SellableItemPriceID, price.SellableItemID)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
