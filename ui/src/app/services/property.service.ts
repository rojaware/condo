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
    return this.http.get<Property[]>(`${this.baseUrl}All/${businessNo}`);
  }

  get(name: any): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/${name}`);
  }
  
  getLeaseDates(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}LeaseDates`);
  }

  getMaturityDates(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}MaturityDates`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
