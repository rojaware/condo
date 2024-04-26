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
  comment: string;
  [key: string]: any;
}

export class HomeExpense extends Expense {
  autoInsurance: number;
  gas: number;
  hydro: number;
  water: number;
  waterHeaterRental: number;
  internet: number;
  mobile: number;
  netflix: number;
  youtube: number;
  others: string;
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
    label: 'mainte\nnance',    
    home: 'Home Insurance',    
  },
  {
    key: 'insurance',
    type: 'currency',
    label: 'insur\nance',    
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
    label: 'depre\nciation',    
    hidden: true,
  },

  {
    key: 'commission',
    type: 'currency',
    label: 'commi\nssion',    
  },
  // total
  {
    key: 'totalExpense',
    type: 'read',
    label: 'Total Expense',
  },
  {
    key: 'netIncome',
    type: 'read',
    label: 'Net Income',
  },
  {
    key: 'comment',
    type: 'write',
    label: 'comment',
  }
];

export const HomeExpenseColumns = [

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
    key: 'insurance',
    type: 'currency',
    label: 'Home Insurance',    
  },
  {
    key: 'autoInsurance',
    type: 'currency',
    label: 'Auto Insurance',    
  },
  {
    key: 'gas',
    type: 'currency',
    label: 'Gas',    
  },  
  {
    key: 'hydro',
    type: 'currency',
    label: 'Hydro',    
  },
  {
    key: 'water',
    type: 'currency',
    label: 'Water',    
  },
  {
    key: 'waterHeaterRental',
    type: 'currency',
    label: 'Water Heater',        
  },
  {
    key: 'internet',
    type: 'currency',
    label: 'Internet',    
  },
  {
    key: 'tax',
    type: 'currency',
    label: 'Property Tax',    
  },
  {
    key: 'mobile',
    type: 'currency',
    label: 'Mobile',    
  },
  {
    key: 'netflix',
    type: 'currency',
    label: 'Netflix',    
  },
  {
    key: 'youtube',
    type: 'currency',
    label: 'Youtube',    
  },
  // total
  {
    key: 'totalExpense',
    type: 'read',
    label: 'Total Expense',
  },
  {
    key: 'netIncome',
    type: 'read',
    label: 'Net Income',
  },
  {
    key: 'comment',
    type: 'write',
    label: 'comment',
  }
];
