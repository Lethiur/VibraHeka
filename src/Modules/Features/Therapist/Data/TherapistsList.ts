import BeatrizImage from "@assets/images/Terapeutas/Beatriz.png";

export interface Therapist {
    id: string;
    title: string;
    route: string;
    image: string;
    role: string;
    description: string;
}

export const THERAPISTS_LIST: Therapist[] = [
    {
        id: "beatriz",
        title: "Beatriz",
        route: "/terapeutas/beatriz-alonso",
        image: BeatrizImage,
        role: "Terapeuta y Comunicadora Animal",
        description: "Te acompaño a descubrir lo que tu animal siente, piensa y necesita para mejorar la convivencia y el bienestar mutuo."
    },
    {
        id: "vera-lucya",
        title: "Vera Lucya",
        route: "/terapeutas/vera-lucya",
        image: BeatrizImage,
        role: "Maestra de Empoderamiento Holístico, coach de feminidad para mujeres con mucha energía Yan, fundadora de la Escuela Prisma Vera",
        description: "Te acompaño a equilibrar tu energía femenina y masculina, para alcanzar tus más altos propósitos y lidiar con el Síndrome de Ovarios Poliquísticos y otras dolencias asociadas a tu centro de creación."
    },
    {
        id: "carmen-cost",
        title: "Carmen Cost",
        route: "/terapeutas/carmen-cost",
        image: BeatrizImage,
        role: "Alquimista Integrativa (Terapeuta Holística)",
        description: "Mi propósito es acompañarte a transmutar tu dolor en fortaleza y despertar tu capacidad de superación para alcanzar el bienestar integral en tu día a día."
    },
    {
        id: "rocio-tirado",
        title: "Rocío Tirado",
        route: "/terapeutas/rocio-tirado",
        image: BeatrizImage,
        role: "Terapeuta Holística. Asesora de crianza y educación consciente",
        description: "Te acompaño a volver a tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia."
    },
    {
        id: "veronica-hernandez-1",
        title: "Verónica Hernández",
        route: "/terapeutas/veronica-hernandez",
        image: BeatrizImage,
        role: "Terapeuta Transpersonal y energética",
        description: "“La verdadera profesión del hombre consiste en conocerse a sí mismo” Hermann Hesse"
    },
    {
        id: "mailee-vergara",
        title: "Mailee Vergara",
        route: "/terapeutas/mailee-vergara",
        image: BeatrizImage,
        role: "Guia en el camino de conexion interior. Creadora del metodo SENTIR, basado en la conciencia emocional",
        description: "Te acompaño a descubrir tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia."
    },
    {
        id: "olga-lucy",
        title: "Olga Lucy López López",
        route: "/terapeutas/olga-lucy-lopez-lopez",
        image: BeatrizImage,
        role: "Energía Sanadora",
        description: "“Tu campo se limpia, se sana y se protege. Tu  historia se ordena. Tu camino se abre.” Olga Lucy López López"
    },
    {
        id: "belen-angella",
        title: "Belén Angella",
        route: "/terapeutas/belen-angella",
        image: BeatrizImage,
        role: "Yoga Terapéutico",
        description: "En un mundo ruidoso y rápido, te ayudo a volver a tu cuerpo y a calmar tu mente. “El yoga se adapta a tí, no tú al yoga” - Krishnamacharya"
    },
    {
        id: "veronica-hernandez-2",
        title: "Verónica Hernández",
        route: "/terapeutas/veronica-hernandez",
        image: BeatrizImage,
        role: "Terapeuta Transpersonal y energética",
        description: "“La verdadera profesión del hombre consiste en conocerse a sí mismo” Hermann Hesse"
    },
    {
        id: "luis-galvis",
        title: "Luis Galvis",
        route: "/terapeutas/luis-galvis",
        image: BeatrizImage,
        role: "Terapeuta Bioenergético Integral. Especializado en la armonización multidimensional de personas y espacios.",
        description: "Creo en el poder de la energía bien ordenada para transformar vidas y espacios."
    },
    {
        id: "mariela-popoca",
        title: "Mariela Popoca",
        route: "/terapeutas/mariela-popoca",
        image: BeatrizImage,
        role: "Tarotista",
        description: "Con el Tarot pongo sobre la mesa tu presente, las posibilidades que se están formando y las decisiones que pueden redirigir tu vida y transformarla por completo."
    },
    {
        id: "carmen-martin",
        title: "Carmen Martin",
        route: "/terapeutas/carmen-martin",
        image: BeatrizImage,
        role: "Terapeuta Holística Creadora de la fisioterapia energética",
        description: "Te acompaño a reconectar con tu energía y activar tu poder de sanación."
    }
];
