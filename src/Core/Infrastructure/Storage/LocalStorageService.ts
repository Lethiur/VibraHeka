/**
 * A service for interacting with the browser's localStorage API to store, retrieve, and manage key-value pairs.
 */
export default class LocalStorageService {

    /**
     * Retrieves a string value associated with the specified key from localStorage.
     *
     * @param {string} key - The key used to retrieve the corresponding value from localStorage.
     * @return {string | null} The string value associated with the key, or null if the key does not exist.
     */
    getString(key: string): string | null {
        return localStorage.getItem(key);
    }

    /**
     * Retrieves a JSON-parsed value from local storage for the given key.
     *
     * @param {string} key The key corresponding to the stored item in local storage.
     * @return {T | null} The parsed JSON object of type T if the key exists and the value is valid JSON, otherwise null.
     */
    getJSON<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    /**
     * Sets a key-value pair in localStorage with the specified key and value.
     *
     * @param {string} key The key to associate with the value in local storage.
     * @param {string} value The value to store in local storage for the given key.
     */
    setString(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    /**
     * Stores a JavaScript object in local storage after converting it to a JSON string.
     *
     * @param {string} key - The key under which the JSON string will be stored in local storage.
     * @param {T} value - The value to be stored, which will be stringified into JSON format.
     * @return {void} No return value.
     */
    setJSON<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Removes the value associated with the specified key from localStorage.   
     * @param key The key of the item to remove from local storage.
     */
    remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Clears all keys and values stored in the local storage.
     *
     * @return {void} This method does not return a value.
     */
    clear(): void {
        localStorage.clear();
    }
}