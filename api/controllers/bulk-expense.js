const sql = require('mssql');

function composeTable(jsonList) {
  // Member table
  const expenseTable = new sql.Table('Expenses');
  expenseTable.columns.add('propertyName', sql.NChar(10), { nullable: false });
  expenseTable.columns.add('year', sql.Int, { nullable: false });
  expenseTable.columns.add('month', sql.Int, { nullable: false });  

  expenseTable.columns.add('travel', sql.Money, { nullable: true });
  expenseTable.columns.add('maintenance', sql.Money, { nullable: true });
  expenseTable.columns.add('commission', sql.Money, { nullable: true });

  expenseTable.columns.add('insurance', sql.Money, { nullable: true });
  expenseTable.columns.add('legal', sql.Money, { nullable: true });
  expenseTable.columns.add('managementFee', sql.Money, { nullable: true });

  expenseTable.columns.add('mortgageInterest', sql.Money, { nullable: true });
  expenseTable.columns.add('repairs', sql.Money, { nullable: true });
  expenseTable.columns.add('supplies', sql.Money, { nullable: true });
  expenseTable.columns.add('tax', sql.Money, { nullable: true });
  expenseTable.columns.add('utilities', sql.Money, { nullable: true });
  expenseTable.columns.add('depreciation', sql.Money, { nullable: true });

  expenseTable.columns.add('income', sql.Money, { nullable: true });

  const array = Array.from(jsonList);
  
  array.forEach(data => {
    // Insert into Member table
    expenseTable.rows.add(
      data.propertyName, 
      data.year,
      data.month,
      data.travel,
      data.maintenance,
      data.commission,
      data.insurance,
      data.legal,
      data.managementFee,
      data.mortgageInterest,
      data.repairs,
      data.supplies,
      data.tax,
      data.utilities,
      data.depreciation,
      data.income,      
    );   
  });
  return expenseTable;
}

module.exports = {
  composeTable: composeTable,
}