import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from '@app/models/tenant.model';
import { BaseService } from '@app/services/base.service';

const baseUrl = 'http://localhost:8090/api/tenants';

@Injectable({
  providedIn: 'root',
})
export class TenantService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(baseUrl);
  }

  getByProperty(propertyName: any): Observable<Tenant> {
    return this.http.get<Tenant>(`${baseUrl}ByProperty/${propertyName}`);
  }

  getByTenant(primaryName: any): Observable<Tenant> {
    return this.http.get<Tenant>(`${baseUrl}ByName/${primaryName}`);
  }  
  
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  delete(primaryName?: string, propertyName?: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${primaryName}/${propertyName}`);
  }

  purge(propertyName?: string): Observable<any> {
    return this.http.delete(`${baseUrl}Purge/${propertyName}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

}
