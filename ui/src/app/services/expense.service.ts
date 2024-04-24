import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '@app/models/expense.model';
import { BaseService } from './base.service';

// const baseUrl = 'http://localhost:8090/api/expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'expenses';
  }

  getAll(propertyName: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}ByProperty/${propertyName}`);
  }
  
  get(id: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/${id}`);
  }

  getByProperty(propertyName: any): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}ByProperty/${propertyName}`);
  }
  
  getByYearMonth(propertyName: string, year?: number | null, month?: number | null): Observable<Expense[]> {    
    const property = propertyName.trim();
    if (this.util.hasObject(month)) {
      return this.http.get<Expense[]>(`${this.baseUrl}ByPropertyYearMonth/${property}/${year}/${month}`);
    } else {
      if (!year) {
        year = this.today.getFullYear();
      }
      return this.http.get<Expense[]>(`${this.baseUrl}ByPropertyYearMonth/${property}/${year}`);      
    }    
  }
  
  delete(propertyName: any, year?: any, month?: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByPropertyYearMonth/${propertyName}/${year}/${month}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  insert(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }
  
  updateBulk(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Bulk`, data);
  }

}
