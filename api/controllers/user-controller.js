var config = require('../dbconfig');
const sql = require('mssql');

const BASE_SQL = `SELECT  [username]
,[password]
,[createdOn]
,[updatedOn]
,[role], [businessNo] from USERS`;

async function getUsers() {

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

async function getUsersByProperty(name) {
  const query = BASE_SQL + `  u
  INNER JOIN properties p ON p.businessNo = u.businessNo
  where p.name = @input_parameter`
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

async function getUserByTenant(name) {
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

async function search(payload) {
  const query = BASE_SQL + 
               `  WHERE tenantName = COALESCE(@tenantName, tenantName)
                  AND description LIKE '%' + COALESCE(@description, description) + '%'
                  AND year = COALESCE(@year, year)
                  AND type = COALESCE(@category, type)
                  AND propertyName = @propertyName`;
  const propertyName = payload.propertyName;
  const tenantName = payload.tenantName;
  const description = payload.description;
  const year = payload.year;                 
  const category = payload.category;                 
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('tenantName', sql.VarChar, tenantName)
      .input('description', sql.VarChar, description)
      .input('propertyName', sql.VarChar, propertyName)
      .input('category', sql.VarChar, category)
      .input('year', sql.Int, year)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
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

async function addUser(body) {
  const query = `
      INSERT INTO [dbo].[Users]
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
        SELECT  IDENT_CURRENT('Users') as id ;`;
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


async function updateUser(body) {
  const query = `UPDATE [dbo].[USERS]
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

async function deleteUserById(id) {
  const query = `DELETE FROM [dbo].[USERS] WHERE id = @id;`;

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
async function deleteUserByIdList(idList) {
  let statement = `DELETE FROM [dbo].[USERS] WHERE id in (@idList);`;

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
async function deleteUserByProperty(name) {
  const query = `DELETE FROM [dbo].[USERS] WHERE propertyName = @name;`;

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
async function deleteUserByTenant(name) {
  const query = `DELETE FROM [dbo].[USERS] WHERE tenantName = @name;`;

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

async function deleteAllUsers() {
  const query = `DELETE FROM [dbo].[USERS];`;
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
  getUsers: getUsers,
  getUsersByProperty: getUsersByProperty,
  getUserById: getUserById,
  findUser: findUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
  deleteUsersByIdList: deleteUsersByIdList,
  deleteUsersByProperty: deleteUsersByProperty,
  purge: purge,
}
