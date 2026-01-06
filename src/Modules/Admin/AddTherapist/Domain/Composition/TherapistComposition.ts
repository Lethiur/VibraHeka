import GetTherapistsUseCaseImpl
    from "@admin/addTherapist/Application/UseCases/GetTherapist/GetTherapistsUseCaseImpl.ts";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase.ts";
import TherapistDatasource from "@admin/addTherapist/Data/Datasources/TherapistDatasource.ts";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository.ts";
import TherapistRepositoryImpl from "@admin/addTherapist/Data/Repositories/TherapistRepositoryImpl.ts";


const datasource : TherapistDatasource = new TherapistDatasource();
const repository : ITherapistRepository = new TherapistRepositoryImpl(datasource);

export const GetTherapistUseCase : IGetTherapistsUseCase = new GetTherapistsUseCaseImpl(repository);

