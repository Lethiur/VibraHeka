import { useContext, useState } from "react";
import CreatePriceContext from "@admin/catalog/Presentation/Context/CreatePriceContext";
import { CreateSellableItemPriceEntity, SellableItemPriceEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default function UseCreatePrice() {
  const UseCase = useContext(CreatePriceContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CatalogErrors | null>(null);

  const CreatePrice = async (data: CreateSellableItemPriceEntity): Promise<SellableItemPriceEntity | null> => {
    setLoading(true);
    setError(null);
    const result = await UseCase.Execute(data);
    setLoading(false);
    if (result.isErr()) {
      setError(result.error);
      return null;
    }
    return result.value;
  };

  return { CreatePrice, loading, error };
}
