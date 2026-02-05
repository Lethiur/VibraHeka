import { CreateTherapistEntity } from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import { Validator } from "fluentvalidation-ts";

export default class CreateTherapistRequestValidator extends Validator<CreateTherapistEntity> {

    constructor() {
        super();
        this.ruleFor('FirstName').notEmpty().withMessage('Name is required');
        this.ruleFor('LastName').notEmpty().withMessage('Last name is required');
        this.ruleFor('MiddleName').notEmpty().withMessage('Middle name is required');
        this.ruleFor('Bio').notEmpty().withMessage('Bio is required');
        this.ruleFor('PhoneNumber').notEmpty().withMessage('Phone number is required');
        this.ruleFor('Email').notEmpty().withMessage('Email is required');
    }
}