class Util {
  static isEmpty(str) {
    if (!str) {
      return true;
    } else {
      return str.toString().trim().length === 0
    }    
  }
  
  static toValue(str) {
    return this.isEmpty(str)? null: str;
  }

  static toJoinedString(property, key) {
    let source = property[key];
    let formatted = '';
    if (!this.isEmpty(source) ) {
      formatted = source.join(',');
    } 
    property[key]=formatted;
    return property;        
  }

  static toArrayOfString(property, key) {
    let source = property[key];
    source = source? source.toString(): '';
    const formatted = source.split(',');
    property[key]=formatted;
    return property;
  }
  static toManyArrayOfString(list, key) {
    if (list.length === 0) {
      return list;
    } else {
      list.forEach(item => {
        item = this.toArrayOfString(item, key);
      });
      return list;
    }
    return property;
  }
  
}
module.exports = Util