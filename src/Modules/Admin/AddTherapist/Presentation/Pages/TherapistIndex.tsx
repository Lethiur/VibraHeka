import UseGetTherapistUseCase from "@admin/addTherapist/Presentation/Hooks/UseGetTherapistUseCase";
import { useEffect, useRef } from "react";
import { CreateTherapistEntity } from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import CreateTherapistForm
    from "@admin/addTherapist/Presentation/Components/Organisms/CreateTherapistForm/CreateTherapistForm";
import TherapistList from "@admin/addTherapist/Presentation/Components/Organisms/TherapistList/TherapistList";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import UseAddTherapistUseCase from "@admin/addTherapist/Presentation/Hooks/UseAddTherapistUseCase";



export default function TherapistIndex() {

    const { BackendTherapistList, GetTherapists, Loading: loadingTherapists, Error: errorGettingTherapists } = UseGetTherapistUseCase();
    const { loading: LoadingAddTherapist, error: errorAddingTherapist, AddTherapist, formErrors, therapistID } = UseAddTherapistUseCase();

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            GetTherapists();
            isFirstRender.current = false;
        }
    }, [GetTherapists]);

    useEffect(() => {
        if (therapistID) {
            GetTherapists();
        }
    }, [therapistID]);

    async function handleCreateTherapist(data: CreateTherapistEntity): Promise<void> {
        await AddTherapist(data);
    }

    return <>
        <div className={"container mt-4"}>
            <ErrorBox message={errorGettingTherapists ?? errorAddingTherapist} />
            <CreateTherapistForm onSubmit={handleCreateTherapist} isSubmitting={LoadingAddTherapist} errors={formErrors} />
            <br />
            <TherapistList users={BackendTherapistList ?? []} onEdit={() => { }} onDelete={() => { }} isLoading={loadingTherapists} />
        </div>
    </>
}