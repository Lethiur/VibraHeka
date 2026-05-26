import { createContext } from "react";
import { getSellableItemUseCase } from "@admin/catalog/Domain/Composition/CatalogComposition";
import { IGetSellableItemUseCase } from "@admin/catalog/Application/UseCases/GetSellableItem/IGetSellableItemUseCase";

const GetSellableItemContext = createContext<IGetSellableItemUseCase>(getSellableItemUseCase);

export default GetSellableItemContext;
