var config = require('../dbconfig');
const sql = require('mssql');

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

async function getExpenseByProperty(propertyName, year) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('propertyName', sql.VarChar, propertyName)
            .query("SELECT * from EXPENSES where propertyName = @propertyName ");
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
       AND year = COALESCE(@year, year);
     SELECT @propertyName as propertyName, @year as year, @month as month`;

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
        ,[income])
    VALUES
        (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,@legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,@depreciation,@income);
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

async function deleteExpense(propertyName, year, month) {
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

async function purgeExpense() {
    const query = 
     `DELETE FROM [dbo].[expenses] ;
      SELECT count(*) from expenses;`;

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
            WHERE  propertyName = @propertyName AND year = @year AND month = @month;
            SELECT @propertyName as propertyName, @year as year, @month as month`;
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


async function upsertBulk(body) {
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
        ,[income])
    VALUES
        (@propertyName ,@month ,@year ,@travel,@maintenance,@commission,@insurance,@legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,@depreciation,@income);
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

module.exports = {
    getExpenses: getExpenses,
    getExpensesByProperty: getExpenseByProperty,
    getExpenseByYearMonth : getExpenseByYearMonth,
    addExpense : addExpense,
    deleteExpense : deleteExpense,
    purgeExpense: purgeExpense,
    updateExpense : updateExpense, 
    upsertBulk: upsertBulk
}
