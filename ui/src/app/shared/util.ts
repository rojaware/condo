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
}