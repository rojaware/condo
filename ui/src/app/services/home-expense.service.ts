import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeExpense } from '@app/models/expense.model';
import { BaseService } from './base.service';

// const baseUrl = 'http://localhost:8090/api/expenses';

@Injectable({
  providedIn: 'root',
})
export class HomeExpenseService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'homeExpenses';
  }

  getAll(propertyName: string): Observable<HomeExpense[]> {
    return this.http.get<HomeExpense[]>(`${this.baseUrl}ByProperty/${propertyName}`);
  }
  
  get(id: number): Observable<HomeExpense[]> {
    return this.http.get<HomeExpense[]>(`${this.baseUrl}/${id}`);
  }

  getByProperty(propertyName: any): Observable<HomeExpense[]> {
    return this.http.get<HomeExpense[]>(`${this.baseUrl}ByProperty/${propertyName}`);
  }
  
  getByYearMonth(propertyName: string, year?: number | null, month?: number | null): Observable<HomeExpense[]> {    
    const property = propertyName.trim();
    if (this.util.hasObject(month)) {
      return this.http.get<HomeExpense[]>(`${this.baseUrl}ByPropertyYearMonth/${property}/${year}/${month}`);
    } else {
      if (!year) {
        year = new Date().getFullYear();
      }
      return this.http.get<HomeExpense[]>(`${this.baseUrl}ByPropertyYearMonth/${property}/${year}`);      
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
