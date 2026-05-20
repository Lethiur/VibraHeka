import { useContext, useState } from "react";
import { CreateProductUseCaseContext } from "@admin/catalog/Presentation/Context/CreateProductUseCaseContext";
import { ICreateProductUseCase } from "@admin/catalog/Application/UseCases/CreateProduct/ICreateProductUseCase";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import { Result } from "neverthrow";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";

interface UseCreateProductReturn {
    loading: boolean;
    productId: string;
    error: CatalogErrors | null;
    formErrors: ValidationErrors<CreateProductEntity>;
    CreateProduct: (data: CreateProductEntity) => Promise<void>;
}

export default function UseCreateProductUseCase(): UseCreateProductReturn {

    const context: ICreateProductUseCase = useContext(CreateProductUseCaseContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>("");
    const [error, setError] = useState<CatalogErrors | null>(null);
    const [formErrors, setFormErrors] = useState<ValidationErrors<CreateProductEntity>>({});

    async function CreateProduct(data: CreateProductEntity): Promise<void> {
        setLoading(true);
        try {
            const result: Result<string, CatalogErrors> = await context.execute(data);

            result.match(id => {
                setProductId(id);
                setFormErrors({});
            }, (err) => setError(err));
        } catch (error: unknown) {
            if (error instanceof InvalidEntityError) {
                setFormErrors(error.fieldErrors);
            } else {
                setError(CatalogErrors.GENERAL_ERROR);
            }
        }

        setLoading(false);
    }

    return { loading, productId, formErrors, error, CreateProduct };
}
