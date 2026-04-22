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
        label: "Semana 3",
        theme: "Comprensión. Calmar el sistema nervioso",
        activities: {
            thursday: {
                day: 16,
                weekday: "Jueves",
                time: "🇪🇸 19:00, 19:30, 20:00 | 🇻🇪 13:00, 13:30, 14:00 | 🇨🇴 12:00, 12:30, 13:00 | 🇲🇽 11:00, 11:30, 12:00",
                therapist: "Carmen Martín",
                therapistHandle: "carmen-martin",
                extraTherapistHandle: "luis-galvis",
                format: "LANZAMIENTO / TALLER / PROMOCIÓN",
                title: "Clase Bioenergética / Promo Vibraheka / Diseña tu espacio antiestrés"
            },
            friday: {
                day: 17,
                weekday: "Viernes",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Marina De La Sen",
                therapistHandle: "marina-garrido",
                format: "MASTERCLASS",
                title: "Tu espacio de poder para entrar en tu calma"
            },
            saturday: {
                day: 18,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Equipo VibraHeka",
                format: "PREGUNTAS Y RESPUESTAS / CONVERSATORIO",
                title: "Dudas sobre el estrés y la ansiedad"
            }
        }
    },
    {
        label: "Semana 4",
        theme: "Regulación. Reducir el miedo anticipatorio",
        activities: {
            wednesday: {
                day: 22,
                weekday: "Miércoles",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Veronica Hernández",
                therapistHandle: "veronica-hernandez",
                format: "MEDITACIÓN",
                title: "Mapeo corporal"
            },
            thursday: {
                day: 23,
                weekday: "Jueves",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Luis Galvis",
                therapistHandle: "luis-galvis",
                format: "MEDITACIÓN",
                title: "Entrar en la calma del espacio"
            },
            friday: {
                day: 24,
                weekday: "Viernes",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Beatriz Alonso",
                therapistHandle: "beatriz",
                format: "MASTERCLASS",
                title: "\"Tu animal, tu espejo\". No necesitas controlar más, necesitas entender esto"
            },
            saturday: {
                day: 25,
                weekday: "Sábado",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Vera Lucya González",
                therapistHandle: "vera-lucya",
                format: "CHARLA TEMÁTICA",
                title: "Vivir en modo alerta: impacto del estrés oxidativo en tu energía vital"
            }
        }
    },
    {
        label: "Semana 5",
        theme: "Cambio de patrones. Integrar lo aprendido",
        activities: {
            thursday: {
                day: 30,
                weekday: "Jueves",
                time: "🇪🇸 20:00 | 🇻🇪 14:00 | 🇨🇴 13:00 | 🇲🇽 12:00",
                therapist: "Marina De La Sen",
                therapistHandle: "marina-garrido",
                format: "MEDITACIÓN",
                title: "Tu espacio de poder para entrar en tu calma (Reprogramación mental)"
            }
        }
    }
];
