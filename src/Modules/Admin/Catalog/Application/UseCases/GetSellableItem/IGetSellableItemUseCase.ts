import { Result } from "neverthrow";
import { SellableItemEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface IGetSellableItemUseCase {
  Execute(refId: string): Promise<Result<SellableItemEntity, CatalogErrors>>;
}
