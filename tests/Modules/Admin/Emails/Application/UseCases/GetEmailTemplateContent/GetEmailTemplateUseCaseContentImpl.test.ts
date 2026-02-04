import GetEmailTemplateUseCaseContentImpl from "@admin/emailTemplates/Application/UseCases/GetEmailTemplateContent/GetEmailTemplateContentUseCaseImpl";
import MockEmailTemplateContentRepository from "../../../Domain/Repositories/MockEmailTemplateContentRepository";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

describe('GetEmailTemplateUseCaseContentImpl', () => {
    let useCase: GetEmailTemplateUseCaseContentImpl;
    let mockRepository: MockEmailTemplateContentRepository;

    beforeEach(() => {
        mockRepository = new MockEmailTemplateContentRepository();
        useCase = new GetEmailTemplateUseCaseContentImpl(mockRepository);
    });

    it('should return template content when repository succeeds', async () => {
        const expectedContent = '<h1>Welcome</h1>';
        const templateID = 'template-123';
        mockRepository.mockGetContentSuccess(expectedContent);

        const result = await useCase.Execute(templateID);

        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toBe(expectedContent);
        }
        expect(mockRepository.GetEmailTemplateContent).toHaveBeenCalledWith(templateID);
    });

    it('should return error when repository fails', async () => {
        const templateID = 'invalid-id';
        const expectedError = EmailTemplateErrors.TEMPLATE_NOT_FOUND;
        mockRepository.mockGetContentFailure(expectedError);

        const result = await useCase.Execute(templateID);

        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
            expect(result.error).toBe(expectedError);
        }
        expect(mockRepository.GetEmailTemplateContent).toHaveBeenCalledWith(templateID);
    });
});
