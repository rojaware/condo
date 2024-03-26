export interface Document {

  isSelected: boolean;

  // composite primary keys
  id: number;
  parentName: string;
  name: string;
  data: Blob;
  isEdit: boolean;  
}

export const DocumentColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: 'Select',
  },
  {
    key: 'id',
    type: 'text',
    label: 'ID',
    required: true,
  },
  {
    key: 'data',
    type: 'Blob',
    label: 'File',
    required: true,    
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];