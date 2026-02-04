import LoginUserDataValidator from "@auth/Application/Validators/LoginUserDataValidator";
import { LoginData } from "@auth/Domain/Models/LoginData";
import { ValidationErrors } from "fluentvalidation-ts";

export default class MockLoginUserDataValidator extends LoginUserDataValidator {
    public validate = jest.fn<ValidationErrors<LoginData>, [LoginData]>();

    constructor() {
        super();
    }

    public mockValidationSuccess() {
        this.validate.mockReturnValue({});
    }

    public mockValidationFailure(errors: ValidationErrors<LoginData>) {
        this.validate.mockReturnValue(errors);
    }
}
