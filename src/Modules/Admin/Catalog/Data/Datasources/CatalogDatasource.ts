import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import { CatalogAPIErrors } from "@admin/catalog/Data/Errors/CatalogAPIErrors";
import { ICreateProductDTO } from "@admin/catalog/Data/Models/ICreateProductDTO";
import { IProductDTO } from "@admin/catalog/Data/Models/IProductDTO";

export default class CatalogDatasource extends BackendDatasource {

    public async CreateProduct(data: ICreateProductDTO): Promise<Result<string, CatalogAPIErrors>> {
        const result: Result<string, string> = await this.post<string>('catalog', data, true);
        return result.mapErr(e => e as CatalogAPIErrors);
    }

    public async GetProducts(): Promise<Result<IProductDTO[], CatalogAPIErrors>> {
        const result: Result<IProductDTO[], string> = await this.get<IProductDTO[]>('catalog', true);
        return result.mapErr(e => e as CatalogAPIErrors);
    }
}
