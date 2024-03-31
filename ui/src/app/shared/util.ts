export class Util {
  static isEmpty(str: string) {
    if (!str) {
      return true;
    } else {
      return str.trim().length === 0
    }    
  }
  static toValue(str: string) {
    return this.isEmpty(str)? null: str;
  }
}