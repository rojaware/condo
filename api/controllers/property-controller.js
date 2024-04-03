var config = require('../dbconfig');
const sql = require('mssql');
var util = require('../shared/util');

async function getProperties() {
    const query = `SELECT [name], [id]
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
               ,mortgageAccountNo
               ,mortgageType
               ,mortgageRate
               ,CONVERT(char(10), maturityDate ,126) as maturityDate
               ,comment
               ,imageUrl
               ,tscc
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

async function getProperty(id) {
    const query = `SELECT [name], [id]
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
               ,mortgageAccountNo
               ,mortgageType
               ,mortgageRate
               ,CONVERT(char(10), maturityDate ,126) as maturityDate
               ,comment
               ,imageUrl, tscc
               ,[owner] from Properties where id = @id`;
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


/**
 * 
 * @param {*} property 
 * @returns 
 */
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
               ,mortgageAccountNo
               ,mortgageType
               ,mortgageRate
               ,maturityDate, comment, imageUrl, tscc
               ,[owner])
         VALUES
               (@name ,@address, @rollNo, @propertyCustomerNo, @bank ,@size, @builder,
                @closingDate, 
                @occupancyDate, 
                @startDate, 
                @endDate, 
                 @rentFee, @purchasePrice, @mortgageAccountNo
                ,@mortgageType
                ,@mortgageRate
                ,@maturityDate, @comment, @imageUrl, @tscc
                ,@owner);
         SELECT  IDENT_CURRENT('properties') as id ;`;
         console.log('property.occupancyDate ==> ' + property.occupancyDate)
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
            .input('occupancyDate', sql.Date, util.toValue(property.occupancyDate))
            .input('closingDate', sql.Date, util.toValue(property.closingDate))
            .input('startDate', sql.Date, util.toValue(property.startDate))
            .input('endDate', sql.Date, util.toValue(property.endDate))
            .input('rentFee', sql.Int, property.rentFee)
            .input('purchasePrice', sql.Int, property.purchasePrice)
            .input('mortgageAccountNo', sql.NVarChar, property.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, property.mortgageType)
            .input('mortgageRate', sql.Decimal, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))
            .input('imageUrl', sql.NVarChar, property.imageUrl)
            .input('tscc', sql.NVarChar, property.tscc)
            .input('comment', sql.NVarChar, property.comment)
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
       ,[closingDate] = COALESCE(@closingDate, closingDate) 
       ,[occupancyDate] = @occupancyDate
       ,[startDate] = @startDate
       ,[endDate] = @endDate
       ,[rentFee] = @rentFee
       ,[purchasePrice] = @purchasePrice
       ,[mortgageAccountNo] = @mortgageAccountNo
       ,[mortgageType] = @mortgageType
       ,[mortgageRate] = @mortgageRate
       ,[maturityDate] = @maturityDate
       ,[imageUrl] = @imageUrl
       ,[tscc] = @tscc
       ,[comment] = @comment
    WHERE id = @id;
             SELECT @id as id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, property.name)
            .input('address', sql.NVarChar, property.address)
            .input('rollNo', sql.NVarChar, property.rollNo)
            .input('propertyCustomerNo', sql.NVarChar, property.propertyCustomerNo)
            .input('owner', sql.NVarChar, property.owner)
            .input('bank', sql.NVarChar, property.bank)
            .input('id', sql.Int, property.id)
            .input('size', sql.Int, property.size)
            .input('builder', sql.NVarChar, property.builder)
            .input('closingDate', sql.Date, util.toValue(property.closingDate))
            .input('occupancyDate', sql.Date, util.toValue(property.occupancyDate))
            .input('startDate', sql.Date, util.toValue(property.startDate))
            .input('endDate', sql.Date, util.toValue(property.endDate))
            .input('rentFee', sql.Int, property.rentFee)
            .input('purchasePrice', sql.Int, property.purchasePrice)
            .input('mortgageAccountNo', sql.NVarChar, property.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, property.mortgageType)
            .input('mortgageRate', sql.Decimal, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))            
            .input('imageUrl', sql.NVarChar, property.imageUrl)   
            .input('tscc', sql.NVarChar, property.tscc) 
            .input('comment', sql.NVarChar, property.comment)    
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function deleteProperty(id) {

    const query = `DELETE FROM [dbo].[properties] WHERE id = @id; `;

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

module.exports = {
    getProperties: getProperties,
    getProperty : getProperty,
    addProperty : addProperty,
    deleteProperty : deleteProperty,
    updateProperty : updateProperty,
    
}