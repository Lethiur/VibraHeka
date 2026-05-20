import { CurrencyIsoCode } from "@admin/catalog/Domain/Entities/CurrencyIsoCode";

export interface CreateProductEntity {
    Name: string;
    Description: string;
    Price: number;
    CurrencyCode: CurrencyIsoCode;
}
