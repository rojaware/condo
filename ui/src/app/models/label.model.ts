export interface Label {
  isSelected?: boolean;
  id?: number;
  name: string;
  value: string;
  viewValue: string;
  hint?: string;
  isEdit?: boolean;
}

export const LabelColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'id',
    type: 'number',
    label: 'ID',    
  },
  {
    key: 'name',
    type: 'dropdown',
    label: 'Category',
    required: true,
  },  
  {
    key: 'value',
    type: 'text',
    label: 'Value',
    required: true,    
  },
  {
    key: 'viewValue',
    type: 'text',
    label: 'Label',
    required: true,    
  },
  {
    key: 'hint',
    type: 'text',
    label: 'Hint',    
    hidden: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

export enum LabelTypeEnum {
  Bank = "BANKS",
  Owner = "OWNERS",  
  Batch = "BATCH",  
  Insurance = "INSURANCES",  
  Cycle = "CYCLES",  
  Database = 'DB',
}
