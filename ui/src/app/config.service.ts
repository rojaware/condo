// config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './models/config.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private appConfig: Config;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return this.http
      .get<any>('config.json') // Replace with your config file or API endpoint
      .toPromise()
      .then((config) => {
        this.appConfig = config;
      })
      .catch((err) => {
        console.error('Failed to load config.json:', err);
      });
  }

  get params(): any {
    if (!this.appConfig) {
      throw new Error('Config not yet loaded.');
    }
    return this.appConfig;
  }

  get user(): User {
    return this.appConfig.user;
  }
}
