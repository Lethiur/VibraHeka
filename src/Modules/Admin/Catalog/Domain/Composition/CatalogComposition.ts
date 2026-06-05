import CatalogDatasource from "@admin/catalog/Data/Datasources/CatalogDatasource";
import CatalogRepositoryImpl from "@admin/catalog/Data/Repositories/CatalogRepositoryImpl";
import GetSellableItemUseCaseImpl from "@admin/catalog/Application/UseCases/GetSellableItem/GetSellableItemUseCaseImpl";
import CreatePriceUseCaseImpl from "@admin/catalog/Application/UseCases/CreatePrice/CreatePriceUseCaseImpl";
import TogglePriceActiveUseCaseImpl from "@admin/catalog/Application/UseCases/TogglePriceActive/TogglePriceActiveUseCaseImpl";
import { IGetSellableItemUseCase } from "@admin/catalog/Application/UseCases/GetSellableItem/IGetSellableItemUseCase";
import { ICreatePriceUseCase } from "@admin/catalog/Application/UseCases/CreatePrice/ICreatePriceUseCase";
import { ITogglePriceActiveUseCase } from "@admin/catalog/Application/UseCases/TogglePriceActive/ITogglePriceActiveUseCase";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";

const datasource: CatalogDatasource = new CatalogDatasource();
const repository: ICatalogRepository = new CatalogRepositoryImpl(datasource);

export const getSellableItemUseCase: IGetSellableItemUseCase = new GetSellableItemUseCaseImpl(repository);
export const createPriceUseCase: ICreatePriceUseCase = new CreatePriceUseCaseImpl(repository);
export const activatePriceUseCase: ITogglePriceActiveUseCase = new TogglePriceActiveUseCaseImpl(repository);
