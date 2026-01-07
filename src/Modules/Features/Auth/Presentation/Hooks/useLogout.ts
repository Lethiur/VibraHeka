import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import {isAuthenticatedAtom} from "../../../../../Core/Presentation/Storage/AuthAtom.ts";
import useLocalStorage from "../../../../../Core/Presentation/Hooks/UseLocalStorage.ts";
import {STORAGE_KEYS} from "../../../../../Core/Infrastructure/Storage/StorageKeys.ts";


export const useLogout = () => {
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
    const localStorage = useLocalStorage();
    const navigate = useNavigate();

    const logout = () => {
        // 1. Limpiar persistencia
        localStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.remove(STORAGE_KEYS.USER_ID);

        // 2. Notificar a la aplicación (Reactividad)
        setIsAuthenticated(false);

        // 3. Redirigir
        navigate('/login');
    };

    return { logout };
};