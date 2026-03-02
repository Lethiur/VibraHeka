import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./PasswordStrengthIndicator.scss";

interface PasswordStrengthIndicatorProps {
    password: string;
}

function calculateStrength(password: string): number {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    return score;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const { t } = useTranslation();

    const strength = useMemo(() => calculateStrength(password), [password]);
    const ratio = (strength / 4) * 100;

    const tone =
        strength <= 1 ? "weak"
            : strength === 2 ? "medium"
                : strength === 3 ? "good"
                    : "strong";

    const labelKey =
        strength === 0 ? "components.auth.password_strength.empty"
            : strength === 1 ? "components.auth.password_strength.weak"
                : strength === 2 ? "components.auth.password_strength.medium"
                    : strength === 3 ? "components.auth.password_strength.good"
                        : "components.auth.password_strength.strong";

    return (
        <div className="password-strength-indicator" aria-live="polite">
            <div className="password-strength-indicator__header">
                <span className="type-caption">{t("components.auth.password_strength.title")}</span>
                <span className={`password-strength-indicator__label password-strength-indicator__label--${tone}`}>
                    {t(labelKey)}
                </span>
            </div>

            <div className="password-strength-indicator__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={ratio}>
                <span
                    className={`password-strength-indicator__fill password-strength-indicator__fill--${tone}`}
                    style={{ width: `${ratio}%` }}
                />
            </div>
        </div>
    );
}
