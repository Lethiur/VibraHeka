export interface Activity {
    day: number;
    weekday: string;
    time: string;
    therapist: string;
    therapistHandle?: string;
    format: string;
    title: string;
    extraTherapist?: string;
    extraTherapistHandle?: string;
}

export interface ActivityWeek {
    label: string;
    theme: string;
    activities: {
        wednesday?: Activity;
        thursday?: Activity;
        friday?: Activity;
        saturday?: Activity;
    };
}

export const ACTIVITIES_DATA: ActivityWeek[] = [
    {
        label: "Semana 1",
        theme: "Bienvenida. Presentación de la temática del mes",
        activities: {
            saturday: {
                day: 2,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Equipo VibraHeka",
                format: "PREGUNTAS Y RESPUESTAS / PRESENTACIÓN",
                title: "Q&A + presentación de la temática del mes"
            }
        }
    },
    {
        label: "Semana 2",
        theme: "Autoestima. Reconstruir desde adentro",
        activities: {
            saturday: {
                day: 9,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Carmen Martín",
                therapistHandle: "carmen-martin",
                format: "MEDITACIÓN",
                title: "Reconstruir tu autoestima"
            }
        }
    },
    {
        label: "Semana 3",
        theme: "Antiestrés. Diseña tu espacio de bienestar",
        activities: {
            saturday: {
                day: 16,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Luis Galvis",
                therapistHandle: "luis-galvis",
                format: "TALLER PRÁCTICO",
                title: "Diseña tu espacio antiestrés"
            }
        }
    },
    {
        label: "Semana 4",
        theme: "Cuerpo. Conexión y seguridad interior",
        activities: {
            thursday: {
                day: 21,
                weekday: "Jueves",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Marina De La Sen",
                therapistHandle: "marina-garrido",
                format: "MEDITACIÓN",
                title: "Meditación guiada"
            }
        }
    },
    {
        label: "Semana 5",
        theme: "Integración. Liberación y transformación",
        activities: {
            thursday: {
                day: 28,
                weekday: "Jueves",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Verónica Hernández",
                therapistHandle: "veronica-hernandez",
                format: "MEDITACIÓN",
                title: "Buscando seguridad en tu cuerpo"
            },
            friday: {
                day: 29,
                weekday: "Viernes",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Carmen Martín",
                therapistHandle: "carmen-martin",
                format: "CLASE",
                title: "Clase de liberación emocional consciente"
            },
            saturday: {
                day: 30,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Luis Galvis",
                therapistHandle: "luis-galvis",
                format: "CONSTELACIÓN FAMILIAR",
                title: "Tomo mi lugar e integro mi valor"
            }
        }
    }
];
