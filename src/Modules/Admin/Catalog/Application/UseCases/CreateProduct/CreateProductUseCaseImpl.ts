import { ICreateProductUseCase } from "@admin/catalog/Application/UseCases/CreateProduct/ICreateProductUseCase";
import { Result } from "neverthrow";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { CatalogErrors } from "@admin/catalog/Domain/Errors/CatalogErrors";
import { ICatalogRepository } from "@admin/catalog/Domain/Repositories/ICatalogRepository";
import CreateProductRequestValidator from "@admin/catalog/Application/Validators/CreateProductRequestValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";

export default class CreateProductUseCaseImpl implements ICreateProductUseCase {

    constructor(
        private Repository: ICatalogRepository,
        private Validator: CreateProductRequestValidator
    ) {}

    execute(data: CreateProductEntity): Promise<Result<string, CatalogErrors>> {
        const validate: ValidationErrors<CreateProductEntity> = this.Validator.validate(data);

        if (Object.keys(validate).length > 0) {
            throw new InvalidEntityError(validate);
        }

        return this.Repository.CreateProduct(data);
    }
}
