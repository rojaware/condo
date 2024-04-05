// config.service.ts
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Config } from '../models/config.model';
import { SettingService } from './setting.service';



@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static config: Config;
  env: string;
  private http: HttpClient;

  constructor(private readonly httpHandler: HttpBackend,
    private settingService: SettingService) {
    this.http = new HttpClient(httpHandler);
  }

  _load(): void {
    this.settingService.getConfig().subscribe ({
      next: (data) => {
        ConfigService.config = data;
        console.log('config is filled by ... ');
        console.log(data);
      },
      error: (e) => console.error(e),      
    });
  }

  load(): Promise<void> {   
    const jsonFile = 'assets/config.json';
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: any) => {
          const config = response as Config;
          ConfigService.config = config;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }

}
