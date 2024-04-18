import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '@app/models/document.model';
import { BaseService } from './base.service';

// const baseUrl = 'http://localhost:8090/api/documents';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'documents';
  }

  getAll(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl);
  }

  getByPropertyOrTenant(name?: string): Observable<Document[]> {    
    if (name) {
      return this.http.get<Document[]>(`${this.baseUrl}ByPropertyOrTenant/${name}`);
    }
    return new Observable<Document[]>;    
  }

  openFile(id: number, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}ById/${id}`,
     { responseType: 'blob' });
  }

  getById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.baseUrl}ById/${id}`);
  }

  create(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl, formData);
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

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents`);
  }

  deleteByPropertyOrTenantName(propertyOrTenantName?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByPropertyOrTenant/${propertyOrTenantName}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  /**
   * 1,2,3,4
   * @param idArray 
   * @returns 
   */
  deleteByIdList(idArray: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByIdList/${idArray}`);
  }

  deleteAll(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }

  update(data: any): Observable<any> {    
    return this.http.put(`${this.baseUrl}`, data);
  }
}
