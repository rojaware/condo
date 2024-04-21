var config = require('../dbconfig');
const sql = require('mssql');
const bulkExpense = require('./bulk-expense');
const queries = require('./queries');
const Util = require('../shared/util');

/** Retrieve all expenses by property name */
async function getExpenses(propertyName) {
  const query = `SELECT * FROM HomeExpenses WHERE propertyName = @propertyName`;
  try {
    let pool = await sql.connect(config);
    let items = await pool.request().query(query);
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
      .query("SELECT * from HomeExpenses where id = @id ");
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getExpenseByYearMonth(propertyName, year, month) {
  const query =
    `SELECT *  FROM [dbo].[HomeExpenses] 
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

async function insertExpense(body) {
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
      .input('comment', sql.NVarChar, body.comment)      
      .input('autoInsurance', sql.Money, body.autoInsurance)
      .input('hydro', sql.Money, body.hydro)
      .input('gas', sql.Money, body.gas)
      .input('water', sql.Money, body.water)
      .input('waterHeaterRental', sql.Money, body.waterHeaterRental)
      .input('mobile', sql.Money, body.mobile)
      .input('youtube', sql.Money, body.youtube)
      .input('netflix', sql.Money, body.netflix)
      .input('internet', sql.Money, body.internet)
      .input('others', sql.NVarChar, body.others)
      .query(queries.insertHomeExpense);
    return item.recordset;
  }
  catch (err) {
    console.log(err);
  }
}

async function upsertBulk(bodyList) {
  
  try {
    const keys = Object.keys(bodyList);
    const array = Object.values(bodyList);

    let processed = 0;
    for (const body of array) {
      if (body.id) {
        const result = await updateExpense(body);
        if (result) {
          processed++;
        }
      } else {
        const result = await insertExpense(body);
        if (result) {
          processed++;
        }
      }
    }    
    console.log('total processed is ' + processed + ' out of ' + array.length)
    return processed;
  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}

async function updateExpense(body) {
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
      .input('comment', sql.NVarChar, body.comment)
      .input('autoInsurance', sql.Money, body.autoInsurance)
      .input('hydro', sql.Money, body.hydro)
      .input('gas', sql.Money, body.gas)
      .input('water', sql.Money, body.water)
      .input('waterHeaterRental', sql.Money, body.waterHeaterRental)
      .input('mobile', sql.Money, body.mobile)
      .input('youtube', sql.Money, body.youtube)
      .input('netflix', sql.Money, body.netflix)
      .input('internet', sql.Money, body.internet)
      .input('others', sql.NVarChar, body.others)
      .query(queries.updateHomeExpense);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
  }
}

async function deleteExpenseByPropertyYearMonth(propertyName, _year, _month) {
  const year = Util.toValue(_year);
  const month = Util.toValue(_month);
  const query =
    `DELETE FROM [dbo].[HomeExpenses] 
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
    `DELETE FROM [dbo].[HomeExpenses] 
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
    `DELETE FROM [dbo].[HomeExpenses];`;

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

module.exports = {
  getExpenses: getExpenses,
  getExpenseByYearMonth: getExpenseByYearMonth,
  addExpense: insertExpense,
  deleteExpenseByPropertyYearMonth: deleteExpenseByPropertyYearMonth,
  purgeExpense: purgeExpense,
  updateExpense: updateExpense,
  upsertBulk: upsertBulk,
  getExpenseById: getExpenseById,
  deleteExpenseById: deleteExpenseById
}
