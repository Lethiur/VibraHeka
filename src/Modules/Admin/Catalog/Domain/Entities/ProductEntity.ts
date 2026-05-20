import { ProductType } from "@admin/catalog/Domain/Entities/ProductType";

export interface ProductEntity {
    ProductID: string;
    Name: string;
    Description: string;
    Type: ProductType;
    IsActive: boolean;
}
