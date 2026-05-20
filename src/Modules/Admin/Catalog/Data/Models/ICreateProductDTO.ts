import { CurrencyIsoCode } from "@admin/catalog/Domain/Entities/CurrencyIsoCode";

export interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
    currencyCode: CurrencyIsoCode;
}
