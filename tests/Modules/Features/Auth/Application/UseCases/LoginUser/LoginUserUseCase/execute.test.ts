import LoginUserUseCase from "@auth/Application/UseCases/LoginUser/LoginUserUseCase";
import MockAuthRepository from "../../../../Domain/Repositories/MockAuthRepository";
import MockLoginUserDataValidator from "../../../Validators/MockLoginUserDataValidator";
import MockLocalStorageService from "../../../../../../../core/Infrastructure/Storage/MockLocalStorageService";
import { LoginData } from "@auth/Domain/Models/LoginData";
import { LoginResult } from "@auth/Domain/Models/LoginResult";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";

describe('LoginUserUseCase', () => {
    describe('execute', () => {
        let useCase: LoginUserUseCase;
        let mockAuthRepository: MockAuthRepository;
        let mockLoginValidator: MockLoginUserDataValidator;
        let mockLocalStorageService: MockLocalStorageService;

        const loginData: LoginData = {
            email: 'test@example.com',
            password: 'password123'
        };

        const loginResult: LoginResult = {
            Token: 'fake-token',
            RefreshToken: 'fake-refresh',
            UserID: 'user-123',
            Role: 1
        };

        beforeEach(() => {
            mockAuthRepository = new MockAuthRepository();
            mockLoginValidator = new MockLoginUserDataValidator();
            mockLocalStorageService = new MockLocalStorageService();
            useCase = new LoginUserUseCase(mockAuthRepository, mockLoginValidator, mockLocalStorageService);
        });

        it('should throw InvalidEntityError when validation fails', async () => {
            const validationErrors = { email: ['Invalid email'] };
            mockLoginValidator.mockValidationFailure(validationErrors as any);

            await expect(useCase.execute(loginData)).rejects.toThrow(InvalidEntityError);
            expect(mockLoginValidator.validate).toHaveBeenCalledWith(loginData);
            expect(mockAuthRepository.Login).not.toHaveBeenCalled();
        });

        it('should call repository and return result when validation succeeds', async () => {
            mockLoginValidator.mockValidationSuccess();
            mockAuthRepository.mockLoginSuccess(loginResult);

            const result = await useCase.execute(loginData);

            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
                expect(result.value).toEqual(loginResult);
            }
            expect(mockAuthRepository.Login).toHaveBeenCalledWith(loginData);
        });

        it('should store tokens and role in local storage on successful login', async () => {
            mockLoginValidator.mockValidationSuccess();
            mockAuthRepository.mockLoginSuccess(loginResult);

            await useCase.execute(loginData);

            expect(mockLocalStorageService.setString).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN, loginResult.Token);
            expect(mockLocalStorageService.setString).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN, loginResult.RefreshToken);
            expect(mockLocalStorageService.setString).toHaveBeenCalledWith(STORAGE_KEYS.USER_ID, loginResult.UserID);
            expect(mockLocalStorageService.setString).toHaveBeenCalledWith(STORAGE_KEYS.ROLE, loginResult.Role.toString());
        });

        it('should return error result when repository login fails', async () => {
            const expectedError = AuthErrorCodes.INVALID_EMAIL;
            mockLoginValidator.mockValidationSuccess();
            mockAuthRepository.mockLoginFailure(expectedError);

            const result = await useCase.execute(loginData);

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error).toBe(expectedError);
            }
            expect(mockLocalStorageService.setString).not.toHaveBeenCalled();
        });
    });
});
