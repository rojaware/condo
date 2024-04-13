import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@app/base/base.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { ExpenseService } from '@app/services/expense.service';
import { Expense, ExpenseColumns } from '@app/models/expense.model';
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
  displayedColumns: string[] = ExpenseColumns.map((col) => col.key);
  columnsSchema: any = ExpenseColumns;
  expenses: Expense[] = [];
  currentExpense: Expense;

  message = '';

  date = new FormControl(moment());
  year: number;
  month: number;
  presentYear: number;
  presentMonth: number;
  fileName: string;

  public dataSource: MatTableDataSource<Expense>;

  constructor(
    protected router: Router,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser ) {
    super(router);
  }

  ngOnInit(): void {
    
    if (!this.viewMode) {
      this.message = '';
    }
    const today = new Date();

    // Get the year from the date object
    this.year = today.getFullYear();
    this.presentYear = today.getFullYear();
    this.month = today.getMonth();
    this.presentMonth = today.getMonth();
    this.getByYear();
    this.message = "";
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
    this.expenses = [];
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>  ) {
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
    if (!this.year) {
      // current year is default
      this.year = this.presentYear;
    }
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

          if (this.year = this.presentYear) {
            if (
              this.currentExpense.income === 0 ||
              this.currentExpense.income === undefined
            ) {
              this.currentExpense.income = this.config.user.property.rentFee;
            }
            if (
              this.currentExpense.managementFee === 0 ||
              this.currentExpense.managementFee === undefined
            ) {
              this.currentExpense.managementFee = this.config.user.property.managementFee;
            }          
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
    let insuranceFee = 0;
    let propertyTax = 0;
    if (_year === this.presentYear && _month === 3) {
      insuranceFee = this.config.user.property.insuranceFee;
      propertyTax = this.config.user.property.propertyTax;
    }
    const expense = {
      propertyName: this.config.user.property.name,
      year: _year,
      month: _month,
      income: this.config.user.property.rentFee,
      travel: 0,
      maintenance: 0,
      commission: 0,
      insurance: insuranceFee,
      legal: 0,
      managementFee: this.config.user.property.managementFee,
      mortgageInterest: 0,
      repairs: 0,
      supplies: 0,
      tax: propertyTax,
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

  delete(year?: number, month?: number): void {
    this.expenseService.delete(this.currentPropertyName, year, month).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/properties']);
      },
      error: (e: any) => console.error(e),
    });
  }

 

  /** CSV File Import ... */
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

  public saveDataInCSV(): void {
    const name = 'expense_' + this.currentPropertyName + '_' + this.year;
    let csvContent = this.exportDataInCSV(this.expenses);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
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

  exportDataInCSV(data: Array<any>): string {
    if (data.length == 0) {
      return '';
    }

    let propertyNames = Object.keys(data[0]);
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;

    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val: any = item[key];

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    return csvContent;
  }

}
