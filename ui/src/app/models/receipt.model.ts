export interface Receipt {
  isSelected?: boolean;
  id?: number;
  propertyName: string;
  tenantName: string;
  year: number;
  type: string;
  description: string;
  payment: number;
  updatedOn: string;
  comment: string;
  isEdit?: boolean;
}

export const ReceiptColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'id',
    type: 'read',
    label: 'ID',    
  },
  {
    key: 'type',
    type: 'dropdown',
    label: 'Category',
    required: true,
  },  
  // {
  //   key: 'propertyName',
  //   type: 'hidden',
  //   label: 'Property',
  //   required: true,    
  // },
  {
    key: 'tenantName',
    type: 'tenant_dropdown',
    label: 'Tenant',
    required: false,    
  },  
  {
    key: 'description',
    type: 'text',
    label: 'Description',
    required: true,    
  },
  {
    key: 'payment',
    type: 'currency',
    label: 'Payment',    
    required: true,    
  },
  {
    key: 'updatedOn',
    type: 'read',
    label: 'Updated',    
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

export enum ReceiptTypeEnum {
  Medical = "MEDICAL",
  Auto = "AUTO",  
  Business = "BUSINESS"
}
