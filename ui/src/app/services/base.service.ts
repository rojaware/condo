import { Injectable } from '@angular/core';
import { Util } from '../shared/util';
import { HttpClient } from '@angular/common/http';
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
  
}
