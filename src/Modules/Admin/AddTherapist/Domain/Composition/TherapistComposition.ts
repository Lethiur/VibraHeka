import GetTherapistsUseCaseImpl
    from "@admin/addTherapist/Application/UseCases/GetTherapist/GetTherapistsUseCaseImpl";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase";
import TherapistDatasource from "@admin/addTherapist/Data/Datasources/TherapistDatasource";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository";
import TherapistRepositoryImpl from "@admin/addTherapist/Data/Repositories/TherapistRepositoryImpl";
import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase";
import AddTherapistUseCaseImpl from "@admin/addTherapist/Application/UseCases/AddTherapist/AddTherapistUseCaseImpl";
import CreateTherapistRequestValidator
    from "@admin/addTherapist/Application/Validators/CreateTherapistRequestValidator";


const datasource : TherapistDatasource = new TherapistDatasource();
const repository : ITherapistRepository = new TherapistRepositoryImpl(datasource);

export const GetTherapistUseCase : IGetTherapistsUseCase = new GetTherapistsUseCaseImpl(repository);

export const AddTherapistUseCase : IAddTherapistUseCase = new AddTherapistUseCaseImpl(repository, new CreateTherapistRequestValidator());

