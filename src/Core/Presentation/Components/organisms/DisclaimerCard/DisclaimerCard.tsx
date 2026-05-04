import { ReactNode } from "react";
import { Lock } from "lucide-react";
import "./DisclaimerCard.scss";

export interface DisclaimerCardProps {
    icon?: ReactNode;
    title: ReactNode;
    text: ReactNode;
    ctas?: ReactNode;
    footer?: ReactNode;
    className?: string;
}

export interface DisclaimerCardFooterProps {
    children: ReactNode;
    className?: string;
}

function DisclaimerCardFooter({ children, className = "" }: DisclaimerCardFooterProps) {
    return <div className={`disclaimer-card__info-note ${className}`.trim()}>{children}</div>;
}

function DisclaimerCard({
    icon,
    title,
    text,
    ctas,
    footer,
    className = "",
}: DisclaimerCardProps) {
    return (
        <div className={`disclaimer-card ${className}`.trim()}>
            <div className="disclaimer-card__content">
                <div className="disclaimer-card__icon">{icon ?? <Lock size={48} />}</div>
                <h2 className="disclaimer-card__title">{title}</h2>
                <p className="disclaimer-card__text">{text}</p>

                {ctas && <div className="disclaimer-card__cta">{ctas}</div>}

                {footer && <div className="disclaimer-card__footer">{footer}</div>}
            </div>
        </div>
    );
}

DisclaimerCard.Footer = DisclaimerCardFooter;

export default DisclaimerCard;


