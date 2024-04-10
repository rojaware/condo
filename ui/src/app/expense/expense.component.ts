import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { Property } from '../models/property.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
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
  @Input() currentPropertyName: string = '';
  @ViewChild('picker', { static: false }) private picker: MatDatepicker<Date>;
  @ViewChild('fileImportInput') fileImportInput: any;

  expenses: Expense[] = [];
  currentExpense: Expense;

  message = '';

  date = new FormControl(moment());
  year: number;
  month: number;
  fileName: string;

  displayedColumns: string[] = [
    'id',
    'propertyName',
    'year',
    'month',
    'income',
    'travel',
    'maintenance',
    'commission',
    'insurance',
    'legal',
    'managementFee',
    'mortgageInterest',
    'repairs',
    'supplies',
    'tax',
    'utilities',
    'totalExpense',
    'netIncome',
  ];
  public dataSource: MatTableDataSource<Expense>;

  constructor(
    protected router: Router,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser
  ) {
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
    this.getByYear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('property changed to ', this.currentPropertyName);
    this.getByYear();
  }

  setYear(normalizedMonthAndYear: Moment) {
    const ctrlValue = this.date.value ?? moment();
    this.year = normalizedMonthAndYear.year();
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
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
        next: (data: Expense[]) => {
          if (data.length === 0) {
            for (let i = 0; i < 12; i++) {
              data.push(this.createTemplate(this.year, i));
            }
          }
          this.expenses = this.appendTotals(data);
          this.config.user.property.expenses = this.expenses;
          this.dataSource = new MatTableDataSource<Expense>(this.expenses);
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
  }

  private appendTotals(data: Expense[]): Expense[] {
    data.forEach((item) => this.calculateTotal(item));
    return data;
  }

  private calculateTotal(expense: Expense): Expense {
    expense.totalExpense =
      expense.travel +
      expense.maintenance +
      expense.commission +
      expense.insurance +
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
          if (data.length === 0) {
            data.push(this.createTemplate(this.year, this.month));
          }
          this.expenses = data;
          this.config.user.property.expenses = data;
          this.currentExpense = data[0];
          if (
            this.currentExpense.income === 0 ||
            this.currentExpense.income === undefined
          ) {
            this.currentExpense.income = this.config.user.property.rentFee;
          }
          console.log(data);
        },
        error: (e: any) => {
          console.error(e);
        },
      });
  }

  /**
   * Save single expense by month
   */
  save(): void {
    if (this.currentExpense.id) {
      this.update();
    } else {
      this.insert();
    }
    this.viewMode = true;
  }

  createTemplate(_year: number, _month: number): Expense {
    const expense = {
      propertyName: this.config.user.property.name,
      year: _year,
      month: _month,
      income: this.config.user.property.rentFee,
      travel: 0,
      maintenance: 0,
      commission: 0,
      insurance: 0,
      legal: 0,
      managementFee: 0,
      mortgageInterest: 0,
      repairs: 0,
      supplies: 0,
      tax: 0,
      utilities: 0,
      depreciation: 0,
      totalExpense: 0,
      netIncome: 0,
    } as Expense;
    this.message = 'New Expense has been created for new entry...';
    return expense;
  }

  insert(): void {
    this.message = '';

    this.expenseService.insert(this.currentExpense).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This expense has been updated successfully!';
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
          : 'This expense has been updated successfully!';
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
  onFileSelected(event: any): void {
    const file: File = event.srcElement.files[0];
    if (file) {
      this.fileName = file.name;
      this.ngxCsvParser
        .parse(file, {
          header: true, //this.header,
          delimiter: ',',
          encoding: 'utf8',
        })
        .pipe()
        .subscribe(
          (result: any): void => {
            console.log('Result', result);
            this.expenses = result;
            this.dataSource = new MatTableDataSource<Expense>(result);
            this.message = '';
            this.expenseService.updateBulk(this.expenses).subscribe({
              next: (res: any) => {
                console.log(res);
                this.message = 'This expense was updated successfully!';
              },
              error: (e: any) => console.error(e),
            });
          },
          (error: NgxCSVParserError) => {
            console.log('Error', error);
            this.errMessage = 'CSV import failed';
          }
        );
    }
  }

  saveAnnualExpenses(): void {
    this.expenseService.updateBulk(this.expenses).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = 'This expense was updated successfully!';
      },
      error: (e: any) => console.error(e),
    });    
  }

  onEditChanged(): void {
    this.viewMode = !this.viewMode;
    this.message = '';
  }
}
