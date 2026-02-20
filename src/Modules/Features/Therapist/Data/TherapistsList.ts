

export interface Therapist {
    handle: string;
    id: string;
    title: string;
    route: string;
    image: string;
    video: string;
    role: string;
    description: string;
}

export const THERAPISTS_LIST: Therapist[] = [
    {
        id: "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e",
        handle: "beatriz",
        title: "Beatriz",
        route: "/terapeutas/beatriz-alonso",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/BeatrizAlonso/profilepicture.png",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/BeatrizAlonso/video.mp4",
        role: "Terapeuta y Comunicadora Animal",
        description: "Te acompaño a descubrir lo que tu animal siente, piensa y necesita para mejorar la convivencia y el bienestar mutuo."
    },
    {
        id: "b25584c4-f0b1-70b8-c8f3-c2ca15dc3cb2",
        handle: "belen-angella",
        title: "Belén Angella",
        route: "/terapeutas/belen-angella",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/BelenAngela/profilepicture.png",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/BelenAngela/video.mp4",
        role: "Yoga Terapéutico",
        description: "En un mundo ruidoso y rápido, te ayudo a volver a tu cuerpo y a calmar tu mente. “El yoga se adapta a tí, no tú al yoga” - Krishnamacharya"
    },
    {
        id: "42059454-6031-7033-0b9f-c4f1297179ad",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/CarmenCost/video.mp4",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/CarmenCost/profilepicture.png",
        handle: "carmen-cost",
        title: "Carmen Cost",
        route: "/terapeutas/carmen-cost",
        role: "Alquimista Integrativa (Terapeuta Holística)",
        description: "Mi propósito es acompañarte a transmutar tu dolor en fortaleza y despertar tu capacidad de superación para alcanzar el bienestar integral en tu día a día."
    },
    {
        id: "32f57464-b0b1-70a2-57cf-b6771655ad93",
        handle: "luis-galvis",
        title: "Luis Galvis",
        route: "/terapeutas/luis-galvis",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/LuisGalvis/video.mp4",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/LuisGalvis/profilepicture.png",
        role: "Terapeuta Bioenergético Integral. Especializado en la armonización multidimensional de personas y espacios.",
        description: "Creo en el poder de la energía bien ordenada para transformar vidas y espacios."
    },
    {
        id: "32f524c4-10a1-7048-2988-f00c4a242a77",
        handle: "marina-garrido",
        title: "Marina Garrido",
        route: "/terapeutas/marina-garrido",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/Marina/profilepicture.png",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/Marina/video.mp4",
        role: "Terapeuta Holística",
        description: "Hace cosas"
    },
    {
        id: "a26534b4-d0c1-7057-5b42-bbecb887d165",
        handle: "olga-lucy",
        title: "Olga Lucy López López",
        route: "/terapeutas/olga-lucy-lopez-lopez",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/OlgaLucy/profilepicture.png",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/OlgaLucy/video.mp4",
        role: "Energía Sanadora",
        description: "“Tu campo se limpia, se sana y se protege. Tu  historia se ordena. Tu camino se abre.” Olga Lucy López López"
    },
    {
        id: "6295b434-c021-70b4-3aa8-20b88c196a8a",
        handle: "vera-lucya",
        title: "Vera Lucya",
        route: "/terapeutas/vera-lucya",
        image: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/Vera/profilepicture.png",
        video: "https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/Vera/video.mp4",
        role: "Maestra de Empoderamiento Holístico, coach de feminidad para mujeres con mucha energía Yan, fundadora de la Escuela Prisma Vera",
        description: "Te acompaño a equilibrar tu energía femenina y masculina, para alcanzar tus más altos propósitos y lidiar con el Síndrome de Ovarios Poliquísticos y otras dolencias asociadas a tu centro de creación."
    }

];
