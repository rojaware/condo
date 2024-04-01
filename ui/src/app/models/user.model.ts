import { Property } from "./property.model";

export class User {
  property: Property;
  firstName: string;
  lastName: string;
}
interface Label {
  value: string;
  viewValue: string;
}


export const OWNERS: Label[] = [
  {value: 'scott', viewValue: 'Scott'},
  {value: 'rufina', viewValue: 'Rufina'},
  {value: 'angela', viewValue: 'Angela'},
];

export const BANKS: Label[] = [
  {value: 'td', viewValue: 'TD Bank'},
  {value: 'street', viewValue: 'RFA Bank(Street)'},
  {value: 'shinhan', viewValue: 'Shinhan Bank'},
  {value: 'hana', viewValue: 'KEB Hana Bank'},
  {value: 'rbc', viewValue: 'Royal Bank of Canada'},
];