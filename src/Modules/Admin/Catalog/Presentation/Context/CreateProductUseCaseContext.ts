import { ICreateProductUseCase } from "@admin/catalog/Application/UseCases/CreateProduct/ICreateProductUseCase";
import { createContext } from "react";
import { CreateProductUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";

export const CreateProductUseCaseContext = createContext<ICreateProductUseCase>(CreateProductUseCase);
