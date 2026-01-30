import { Validator } from "fluentvalidation-ts";
import TemplateSkeleton from "@admin/emailTemplates/Application/Entities/TemplateSkeleton";
import { EmailTemplateApplicationErrors } from "@admin/emailTemplates/Application/Errors/EmailTemplateApplicationErrors";


export default class CreateTemplateSkeletonValidator extends Validator<TemplateSkeleton> {

    constructor() {
        super();
        this.ruleFor("Name").notNull().notEmpty().withMessage(EmailTemplateApplicationErrors.INVALID_TEMPLATE_NAME);
    }
}