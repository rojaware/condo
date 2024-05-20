import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends BaseService {
  //  'http://localhost:8090/api/properties';
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'properties';
    this.config =  ConfigService.config;
  }

  getAll(businessNo: any): Observable<Property[]> {    
    return this.http.get<Property[]>(`${this.baseUrl}All/${businessNo}`, {
      headers : this.setHeaders()
    });
  }

  get(name: any): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/${name}, {
      headers : this.setHeaders()
    }`);
  }
  
  getLeaseDates(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}LeaseDates`, {
      headers : this.setHeaders()
    });
  }

  getMaturityDates(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}MaturityDates`, {
      headers : this.setHeaders()
    });
  }
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, {
      headers : this.setHeaders()
    });
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, {
      headers : this.setHeaders()
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers : this.setHeaders()
    });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl, {
      headers : this.setHeaders()
    });
  }
}
