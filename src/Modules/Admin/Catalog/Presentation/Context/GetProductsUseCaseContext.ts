import { createContext } from "react";
import { IGetProductsUseCase } from "@admin/catalog/Application/UseCases/GetProducts/IGetProductsUseCase";
import { GetProductsUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";

export const GetProductsUseCaseContext = createContext<IGetProductsUseCase>(GetProductsUseCase);
