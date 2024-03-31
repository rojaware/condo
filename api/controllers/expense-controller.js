var config = require('../dbconfig');
const sql = require('mssql');
const bulkExpense = require('./bulk-expense');

async function getExpenses() {
  try {
    let pool = await sql.connect(config);
    let items = await pool.request().query("SELECT * from Expenses");
    return items.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getExpenseById(id) {
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('id', sql.Int, id)
      .query("SELECT * from EXPENSES where id = @id ");
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getExpenseByYearMonth(propertyName, year, month) {
  const query =
    `SELECT *  FROM [dbo].[expenses] 
     WHERE propertyName = @propertyName
       AND month = COALESCE(@month, month)
       AND year = COALESCE(@year, year);`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('propertyName', sql.VarChar, propertyName)
      .input('year', sql.Int, year)
      .input('month', sql.Int, month)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function addExpense(body) {
  const query = `
    INSERT INTO [dbo].[expenses]
        ([propertyName]
        ,[month]
        ,[year]
        ,[travel]
        ,[maintenance]
        ,[commission]
        ,[insurance]
        ,[legal]
        ,[managementFee]
        ,[mortgageInterest]
        ,[repairs]
        ,[supplies]
        ,[tax]
        ,[utilities]
        ,[depreciation]
        ,[income], updatedOn)
    VALUES
        (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,@legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,@depreciation,@income, CURRENT_TIMESTAMP);
         SELECT @propertyName as propertyName, @year as year, @month as month;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('propertyName', sql.NVarChar, body.propertyName)
      .input('month', sql.Int, body.month)
      .input('year', sql.Int, body.year)
      .input('travel', sql.Money, body.travel)
      .input('maintenance', sql.Money, body.maintenance)
      .input('commission', sql.Money, body.commission)
      .input('insurance', sql.Money, body.insurance)
      .input('legal', sql.Money, body.legal)
      .input('managementFee', sql.Money, body.managementFee)
      .input('mortgageInterest', sql.Money, body.mortgageInterest)
      .input('repairs', sql.Money, body.repairs)
      .input('supplies', sql.Money, body.supplies)
      .input('tax', sql.Money, body.tax)
      .input('utilities', sql.Money, body.utilities)
      .input('depreciation', sql.Money, body.depreciation)
      .input('income', sql.Money, body.income)
      .query(query);
    return item.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}


async function updateExpense(body) {
  const query = `UPDATE [dbo].[expenses]
            SET [propertyName] = @propertyName
                ,[month] = @month
                ,[year] = @year
                ,[travel] = @travel
                ,[maintenance] = @maintenance
                ,[commission] = @commission
                ,[insurance] = @insurance
                ,[legal] = @legal
                ,[managementFee] = @managementFee
                ,[mortgageInterest] = @mortgageInterest
                ,[repairs] = @repairs
                ,[supplies] = @supplies
                ,[tax] = @tax
                ,[utilities] = @utilities
                ,[depreciation] = @depreciation
                ,[income] = @income
                ,updatedOn = CURRENT_TIMESTAMP
            WHERE  id = @id`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('propertyName', sql.NVarChar, body.propertyName)
      .input('month', sql.Int, body.month)
      .input('year', sql.Int, body.year)
      .input('id', sql.Int, body.id)
      .input('travel', sql.Money, body.travel)
      .input('maintenance', sql.Money, body.maintenance)
      .input('commission', sql.Money, body.commission)
      .input('insurance', sql.Money, body.insurance)
      .input('legal', sql.Money, body.legal)
      .input('managementFee', sql.Money, body.managementFee)
      .input('mortgageInterest', sql.Money, body.mortgageInterest)
      .input('repairs', sql.Money, body.repairs)
      .input('supplies', sql.Money, body.supplies)
      .input('tax', sql.Money, body.tax)
      .input('utilities', sql.Money, body.utilities)
      .input('depreciation', sql.Money, body.depreciation)
      .input('income', sql.Money, body.income)
      .query(query);
    return item.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async function deleteExpenseByPropertyYearMonth(propertyName, year, month) {
  const query =
    `DELETE FROM [dbo].[expenses] 
      WHERE propertyName = @propertyName
        AND month = COALESCE(@month, month)
        AND year = COALESCE(@year, year);
      SELECT @propertyName as propertyName, @year as year, @month as month`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('propertyName', sql.NVarChar, propertyName)
      .input('year', sql.Int, year)
      .input('month', sql.Int, month)
      .query(query);
    return item.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function deleteExpenseById(id) {
  const query =
    `DELETE FROM [dbo].[expenses] 
      WHERE id = @id;`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return item.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function purgeExpense() {
  const query =
    `DELETE FROM [dbo].[expenses];`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .query(query);
    return item.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function upsertBulk(body) {
  const expenseTable = bulkExpense.composeTable(body);
  try {
    const request = new sql.Request();
    request.bulk(expenseTable, (err, result) => {
      // Handle errors or process results
      return result;
    });
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message)
  }

}

module.exports = {
  getExpenses: getExpenses,
  getExpenseByYearMonth: getExpenseByYearMonth,
  addExpense: addExpense,
  deleteExpenseByPropertyYearMonth: deleteExpenseByPropertyYearMonth,
  purgeExpense: purgeExpense,
  updateExpense: updateExpense,
  upsertBulk: upsertBulk,
  getExpenseById: getExpenseById,
  deleteExpenseById: deleteExpenseById
}
