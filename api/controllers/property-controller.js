var config = require('../dbconfig');
const sql = require('mssql');

async function getProperties() {
    const query = `SELECT [name]
               ,[address]
               ,[rollNo]
               ,[propertyCustomerNo]
               ,[bank]
               ,[size]
               ,[builder]
               ,CONVERT(char(10), closingDate ,126) as closingDate
               ,CONVERT(char(10), occupancyDate ,126) as occupancyDate
               ,CONVERT(char(10), startDate ,126) as startDate
               ,CONVERT(char(10), endDate ,126) as endDate
               ,[rentFee]
               ,[purchasePrice]
               ,[owner] from Properties`;    
    try {
        let pool = await sql.connect(config);
        let properties = await pool.request().query(query);
        return properties.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getProperty(name) {
    const query = `SELECT [name]
               ,[address]
               ,[rollNo]
               ,[propertyCustomerNo]
               ,[bank]
               ,[size]
               ,[builder]
               ,CONVERT(char(10), closingDate ,126) as closingDate
               ,CONVERT(char(10), occupancyDate ,126) as occupancyDate
               ,CONVERT(char(10), startDate ,126) as startDate
               ,CONVERT(char(10), endDate ,126) as endDate
               ,[rentFee]
               ,[purchasePrice]
               ,[owner] from Properties where name = @name`;
    try {
        let pool = await sql.connect(config);
        let property = await pool.request()
            .input('name', sql.VarChar, name)
            .query(query);
        return property.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addProperty(property) {
    const query = `
        INSERT INTO [dbo].[properties]
               ([name]
               ,[address]
               ,[rollNo]
               ,[propertyCustomerNo]
               ,[bank]
               ,[size]
               ,[builder]
               ,[closingDate]
               ,[occupancyDate]
               ,[startDate]
               ,[endDate]
               ,[rentFee]
               ,[purchasePrice]
               ,[owner])
         VALUES
               (@name ,@address, @rollNo, @propertyCustomerNo, @bank ,@size, @builder, @closingDate, @occupancyDate, @startDate, @endDate, @rentFee, @purchasePrice, @owner);
         SELECT @name as name;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, property.name)
            .input('address', sql.NVarChar, property.address)
            .input('rollNo', sql.NVarChar, property.rollNo)
            .input('owner', sql.NVarChar, property.owner)
            .input('propertyCustomerNo', sql.NVarChar, property.propertyCustomerNo)
            .input('bank', sql.NVarChar, property.bank)
            .input('size', sql.Int, property.size)
            .input('builder', sql.NVarChar, property.builder)
            .input('closingDate', sql.Date, property.closingDate)
            .input('occupancyDate', sql.Date, property.occupancyDate)
            .input('startDate', sql.Date, property.startDate)
            .input('endDate', sql.Date, property.endDate)
            .input('rentFee', sql.Int, property.rentFee)
            .input('purchasePrice', sql.Int, property.purchasePrice)
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteProperty(name) {

    const query = `DELETE FROM [dbo].[properties] WHERE name = COALESCE(@name, name); SELECT @name as name`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, name)            
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateProperty(property) {
    const query = `UPDATE [properties]
    SET [name] = @name
       ,[address] = @address
       ,[rollNo] = @rollNo
       ,[propertyCustomerNo] = @propertyCustomerNo
       ,[owner] = @owner
       ,[bank] = @bank
       ,[size] = @size
       ,[builder] = @builder
       ,[closingDate] = @closingDate
       ,[occupancyDate] = @occupancyDate
       ,[startDate] = @startDate
       ,[endDate] = @endDate
       ,[rentFee] = @rentFee
       ,[purchasePrice] = @purchasePrice
    WHERE name = @name;
             SELECT @name as name;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, property.name)
            .input('address', sql.NVarChar, property.address)
            .input('rollNo', sql.NVarChar, property.rollNo)
            .input('propertyCustomerNo', sql.NVarChar, property.propertyCustomerNo)
            .input('owner', sql.NVarChar, property.owner)
            .input('bank', sql.NVarChar, property.bank)
            .input('size', sql.Int, property.size)
            .input('builder', sql.NVarChar, property.builder)
            .input('closingDate', sql.Date, property.closingDate)
            .input('occupancyDate', sql.Date, property.occupancyDate)
            .input('startDate', sql.Date, property.startDate)
            .input('endDate', sql.Date, property.endDate)
            .input('rentFee', sql.Int, property.rentFee)
            .input('purchasePrice', sql.Int, property.purchasePrice)
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getProperties: getProperties,
    getProperty : getProperty,
    addProperty : addProperty,
    deleteProperty : deleteProperty,
    updateProperty : updateProperty
}