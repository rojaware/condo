import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { Config } from '../models/config.model';
import { BaseService } from './base.service';

const baseUrl = 'http://localhost:8090/api/settings';
const configUrl = 'http://localhost:8090/config';

@Injectable({
  providedIn: 'root',
})
export class SettingService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Label[]> {
    return this.http.get<Label[]>(baseUrl);
  }

  getByName(name: string): Observable<Label[]> {
    return this.http.get<Label[]>(`${baseUrl}ByName/${name}`);
  }

  getById(id: number): Observable<Label> {
    return this.http.get<Label>(`${baseUrl}ById/${id}`);
  }  
  
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteByName(name: string): Observable<any> {
    return this.http.delete(`${baseUrl}ByName/${name}`);
  }
  deleteByIdList(labels: Label[]): Observable<any> {
    if (labels.length === 0) {
      return new Observable;
    } else {
      labels.map(item => item.id);
      const infos = labels.map((element: Label) => element.id);
      const idList = infos.join()
      return this.http.delete(`${baseUrl}ByIdList/${idList}`);
    }    
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }
  
  getConfig(): Observable<Config> {
    return this.http.get<Config>(configUrl);
  }
}
