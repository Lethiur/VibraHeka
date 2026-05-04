import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { Container } from "react-bootstrap";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import Calendar from "../Components/Calendar/Calendar";
import AccountRequiredDisclaimer from "@core/Presentation/Components/organisms/AccountRequiredDisclaimer/AccountRequiredDisclaimer";
import SubscriptionRequiredDisclaimer from "@core/Presentation/Components/organisms/SubscriptionRequiredDisclaimer/SubscriptionRequiredDisclaimer";
import MemberWhatsAppNotice from "../Components/MemberWhatsAppNotice/MemberWhatsAppNotice";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import "./ActivitiesPage.scss";

export default function ActivitiesPage() {
    const { t } = useTranslation();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { subscription, loading } = UseGetSubscription();

    if (loading) {
        return <AppLoader />;
    }

    const hasActiveSubscription = Boolean(
        subscription &&
        (subscription.SubscriptionStatus === SubscriptionStatus.ACTIVE ||
            subscription.SubscriptionStatus === SubscriptionStatus.TRIALING ||
            subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED)
    );

    return (
        <div className="activities-page vh-page-section">
            <Container>
                <header className="activities-page__header text-center">
                    <p className="activities-page__eyebrow">Próximos Encuentros</p>
                    <h1 className="activities-page__title">Actividades en Vivo</h1>
                    <p className="activities-page__subtitle">
                        Acompaña a nuestros terapeutas en sesiones diseñadas para profundizar en tu bienestar y sanación.
                    </p>
                </header>

                <main className="activities-page__content">
                    {!isAuthenticated && (
                        <AccountRequiredDisclaimer>
                            <AccountRequiredDisclaimer.Footer>
                                <Info size={16} />
                                <span>{t("pages.activities.account_required_note")}</span>
                            </AccountRequiredDisclaimer.Footer>
                        </AccountRequiredDisclaimer>
                    )}

                    {isAuthenticated && !hasActiveSubscription && <SubscriptionRequiredDisclaimer />}

                    {isAuthenticated && hasActiveSubscription && (
                        <div className="activities-page__member-notice-container mb-12">
                            <MemberWhatsAppNotice />
                        </div>
                    )}

                    <Calendar />
                </main>
            </Container>
        </div>
    );
}
