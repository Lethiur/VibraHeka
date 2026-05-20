import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import { CatalogAPIErrors } from "./CatalogAPIErrors";

export const API_ERROR_MAP: Record<CatalogAPIErrors, CatalogErrors> = {
    [CatalogAPIErrors.NOT_AUTHORIZED]: CatalogErrors.NOT_AUTHORIZED,
};
