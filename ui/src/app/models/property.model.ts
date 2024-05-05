import { Expense } from "./expense.model";
import { Tenant } from "./tenant.model";

export class Property {
  id: number;
  name: string;
  address: string;
  rollNo: string;
  propertyCustomerNo: string;
  owner?: string[];
  username?: string;

  size: number;
  builder: string;
  closingDate: string;
  occupancyDate: string;
  startDate: string;
  endDate: string;
  extendedEndDate: string;
  salesDate: string;
  rentFee: number;
  managementFee: number;
  purchasePrice: number;
  // Mortgage Detail
  bank: string;
  mortgageRate: number;
  mortgageAccountNo: string;
  mortgageType: string;  
  paymentFrequency: string;
  paymentAmount: number;  
  maturityDate: string;
  comment: string;
  
  tenant: Tenant;
  expenses: Expense[];
  documents: Document[];
  imageUrl: string;
  tscc: string;
  index?: number;
  purchaseDate: string;
  insuranceCompany: string;
  policyNo: string;
  insuranceFee: number;  
  propertyTax: number;
  conciergePhone: string;
  managementPhone: string;
  managementEmail: string;
}