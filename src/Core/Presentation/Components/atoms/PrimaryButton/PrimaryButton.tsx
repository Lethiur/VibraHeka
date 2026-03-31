import React from "react";
import "./PrimaryButton.scss";
import { useNavigate } from "react-router-dom";

type BootstrapColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type BootstrapOutlineVariant =
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark";

type AliasOutlineVariant =
    | "primary-outline"
    | "secondary-outline"
    | "success-outline"
    | "danger-outline"
    | "warning-outline"
    | "info-outline"
    | "light-outline"
    | "dark-outline";

export interface ButtonProps {
    label: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: BootstrapColorVariant | BootstrapOutlineVariant | AliasOutlineVariant | "outline" | "ghost" | "link";
    disabled?: boolean;
    fullWidth?: boolean;
    to?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

function normalizeVariant(variant: NonNullable<ButtonProps["variant"]>): string {
    if (variant === "outline") return "outline-primary";
    if (variant.endsWith("-outline")) {
        const [tone] = variant.split("-");
        return `outline-${tone}`;
    }
    return variant;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    to,
    type = "button",
    variant = "primary",
    disabled = false,
    fullWidth = false,
    iconLeft,
    iconRight,
}) => {
    const normalizedVariant = normalizeVariant(variant);
    const navigate = useNavigate();
    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            className={`atom-button atom-button--${normalizedVariant} ${fullWidth ? "atom-button--full" : ""
                }`}
            onClick={handleClick}
            disabled={disabled}
        >
            {iconLeft && <span className="atom-button__icon atom-button__icon--left">{iconLeft}</span>}
            <span className="atom-button__label">{label}</span>
            {iconRight && <span className="atom-button__icon atom-button__icon--right">{iconRight}</span>}
        </button>
    );
};

export default Button;
