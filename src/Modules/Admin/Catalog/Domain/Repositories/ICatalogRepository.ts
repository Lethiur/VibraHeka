import { Result } from "neverthrow";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";

export interface ICatalogRepository {
    CreateProduct(product: CreateProductEntity): Promise<Result<string, CatalogErrors>>;
    GetProducts(): Promise<Result<ProductEntity[], CatalogErrors>>;
}
