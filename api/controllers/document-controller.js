var config = require('../dbconfig');
const sql = require('mssql');

async function getDocs() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query("SELECT * from DOCUMENTS");
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getDocsByPropertyOrTenant(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.VarChar, name)
            .query("SELECT * from DOCUMENTS where propertyName = @name OR tenantName = @name");
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getDocByName(name) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('input_parameter', sql.VarChar, name)
            .query("SELECT * from DOCUMENTS where name = @input_parameter");
        return item.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


async function addDoc(body, fileData) {
    const query = `
    INSERT INTO [dbo].[documents]
        ([name]
            ,[data]
            ,[tenantName]
            ,[propertyName])
    VALUES (@name, @data, @tenantName, @propertyName);
    SELECT  IDENT_CURRENT('documents') as id `;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('name', sql.NVarChar, body.name)
            .input('data', sql.VarBinary, fileData)
            .input('tenantName', sql.NVarChar, body.tenantName)
            .input('propertyName', sql.NVarChar, body.propertyName)
            .query(query);
        return item.recordset;
    }
    catch (err) {
        console.log(err);
    }
}
/**
 * Delete a document by id
 * @param {*} id 
 * @returns 
 */
async function deleteDoc(id) {
    const query = `DELETE FROM [dbo].[documents] WHERE id = @id; SELECT @id as id`;

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

/**
 * Delete documents by id list
 * @param {*} idList
 * @returns 
 */
async function deleteDocByIdList(idList) {
    const query = `DELETE FROM [dbo].[documents] WHERE id in (${idList}); `;

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
/**
 * Delete documents by tenant name or property name. 
 * @param {*} name 
 * @returns 
 */
async function deleteDocsByName(name) {
    const query = `DELETE FROM [dbo].[documents] WHERE propertyName = @name
        OR tenantName = @name; `;

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('propertyName', sql.NVarChar, name)            
            .input('tenantName', sql.NVarChar, name)            
            .query(query);
        return item.rowsAffected;
    }
    catch (err) {
        console.log(err);
    }
}


async function deleteAllDocs() {
    const query = `DELETE FROM [dbo].[documents] `;

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

async function updateDoc(body) {
    const query = `UPDATE [dbo].[documents]
    SET [primaryName] = @primaryName
       ,[tenantName] = @tenantName
       ,[data] = @data
    WHERE id = @id;  SELECT @id as id;`;
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('id', sql.Int, body.id)
            .input('primaryName', sql.NVarChar, body.primaryName)
            .input('tenantName', sql.NVarChar, body.tenantName)
            .input('data', sql.NVarChar, body.data)
            .query(query);
        return item.recordset;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getDocs: getDocs,
    getDocsByPropertyOrTenant : getDocsByPropertyOrTenant,
    getDocByName : getDocByName,
    addDoc : addDoc,
    deleteDoc : deleteDoc,
    deleteDocsByName: deleteDocsByName,
    deleteAllDocs: deleteAllDocs,
    deleteDocByIdList: deleteDocByIdList,
    updateDoc : updateDoc
}
