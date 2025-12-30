import { apiClient } from '../../../core/infrastructure/ApiClient';
import { RegistrationData } from '../domain/models/RegistrationData';
import { RegistrationResult } from '../domain/models/RegistrationResult';
import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { ok, err, Result } from 'neverthrow';
import { AuthErrorCodes } from '../domain/errors/AuthErrorCodes';

export class AuthRepository implements IAuthRepository {

    // Método para registrar usuario
    public async register(data: RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>> {
        try {
            const response = await apiClient.post<RegistrationResult>('/auth/register', data);

            // Aquí podríamos hacer alguna lógica intermedia si el registro es exitoso
            // como guardar un token si el backend lo devuelve inmediatamente al registrarse.
            if (response.isOk()) {
                return ok(response.value);
            } else {
                return err(response.error as AuthErrorCodes);
            }
        } catch (error: any) {
            console.error("Error en el repositorio de registro:", error);
            return err(AuthErrorCodes.UNEXPECTED_ERROR);
        }
    }
}

export const authRepository = new AuthRepository();
