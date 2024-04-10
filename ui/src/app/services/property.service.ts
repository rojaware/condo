import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { BaseService } from './base.service';

const baseUrl = 'http://localhost:8090/api/properties';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(baseUrl);
  }

  get(name: any): Observable<Property> {
    return this.http.get<Property>(`${baseUrl}/${name}`);
  }
  
  getLeaseDates(): Observable<Property[]> {
    return this.http.get<Property[]>(`${baseUrl}LeaseDates`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
