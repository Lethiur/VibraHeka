import ApiDatasource from "@/Core/Data/Datasources/ApiDatasource";
import { EmailTemplateDTO } from "../DTOs/EmailTemplateDTO";
import { Result } from "neverthrow";


export default class EmailTempalteDatasource extends ApiDatasource {


    public async GetAllTemplates(): Promise<Result<EmailTemplateDTO[], string>> {
        return this.get<EmailTemplateDTO[]>('/email-templates', true);
    }

}