import React from "react";
import "./PrimaryButton.scss";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost";
    disabled?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    fullWidth = false,
}) => {
    return (
        <button
            type={type}
            className={`atom-button atom-button--${variant} ${fullWidth ? "atom-button--full" : ""
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
