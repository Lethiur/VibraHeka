import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";

/**
 * Hook that provides a logout functionality for the application.
 *
 * The `useLogout` hook is responsible for handling the user logout process.
 * It performs the following tasks:
 * 1. Clears user authentication data from local storage.
 * 2. Updates the application's authentication state, marking the user as unauthenticated.
 * 3. Redirects the user to the login page.
 *
 * @returns {Object} An object containing the `logout` function, which executes the logout process.
 */
export const useLogout = () => {
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
    const localStorage = useLocalStorage();
    const navigate = useNavigate();

    const logout = () => {
        // 1. Limpiar persistencia
        localStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.remove(STORAGE_KEYS.EMAIL);
        localStorage.remove(STORAGE_KEYS.ROLE);

        // 2. Notificar a la aplicaci�n (Reactividad)
        setIsAuthenticated(false);

        // 3. Redirigir
        navigate('/login');
    };

    return { logout };
};

