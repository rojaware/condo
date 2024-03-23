import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertyListComponent } from './components/property-list/property-list.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TenantComponent } from './tenant/tenant.component';
import { ExpenseComponent } from './expense/expense.component';
import { BaseComponent } from './base/base.component';
import { ConfigService } from './services/config.service';
import { MonthNamePipe } from './shared/month-name.pipe';

export const initConfig = (configService: ConfigService): any => () => configService.load();

@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    PropertyListComponent,
    TenantComponent,
    ExpenseComponent,
    BaseComponent,
    MonthNamePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,    
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => configService.load();
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
