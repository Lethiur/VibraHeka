import {
    MutationKey,
    UseMutationOptions,
    useMutation,
    UseMutateFunction,
    UseMutateAsyncFunction
} from "@tanstack/react-query";
import { Result } from "neverthrow";

type GenericUseMutationOptions<TData, TError, TVariables> = Pick<
    UseMutationOptions<TData, TError, TVariables>,
    "onSuccess" | "onError" | "retry" | "retryDelay"
>;

type GenericUseMutationReturn<TData, TError, TVariables> = {
    data: TData | undefined;
    error: TError | null;
    loading: boolean;
    success: boolean;
    execute: UseMutateFunction<TData, TError, TVariables, unknown>;
    executeAsync: UseMutateAsyncFunction<TData, TError, TVariables, unknown>;
    reset: () => void;
};

export default function GenericUseMutation<TData, TError, TVariables = void>(
    mutationKey: MutationKey,
    mutationFn: (variables: TVariables) => Promise<Result<TData, TError>>,
    options: GenericUseMutationOptions<TData, TError, TVariables> = {}
): GenericUseMutationReturn<TData, TError, TVariables> {
    const mutation = useMutation<TData, TError, TVariables>({
        mutationKey,
        mutationFn: async (variables: TVariables) => {
            const result = await mutationFn(variables);

            return result.match(
                data => data,
                error => { throw error; }
            );
        },
        ...options,
    });

    return {
        data: mutation.data,
        error:  mutation.error,
        loading: mutation.isPending,
        success: mutation.isSuccess,
        execute: mutation.mutate,
        executeAsync: mutation.mutateAsync,
        reset: mutation.reset,
    };
}