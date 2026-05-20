import CatalogDatasource from "@admin/catalog/Data/Datasources/CatalogDatasource";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import CatalogRepositoryImpl from "@admin/catalog/Data/Repositories/CatalogRepositoryImpl";
import { ICreateProductUseCase } from "@admin/catalog/Application/UseCases/CreateProduct/ICreateProductUseCase";
import CreateProductUseCaseImpl from "@admin/catalog/Application/UseCases/CreateProduct/CreateProductUseCaseImpl";
import CreateProductRequestValidator from "@admin/catalog/Application/Validators/CreateProductRequestValidator";
import { IGetProductsUseCase } from "@admin/catalog/Application/UseCases/GetProducts/IGetProductsUseCase";
import GetProductsUseCaseImpl from "@admin/catalog/Application/UseCases/GetProducts/GetProductsUseCaseImpl";

const datasource: CatalogDatasource = new CatalogDatasource();
const repository: ICatalogRepository = new CatalogRepositoryImpl(datasource);

export const CreateProductUseCase: ICreateProductUseCase = new CreateProductUseCaseImpl(
    repository,
    new CreateProductRequestValidator()
);

export const GetProductsUseCase: IGetProductsUseCase = new GetProductsUseCaseImpl(repository);
