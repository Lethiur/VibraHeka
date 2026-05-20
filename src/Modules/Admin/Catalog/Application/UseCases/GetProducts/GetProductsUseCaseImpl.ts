import { IGetProductsUseCase } from "@admin/catalog/Application/UseCases/GetProducts/IGetProductsUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { Result } from "neverthrow";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default class GetProductsUseCaseImpl implements IGetProductsUseCase {
    constructor(private Repository: ICatalogRepository) {}

    execute(): Promise<Result<ProductEntity[], CatalogErrors>> {
        return this.Repository.GetProducts();
    }
}
