import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit {

  constructor (private configService: ConfigService) {}

  ngOnInit(): void {
    const apiUrl = this.configService.params('apiEndpint');
    console.log('API URL:', apiUrl);
  }


}
