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

export const ExpenseColumns = [

  {
    key: 'id',
    type: 'hidden',
    label: 'ID',    
  },
  {
    key: 'propertyName',
    type: 'hidden',
    label: 'Property',
  },  
  {
    key: 'year',
    type: 'hidden',
    label: 'Year',
  },  
  {
    key: 'month',
    type: 'read',
    label: 'Month',
  },
  {
    key: 'income',
    type: 'currency',
    label: 'income',   
  },
  {
    key: 'travel',
    type: 'currency',
    label: 'travel',    
  },
  {
    key: 'maintenance',
    type: 'currency',
    label: 'maintenance',    
  },
  {
    key: 'commission',
    type: 'currency',
    label: 'commission',    
  },
  {
    key: 'insurance',
    type: 'currency',
    label: 'insurance',    
  },
  {
    key: 'legal',
    type: 'currency',
    label: 'legal',    
  },
  {
    key: 'managementFee',
    type: 'currency',
    label: 'mgt Fee',    
  },
  {
    key: 'mortgageInterest',
    type: 'currency',
    label: 'mtg Interest',    
  },
  {
    key: 'repairs',
    type: 'currency',
    label: 'repairs',    
    
  },
  {
    key: 'supplies',
    type: 'currency',
    label: 'supplies',    
  },
  {
    key: 'tax',
    type: 'currency',
    label: 'tax',    
  },
  {
    key: 'utilities',
    type: 'currency',
    label: 'utilities',    
  },
  {
    key: 'depreciation',
    type: 'currency',
    label: 'depreciation',    
    hidden: true,
  },

  // total
  {
    key: 'totalExpense',
    type: 'read',
    label: 'total Expense',
  },
  {
    key: 'netIncome',
    type: 'read',
    label: 'net Income',
  }
];