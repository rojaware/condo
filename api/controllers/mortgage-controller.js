var config = require('../dbconfig');
const sql = require('mssql');

async function getMortgages() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query("SELECT * from MORTGAGES");
        return items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getMortgageByProperty(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('input_parameter', sql.VarChar, name)
            .query("SELECT * from MORTGAGES where propertyName = @input_parameter");
        return item.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getMortgageById(id) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * from MORTGAGES where id = @id");
        return item.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
async function createMortgage(body) {
    const query = `INSERT INTO [dbo].[mortgages]
    ([propertyName], bank
    ,[mortgageAccountNo]
    ,[mortgageType]
    ,[mortgageRate]
    ,[maturityDate]
    ,[paymentAmount]
    ,[paymentFrequency]
    ,[prepayment]
    ,[comment])
VALUES
    (@propertyName, @bank
    ,@mortgageAccountNo
    ,@mortgageType
    ,@mortgageRate
    ,@maturityDate
    ,@paymentAmount
    ,@paymentFrequency
    ,@prepayment
    ,@comment)

        SELECT  IDENT_CURRENT('mortgages') as id ;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('propertyName', sql.NVarChar, body.propertyName)
            .input('bank', sql.NVarChar, body.bank)
            .input('mortgageAccountNo', sql.NVarChar, body.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, body.mortgageType)
            .input('paymentFrequency', sql.NVarChar, property.paymentFrequency)
            .input('paymentAmount', sql.Money, property.paymentAmount)
            .input('mortgageRate', sql.Money, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))
            .input('prepayment', sql.Money, property.prepayment)
            .input('comment', sql.NVarChar, body.comment)          
            .query(query);
        return item.recordset;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}

async function deleteMortgageById(id) {
    const query = `DELETE FROM [dbo].[MORTGAGES] WHERE id = @id;`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteMortgageByProperty(name) {
    const query = `DELETE FROM [dbo].[MORTGAGES] WHERE propertyName = @name; SELECT @name as propertyName`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, name)            
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteAllMortgages() {
    const query = `DELETE FROM [dbo].[MORTGAGES]; SELECT count(*) as total from MORTGAGES`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
                .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateMortgage(body) {
    const query = `UPDATE [dbo].[MORTGAGES]
    SET [bank] = @bank
       ,[propertyName] = @propertyName 
       ,[mortgageAccountNo] = @mortgageAccountNo
       ,[mortgageType] = @mortgageType
       ,[mortgageRate] = @mortgageRate
       ,[maturityDate] = @maturityDate
       ,[paymentFrequency] = @paymentFrequency
       ,[paymentAmount] = @paymentAmount
       ,prepayment = @prepayment
       ,[comment] = @comment
        WHERE id = @id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('bank', sql.NVarChar, body.bank)
            .input('propertyName', sql.NVarChar, body.propertyName)            
            .input('mortgageAccountNo', sql.NVarChar, body.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, body.mortgageType)
            .input('paymentFrequency', sql.NVarChar, body.paymentFrequency)
            .input('mortgageRate', sql.Money, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))
            .input('comment', sql.NVarChar, body.comment)
            .input('prepayment', sql.NVarChar, property.prepayment)
            .input('paymentAmount', sql.Money, property.paymentAmount)                        
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getMortgages: getMortgages,
    getMortgageByProperty : getMortgageByProperty,
    getMortgageById : getMortgageById,
    createMortgage : createMortgage,
    deleteMortgageById : deleteMortgageById,
    deleteMortgageByProperty : deleteMortgageByProperty,
    deleteAllMortgages: deleteAllMortgages,
    updateMortgage : updateMortgage,
}
