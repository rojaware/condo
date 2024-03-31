class Util {
  static isEmpty(str) {
    if (!str) {
      return true;
    } else {
      return str.trim().length === 0
    }    
  }
  static toValue(str) {
    return this.isEmpty(str)? null: str;
  }
}
module.exports = Util