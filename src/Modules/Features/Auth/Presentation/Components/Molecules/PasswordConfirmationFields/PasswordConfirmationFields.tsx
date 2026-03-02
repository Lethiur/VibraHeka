import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PasswordStrengthIndicator from "@auth/Presentation/Components/Molecules/PasswordStrengthIndicator/PasswordStrengthIndicator";
import "./PasswordConfirmationFields.scss";

interface PasswordConfirmationFieldsProps {
    passwordName: string;
    passwordLabel: string;
    passwordValue: string;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordError?: string;
    passwordHelpText?: string;
    confirmationName: string;
    confirmationLabel: string;
    confirmationValue: string;
    onConfirmationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    confirmationError?: string;
    confirmationHelpText?: string;
    disabled?: boolean;
}

export default function PasswordConfirmationFields({
    passwordName,
    passwordLabel,
    passwordValue,
    onPasswordChange,
    passwordError,
    passwordHelpText,
    confirmationName,
    confirmationLabel,
    confirmationValue,
    onConfirmationChange,
    confirmationError,
    confirmationHelpText,
    disabled
}: PasswordConfirmationFieldsProps) {
    return (
        <div className="password-confirmation-fields">
            <PrimaryTextInput
                label={passwordLabel}
                name={passwordName}
                value={passwordValue}
                disabled={disabled}
                type="password"
                showPasswordToggle={true}
                onChange={onPasswordChange}
                helpText={passwordHelpText}
                error={passwordError}
            />
            <PasswordStrengthIndicator password={passwordValue} />
            <PrimaryTextInput
                label={confirmationLabel}
                name={confirmationName}
                value={confirmationValue}
                disabled={disabled}
                type="password"
                showPasswordToggle={true}
                onChange={onConfirmationChange}
                helpText={confirmationHelpText}
                error={confirmationError}
            />
        </div>
    );
}
