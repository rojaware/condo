export class Tenant {
  id?: number;
  primaryName: string;
  secondaryName: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  secondaryEmail: string;
  comment: string;
  propertyName: string;
  documents: Document[];  
}
