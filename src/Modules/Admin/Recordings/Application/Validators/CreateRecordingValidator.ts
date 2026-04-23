import { Validator } from "fluentvalidation-ts";
import { CreateRecordingEntity, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsApplicationErrors } from "@admin/recordings/Application/Errors/RecordingsApplicationErrors";

export default class CreateRecordingValidator extends Validator<CreateRecordingEntity> {
    constructor() {
        super();
        this.ruleFor("Name").notNull().notEmpty().withMessage(RecordingsApplicationErrors.NAME_REQUIRED);
        this.ruleFor("Description").notNull().notEmpty().withMessage(RecordingsApplicationErrors.DESCRIPTION_REQUIRED);
        this.ruleFor("Type")
            .must((value) => value === RecordingType.MEDITACION || value === RecordingType.MASTERCLASS || value === RecordingType.TALLER)
            .withMessage(RecordingsApplicationErrors.TYPE_REQUIRED);
        this.ruleFor("File").must((value) => value instanceof File).withMessage(RecordingsApplicationErrors.FILE_REQUIRED);
    }
}

