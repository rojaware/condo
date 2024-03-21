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

async function getExpenseByProperty(name, year) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.VarChar, name)
            .query("SELECT * from EXPENSES where name = @name ");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getExpenseByYear(name, year) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.VarChar, name)
            .input('year', sql.Int, year)
            .query("SELECT * from EXPENSES where name = @name AND year = @year");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getExpenseByMonth(name, year, month) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.VarChar, name)
            .input('year', sql.Int, year)
            .input('month', sql.Int, month)
            .query("SELECT * from EXPENSES where name = @name AND year = @year AND month = @month");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addExpense(body) {
    const query = `
    INSERT INTO [dbo].[expenses]
        ([name]
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
        (@name ,@month ,@year ,@travel,@maintenance,@commission,@insurance,@legal,@managementFee,@mortgageInterest,@repairs,@supplies,@tax,@utilities,@depreciation,@income);
         SELECT @name as name, @year as year, @month as month;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, body.name)
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

async function deleteExpense(name, year, month) {
    const query = 
     `DELETE FROM [dbo].[expenses] 
      WHERE name = @name
        AND month = COALESCE(@month, month)
        AND year = COALESCE(@year, year);
      SELECT @name as name, @year as year, @month as month`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, name)            
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
            SET [name] = @name
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
            WHERE  name = @name AND year = @year AND month = @month;
            SELECT @name as name, @year as year, @month as month`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, body.name)
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
    getExpensesByYear : getExpenseByYear,
    getExpensesByMonth : getExpenseByMonth,
    addExpense : addExpense,
    deleteExpense : deleteExpense,
    purgeExpense: purgeExpense,
    updateExpense : updateExpense
}
