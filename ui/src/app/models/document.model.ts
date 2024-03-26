export class Document {
  // composite primary keys
  id?: number;
  parentName?: string;
  name: string;
  data?: Blob;
  isEdit?: boolean;  
}
