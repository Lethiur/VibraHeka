import {QueryKey, useQuery} from "@tanstack/react-query";
import {Result} from "neverthrow";

type GenericUseQueryOptions = {
    enabled?: boolean;
    refetchInterval?: number;
    refetchOnMount?: boolean | "always";
    refetchOnWindowFocus?: boolean;
    retry?: boolean;
};

export default function GenericUseQuery<TData, TError = string>(
    queryKey: QueryKey,
    queryFn: () => Promise<Result<TData, string>>,
    options: GenericUseQueryOptions = {}
) {
    return useQuery<TData, TError>({
        queryKey,
        queryFn: async () => {
            const result = await queryFn();
            return result.match(
                (data) => data,
                (err) => {
                    throw err;
                }
            );
        },
        enabled: options.enabled ?? true,
        retry: options.retry ?? false,
        refetchInterval: options.refetchInterval,
        refetchOnMount: options.refetchOnMount ?? true,
        refetchOnWindowFocus: options.refetchOnWindowFocus ?? true,
    });
}