import { useContext, useState } from "react";
import TogglePriceContext from "@admin/catalog/Presentation/Context/TogglePriceContext";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default function UseTogglePriceActive() {
  const UseCase = useContext(TogglePriceContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CatalogErrors | null>(null);

  const ActivatePrice = async (sellableItemPriceID: string, sellableItemID: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const result = await UseCase.Execute(sellableItemPriceID, sellableItemID);
    setLoading(false);
    if (result.isErr()) {
      setError(result.error);
      return false;
    }
    return true;
  };

  return { ActivatePrice, loading, error };
}
