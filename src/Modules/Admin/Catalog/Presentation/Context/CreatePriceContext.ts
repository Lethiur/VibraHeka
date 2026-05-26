import { createContext } from "react";
import { createPriceUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";
import { ICreatePriceUseCase } from "@admin/catalog/Application/UseCases/CreatePrice/ICreatePriceUseCase";

const CreatePriceContext = createContext<ICreatePriceUseCase>(createPriceUseCase);

export default CreatePriceContext;
