import { Label } from "./label.model";
import { User } from "./user.model";

export class Config {
  version: string;
  apiEndpoint: string;
  user: User;
  banks: Label[];
  owners: Label[];
  alert: Alert;
  baseUrl: string;
}

export class Alert {
  host: string;
  port: number;
  service: string;
  auth: Auth;
}

export class Auth {
  user: string;
  pass: string;
}


