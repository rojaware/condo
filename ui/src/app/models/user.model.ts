import { Property } from "./property.model";

export class User {
  property: Property;
  firstName: string;
  lastName: string;
  profile: UserProfile;
}

export class UserProfile {
  username: string;
  password: string;
  createdOn: string;
  updatedOn: string;
  role: string;
  businessNo: string;
}