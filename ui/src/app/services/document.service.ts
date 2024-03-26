import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from '../models/document.model';

const baseUrl = 'http://localhost:8090/api/documents';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Document[]> {
    return this.http.get<Document[]>(baseUrl);
  }

  getByPropertyOrTenant(name: string): Observable<Document[]> {
    return this.http.get<Document[]>(`${baseUrl}ByPropertyOrTenant/${name}`);
  }

  getByName(name: string): Observable<Document> {
    return this.http.get<Document>(`${baseUrl}ByName/${name}`);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteByPropertyOrTenantName(propertyOrTenantName?: string): Observable<any> {
    return this.http.delete(`${baseUrl}ByPropertyOrTenant/${propertyOrTenantName}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  
  /**
   * 1,2,3,4
   * @param idArray 
   * @returns 
   */
  deleteByIdList(idArray: string): Observable<any> {
    return this.http.delete(`${baseUrl}ByIdList/${idArray}`);
  }

  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}`);
  }

  update(data: any): Observable<any> {    
    return this.http.put(`${baseUrl}`, data);
  }
}
