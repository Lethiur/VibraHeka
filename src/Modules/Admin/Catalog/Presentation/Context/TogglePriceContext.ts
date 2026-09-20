import { createContext } from "react";
import { togglePriceActiveUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";
import { ITogglePriceActiveUseCase } from "@admin/catalog/Application/UseCases/TogglePriceActive/ITogglePriceActiveUseCase";

const TogglePriceContext = createContext<ITogglePriceActiveUseCase>(togglePriceActiveUseCase);

export default TogglePriceContext;
