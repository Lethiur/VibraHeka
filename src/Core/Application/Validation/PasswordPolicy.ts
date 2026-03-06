export const PASSWORD_MIN_LENGTH = 6;

export interface PasswordPolicyResult {
    minLength: boolean;
    uppercase: boolean;
    number: boolean;
    symbol: boolean;
    strengthScore: number;
    strengthRatio: number;
    isValid: boolean;
}

export function hasMinimumLength(password: string): boolean {
    return password.length >= PASSWORD_MIN_LENGTH;
}

export function hasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
}

export function hasNumber(password: string): boolean {
    return /\d/.test(password);
}

export function hasSymbol(password: string): boolean {
    return /[^a-zA-Z0-9]/.test(password);
}

export function evaluatePasswordPolicy(password: string): PasswordPolicyResult {
    const minLength = hasMinimumLength(password);
    const uppercase = hasUppercase(password);
    const number = hasNumber(password);
    const symbol = hasSymbol(password);

    const checks = [minLength, uppercase, number, symbol];
    const strengthScore = checks.filter(Boolean).length;
    const strengthRatio = (strengthScore / checks.length) * 100;

    return {
        minLength,
        uppercase,
        number,
        symbol,
        strengthScore,
        strengthRatio,
        isValid: checks.every(Boolean)
    };
}
