import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';
import { User, UserProfile } from '@app/models/user.model';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  baseUrl: string = '';
  httpClient = inject(HttpClient);
  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.baseurl + 'auth';
    this.config =  ConfigService.config;
  }
  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }
  // login(data: any): Observable<any> {
  //   return this.httpClient.post(`${this.baseUrl}/login`, data)
  //     .pipe(tap((result: UserProfile) => {
  //       localStorage.setItem('authUser', JSON.stringify(result));
  //       // set user detail
  //       let userProfile = new UserProfile();
  //       userProfile.businessNo = result.businessNo;
  //       this.config.user.profile = userProfile;
        
        
  //     }));
  // }
  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        // set user detail
        const profile = result as UserProfile;
        let userProfile = new UserProfile();
        userProfile.businessNo = profile.businessNo;
        userProfile.role = profile.role;
        userProfile.username = profile.username;
        userProfile.createdOn = profile.createdOn;
        userProfile.updatedOn = profile.updatedOn;
        userProfile.token = profile.token;
        if (!this.config.user) {
          this.config.user = {} as User;        
        }
        if (!this.config.user.profile) {
          this.config.user.profile = userProfile;
        } else {
          this.config.user.profile = userProfile;
        }
        
        
      }));
  }
  logout() {
    localStorage.removeItem('authUser');
  }
  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
  // alternative way to ckeck login staty by reading config.user.token...
  public get loggedIn(): boolean {
    if (this.config && this.config.user && this.config.user.profile.token) {
      return true;
    } else {
      return false;
    }
  }
}