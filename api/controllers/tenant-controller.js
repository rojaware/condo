var config = require('../dbconfig');
const sql = require('mssql');

async function getTenants() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query("SELECT * from TENANTS");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTenantByProperty(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('input_parameter', sql.VarChar, name)
            .query("SELECT * from TENANTS where propertyName = @input_parameter");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTenantByName(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('input_parameter', sql.VarChar, name)
            .query("SELECT * from TENANTS where primaryName = @input_parameter OR secondaryName = @input_parameter");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addTenant(body) {
    const query = `
    INSERT INTO [dbo].[tenants]
        ([primaryName]
        ,[secondaryName]
        ,[phone]
        ,[email]
        ,[documents]
        ,[propertyName])
    VALUES
        (@primaryName
        ,@secondaryName
        ,@phone
        ,@email
        ,@documents
        ,@propertyName);
         SELECT @primaryName as primaryName, @secondaryName as secondaryName;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('primaryName', sql.NVarChar, body.primaryName)
            .input('secondaryName', sql.NVarChar, body.secondaryName)
            .input('phone', sql.NVarChar, body.phone)
            .input('email', sql.NVarChar, body.email)
            .input('documents', sql.VarBinary, body.documents)            
            .input('propertyName', sql.NVarChar, body.propertyName)
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteTenant(primaryName, propertyName) {
    const query = `DELETE FROM [dbo].[tenants] WHERE primaryName = @primaryName; SELECT @primaryName as primaryName, @propertyName as propertyName`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('primaryName', sql.NVarChar, primaryName)            
            .input('propertyName', sql.NVarChar, propertyName)   
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function purgeTenants(name) {
    const query = `DELETE FROM [dbo].[tenants] WHERE propertyName = @name; SELECT @name as propertyName`;

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

async function deleteAllTenants() {
    const query = `DELETE FROM [dbo].[tenants]; SELECT count(*) as total from tenants`;
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

async function updateTenant(body) {
    const query = `UPDATE [dbo].[tenants]
    SET [primaryName] = @primaryName
       ,[secondaryName] = @secondaryName
       ,[phone] = @phone
       ,[email] = @email
       ,[documents] = @documents
       ,[propertyName] = @propertyName
  WHERE propertyName = @propertyName;
             SELECT @propertyName as propertyName;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('primaryName', sql.NVarChar, body.primaryName)
            .input('secondaryName', sql.NVarChar, body.secondaryName)
            .input('phone', sql.NVarChar, body.phone)
            .input('email', sql.NVarChar, body.email)
            .input('documents', sql.VarBinary, body.documents)
            .input('propertyName', sql.NVarChar, body.propertyName)
            .query(query);
        return item.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getTenants: getTenants,
    getTenantByProperty : getTenantByProperty,
    getTenantByName : getTenantByName,
    addTenant : addTenant,
    deleteTenant : deleteTenant,
    purgeTenants : purgeTenants,
    deleteAllTenants: deleteAllTenants,
    updateTenant : updateTenant
}
