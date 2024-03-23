import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Property } from '../models/property.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { FormControl } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const YEAR_MONTH_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(YEAR_MONTH_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseComponent extends BaseComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProperty: Property = {} as Property;
  @ViewChild('picker', { static: false }) private picker: MatDatepicker<Date>;

  expenses: Expense[] = [];
  currentExpense: Expense;
  selectedYear: number;
  dateToday: number = Date.now();
  message = '';

  constructor(
    protected router: Router,
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {
    super(router);
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
    }
  }

  date = new FormControl(moment());
  
  year: number;
  month: number;
  
  setYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    this.year = normalizedMonthAndYear.year();
    
    
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    
    // retrieve expenses by year and month
    
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    this.year = normalizedMonthAndYear.year();
    this.month = normalizedMonthAndYear.month();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
   
  }

  getByYear(): void {
    const propertyName = this.config.user.property.name;
    this.expenseService
      .getByYearMonth(propertyName, this.year, null)
      .subscribe({
        next: (data) => {
          this.expenses = data;
          this.config.user.property.expenses = data;
          // this.currentExpense = data[0];
          console.log(data);
        },
        error: (e) => console.error(e),
      });
  }

  getByMonth(): void {
    const propertyName = this.config.user.property.name;
    this.expenseService
      .getByYearMonth(propertyName, this.year, this.month)
      .subscribe({
        next: (data) => {
          this.expenses = data;
          this.config.user.property.expenses = data;
          this.currentExpense = data[0];
          console.log(data);
        },
        error: (e) => console.error(e),
      });
  }

  // getByMonth(year: number, month: number): void {
  //   const propertyName = this.config.user.property.name;
  //   this.expenseService.getByYearMonth(propertyName, year, month).subscribe({
  //     next: (data) => {
  //       this.expenses = data;
  //       this.config.user.property.expenses = data;
  //       // useful for single record result for expense
  //       this.currentExpense = data[0];
  //       console.log(data);
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  update(): void {
    this.message = '';

    this.expenseService.update(this.currentExpense).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This tenant was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  delete(): void {
    this.expenseService.delete(this.currentExpense.propertyName).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e) => console.error(e),
    });
  }
}
