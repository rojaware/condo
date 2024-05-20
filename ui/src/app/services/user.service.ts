import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { UserProfile } from '@app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  baseUrl: string = '';
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'users';
  }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.baseUrl);
  }

  getByProperty(name: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.baseUrl}ByProperty/${name}`);
  }
  
  getByBusinessNo(businessNo: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.baseUrl}ByBusinessNo/${businessNo}`);
  }
  
  search(data: any): Observable<any> {
    const url = this.baseUrl + 'Search';
    return this.http.post<UserProfile[]>(url, data);
  }
    
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  
  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }
  delete(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${username}`);
  }
  
  deleteByUsernameList(users: UserProfile[]): Observable<any> {
    if (users.length === 0) {
      return new Observable;
    } else {
      users.map(item => item.username);
      const infos = users.map((element: UserProfile) => `'`+element.username + `'`);
      const usernameList = infos.join()
      return this.http.delete(`${this.baseUrl}ByUsernameList/${usernameList}`);
    }    
  }
  deleteByBusinessNo(businessNo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}ByBusinessNo/${businessNo}`);
  }
  purge(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
  
}
