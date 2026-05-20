import { Validator } from "fluentvalidation-ts";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";

export default class CreateProductRequestValidator extends Validator<CreateProductEntity> {

    constructor() {
        super();
        this.ruleFor('Name').notEmpty().withMessage('Name is required');
        this.ruleFor('Description').notEmpty().withMessage('Description is required');
        this.ruleFor('Price').must(p => p > 0).withMessage('Price must be greater than 0');
        this.ruleFor('CurrencyCode').notEmpty().withMessage('Currency code is required');
    }
}
