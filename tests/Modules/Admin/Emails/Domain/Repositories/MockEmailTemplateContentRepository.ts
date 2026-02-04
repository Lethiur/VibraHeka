import IEmailTemplateContentRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateContentRepository";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import { Result } from "neverthrow";
import { createSuccessResult, createFailureResult } from "../../../../../Utils/TestUtils";

export default class MockEmailTemplateContentRepository implements IEmailTemplateContentRepository {
    public GetEmailTemplateContent = jest.fn<Promise<Result<string, EmailTemplateErrors>>, [string]>();

    public mockGetContentSuccess(content: string) {
        this.GetEmailTemplateContent.mockResolvedValue(createSuccessResult(content));
    }

    public mockGetContentFailure(error: EmailTemplateErrors) {
        this.GetEmailTemplateContent.mockResolvedValue(createFailureResult(error));
    }
}
