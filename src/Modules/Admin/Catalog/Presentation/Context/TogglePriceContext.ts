import { createContext } from "react";
import { activatePriceUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";
import { ITogglePriceActiveUseCase } from "@admin/catalog/Application/UseCases/TogglePriceActive/ITogglePriceActiveUseCase";

const TogglePriceContext = createContext<ITogglePriceActiveUseCase>(activatePriceUseCase);

export default TogglePriceContext;
