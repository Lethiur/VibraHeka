import { Result } from "neverthrow";
import { SellableItemPriceEntity, CreateSellableItemPriceEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface ICreatePriceUseCase {
  Execute(data: CreateSellableItemPriceEntity): Promise<Result<SellableItemPriceEntity, CatalogErrors>>;
}
