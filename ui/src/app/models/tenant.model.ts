export class Tenant {
  primaryName: string;
  secondaryName?: string;
  phone?: string;
  email?: string;
  documents?: any;
  propertyName?: string;  
  constructor(primaryName: string, secondaryName: string, phone: string, email: string, documents: any, propertyName: string) {
    this.primaryName = primaryName;
    this.secondaryName = secondaryName;
    this.phone = phone;
    this.email = email;
    this.documents = documents;
    this.propertyName = propertyName;
  }  
}
