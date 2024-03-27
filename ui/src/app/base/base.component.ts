import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { Config } from '../models/config.model';

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

  constructor(protected router: Router) {}

  ngOnInit(): void {
  }
}
