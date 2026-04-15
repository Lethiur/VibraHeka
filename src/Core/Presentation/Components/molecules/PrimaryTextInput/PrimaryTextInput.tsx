import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./PrimaryTextInput.scss";

type PrimaryTextInputProps = {
    name: string
    label: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    error?: string
    isEditing?: boolean
    type?: string
    rows?: number
    required?: boolean
    className?: string
    helpText?: string
    as?: React.ElementType
    showPasswordToggle?: boolean
    showPassword?: boolean
    autoComplete?: string
    autoCapitalize?: "none" | "sentences" | "words" | "characters"
    autoCorrect?: "on" | "off"
    spellCheck?: boolean
}


export default function PrimaryTextInput({
    name,
    label,
    value,
    onChange,
    disabled,
    error,
    as,
    type,
    rows,
    required,
    className,
    helpText,
    showPasswordToggle,
    showPassword,
    autoComplete,
    autoCapitalize,
    autoCorrect,
    spellCheck
}: PrimaryTextInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const canTogglePassword = type === "password" && (showPasswordToggle || showPassword);
    const inputType = canTogglePassword && isPasswordVisible ? "text" : type;

    return (
        <>
            <Form.Group className={`primary-text-input ${className || ''}`} controlId={name}>
                <Form.Label>
                    {label}
                    {required && <span className="primary-text-input__required" aria-hidden="true"> *</span>}
                </Form.Label>
                {canTogglePassword ? (
                    <InputGroup hasValidation>
                        <Form.Control
                            as={as}
                            type={inputType}
                            name={name}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            rows={rows}
                            required={required}
                            autoComplete={autoComplete}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            spellCheck={spellCheck}
                            isInvalid={!!error}
                        />
                        <Button
                            type="button"
                            className="primary-text-input__toggle"
                            variant="outline-secondary"
                            onClick={() => setIsPasswordVisible((visible) => !visible)}
                            disabled={disabled}
                            aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {isPasswordVisible ? "Ocultar" : "Mostrar"}
                        </Button>
                        {error && <Form.Control.Feedback className="d-block" type="invalid">{error}</Form.Control.Feedback>}
                    </InputGroup>
                ) : (
                    <Form.Control
                        as={as}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        rows={rows}
                        required={required}
                        autoComplete={autoComplete}
                        autoCapitalize={autoCapitalize}
                        autoCorrect={autoCorrect}
                        spellCheck={spellCheck}
                        isInvalid={!!error}
                    />
                )}
                {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
                {!canTogglePassword && error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}

            </Form.Group>
        </>
    )
}
