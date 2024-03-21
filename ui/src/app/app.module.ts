import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertyListComponent } from './components/property-list/property-list.component';

import {MaterialModule} from './material/material.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TenantComponent } from './tenant/tenant.component';
import { ExpenseComponent } from './expense/expense.component'
import { ConfigService } from './config.service';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    PropertyListComponent,
    TenantComponent,
    ExpenseComponent,
    BaseComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => configService.loadConfig();
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
