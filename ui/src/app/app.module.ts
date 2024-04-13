import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyComponent } from './property/property.component';
import { PropertyListComponent } from './property-list/property-list.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TenantComponent } from './tenant/tenant.component';
import { ExpenseComponent } from './expense/expense.component';
import { BaseComponent } from './base/base.component';
import { ConfigService } from './services/config.service';
import { MonthNamePipe } from './shared/month-name.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DocumentComponent } from './document/document.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from './models/expense.model';
import { SettingsComponent } from './settings/settings.component';
import { OverviewComponent } from './overview/overview.component';
import { MortgageComponent } from './mortgage/mortgage.component';

export const initConfig =
  (configService: ConfigService): any =>
  () =>
    configService.load();

@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    PropertyListComponent,
    TenantComponent,
    ExpenseComponent,
    BaseComponent,
    MonthNamePipe,
    DocumentComponent,
    ConfirmDialogComponent,
    CarouselHolderComponent,
    SettingsComponent,
    OverviewComponent,
    MortgageComponent,
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
    NgxCurrencyDirective,
    NgxCsvParserModule,
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
