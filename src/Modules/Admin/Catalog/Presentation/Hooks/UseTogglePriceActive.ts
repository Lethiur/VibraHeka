import { useContext, useState } from "react";
import TogglePriceContext from "@admin/catalog/Presentation/Context/TogglePriceContext";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export default function UseTogglePriceActive() {
  const UseCase = useContext(TogglePriceContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CatalogErrors | null>(null);

  const TogglePrice = async (priceId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const result = await UseCase.Execute(priceId);
    setLoading(false);
    if (result.isErr()) {
      setError(result.error);
      return false;
    }
    return true;
  };

  return { TogglePrice, loading, error };
}
