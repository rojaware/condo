import _moment from 'moment';
const moment = _moment;
const DATE_FORMAT = 'YYYY-MM-DD';

export class Util {
  
  static isEmpty(str: string): boolean {
    if (!str) {
      return true;
    } else {
      return str.trim().length === 0
    }    
  }
  static toValue(str: string): string | null {
    return this.isEmpty(str)? null: str;
  }
  static toArray(str: string): string[] {
    if (this.isEmpty(str)) {
      return [];
    } else {
      return str.split(',');
    }
  } 

  /****** Date Utility ******/
  /**
   * Return YYYY-MM-DD string format for Date object...
   * @param date Date
   * @returns string format for YYYY-MM-DD
   */
  static formatISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Return a date after subtracted the number of days
   * @param targetDate Date
   * @param daysToSubtract number
   * @returns Date
   */
  static subtractDaysFromDate(targetDate: Date, daysToSubtract: number): Date {
    const newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() - daysToSubtract);
    return newDate;
  }

  /**
   * Based on target date string (YYYY-MM-DD), subtract number of days and return string format of date
   * (YYYY-MM-DD)
   * @param targetDate string
   * @param daysToSubtract number
   * @returns string (YYYY-MM-DD)
   */
  static subtractDaysFromDateString(targetDate: string, daysToSubtract: number): string {
    const newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() - daysToSubtract);
    return this.formatISODate(newDate);
  }

  /**
   * Return the end date after 1 year from target date
   * @param targetDate string
   * @returns string
   */
  static calculateNextFiscalYearEndDate(targetDate: string): string {
    const currentFiscalYearEndDate = moment(targetDate, DATE_FORMAT); // 28th Feb 2023
    const nextFiscalYearEndDate = currentFiscalYearEndDate
      .clone()
      // .add(1, 'day') // Move to 01/03/2023
      .add(1, 'year') // Move to 01/03/2024
      .add(-1, 'day'); // Move back to 29/02/2024 (leap year)
      const formattedDate = moment(nextFiscalYearEndDate).format(DATE_FORMAT);
      return formattedDate;
  }

  static getDaysDifference(startDate: string, endDate: string): number {
    const _startDate = moment(startDate, DATE_FORMAT);
    const _endDate = moment(endDate, DATE_FORMAT);

    const daysDifference = _endDate.diff(startDate, 'days');
    console.log(`Difference in days: ${daysDifference}`);
    return daysDifference;
  }

}