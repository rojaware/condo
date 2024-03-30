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

import {
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

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
  @ViewChild('fileImportInput') fileImportInput: any;

  expenses: Expense[] = [];
  currentExpense: Expense;
  
  message = '';

  date = new FormControl(moment());  
  year: number;
  month: number;

  displayedColumns: string[] 
    = ['month', 'income', 'travel', 'maintenance', 
       'commission', 'insurance', 'legal', 'managementFee',
       'mortgageInterest', 'repairs', 'supplies', 'tax',
       'utilities', 'totalExpense', 'netIncome'  ];
  public dataSource: MatTableDataSource<Expense>;

  constructor(
    protected router: Router,
    private expenseService: ExpenseService,
    private route: ActivatedRoute, 
    private ngxCsvParser: NgxCsvParser) {
      super(router);
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
    }
    const today = new Date();

    // Get the year from the date object
    this.year = today.getFullYear();
    this.month = today.getMonth();
  }
  
  setYear(normalizedMonthAndYear: Moment,) {
    const ctrlValue = this.date.value ?? moment();
    this.year = normalizedMonthAndYear.year();
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);    
  }

  setMonthAndYear(normalizedMonthAndYear: Moment,
                  datepicker: MatDatepicker<Moment>) {
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
        next: (data: Expense[]) => {
          this.expenses = this.appendTotals(data);
          this.config.user.property.expenses = this.expenses;
          this.dataSource = new MatTableDataSource<Expense>(this.expenses);          
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
  }

  private appendTotals(data: Expense[]): Expense[] {
    data.forEach(item => this.calculateTotal(item));
    return data;
  }

  private calculateTotal(expense: Expense): Expense {
    expense.totalExpense = expense.travel + expense.maintenance +
                     expense.commission + expense.insurance +  
                     expense.legal +
                     expense.managementFee +
                     expense.mortgageInterest +
                     expense.repairs +  
                     expense.supplies +
                     expense.tax +
                     expense.utilities +
                     expense.depreciation;
    expense.netIncome = expense.income - expense.totalExpense;
    return expense;
  }

  getByMonth(): void {
    const propertyName = this.config.user.property.name;
    this.expenseService
      .getByYearMonth(propertyName, this.year, this.month)
      .subscribe({
        next: (data: Expense[]) => {
          this.expenses = data;
          this.config.user.property.expenses = data;
          this.currentExpense = data[0];
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  save(): void {
    if (this.currentExpense.id) {
      this.update();
    } else {
      this.create();
    }
  }
  create(): void {
    this.message = '';

    this.expenseService.create(this.currentExpense).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This expense was updated successfully!';
      },
      error: (e: any) => console.error(e),
    });
  }

  update(): void {
    this.message = '';

    this.expenseService.update(this.currentExpense).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This expense was updated successfully!';
      },
      error: (e: any) => console.error(e),
    });
  }

  delete(): void {
    this.expenseService.delete(this.currentExpense.propertyName).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e: any) => console.error(e),
    });
  }

  /** CSV Example... */
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    
    this.ngxCsvParser
        .parse(files[0], {
            header: true, //this.header,
            delimiter: ',',
            encoding: 'utf8'
        })
        .pipe()
        .subscribe(
            (result:  any): void => {
                console.log('Result', result);
                
                this.expenses = result;
                this.dataSource = new MatTableDataSource<Expense>(result);
                this.message = '';
                this.expenseService.updateBulk(this.expenses).subscribe({
                  next: (res: any) => {
                    console.log(res);
                    this.message = res.message
                      ? res.message
                      : 'This expense was updated successfully!';
                  },
                  error: (e: any) => console.error(e),
                });        
            },
            (error: NgxCSVParserError) => {
                console.log('Error', error);
                this.errMessage = 'CSV import failed'
            }
        );
  }
  


}
