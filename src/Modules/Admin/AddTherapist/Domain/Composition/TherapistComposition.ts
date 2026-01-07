import GetTherapistsUseCaseImpl
    from "@admin/addTherapist/Application/UseCases/GetTherapist/GetTherapistsUseCaseImpl.ts";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase.ts";
import TherapistDatasource from "@admin/addTherapist/Data/Datasources/TherapistDatasource.ts";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository.ts";
import TherapistRepositoryImpl from "@admin/addTherapist/Data/Repositories/TherapistRepositoryImpl.ts";
import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase.ts";
import AddTherapistUseCaseImpl from "@admin/addTherapist/Application/UseCases/AddTherapist/AddTherapistUseCaseImpl.ts";
import CreateTherapistRequestValidator
    from "@admin/addTherapist/Application/Validators/CreateTherapistRequestValidator.ts";


const datasource : TherapistDatasource = new TherapistDatasource();
const repository : ITherapistRepository = new TherapistRepositoryImpl(datasource);

export const GetTherapistUseCase : IGetTherapistsUseCase = new GetTherapistsUseCaseImpl(repository);

export const AddTherapistUseCase : IAddTherapistUseCase = new AddTherapistUseCaseImpl(repository, new CreateTherapistRequestValidator());

