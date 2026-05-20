import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProductsUseCaseContext } from "@admin/catalog/Presentation/Context/GetProductsUseCaseContext";
import { ProductEntity } from "@admin/catalog/Domain/Entities/ProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";

export const PRODUCTS_QUERY_KEY = ["catalog", "products"];

export default function UseGetProductsUseCase() {
    const useCase = useContext(GetProductsUseCaseContext);
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<ProductEntity[], CatalogErrors>({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: async () => {
            const result = await useCase.execute();
            if (result.isErr()) throw result.error;
            return result.value;
        },
    });

    const refetch = () => queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });

    return {
        products: data ?? null,
        loading: isLoading,
        error: error as CatalogErrors | null,
        refetch,
    };
}
