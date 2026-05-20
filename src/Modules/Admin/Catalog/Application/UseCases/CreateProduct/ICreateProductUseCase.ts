import { Result } from "neverthrow";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export interface ICreateProductUseCase {
    execute(data: CreateProductEntity): Promise<Result<string, CatalogErrors>>;
}
