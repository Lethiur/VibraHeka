export interface ResponseEntity<T = any> {
    success: boolean;
    errorCode: string | null;
    content: T | null;
}
