class Util {
  static isEmpty(str) {
    return (!str || str.length === 0 );
  }
  static toValue(str) {
    return this.isEmpty(str)? null: str;
  }
}
module.exports = Util