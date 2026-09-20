import { Result } from "neverthrow";
import { ITogglePriceActiveUseCase } from "@admin/catalog/Application/UseCases/TogglePriceActive/ITogglePriceActiveUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default class TogglePriceActiveUseCaseImpl implements ITogglePriceActiveUseCase {
  constructor(private readonly Repository: ICatalogRepository) {}

  public async Execute(priceId: string): Promise<Result<void, CatalogErrors>> {
    return this.Repository.TogglePriceActive(priceId);
  }
}
