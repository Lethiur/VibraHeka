import React from "react";
import { evaluatePasswordPolicy } from "@core/Application/Validation/PasswordPolicy";
import { Check, X } from "lucide-react";
import "./PasswordStrengthMeter.scss";

interface PasswordStrengthMeterProps {
    password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
    if (!password) return null;

    const result = evaluatePasswordPolicy(password);

    const getStrengthLabel = (score: number) => {
        if (score === 0) return "Muy débil";
        if (score <= 1) return "Débil";
        if (score <= 2) return "Media";
        if (score <= 3) return "Fuerte";
        return "Muy fuerte";
    };

    const getStrengthColorClass = (score: number) => {
        if (score <= 1) return "is-weak";
        if (score <= 2) return "is-medium";
        if (score <= 3) return "is-strong";
        return "is-very-strong";
    };

    const requirements = [
        { label: "Mínimo 6 caracteres", met: result.minLength },
        { label: "Una mayúscula", met: result.uppercase },
        { label: "Un número", met: result.number },
        { label: "Un símbolo", met: result.symbol },
    ];

    return (
        <div className="password-strength">
            <div className="password-strength__header">
                <span className="password-strength__label">Fuerza de la contraseña:</span>
                <span className={`password-strength__value ${getStrengthColorClass(result.strengthScore)}`}>
                    {getStrengthLabel(result.strengthScore)}
                </span>
            </div>

            <div className="password-strength__bar">
                <div 
                    className={`password-strength__progress ${getStrengthColorClass(result.strengthScore)}`}
                    style={{ width: `${result.strengthRatio}%` }}
                />
            </div>

            <div className="password-strength__requirements">
                {requirements.map((req, index) => (
                    <div key={index} className={`password-strength__requirement ${req.met ? "is-met" : ""}`}>
                        {req.met ? <Check size={14} /> : <X size={14} />}
                        <span>{req.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
