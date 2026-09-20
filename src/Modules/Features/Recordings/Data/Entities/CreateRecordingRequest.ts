import {RecordingTier, RecordingType} from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";

export default interface CreateRecordingRequest {

    name : string;
    description : string;
    type : RecordingType;
    tier: RecordingTier;
    price: number;
    currencyCode: string;
}