import { Result } from "neverthrow";
import { IGetSellableItemUseCase } from "@admin/catalog/Application/UseCases/GetSellableItem/IGetSellableItemUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { SellableItemEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default class GetSellableItemUseCaseImpl implements IGetSellableItemUseCase {
  constructor(private readonly Repository: ICatalogRepository) {}

  public async Execute(refId: string): Promise<Result<SellableItemEntity, CatalogErrors>> {
    return this.Repository.GetSellableItem(refId);
  }
}
