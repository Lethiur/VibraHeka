import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import {Validator} from "fluentvalidation-ts";

export default class CreateTherapistRequestValidator extends Validator<CreateTherapistEntity> {
    
    constructor() {
        super();
        this.ruleFor('Name').notEmpty().withMessage('Name is required');
        this.ruleFor('Email').notEmpty().withMessage('Email is required');
    }
}