import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import {
  SellableItemDTO,
  SellableItemPriceDTO,
  CreateSellableItemPriceRequest,
} from "@admin/catalog/Data/DTOs/CatalogDTOs";

export default class CatalogDatasource extends BackendDatasource {
  public async GetSellableItem(refId: string): Promise<Result<SellableItemDTO, string>> {
    return this.get<SellableItemDTO>(`catalog/prices?RefID=${refId}`, true);
  }

  public async CreatePrice(data: CreateSellableItemPriceRequest): Promise<Result<SellableItemPriceDTO, string>> {
    return this.post<SellableItemPriceDTO>("catalog/prices", data, true);
  }

  public async TogglePriceActive(priceId: string): Promise<Result<void, string>> {
    return this.patch<void>(`catalog/prices/${priceId}/toggle-active`, {}, true);
  }
}
