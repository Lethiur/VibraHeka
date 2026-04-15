import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { evaluatePasswordPolicy, PASSWORD_MIN_LENGTH } from "@core/Application/Validation/PasswordPolicy";
import "./PasswordStrengthIndicator.scss";

interface PasswordStrengthIndicatorProps {
    password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const { t } = useTranslation();
    const target = useRef(null);

    const policy = useMemo(() => evaluatePasswordPolicy(password), [password]);
    const strength = policy.strengthScore;
    const ratio = policy.strengthRatio;

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

    const requirements = [
        {
            key: "min_length",
            label: t("components.auth.password_strength.requirements.min_length", { count: PASSWORD_MIN_LENGTH }),
            met: policy.minLength
        },
        {
            key: "uppercase",
            label: t("components.auth.password_strength.requirements.uppercase"),
            met: policy.uppercase
        },
        {
            key: "number",
            label: t("components.auth.password_strength.requirements.number"),
            met: policy.number
        },
        {
            key: "symbol",
            label: t("components.auth.password_strength.requirements.symbol"),
            met: policy.symbol
        }
    ];

    const requirementsPopover = (
        <Popover className="password-strength-indicator__popover">
            <Popover.Header>{t("components.auth.password_strength.requirements.title")}</Popover.Header>
            <Popover.Body>
                <ul className="password-strength-indicator__requirements-list">
                    {requirements.map((req) => (
                        <li
                            key={req.key}
                            className={`password-strength-indicator__requirement ${req.met ? "password-strength-indicator__requirement--met" : ""}`}
                        >
                            {req.label}
                        </li>
                    ))}
                </ul>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="password-strength-indicator" aria-live="polite">
            <div className="password-strength-indicator__header">
                <span className="type-caption">{t("components.auth.password_strength.title")}</span>
                <div className="password-strength-indicator__header-right">
                    {strength > 0 && (
                        <span className={`password-strength-indicator__label password-strength-indicator__label--${tone}`}>
                            {t(labelKey)}
                        </span>
                    )}
                    <OverlayTrigger trigger="click" placement="top" overlay={requirementsPopover} rootClose>
                        <button
                            ref={target}
                            type="button"
                            className="password-strength-indicator__info-btn"
                            aria-label="Ver requisitos de contraseña"
                        >
                            ?
                        </button>
                    </OverlayTrigger>
                </div>
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
