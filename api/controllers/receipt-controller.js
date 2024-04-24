var config = require('../dbconfig');
const sql = require('mssql');

const BASE_SQL = `SELECT id, [propertyName]
                    ,[tenantName]
                    ,[year]
                    ,[type]
                    ,[description]
                    ,[payment]
                    ,CONVERT(char(10), updatedOn ,126) as updatedOn
                    ,[comment] from RECEIPTS`;

async function getReceipts() {

  try {
    console.log('Connecting database  => ' + config.database)
    let pool = await sql.connect(config);
    let items = await pool.request().query(BASE_SQL);
    
    return items.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getReceiptByProperty(name) {
  const query = BASE_SQL + ` where propertyName = @input_parameter`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('input_parameter', sql.VarChar, name)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}


async function getReceiptByTenant(name) {
  const query = BASE_SQL + `
                where tenantName = @input_parameter`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('input_parameter', sql.VarChar, name)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getReceiptById(id) {
  const query = BASE_SQL + `where id = @id`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return item.recordset;
  }
  catch (error) {
    console.log(error);
  }
}

async function addReceipt(body) {
  const query = `
      INSERT INTO [dbo].[receipts]
                  ([propertyName]
                  ,[tenantName]
                  ,[year]
                  ,[type]
                  ,[description]
                  ,[payment]
                  ,[updatedOn]
                  ,[comment])
    VALUES
        (@propertyName
        ,@tenantName, @year
        ,@type, @description
        ,@payment, CURRENT_TIMESTAMP
        ,@comment
      );
        SELECT  IDENT_CURRENT('receipts') as id ;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('propertyName', sql.NVarChar, body.propertyName)      
      .input('tenantName', sql.NVarChar, body.tenantName)
      .input('year', sql.Int, body.year)
      .input('type', sql.NVarChar, body.type)
      .input('description', sql.NVarChar, body.description)
      .input('payment', sql.Money, body.payment)
      .input('comment', sql.NVarChar, body.comment)
      .query(query);
    return item.recordset;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}


async function updateReceipt(body) {
  const query = `UPDATE [dbo].[RECEIPTS]
        SET [propertyName] = @propertyName
            ,[tenantName] = @tenantName
            ,[year] = @year
            ,[type] = @type
            ,[description] = @description
            ,[payment] = @payment
            ,[comment] = @comment
        WHERE id = @id;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
        .input('id', sql.NVarChar, body.id)      
        .input('propertyName', sql.NVarChar, body.propertyName)   
        .input('tenantName', sql.NVarChar, body.tenantName)
        .input('year', sql.Int, body.year)
        .input('type', sql.NVarChar, body.type)
        .input('description', sql.NVarChar, body.description)
        .input('payment', sql.Money, body.payment)
        .input('comment', sql.NVarChar, body.comment)
        .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function deleteReceiptById(id) {
  const query = `DELETE FROM [dbo].[RECEIPTS] WHERE id = @id;`;

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
async function deleteReceiptByIdList(idList) {
  let statement = `DELETE FROM [dbo].[RECEIPTS] WHERE id in (@idList);`;

  try {
    statement = statement.replaceAll('@idList', idList);
    let pool = await sql.connect(config);
    let item = await pool.request()
      .query(statement);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
async function deleteReceiptByProperty(name) {
  const query = `DELETE FROM [dbo].[RECEIPTS] WHERE propertyName = @name;`;

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
async function deleteReceiptByTenant(name) {
  const query = `DELETE FROM [dbo].[RECEIPTS] WHERE tenantName = @name;`;

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

async function deleteAllReceipts() {
  const query = `DELETE FROM [dbo].[RECEIPTS];`;
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

module.exports = {
  getReceipts: getReceipts,
  getReceiptByProperty: getReceiptByProperty,
  getReceiptByTenant: getReceiptByTenant,
  getReceiptById: getReceiptById,
  addReceipt: addReceipt,
  updateReceipt: updateReceipt,
  deleteReceiptById: deleteReceiptById,
  deleteReceiptByIdList: deleteReceiptByIdList,
  deleteReceiptByProperty: deleteReceiptByProperty,
  deleteReceiptByTenant: deleteReceiptByTenant,
  deleteAllReceipts: deleteAllReceipts,
  
}
