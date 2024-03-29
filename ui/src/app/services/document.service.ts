import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  getByPropertyOrTenant(name?: string): Observable<Document[]> {
    console.log('service.getByPropertyOrTenant:: name => ' + name)
    if (name) {
      return this.http.get<Document[]>(`${baseUrl}ByPropertyOrTenant/${name}`);
    }
    return new Observable<Document[]>;    
  }

  openFile(id: number, name: string): Observable<any> {
    return this.http.get(`${baseUrl}ById/${id}`,
     { responseType: 'blob' });
  }

  getById(id: number): Observable<Document> {
    return this.http.get<Document>(`${baseUrl}ById/${id}`);
  }

  create(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(baseUrl, formData);
  }
  /**
   * New method to upload file on doc controller
   * @param file 
   * @returns 
   */
  upload(payload: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', payload.file);
    formData.append('name', payload.file.name);
    if (payload.page === 'property') {
      formData.append('propertyName', payload.parentName);
    } else {
      formData.append('tenantName', payload.parentName);
    }
      
    console.log('sending form data')

    const req = new HttpRequest('POST', `${baseUrl}`, formData, {
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/documents`);
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
