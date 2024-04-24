import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@app/services/config.service';
import { Router } from '@angular/router';
import { Config } from '@app/models/config.model';
import { Util } from '../shared/util';

@Component({
  selector: 'app-base',
  template: ` <p>base works!</p> `,
  styleUrl: './base.component.css',
})
export class BaseComponent implements OnInit {
  config: Config =  ConfigService.config;
  loading = false;
  submitted = false;
  errMessage: string;
  message: string;
  util =  Util;
  baseurl = '';
  today = new Date();

  constructor(protected router: Router) {
    this.baseurl = this.config.baseUrl;
  }

  ngOnInit(): void {

  }


  print(): void {
    window.print()
  }
}
