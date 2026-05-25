import GetEventsUseCaseImpl from "@admin/events/Application/UseCases/GetEvents/GetEventsUseCaseImpl";
import CreateEventUseCaseImpl from "@admin/events/Application/UseCases/CreateEvent/CreateEventUseCaseImpl";
import DeleteEventUseCaseImpl from "@admin/events/Application/UseCases/DeleteEvent/DeleteEventUseCaseImpl";
import ToggleEventStatusUseCaseImpl from "@admin/events/Application/UseCases/ToggleEventStatus/ToggleEventStatusUseCaseImpl";
import CreateEventValidator from "@admin/events/Application/Validators/CreateEventValidator";
import EventsDatasource from "@admin/events/Data/Datasources/EventsDatasource";
import EventsRepositoryImpl from "@admin/events/Data/Repositories/EventsRepositoryImpl";
import { IGetEventsUseCase } from "@admin/events/Application/UseCases/GetEvents/IGetEventsUseCase";
import { ICreateEventUseCase } from "@admin/events/Application/UseCases/CreateEvent/ICreateEventUseCase";
import { IDeleteEventUseCase } from "@admin/events/Application/UseCases/DeleteEvent/IDeleteEventUseCase";
import { IToggleEventStatusUseCase } from "@admin/events/Application/UseCases/ToggleEventStatus/IToggleEventStatusUseCase";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";

const datasource: EventsDatasource = new EventsDatasource();
const repository: IEventsRepository = new EventsRepositoryImpl(datasource);
const validator: CreateEventValidator = new CreateEventValidator();

export const getEventsUseCase: IGetEventsUseCase = new GetEventsUseCaseImpl(repository);
export const createEventUseCase: ICreateEventUseCase = new CreateEventUseCaseImpl(repository, validator);
export const deleteEventUseCase: IDeleteEventUseCase = new DeleteEventUseCaseImpl(repository);
export const toggleEventStatusUseCase: IToggleEventStatusUseCase = new ToggleEventStatusUseCaseImpl(repository);
