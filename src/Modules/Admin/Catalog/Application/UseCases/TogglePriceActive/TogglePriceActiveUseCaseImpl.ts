import { Result } from "neverthrow";
import { ITogglePriceActiveUseCase } from "@admin/catalog/Application/UseCases/TogglePriceActive/ITogglePriceActiveUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default class TogglePriceActiveUseCaseImpl implements ITogglePriceActiveUseCase {
  constructor(private readonly Repository: ICatalogRepository) {}

  public async Execute(sellableItemPriceID: string, sellableItemID: string): Promise<Result<void, CatalogErrors>> {
    return this.Repository.ActivatePrice(sellableItemPriceID, sellableItemID);
  }
}
