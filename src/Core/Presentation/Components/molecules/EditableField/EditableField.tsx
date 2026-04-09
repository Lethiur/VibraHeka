import React from 'react';
import PrimaryTextInput from '@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput';

interface EditableFieldProps {
    label: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isEditing: boolean;
    type?: string;
    as?: React.ElementType; // For 'textarea'
    rows?: number;
    required?: boolean;
    className?: string;
    helpText?: string;
    error?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
    label,
    name,
    value,
    onChange,
    isEditing,
    type = 'text',
    as,
    rows,
    required,
    className,
    helpText,
    error
}) => {
    if (isEditing) {
        return (
            <PrimaryTextInput
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                disabled={!isEditing}
                as={as}
                error={error}
                type={type}
                rows={rows}
                required={required}
                className={className}
                helpText={helpText}
            />
        );
    }

    // Public view mode (Text only)
    return (
        <div className={`mb-4 ${className || ''}`}>
            <div className="fw-semibold mb-1" style={{ color: 'var(--bs-gray-700)' /* Adjust color as needed, or use SCSS variable if available globally */ }}>
                {label}
            </div>
            <div className="fs-5 text-dark">
                {value || <span className="text-muted fst-italic">Sin información proporcionada</span>}
            </div>
        </div>
    );
};

export default EditableField;
