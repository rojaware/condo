import { Property } from "./property.model";

export class User {
  property: Property;
  firstName: string;
  lastName: string;
  profile: UserProfile;
}

export class UserProfile {
  isSelected?: boolean;
  username: string;
  password: string;
  createdOn: string;
  updatedOn: string;
  role: string;
  businessNo: string;
  isEdit?: boolean;

  constructor() {
    this.businessNo = '502416996';
    this.role = RoleTypeEnum.Admin;
  }
}


export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'username',
    type: 'text',
    label: 'Username',
    required: true,    
  },
  {
    key: 'password',
    type: 'text',
    label: 'Password',
    required: true,    
  },
  {
    key: 'role',
    type: 'dropdown',
    label: 'Role',
    required: true,
  },  {
    key: 'businessNo',
    type: 'text',
    label: 'BN',
    required: true,    
  },
  {
    key: 'createdOn',
    type: 'read',
    label: 'Created',    
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

export enum RoleTypeEnum {
  Admin = "admin",
  Manager = "manager",  
  Operator = "operator"
}