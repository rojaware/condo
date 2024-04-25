import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receipt } from '@app/models/receipt.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'receipts';
  }

  getAll(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.baseUrl);
  }

  getByProperty(name: string): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.baseUrl}ByProperty/${name}`);
  }
  getByTenant(name: string): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.baseUrl}ByTenant/${name}`);
  }
  getById(id: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.baseUrl}ById/${id}`);
  }  
  
  search(tenantName: string, description: string, year: number): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.baseUrl}Search/${tenantName}/${description}/${year}`);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  deleteByProperty(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByProperty/${name}`);
  }
  deleteByTenant(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByTenant/${name}`);
  }
  deleteByIdList(receipts: Receipt[]): Observable<any> {
    if (receipts.length === 0) {
      return new Observable;
    } else {
      receipts.map(item => item.id);
      const infos = receipts.map((element: Receipt) => element.id);
      const idList = infos.join()
      return this.http.delete(`${this.baseUrl}ByIdList/${idList}`);
    }    
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }
  
}
