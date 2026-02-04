import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import MockAuthRepository from "../../../../Domain/Repositories/MockAuthRepository";
import MockVerificationDataValidator from "../../../Validators/MockVerificationDataValidator";
import { VerificationData } from "@auth/Domain/Models/VerificationData";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";

describe('VerifyUserUseCaseImpl', () => {
    describe('Execute', () => {
        let useCase: VerifyUserUseCaseImpl;
        let mockAuthRepository: MockAuthRepository;
        let mockVerificationValidator: MockVerificationDataValidator;

        const verificationData: VerificationData = {
            email: 'test@example.com',
            code: '123456'
        };

        beforeEach(() => {
            mockAuthRepository = new MockAuthRepository();
            mockVerificationValidator = new MockVerificationDataValidator();
            useCase = new VerifyUserUseCaseImpl(mockAuthRepository, mockVerificationValidator);
        });

        it('should throw InvalidEntityError when validation fails', async () => {
            const validationErrors = { code: ['Invalid code'] };
            mockVerificationValidator.mockValidationFailure(validationErrors as any);

            await expect(useCase.Execute(verificationData)).rejects.toThrow(InvalidEntityError);
            expect(mockVerificationValidator.validate).toHaveBeenCalledWith(verificationData);
            expect(mockAuthRepository.Verify).not.toHaveBeenCalled();
        });

        it('should call repository and return result when validation succeeds', async () => {
            mockVerificationValidator.mockValidationSuccess();
            mockAuthRepository.Verify.mockResolvedValue({ isOk: () => true, value: undefined } as any);

            const result = await useCase.Execute(verificationData);

            expect(result.isOk()).toBe(true);
            expect(mockAuthRepository.Verify).toHaveBeenCalledWith(verificationData);
        });

        it('should return error result when repository verification fails', async () => {
            const expectedError = AuthErrorCodes.INVALID_VERIFICATION_CODE;
            mockVerificationValidator.mockValidationSuccess();
            mockAuthRepository.Verify.mockResolvedValue({ isErr: () => true, error: expectedError } as any);

            const result = await useCase.Execute(verificationData);

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error).toBe(expectedError);
            }
        });
    });
});
