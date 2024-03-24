export class Expense {
  // composite primary keys
  propertyName: string;
  month: number;
  year: number;

  // credit field
  income: number;  

  // accounting debit fields as expense
  travel: number;
  maintenance: number;
  commission: number;
  insurance: number;

  legal: number;
  managementFee: number;
  mortgageInterest: number;
  repairs: number;

  supplies: number;
  tax: number;
  utilities: number;
  depreciation: number;

  // total
  totalExpense: number;
  netIncome: number;
}
