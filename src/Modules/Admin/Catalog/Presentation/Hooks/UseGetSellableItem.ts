import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GetSellableItemContext from "@admin/catalog/Presentation/Context/GetSellableItemContext";
import { SellableItemEntity } from "@admin/catalog/Domain/Entities/CatalogEntities";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export const SELLABLE_ITEM_QUERY_KEY = (refId: string) => ["catalog", "sellableItem", refId];

export default function UseGetSellableItem(refId: string) {
  const UseCase = useContext(GetSellableItemContext);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<SellableItemEntity, CatalogErrors>({
    queryKey: SELLABLE_ITEM_QUERY_KEY(refId),
    queryFn: async () => {
      const result = await UseCase.Execute(refId);
      if (result.isErr()) throw result.error;
      return result.value;
    },
    enabled: !!refId,
  });

  const refetch = () => queryClient.invalidateQueries({ queryKey: SELLABLE_ITEM_QUERY_KEY(refId) });

  return {
    item: data ?? null,
    loading: isLoading,
    error: error as CatalogErrors | null,
    refetch,
  };
}
