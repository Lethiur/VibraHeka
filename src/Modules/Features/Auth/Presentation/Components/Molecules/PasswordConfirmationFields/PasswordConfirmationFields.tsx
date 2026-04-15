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
                required
                type="password"
                showPasswordToggle={true}
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                onChange={onPasswordChange}
                helpText={passwordHelpText}
                error={passwordError}
            />
            <PrimaryTextInput
                label={confirmationLabel}
                name={confirmationName}
                value={confirmationValue}
                disabled={disabled}
                required
                type="password"
                showPasswordToggle={true}
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                onChange={onConfirmationChange}
                helpText={confirmationHelpText}
                error={confirmationError}
            />
            <PasswordStrengthIndicator password={passwordValue} />
        </div>
    );
}
