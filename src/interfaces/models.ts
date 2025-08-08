export interface ICustomer {
  id: string;
  customer: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
}

export type TCustomerForm = Omit<ICustomer, "id">;

export interface IPlan {
  id: string;
  name: string;
  basePrice: number;
}

export type TPlanForm = Pick<IPlan, "name" | "basePrice">;

export interface IProduct {
  id: string;
  name: string;
  plans: IPlan[];
}

export type TProductForm = Omit<IProduct, "id">;

export interface IAddOn {
  id: string;
  name: string;
  unitPrice: number;
  quantity?: number;
}

export interface IContractTerms {
  startDate: string;
  endDate: string;
}

export interface IOrder {
  customer?: ICustomer;
  product?: IProduct;
  plan?: IPlan;
  addOns: IAddOn[];
  contract?: IContractTerms;
}
