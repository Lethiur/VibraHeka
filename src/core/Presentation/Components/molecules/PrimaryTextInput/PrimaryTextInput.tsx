import { Form } from 'react-bootstrap';

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
    helpText
}: PrimaryTextInputProps) {
    return (
        <>
            <Form.Group className={`mb-3 ${className || ''}`} controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as={as}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    rows={rows}
                    required={required}
                />
                {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
                {error && <div className="invalid-feedback">{error}</div>}

            </Form.Group>
        </>
    )
}