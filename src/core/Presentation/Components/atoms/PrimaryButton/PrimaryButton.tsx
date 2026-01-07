import React from "react";
import "./PrimaryButton.scss";
import { useNavigate } from "react-router-dom";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost";
    disabled?: boolean;
    fullWidth?: boolean;
    to?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    to,
    type = "button",
    variant = "primary",
    disabled = false,
    fullWidth = false,
}) => {
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
            className={`fs-4 fs-md-5 fs-sm-6 atom-button atom-button--${variant} ${fullWidth ? "atom-button--full" : ""
                }`}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
