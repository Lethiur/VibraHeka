import { atom } from 'jotai';
import { STORAGE_KEYS } from '../../Infrastructure/Storage/StorageKeys';

const hasToken = !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

export const isAuthenticatedAtom = atom<boolean>(hasToken);