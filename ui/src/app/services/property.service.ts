import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

const baseUrl = 'http://localhost:8090/api/properties';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(baseUrl);
  }

  get(name: any): Observable<Property> {
    return this.http.get<Property>(`${baseUrl}/${name}`);
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

  deleteByName(name: any): Observable<any> {
    return this.http.delete(`${baseUrl}ByName/${name}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Property[]> {
    return this.http.get<Property[]>(`${baseUrl}/${name}`);
  }
}
