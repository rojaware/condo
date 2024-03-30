export class Expense {
  id: number;
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
/** @deprecated test only use MY_FORMAT */
export const DB_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};