import React from "react";
import { MessageCircle } from "lucide-react";
import "./MemberWhatsAppNotice.scss";

const MemberWhatsAppNotice: React.FC = () => {
    return (
        <div className="vh-member-whatsapp">
            <div className="vh-member-whatsapp__icon-wrapper">
                <MessageCircle size={32} className="vh-member-whatsapp__icon" />
            </div>
            <div className="vh-member-whatsapp__content">
                <h3 className="vh-member-whatsapp__title">
                    📍 Accesos a las Sesiones en Vivo
                </h3>
                <p className="vh-member-whatsapp__text">
                    Los enlaces de acceso se comparten semanalmente en nuestro grupo exclusivo para miembros. 
                    ¿Aún no estás dentro?{" "}
                    <a 
                        href="https://chat.whatsapp.com/JPWWImOs0Fc6UddWpnmwWp?mode=gi_t" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="vh-member-whatsapp__link"
                    >
                        Únete al Grupo de WhatsApp aquí
                    </a>
                </p>
            </div>
        </div>
    );
};

export default MemberWhatsAppNotice;
