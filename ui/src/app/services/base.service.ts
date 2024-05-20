import { Injectable } from '@angular/core';
import { Util } from '../shared/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '@app/models/config.model';
import { ConfigService } from './config.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {  
  util = Util;
  baseurl = '';
  config: Config;
  today = new Date();

  constructor(protected http: HttpClient) {    
    this.baseurl = environment.apiUrl;  
  }

  setBaseUrl(url: string): void {
    this.baseurl = url;
  }

  /** 
   * @deprecated use authInterceptor ....   * 
   */
  protected setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.config.user.profile.token,
    };
    return new HttpHeaders(headersConfig);
  }
  
}
