import { Result } from "neverthrow";
import GenericDatasource from "./GenericDatasource";

export default class ApiDatasource extends GenericDatasource {

    constructor() {
        super();
    }


    public async DownloadStringContent(url: string): Promise<Result<string, string>> {
        return this.get<string>(url, true);
    }


}