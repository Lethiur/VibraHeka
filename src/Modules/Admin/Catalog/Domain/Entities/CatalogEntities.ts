export enum SellableItemType {
  Recording = 0,
  Event = 1,
  SubscriptionPlan = 2,
  Therapy = 3,
}

export enum PriceKind {
  OneTime = 0,
  Recurring = 1,
}

export enum BillingInterval {
  Month = 0,
  Year = 1,
}

export interface SellableItemPriceEntity {
  SellableItemPriceID: string;
  SellableItemID: string;
  Amount: number;
  Currency: string;
  Kind: PriceKind;
  BillingInterval?: BillingInterval;
  ExternalProductID: string;
  ExternalPriceID: string;
  IsActive: boolean;
}

export interface SellableItemEntity {
  SellableItemID: string;
  Type: SellableItemType;
  ReferenceID: string;
  Name: string;
  IsActive: boolean;
  Prices: SellableItemPriceEntity[];
}

export interface CreateSellableItemPriceEntity {
  ReferenceID: string;
  Amount: number;
  Currency: string;
  Kind: PriceKind;
  BillingInterval?: BillingInterval;
}
