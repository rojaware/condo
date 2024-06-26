var config = require('../dbconfig');
const sql = require('mssql');
var util = require('../shared/util');
const BASE_SQL = `SELECT [name], [id]
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
                        ,CONVERT(char(10), extendedEndDate ,126) as extendedEndDate
                        ,CONVERT(char(10), salesDate ,126) as salesDate
                        ,[rentFee], managementFee
                        ,[purchasePrice]
                        ,mortgageAccountNo
                        ,mortgageType
                        ,mortgageRate, paymentFrequency, paymentAmount
                        ,CONVERT(char(10), maturityDate ,126) as maturityDate
                        ,comment
                        ,imageUrl
                        ,tscc
                        ,insuranceCompany, policyNo, insuranceFee, propertyTax
                        ,conciergePhone, managementPhone, managementEmail
                        ,[owner], businessNo
                  FROM Properties `
async function getProperties(businessNo) {    
    let query = BASE_SQL + ` WHERE salesDate is null `;               
    if (!util.isEmpty(businessNo)) {
        query += `AND businessNo = @businessNo`
    }
    try {
        let pool = await sql.connect(config);
        let properties = await pool.request()
            .input('businessNo', sql.VarChar, businessNo)
            .query(query);
        console.log('successful, Returning total ' + properties.rowsAffected + ' records')
        return properties.recordsets;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getProperty(name) {
    const query = BASE_SQL + ` where name = @name AND salesDate is null`;
    try {
        let pool = await sql.connect(config);
        let property = await pool.request()
            .input('name', sql.VarChar, name)
            .query(query);
        return property.recordsets;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 
 * @param {*} property 
 * @returns 
 */
async function createProperty(property) {
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
               ,[extendedEndDate]               
               ,[salesDate]               
               ,[rentFee], managementFee
               ,[purchasePrice]
               ,mortgageAccountNo
               ,mortgageType
               ,mortgageRate, paymentFrequency, paymentAmount
               ,maturityDate, comment, imageUrl, tscc
               ,insuranceCompany, policyNo, insuranceFee, propertyTax
               ,conciergePhone, managementPhone, managementEmail
               ,[owner], businessNo)
         VALUES
               (@name ,@address, @rollNo, @propertyCustomerNo, @bank ,@size, @builder,
                @closingDate, 
                @occupancyDate, 
                @startDate, 
                @endDate, @extendedEndDate, @salesDate
                ,@rentFee, @managementFee, @purchasePrice, @mortgageAccountNo
                ,@mortgageType
                ,@mortgageRate, @paymentFrequency, @paymentAmount
                ,@maturityDate, @comment, @imageUrl, @tscc
                ,@insuranceCompany, @policyNo, @insuranceFee, @propertyTax
                ,@conciergePhone, @managementPhone, @managementEmail
                ,@owner, @businessNo);
         SELECT  IDENT_CURRENT('properties') as id ;`;
         console.log('property.occupancyDate ==> ' + property.occupancyDate)
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, property.name)
            .input('address', sql.NVarChar, property.address)
            .input('rollNo', sql.NVarChar, property.rollNo)
            .input('owner', sql.NVarChar, property.owner)
            .input('businessNo', sql.NVarChar, property.businessNo)
            .input('propertyCustomerNo', sql.NVarChar, property.propertyCustomerNo)
            .input('bank', sql.NVarChar, property.bank)
            .input('size', sql.Int, property.size)
            .input('builder', sql.NVarChar, property.builder)            
            .input('occupancyDate', sql.Date, util.toValue(property.occupancyDate))
            .input('closingDate', sql.Date, util.toValue(property.closingDate))
            .input('startDate', sql.Date, util.toValue(property.startDate))
            .input('endDate', sql.Date, util.toValue(property.endDate))
            .input('extendedEndDate', sql.Date, util.toValue(property.extendedEndDate))
            .input('salesDate', sql.Date, util.toValue(property.salesDate))
            .input('rentFee', sql.Money, property.rentFee) 
            .input('managementFee', sql.Money, property.managementFee) 
            .input('purchasePrice', sql.Money, property.purchasePrice)
            .input('mortgageAccountNo', sql.NVarChar, property.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, property.mortgageType)
            .input('paymentFrequency', sql.NVarChar, property.paymentFrequency)
            .input('paymentAmount', sql.Money, property.paymentAmount)
            .input('mortgageRate', sql.Money, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))
            .input('imageUrl', sql.NVarChar, property.imageUrl)
            .input('tscc', sql.NVarChar, property.tscc)
            .input('insuranceCompany', sql.NVarChar, property.insuranceCompany)
            .input('policyNo', sql.NVarChar, property.policyNo)
            .input('insuranceFee', sql.Money, property.insuranceFee)
            .input('propertyTax', sql.Money, property.propertyTax)
            .input('comment', sql.NVarChar, property.comment)            
            .input('conciergePhone', sql.NVarChar, property.conciergePhone)
            .input('managementPhone', sql.NVarChar, property.managementPhone)
            .input('managementEmail', sql.NVarChar, property.managementEmail)
            .query(query);
        return item.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateProperty(property) {
    const query = `UPDATE [properties]
    SET [name] = @name
       ,[address] = @address
       ,[rollNo] = @rollNo
       ,[propertyCustomerNo] = @propertyCustomerNo
       ,[owner] = @owner
       ,[businessNo] = @businessNo
       ,[bank] = @bank
       ,[size] = @size
       ,[builder] = @builder
       ,[closingDate] = COALESCE(@closingDate, closingDate) 
       ,[occupancyDate] = @occupancyDate
       ,[startDate] = @startDate
       ,[endDate] = @endDate
       ,[extendedEndDate] = @extendedEndDate
       ,[salesDate] = @salesDate
       ,[rentFee] = @rentFee
       ,managementFee = @managementFee
       ,[purchasePrice] = @purchasePrice
       ,[mortgageAccountNo] = @mortgageAccountNo
       ,[mortgageType] = @mortgageType
       ,[mortgageRate] = @mortgageRate
       ,[maturityDate] = @maturityDate
       ,[paymentFrequency] = @paymentFrequency
       ,[paymentAmount] = @paymentAmount
       ,[imageUrl] = @imageUrl
       ,[tscc] = @tscc
       ,insuranceCompany = @insuranceCompany
       ,policyNo = @policyNo
       ,insuranceFee = @insuranceFee
       ,propertyTax = @propertyTax
       ,[comment] = @comment
       ,conciergePhone = @conciergePhone
       ,managementPhone = @managementPhone
       ,managementEmail = @managementEmail
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
            .input('businessNo', sql.NVarChar, property.businessNo)
            .input('bank', sql.NVarChar, property.bank)
            .input('id', sql.Int, property.id)
            .input('size', sql.Int, property.size)
            .input('builder', sql.NVarChar, property.builder)
            .input('closingDate', sql.Date, util.toValue(property.closingDate))
            .input('occupancyDate', sql.Date, util.toValue(property.occupancyDate))
            .input('startDate', sql.Date, util.toValue(property.startDate))
            .input('endDate', sql.Date, util.toValue(property.endDate))
            .input('extendedEndDate', sql.Date, util.toValue(property.extendedEndDate))
            .input('salesDate', sql.Date, util.toValue(property.salesDate))
            .input('rentFee', sql.Money, property.rentFee) 
            .input('managementFee', sql.Money, property.managementFee) 
            .input('purchasePrice', sql.Money, property.purchasePrice)
            .input('mortgageAccountNo', sql.NVarChar, property.mortgageAccountNo)
            .input('mortgageType', sql.NVarChar, property.mortgageType)
            .input('mortgageRate', sql.Money, property.mortgageRate)
            .input('maturityDate', sql.Date, util.toValue(property.maturityDate))
            .input('paymentFrequency', sql.NVarChar, property.paymentFrequency)
            .input('paymentAmount', sql.Money, property.paymentAmount)                        
            .input('imageUrl', sql.NVarChar, property.imageUrl)   
            .input('tscc', sql.NVarChar, property.tscc) 
            .input('insuranceCompany', sql.NVarChar, property.insuranceCompany)
            .input('policyNo', sql.NVarChar, property.policyNo)
            .input('insuranceFee', sql.Money, property.insuranceFee)
            .input('propertyTax', sql.Money, property.propertyTax)
            .input('comment', sql.NVarChar, property.comment)            
            .input('conciergePhone', sql.NVarChar, property.conciergePhone)
            .input('managementPhone', sql.NVarChar, property.managementPhone)
            .input('managementEmail', sql.NVarChar, property.managementEmail)
            .query(query);
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteProperty(id) {
   let query = 
         `BEGIN TRANSACTION;
            DECLARE @propertyName nchar(10);
            SET @propertyName = (SELECT name FROM properties WHERE ID = @id)
            -- delete expenses by property name
            DELETE FROM EXPENSES WHERE propertyName = @propertyName;
            -- delete documents BY property name
            DELETE FROM documents WHERE propertyName = @propertyName;
            -- delete documents by tenant name
            DELETE D FROM documents D
            INNER JOIN TENANTS T ON D.tenantName = T.primaryName
            INNER JOIN PROPERTIES P ON T.propertyName = P.name
            where p.name = @propertyName
            -- delete tenant by property name
            DELETE FROM tenants WHERE propertyName = @propertyName
            -- delete property
            DELETE FROM properties WHERE name = @propertyName
         COMMIT; `;
    try {
        const statement = query.replaceAll('@id', id);
        let pool = await sql.connect(config);
        let item = await pool.request()     
            .query(statement);
        return item.rowsAffected;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * find lease ending properties ... 
 * @param {*} id 
 * @returns 
 */
async function getPropertyLeaseEnding(days) {
    const query =
     `SELECT name, 
             owner,
             id, 
             endDate, 
             extendedEndDate, 
             DATEDIFF(day,convert(date, GetDate(), 0), endDate) as diff
      FROM properties
      WHERE endDate <= DateAdd(day, @days, convert(date, GetDate(), 0))`;
     try {
         let pool = await sql.connect(config);
         let item = await pool.request()
             .input('days', sql.Int, days)            
             .query(query);
         return item.recordsets;
     }
     catch (error) {
         console.log(error);
         throw error;
     }
}

async function getLeaseDates() {
    const query = `SELECT name,builder
                          ,CONVERT(char(10), startDate ,126) as startDate
                          ,CONVERT(char(10), endDate ,126) as endDate           
                   FROM properties 
                   WHERE salesDate is null 
                     AND endDate is not null 
                     ORDER BY endDate`;               
    try {
        let pool = await sql.connect(config);
        let properties = await pool.request().query(query);
        console.log('successful, Returning total ' + properties.rowsAffected + ' records')
        return properties.recordsets;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


async function getMaturityDates() {
    const query = `SELECT name,builder
                        ,CONVERT(char(10), startDate ,126) as startDate
                        ,CONVERT(char(10), endDate ,126) as endDate          
                        ,CONVERT(char(10), maturityDate ,126) as maturityDate      
                    FROM properties 
                    WHERE salesDate is null 
                    AND maturityDate is not null 
                    ORDER BY maturityDate`;               
    try {
        let pool = await sql.connect(config);
        let properties = await pool.request().query(query);
        console.log('successful, Returning total ' + properties.rowsAffected + ' records')
        return properties.recordsets;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getProperties: getProperties,
    getProperty : getProperty,
    createProperty : createProperty,
    deleteProperty : deleteProperty,
    updateProperty : updateProperty,
    getPropertyLeaseEnding: getPropertyLeaseEnding,
    getLeaseDates: getLeaseDates,
    getMaturityDates: getMaturityDates,
}