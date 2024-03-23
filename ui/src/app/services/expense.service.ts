import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

const baseUrl = 'http://localhost:8090/api/expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(baseUrl);
  }

  getByProperty(propertyName: any): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${baseUrl}ByProperty/${propertyName}`);
  }
  
  getByYearMonth(propertyName: any, year: any, month?: any): Observable<Expense[]> {    
    if (month) {
      return this.http.get<Expense[]>(`${baseUrl}/${propertyName}/${year}/${month}`);
    } else {
      return this.http.get<Expense[]>(`${baseUrl}/${propertyName}/${year}`);      
    }    
  }
  
  delete(propertyName: any, year?: any, month?: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${propertyName}/${year}/${month}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

}
