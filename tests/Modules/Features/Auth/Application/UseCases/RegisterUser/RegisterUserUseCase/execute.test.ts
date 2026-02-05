import RegisterUserUseCase from "@auth/Application/UseCases/RegisterUser/RegisterUserUseCase";

import MockRegistrationDataValidator from "../../../Validators/MockRegistrationDataValidator";
import { RegistrationData } from "@auth/Domain/Models/RegistrationData";
import { RegistrationResult } from "@auth/Domain/Models/RegistrationResult";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import MockAuthRepository from "tests/Modules/Features/Auth/Domain/Repositories/MockAuthRepository";

describe('RegisterUserUseCase', () => {
    describe('execute', () => {
        let useCase: RegisterUserUseCase;
        let mockAuthRepository: MockAuthRepository;
        let mockRegisterValidator: MockRegistrationDataValidator;

        const registrationData: RegistrationData = {
            email: 'new@example.com',
            fullName: 'New User',
            password: 'password123'
        };

        const registrationResult: RegistrationResult = {
            userId: 'user-123',
            needsConfirmation: false
        };

        beforeEach(() => {
            mockAuthRepository = new MockAuthRepository();
            mockRegisterValidator = new MockRegistrationDataValidator();
            useCase = new RegisterUserUseCase(mockAuthRepository, mockRegisterValidator);
        });

        it('should throw InvalidEntityError when validation fails', async () => {
            const validationErrors = { email: ['Invalid email'] };
            mockRegisterValidator.mockValidationFailure(validationErrors as any);

            await expect(useCase.execute(registrationData)).rejects.toThrow(InvalidEntityError);

            expect(mockRegisterValidator.validate).toHaveBeenCalledWith(registrationData);
            expect(mockAuthRepository.Register).not.toHaveBeenCalled();
        });

        it('should call repository and return result when validation succeeds', async () => {
            mockRegisterValidator.mockValidationSuccess();
            mockAuthRepository.Register.mockResolvedValue({ isOk: () => true, value: registrationResult } as any);

            const result = await useCase.execute(registrationData);

            expect(result.isOk()).toBe(true);
            expect(mockAuthRepository.Register).toHaveBeenCalledWith(registrationData);
        });

        it('should return error result when repository registration fails', async () => {
            const expectedError = AuthErrorCodes.USER_ALREADY_EXISTS;
            mockRegisterValidator.mockValidationSuccess();
            mockAuthRepository.Register.mockResolvedValue({ isErr: () => true, error: expectedError } as any);

            const result = await useCase.execute(registrationData);

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error).toBe(expectedError);
            }
        });
    });
});
