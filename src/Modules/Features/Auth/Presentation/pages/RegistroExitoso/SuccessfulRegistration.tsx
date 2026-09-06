import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";

/**
 * Renders the successful registration confirmation page.
 *
 * @return {JSX.Element} The component structure including a title, subtitle, and a link to navigate back to the login page.
 */
export default function SuccessfulRegistration(): JSX.Element {

    // Hooks
    const { t } = useTranslation();

    return (
        <AuthLayout
            title={t('pages.registro_exitoso.title')}
            subtitle={t('pages.registro_exitoso.description')}
        >
            <div className="text-center mt-4">
                <Link to="/login" className="type-body text-decoration-none">
                    {t('pages.registro_exitoso.back_to_login')}
                </Link>
            </div>
        </AuthLayout>
    );
}
