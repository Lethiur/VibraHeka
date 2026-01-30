import { Label } from "@radix-ui/react-label"

type PrimaryTextInputProps = {
    id: string
    name: string
    label: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    error?: string
}


export default function PrimaryTextInput({
    id,
    name,
    label,
    value,
    onChange,
    disabled,
    error
}: PrimaryTextInputProps) {
    return (
        <>
            <Label htmlFor={name} className="form-label">{label}</Label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    )
}