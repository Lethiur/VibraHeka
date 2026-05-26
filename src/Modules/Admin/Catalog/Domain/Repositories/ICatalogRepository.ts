import { Result } from "neverthrow";
import { SellableItemEntity, SellableItemPriceEntity, CreateSellableItemPriceEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface ICatalogRepository {
  GetSellableItem(refId: string): Promise<Result<SellableItemEntity, CatalogErrors>>;
  CreatePrice(data: CreateSellableItemPriceEntity): Promise<Result<SellableItemPriceEntity, CatalogErrors>>;
  TogglePriceActive(priceId: string): Promise<Result<void, CatalogErrors>>;
}
