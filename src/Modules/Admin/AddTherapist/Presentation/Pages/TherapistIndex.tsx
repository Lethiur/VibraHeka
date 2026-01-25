import UseGetTherapistUseCase from "@admin/addTherapist/Presentation/Hooks/UseGetTherapistUseCase";
import React from "react";
import {ValidationErrors} from "fluentvalidation-ts";
import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import CreateTherapistForm
    from "@admin/addTherapist/Presentation/Components/Organisms/CreateTherapistForm/CreateTherapistForm";
import TherapistList from "@admin/addTherapist/Presentation/Components/Organisms/TherapistList/TherapistList";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import UseAddTherapistUseCase from "@admin/addTherapist/Presentation/Hooks/UseAddTherapistUseCase";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";



export default function TherapistIndex() {
    
    const { BackendTherapistList, GetTherapists, Loading: loadingTherapists, Error : errorGettingTherapists } = UseGetTherapistUseCase();
    const {loading : LoadingAddTherapist, error : errorAddingTherapist, AddTherapist} = UseAddTherapistUseCase();
    const [formErrors, setFormErrors] = React.useState<ValidationErrors<CreateTherapistEntity>>({});
    const isFirstRender = React.useRef(true); 

    React.useEffect(() => {
        if (isFirstRender.current) {
            GetTherapists();
            isFirstRender.current = false;
        }
    }, [GetTherapists]);
    async function handleCreateTherapist(data: CreateTherapistEntity) : Promise<void> {
        
        try {
            await AddTherapist(data);
            await GetTherapists();
        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setFormErrors(error.fieldErrors);    
            }
        } 
    }
    
    return <>
        <div className={"container mt-4"}>
            <ErrorBox message={errorGettingTherapists ?? errorAddingTherapist} />
            <CreateTherapistForm onSubmit={handleCreateTherapist} isSubmitting={LoadingAddTherapist} errors={formErrors} />
            <br/>
            <TherapistList users={BackendTherapistList ?? []} onEdit={() =>{}} onDelete={() => {}} isLoading={loadingTherapists} />
        </div>
    </>
}