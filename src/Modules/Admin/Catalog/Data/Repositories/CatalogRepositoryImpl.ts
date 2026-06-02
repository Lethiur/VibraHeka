import { Result } from "neverthrow";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import {
  SellableItemEntity,
  SellableItemPriceEntity,
  CreateSellableItemPriceEntity,
} from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import CatalogDatasource from "@admin/catalog/Data/Datasources/CatalogDatasource";
import { mapPriceDTO, mapSellableItemDTO } from "@admin/catalog/Data/Mappers/CatalogMapper";

const ERROR_MAP: Record<string, CatalogErrors> = {
  UNAUTHORIZED: CatalogErrors.UNAUTHORIZED,
  NETWORK_ERROR: CatalogErrors.NETWORK_ERROR,
  NOT_FOUND: CatalogErrors.NOT_FOUND,
};

function mapError(code: string, fallback: CatalogErrors): CatalogErrors {
  return ERROR_MAP[code] ?? fallback;
}

export default class CatalogRepositoryImpl implements ICatalogRepository {
  constructor(private readonly Datasource: CatalogDatasource = new CatalogDatasource()) {}

  public async GetSellableItem(refId: string): Promise<Result<SellableItemEntity, CatalogErrors>> {
    const result = await this.Datasource.GetSellableItem(refId);
    return result
      .map(mapSellableItemDTO)
      .mapErr((code) => mapError(code, CatalogErrors.FETCH_FAILED));
  }

  public async CreatePrice(data: CreateSellableItemPriceEntity): Promise<Result<SellableItemPriceEntity, CatalogErrors>> {
    const result = await this.Datasource.CreatePrice({
      sellableItemID: data.SellableItemID,
      amount: data.Amount,
      currency: data.Currency,
      kind: data.Kind,
      billingInterval: data.BillingInterval,
    });
    return result
      .map(mapPriceDTO)
      .mapErr((code) => mapError(code, CatalogErrors.CREATE_PRICE_FAILED));
  }

  public async ActivatePrice(sellableItemPriceID: string, sellableItemID: string): Promise<Result<void, CatalogErrors>> {
    const result = await this.Datasource.ActivatePrice(sellableItemPriceID, sellableItemID);
    return result.mapErr((code) => mapError(code, CatalogErrors.TOGGLE_FAILED));
  }
}
