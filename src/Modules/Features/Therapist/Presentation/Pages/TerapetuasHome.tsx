
import TherapistCard from "@/Modules/Features/Therapist/Presentation/Components/Atoms/Terapeuta/Terapeuta";
import { THERAPISTS_LIST } from "../../Data/TherapistsList";

export default function TerapeutasHome() {
    return (
        <div className='container-fluid mb-5'>
            <h1 className='text-center pb-5'>Terapeutas</h1>

            {THERAPISTS_LIST.map((therapist) => (
                <TherapistCard
                    key={therapist.id}
                    title={therapist.title}
                    route={therapist.route}
                    image={therapist.image}
                >
                    <p>{therapist.role}</p>
                    <p>{therapist.description}</p>
                </TherapistCard>
            ))}
        </div>
    )
}