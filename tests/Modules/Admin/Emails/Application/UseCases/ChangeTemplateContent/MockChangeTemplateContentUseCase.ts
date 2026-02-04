import IChangeTemplateContentUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import { Result } from "neverthrow";
import { createSuccessResult, createFailureResult } from "../../../../../../Utils/TestUtils";

export default class MockChangeTemplateContentUseCase implements IChangeTemplateContentUseCase {
    public Execute = jest.fn<Promise<Result<void, EmailTemplateErrors>>, [string, string]>();

    public mockExecuteSuccess() {
        this.Execute.mockResolvedValue(createSuccessResult(undefined));
    }

    public mockExecuteFailure(error: EmailTemplateErrors) {
        this.Execute.mockResolvedValue(createFailureResult(error));
    }
}
