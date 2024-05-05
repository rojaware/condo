export interface LeaseDate {
  name: string;
  builder: string;
  startDate: string;
  endDate: string;
  maturityDate?: string;
}

export const LeaseDateColumns = [  
  {
    key: 'name',
    type: 'text',
    label: 'Alias',
    required: true,
  },  
  {
    key: 'builder',
    type: 'text',
    label: 'Company',
    required: true,
  },
  {
    key: 'startDate',
    type: 'text',
    label: 'Start Date',
    required: true,    
  },
  {
    key: 'endDate',
    type: 'text',
    label: 'End Date',    
    hidden: true,
  },
];
export const MaturityDateColumns = LeaseDateColumns.concat(  
  {
    key: 'maturityDate',
    type: 'text',
    label: 'Maturity Date',    
    hidden: true,
  }
)