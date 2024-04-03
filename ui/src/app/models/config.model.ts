import { Label } from "./label.model";
import { User } from "./user.model";

export class Config {
  version: string;
  apiEndpoint: string;
  user: User;
  banks: Label[];
  owners: Label[];
}

