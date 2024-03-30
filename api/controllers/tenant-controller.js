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
        return item.recordset;
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
        return item.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
async function getTenantById(id) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * from TENANTS where id = @id");
        return item.recordset;
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
        ,[propertyName])
    VALUES
        (@primaryName
        ,@secondaryName
        ,@phone
        ,@email
        ,@propertyName);
         SELECT @primaryName as primaryName, @secondaryName as secondaryName;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('primaryName', sql.NVarChar, body.primaryName)
            .input('secondaryName', sql.NVarChar, body.secondaryName)
            .input('phone', sql.NVarChar, body.phone)
            .input('email', sql.NVarChar, body.email)     
            .input('propertyName', sql.NVarChar, body.propertyName)
            .query(query);
        return item.recordset;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message
            )
    }
}

async function deleteTenantById(id) {
    const query = `DELETE FROM [dbo].[tenants] WHERE id = @id;`;

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

async function deleteTenantByProperty(name) {
    const query = `DELETE FROM [dbo].[tenants] WHERE propertyName = @name; SELECT @name as propertyName`;

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

async function deleteAllTenants() {
    const query = `DELETE FROM [dbo].[tenants]; SELECT count(*) as total from tenants`;
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

async function updateTenant(body) {
    const query = `UPDATE [dbo].[tenants]
        SET [primaryName] = @primaryName
            ,[secondaryName] = @secondaryName
            ,[phone] = @phone
            ,[email] = @email
            ,[propertyName] = @propertyName
        WHERE id = @id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('primaryName', sql.NVarChar, body.primaryName)
            .input('secondaryName', sql.NVarChar, body.secondaryName)
            .input('id', sql.Int, body.id)
            .input('phone', sql.NVarChar, body.phone)
            .input('email', sql.NVarChar, body.email)
            .input('propertyName', sql.NVarChar, body.propertyName)
            .query(query);
        return item.rowsAffected;
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
    deleteTenantById : deleteTenantById,
    deleteTenantByProperty : deleteTenantByProperty,
    deleteAllTenants: deleteAllTenants,
    updateTenant : updateTenant,
    getTenantById: getTenantById,
}
