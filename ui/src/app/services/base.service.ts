import { Injectable } from '@angular/core';
import { Util } from '../shared/util';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  util = Util;
  constructor(protected http: HttpClient) { }
}
