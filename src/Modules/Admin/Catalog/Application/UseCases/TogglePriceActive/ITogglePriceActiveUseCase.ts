import { Result } from "neverthrow";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface ITogglePriceActiveUseCase {
  Execute(sellableItemPriceID: string, sellableItemID: string): Promise<Result<void, CatalogErrors>>;
}
