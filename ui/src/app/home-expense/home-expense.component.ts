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
import { HomeExpense, HomeExpenseColumns } from '@app/models/expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { HomeExpenseService } from '@app/services/home-expense.service';

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
  selector: 'app-home-expense',
  templateUrl: './home-expense.component.html',
  styleUrl: './home-expense.component.css',
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(YEAR_MONTH_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeExpenseComponent extends BaseComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentPropertyName: string = '';
  @ViewChild('picker', { static: false }) private picker: MatDatepicker<Date>;
  @ViewChild('fileImportInput') fileImportInput: any;
  displayedColumns: string[] = HomeExpenseColumns.map((col) => col.key); 
  columnsSchema: any = [];
  expenses: HomeExpense[] = [];
  currentExpense: HomeExpense;

  message = '';

  date = new FormControl(moment());
  year: number;
  month: number;
  presentYear: number;
  presentMonth: number;
  fileName: string;

  public dataSource: MatTableDataSource<HomeExpense>;

  constructor(
    protected router: Router,
    private expenseService: HomeExpenseService,
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
    this.columnsSchema = HomeExpenseColumns;  
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
        next: (data: HomeExpense[]) => {
          if (data.length === 0) {
            for (let i = 0; i < 12; i++) {
              data.push(this.createTemplate(this.year, i));
            }
          }
          this.expenses = this.appendTotals(data);
          this.config.user.property.expenses = this.expenses;
          this.dataSource = new MatTableDataSource<HomeExpense>(this.expenses);
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
  }

  private appendTotals(data: HomeExpense[]): HomeExpense[] {
    data.forEach((item) => this.calculateTotal(item));
    // attach total row at the bottom...
    const lastRow = this.insertLastRow(data);
    data.push(lastRow);
    return data;
  }
  private insertLastRow(expenseList: HomeExpense[]): HomeExpense {
    let lastRow = new HomeExpense();
    lastRow.id = -1;
    lastRow['income'] = expenseList.map((item: HomeExpense) => item['income']).reduce((acc, curr) => acc + curr, 0);
    lastRow['travel'] = expenseList.map((item: HomeExpense) => item['travel']).reduce((acc, curr) => acc + curr, 0);
    lastRow['maintenance'] = expenseList.map((item: HomeExpense) => item['maintenance']).reduce((acc, curr) => acc + curr, 0);
    lastRow['commission'] = expenseList.map((item: HomeExpense) => item['commission']).reduce((acc, curr) => acc + curr, 0);
    lastRow['insurance'] = expenseList.map((item: HomeExpense) => item['insurance']).reduce((acc, curr) => acc + curr, 0);
    lastRow['legal'] = expenseList.map((item: HomeExpense) => item['legal']).reduce((acc, curr) => acc + curr, 0);
    lastRow['managementFee'] = expenseList.map((item: HomeExpense) => item['managementFee']).reduce((acc, curr) => acc + curr, 0);
    lastRow['mortgageInterest'] = expenseList.map((item: HomeExpense) => item['mortgageInterest']).reduce((acc, curr) => acc + curr, 0);
    lastRow['repairs'] = expenseList.map((item: HomeExpense) => item['repairs']).reduce((acc, curr) => acc + curr, 0);
    lastRow['supplies'] = expenseList.map((item: HomeExpense) => item['supplies']).reduce((acc, curr) => acc + curr, 0);
    lastRow['tax'] = expenseList.map((item: HomeExpense) => item['tax']).reduce((acc, curr) => acc + curr, 0);
    lastRow['utilities'] = expenseList.map((item: HomeExpense) => item['utilities']).reduce((acc, curr) => acc + curr, 0);
    lastRow['autoInsurance'] = expenseList.map((item: HomeExpense) => item['autoInsurance']).reduce((acc, curr) => acc + curr, 0);
    lastRow['gas'] = expenseList.map((item: HomeExpense) => item['gas']).reduce((acc, curr) => acc + curr, 0);
    lastRow['hydro'] = expenseList.map((item: HomeExpense) => item['hydro']).reduce((acc, curr) => acc + curr, 0);
    lastRow['water'] = expenseList.map((item: HomeExpense) => item['water']).reduce((acc, curr) => acc + curr, 0);
    lastRow['waterHeaterRental'] = expenseList.map((item: HomeExpense) => item['waterHeaterRental']).reduce((acc, curr) => acc + curr, 0);
    lastRow['internet'] = expenseList.map((item: HomeExpense) => item['internet']).reduce((acc, curr) => acc + curr, 0);
    lastRow['mobile'] = expenseList.map((item: HomeExpense) => item['mobile']).reduce((acc, curr) => acc + curr, 0);
    lastRow['netflix'] = expenseList.map((item: HomeExpense) => item['netflix']).reduce((acc, curr) => acc + curr, 0);
    lastRow['youtube'] = expenseList.map((item: HomeExpense) => item['youtube']).reduce((acc, curr) => acc + curr, 0);
    lastRow['depreciation'] = expenseList.map((item: HomeExpense) => item['depreciation']).reduce((acc, curr) => acc + curr, 0);
    lastRow['totalExpense'] = expenseList.map((item: HomeExpense) => item['totalExpense']).reduce((acc, curr) => acc + curr, 0);
    lastRow['netIncome'] = expenseList.map((item: HomeExpense) => item['netIncome']).reduce((acc, curr) => acc + curr, 0);
    
    return lastRow;
  }

  private calculateTotal(expense: HomeExpense): HomeExpense {
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
      expense.depreciation +
      
      expense.autoInsurance +
      expense.gas +
      expense.hydro +
      expense.water +
      expense.waterHeaterRental +
      expense.internet +
      expense.mobile +
      expense.netflix +
      expense.youtube 
    expense.netIncome = expense.income - expense.totalExpense;
    return expense;
  }

  /**
   * Save single expense by month
   */
  save(): void {
    this.expenses = this.appendTotals(this.expenses);
          this.config.user.property.expenses = this.expenses;
          this.dataSource = new MatTableDataSource<HomeExpense>(this.expenses);
        
    if (this.currentExpense.id) {
      this.update();
    } else {
      this.insert();
    }
    
  }

  createTemplate(_year: number, _month: number): HomeExpense {
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
      income: this.config.user.property.rentFee || 0,
      travel: 0,
      maintenance: 0,
      commission: 0,
      insurance: insuranceFee || 0,
      legal: 0,
      managementFee: this.config.user.property.managementFee || 0,
      mortgageInterest: 0,
      repairs: 0,
      supplies: 0,
      tax: propertyTax || 0,
      utilities: 0,
      depreciation: 0,
      autoInsurance: 0,
              hydro: 0,
              gas: 0 ,
              water: 0, 
              waterHeaterRental: 0,               
              internet: 0,	
              mobile: 0,              
              netflix: 0,
              youtube: 0,
              others: '',
      totalExpense: 0,
      netIncome: 0,
    } as HomeExpense;
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
        this.dataSource = new MatTableDataSource<HomeExpense>();
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
        this.dataSource = new MatTableDataSource<HomeExpense>();
      },
      error: (e: any) => console.error(e),
    });
  }

  onDeleteClicked(year: number, month: number) {
    if(confirm("Are you sure to delete this property? ")) {
      this.delete(year, month);
    }
  }
  delete(year?: number, month?: number): void {
    this.expenseService.delete(this.currentPropertyName, year, month).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = 'Deleted successfully'
        this.router.navigate(['/properties']);
        this.dataSource = new MatTableDataSource<HomeExpense>();
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
            this.dataSource = new MatTableDataSource<HomeExpense>(result);
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
    let pureExpenses = this.expenses.filter(item => !(item.id === -1))
    this.expenseService.updateBulk(pureExpenses).subscribe({
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
