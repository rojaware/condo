import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { Config } from '../models/config.model';
import { BaseService } from './base.service';

// const baseUrl = 'http://localhost:8090/api/settings';
const configUrl = 'http://localhost:8090/config';

@Injectable({
  providedIn: 'root',
})
export class SettingService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'settings';
  }

  getAll(): Observable<Label[]> {
    return this.http.get<Label[]>(this.baseUrl, {
      headers : this.setHeaders()
    });
  }

  getByName(name: string): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.baseUrl}ByName/${name}`, {
      headers : this.setHeaders()
    });
  }

  getById(id: number): Observable<Label> {
    return this.http.get<Label>(`${this.baseUrl}ById/${id}`, {
      headers : this.setHeaders()
    });
  }  
  
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, {
      headers : this.setHeaders()
    });
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers : this.setHeaders()
    });
  }
  deleteByName(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByName/${name}`, {
      headers : this.setHeaders()
    });
  }
  deleteByIdList(labels: Label[]): Observable<any> {
    if (labels.length === 0) {
      return new Observable;
    } else {
      labels.map(item => item.id);
      const infos = labels.map((element: Label) => element.id);
      const idList = infos.join()
      return this.http.delete(`${this.baseUrl}ByIdList/${idList}`, {
        headers : this.setHeaders()
      });
    }    
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl, {
      headers : this.setHeaders()
    });
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, {
      headers : this.setHeaders()
    });
  }
  
  /** TODO future to get config.jsonn from API... */
  getConfig(): Observable<Config> {
    return this.http.get<Config>(configUrl, {
      headers : this.setHeaders()
    });
  }
}
