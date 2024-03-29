import { Expense } from "./expense.model";
import { Tenant } from "./tenant.model";

export class Property {
  name: string;
  address: string;
  rollNo: string;
  propertyCustomerNo: string;
  owner: string;
  bank: string;
  size: number;
  builder: string;
  closingDate: string;
  occupancyDate: string;
  startDate: string;
  endDate: string;
  rentFee: number;
  purchasePrice: number;
  mortgageAccountNo: string;
  mortgageType: string;
  mortgageRate: number;
  maturityDate: string;
  comment: string;
  tenant: Tenant;
  expenses: Expense[];
  documents: Document[];
  imageUrl: string;
  tscc: string;
  index?: number;
}