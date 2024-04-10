import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService extends BaseService {
  

  constructor(protected http: HttpClient) {
    super(http);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/files`);
  }
}
