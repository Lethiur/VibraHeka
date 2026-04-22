import { RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export default interface CreateRecordingRequest {

    name : string;
    description : string;
    type : RecordingType;
}