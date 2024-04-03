var config = require('../dbconfig');
const sql = require('mssql');

async function getSettings() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query("SELECT * from LABELS");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSettingByName(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('input_parameter', sql.VarChar, name)
            .query("SELECT * from LABELS where name = @input_parameter");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSettingById(id) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * from LABELS where id = @id");
        return item.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addSetting(body) {
    const query = `
    INSERT INTO [dbo].[labels]
        ([name]
        ,[value]
        ,[viewValue])
    VALUES
        (@name
        ,@value
        ,@viewValue);
         SELECT @id as id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, body.name)
            .input('value', sql.NVarChar, body.value)
            .input('viewValue', sql.NVarChar, body.viewValue)
            .query(query);
        return item.recordset;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}

async function deleteSettingById(id) {
    const query = `DELETE FROM [dbo].[labels] WHERE id = @id;`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

async function deleteSettingByName(name) {
    const query = `DELETE FROM [dbo].[labels] WHERE name = @name;`;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, name)            
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

async function deleteAllSettings() {
    const query = `DELETE FROM [dbo].[labels];`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
                .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

async function updateSetting(body) {
    const query = `UPDATE [dbo].[labels]
        SET [name] = @name
            ,[value] = @value
            ,[viewValue] = @viewValue
        WHERE id = @id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
                .input('name', sql.NVarChar, body.name)
                .input('value', sql.NVarChar, body.value)
                .input('viewValue', sql.NVarChar, body.viewValue)
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getSettings: getSettings,
    getSettingByName : getSettingByName,
    addSetting : addSetting,
    deleteSettingById : deleteSettingById,
    deleteSettingByName : deleteSettingByName,
    deleteAllSettings: deleteAllSettings,
    updateSetting : updateSetting,
    getSettingById: getSettingById,
}
