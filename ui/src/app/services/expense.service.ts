import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '@app/models/expense.model';
import { BaseService } from './base.service';

const baseUrl = 'http://localhost:8090/api/expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(propertyName: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${baseUrl}ByProperty/${propertyName}`);
  }
  
  get(id: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${baseUrl}/${id}`);
  }

  getByProperty(propertyName: any): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${baseUrl}ByProperty/${propertyName}`);
  }
  
  getByYearMonth(propertyName: string, year: number, month?: number | null): Observable<Expense[]> {    
    if (this.util.hasObject(month)) {
      return this.http.get<Expense[]>(`${baseUrl}ByPropertyYearMonth/${propertyName}/${year}/${month}`);
    } else {
      const property = propertyName.trim();
      return this.http.get<Expense[]>(`${baseUrl}ByPropertyYearMonth/${property}/${year}`);      
    }    
  }
  
  delete(propertyName: any, year?: any, month?: any): Observable<any> {
    return this.http.delete(`${baseUrl}ByPropertyYearMonth/${propertyName}/${year}/${month}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  insert(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }
  
  updateBulk(data: any): Observable<any> {
    return this.http.post(`${baseUrl}Bulk`, data);
  }

}
