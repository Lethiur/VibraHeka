import { Validator } from "fluentvalidation-ts";
import { CreateEventEntity, CurrencyIsoCode } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsApplicationErrors } from "@admin/events/Application/Errors/EventsApplicationErrors";

export default class CreateEventValidator extends Validator<CreateEventEntity> {
    constructor() {
        super();
        this.ruleFor("EventName").notNull().notEmpty().withMessage(EventsApplicationErrors.NAME_REQUIRED);
        this.ruleFor("EventDescription").notNull().notEmpty().withMessage(EventsApplicationErrors.DESCRIPTION_REQUIRED);
        this.ruleFor("EventDate").notNull().notEmpty().withMessage(EventsApplicationErrors.DATE_REQUIRED);
        this.ruleFor("Duration")
            .must((value) => value > 0)
            .withMessage(EventsApplicationErrors.DURATION_REQUIRED);
        this.ruleFor("EventTimezone").notNull().notEmpty().withMessage(EventsApplicationErrors.TIMEZONE_REQUIRED);
        this.ruleFor("Price")
            .must((value) => value > 0)
            .withMessage(EventsApplicationErrors.PRICE_REQUIRED);
        this.ruleFor("CurrencyCode")
            .must((value) => Object.values(CurrencyIsoCode).includes(value))
            .withMessage(EventsApplicationErrors.CURRENCY_REQUIRED);
    }
}
