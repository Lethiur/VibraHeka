import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import { Result } from "neverthrow";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { ICreateProductDTO } from "@admin/catalog/Data/Models/ICreateProductDTO";
import { CatalogAPIErrors } from "@admin/catalog/Data/Errors/CatalogAPIErrors";
import { API_ERROR_MAP } from "@admin/catalog/Data/Errors/ErrorMap";
import CatalogDatasource from "@admin/catalog/Data/Datasources/CatalogDatasource";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";
import { ProductType } from "@admin/catalog/Domain/Entities/ProductType";

export default class CatalogRepositoryImpl implements ICatalogRepository {

    constructor(private Datasource: CatalogDatasource) {}

    public async CreateProduct(product: CreateProductEntity): Promise<Result<string, CatalogErrors>> {
        const dto: ICreateProductDTO = {
            name: product.Name,
            description: product.Description,
            price: product.Price,
            currencyCode: product.CurrencyCode,
        };

        const result: Result<string, CatalogAPIErrors> = await this.Datasource.CreateProduct(dto);

        return result.map(id => id).mapErr(e => API_ERROR_MAP[e] ?? CatalogErrors.GENERAL_ERROR);
    }

    public async GetProducts(): Promise<Result<ProductEntity[], CatalogErrors>> {
        const result = await this.Datasource.GetProducts();
        return result
            .map(dtos => dtos.map(dto => ({
                ProductID: dto.productID,
                Name: dto.name,
                Description: dto.description,
                Type: dto.type as ProductType,
                IsActive: dto.isActive,
            })))
            .mapErr(e => API_ERROR_MAP[e] ?? CatalogErrors.GENERAL_ERROR);
    }
}
