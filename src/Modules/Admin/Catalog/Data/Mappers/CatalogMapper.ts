import {
  BillingInterval,
  PriceKind,
  SellableItemEntity,
  SellableItemPriceEntity,
  SellableItemType,
} from "@admin/catalog/Domain/Entities/CatalogEntities";
import {
  SellableItemDTO,
  SellableItemPriceDTO,
} from "@admin/catalog/Data/DTOs/CatalogDTOs";

export function mapPriceDTO(dto: SellableItemPriceDTO): SellableItemPriceEntity {
  return {
    SellableItemPriceID: dto.sellableItemPriceID,
    SellableItemID: dto.sellableItemID,
    Amount: dto.amount,
    Currency: dto.currencyCode,
    Kind: dto.kind as PriceKind,
    BillingInterval: dto.billingInterval !== undefined ? (dto.billingInterval as BillingInterval) : undefined,
    ExternalProductID: dto.externalProductID,
    ExternalPriceID: dto.externalPriceID,
    IsActive: dto.isActive,
  };
}

export function mapSellableItemDTO(dto: SellableItemDTO): SellableItemEntity {
  return {
    SellableItemID: dto.sellableItemID,
    Type: dto.type as SellableItemType,
    ReferenceID: dto.referenceID,
    Name: dto.name,
    IsActive: dto.isActive,
    Prices: dto.prices.map(mapPriceDTO),
  };
}
