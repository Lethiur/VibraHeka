export interface SellableItemPriceDTO {
  sellableItemPriceID: string;
  sellableItemID: string;
  amount: number;
  currencyCode: string;
  kind: number;
  billingInterval?: number;
  externalProductID: string;
  externalPriceID: string;
  isActive: boolean;
}

export interface SellableItemDTO {
  sellableItemID: string;
  type: number;
  referenceID: string;
  name: string;
  isActive: boolean;
  prices: SellableItemPriceDTO[];
}

export interface CreateSellableItemPriceRequest {
  sellableItemID: string;
  amount: number;
  currency: string;
  kind: number;
  billingInterval?: number;
}
