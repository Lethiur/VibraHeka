import 'bootstrap/dist/css/bootstrap.min.css';

interface FormAlertProps {
    message: string | null | undefined;
    variant?: 'danger' | 'success' | 'warning';
}

/**
 * Renders an error notification box with a specified message and variant.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The message to display in the error box. If null or undefined, no box is rendered.
 * @param {string} props.variant - The variant of the error box, which determines the styling. Defaults to "danger".
 * @return {JSX.Element|null} The JSX markup for the error box, or null if no message is provided.
 */
export default function ErrorBox({ message, variant }: FormAlertProps = { variant: "danger", message: null }) {

    if (!message) return null;

    return (
        <div className={`alert alert-${variant}`} role="alert">
            {message}
        </div>
    );

}