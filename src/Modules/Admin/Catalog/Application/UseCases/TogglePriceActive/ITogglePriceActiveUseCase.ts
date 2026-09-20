import { Result } from "neverthrow";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface ITogglePriceActiveUseCase {
  Execute(priceId: string): Promise<Result<void, CatalogErrors>>;
}
