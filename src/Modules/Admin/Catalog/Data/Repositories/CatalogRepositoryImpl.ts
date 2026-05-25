import { Result } from "neverthrow";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import {
  SellableItemEntity,
  SellableItemPriceEntity,
  CreateSellableItemPriceEntity,
  SellableItemType,
  PriceKind,
  BillingInterval,
} from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import CatalogDatasource from "@admin/catalog/Data/Datasources/CatalogDatasource";
import {
  SellableItemDTO,
  SellableItemPriceDTO,
} from "@admin/catalog/Data/DTOs/CatalogDTOs";

const ERROR_MAP: Record<string, CatalogErrors> = {
  UNAUTHORIZED: CatalogErrors.UNAUTHORIZED,
  NETWORK_ERROR: CatalogErrors.NETWORK_ERROR,
  NOT_FOUND: CatalogErrors.NOT_FOUND,
};

function mapError(code: string, fallback: CatalogErrors): CatalogErrors {
  return ERROR_MAP[code] ?? fallback;
}

function mapPriceDTO(dto: SellableItemPriceDTO): SellableItemPriceEntity {
  return {
    SellableItemPriceID: dto.sellableItemPriceID,
    SellableItemID: dto.sellableItemID,
    Amount: dto.amount,
    Currency: dto.currency,
    Kind: dto.kind as PriceKind,
    BillingInterval: dto.billingInterval !== undefined ? (dto.billingInterval as BillingInterval) : undefined,
    ExternalProductID: dto.externalProductID,
    ExternalPriceID: dto.externalPriceID,
    IsActive: dto.isActive,
  };
}

function mapSellableItemDTO(dto: SellableItemDTO): SellableItemEntity {
  return {
    SellableItemID: dto.sellableItemID,
    Type: dto.type as SellableItemType,
    ReferenceID: dto.referenceID,
    Name: dto.name,
    IsActive: dto.isActive,
    Prices: dto.prices.map(mapPriceDTO),
  };
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
      referenceID: data.ReferenceID,
      amount: data.Amount,
      currency: data.Currency,
      kind: data.Kind,
      billingInterval: data.BillingInterval,
    });
    return result
      .map(mapPriceDTO)
      .mapErr((code) => mapError(code, CatalogErrors.CREATE_PRICE_FAILED));
  }

  public async TogglePriceActive(priceId: string): Promise<Result<void, CatalogErrors>> {
    const result = await this.Datasource.TogglePriceActive(priceId);
    return result.mapErr((code) => mapError(code, CatalogErrors.TOGGLE_FAILED));
  }
}
