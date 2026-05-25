import { Result } from "neverthrow";
import { ICreatePriceUseCase } from "@admin/catalog/Application/UseCases/CreatePrice/ICreatePriceUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { SellableItemPriceEntity, CreateSellableItemPriceEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default class CreatePriceUseCaseImpl implements ICreatePriceUseCase {
  constructor(private readonly Repository: ICatalogRepository) {}

  public async Execute(data: CreateSellableItemPriceEntity): Promise<Result<SellableItemPriceEntity, CatalogErrors>> {
    return this.Repository.CreatePrice(data);
  }
}
