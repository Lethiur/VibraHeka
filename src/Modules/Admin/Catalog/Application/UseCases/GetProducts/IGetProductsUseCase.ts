import { Result } from "neverthrow";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface IGetProductsUseCase {
    execute(): Promise<Result<ProductEntity[], CatalogErrors>>;
}
