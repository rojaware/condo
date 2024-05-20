var config = require('../dbconfig');
const sql = require('mssql');

const BASE_SQL = `SELECT  [username]
,[password]
,CONVERT(char(10), createdOn ,126) as createdOn
,CONVERT(char(10), updatedOn ,126) as updatedOn
,[role], [businessNo] from USERS `;

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

async function getUsersByBusinessNo(businessNo) {
  const query = BASE_SQL + `  
  where businessNo = @businessNo`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('businessNo', sql.VarChar, businessNo)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getUsersByProperty(propertyName) {
  const query = BASE_SQL + `  u
  INNER JOIN properties p ON p.businessNo = u.businessNo
  where p.propertyName = @input_parameter`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('input_parameter', sql.VarChar, propertyName)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function findUser(user) {
  const query = BASE_SQL + ` WHERE username = @username AND password = @password`
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('username', sql.VarChar, user.username)
      .input('password', sql.VarChar, user.password)
      .query(query);
    return item.recordset[0];
  }
  catch (error) {
    console.log(error);
  }
}

// helper functions

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
/**
 * Check if this is unique username before calling this query
 * @param {*} body 
 * @returns 
 */
async function addUser(body) {
  const query = `
    If exists (select 1 from users where username = @username)
      SELECT 'duplicated' as RESULT
    else
      BEGIN
        INSERT INTO [dbo].[Users]
          ([username]
            ,[password]
            ,[createdOn]
            ,[updatedOn]
            ,[role]
            ,[businessNo])
        VALUES
            (@username
              ,@password
              ,CURRENT_TIMESTAMP
              ,CURRENT_TIMESTAMP
              ,@role
              ,@businessNo
          )
      END  `;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('username', sql.NVarChar, body.username)      
      .input('password', sql.NVarChar, body.password)
      .input('role', sql.NVarChar, body.role)
      .input('businessNo', sql.NVarChar, body.businessNo)
      .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}

async function updateUser(body) {
  const query = `UPDATE [dbo].[USERS]
        SET [password] = @password
            ,updatedOn = CURRENT_TIMESTAMP
            ,[role] = @role
            ,[businessNo] = @businessNo
        WHERE username = @username;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
        .input('username', sql.NVarChar, body.username)      
        .input('password', sql.NVarChar, body.password)   
        .input('role', sql.NVarChar, body.role)
        .input('businessNo', sql.NVarChar, body.businessNo)
        .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function deleteUser(username) {
  const query = `DELETE FROM [dbo].[USERS] WHERE username = @username;`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('username', sql.VarChar, username)
      .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function deleteUserByUsernameList(usernameList) {
  let statement = `DELETE FROM [dbo].[USERS] WHERE username in (@usernameList);`;

  try {
    statement = statement.replaceAll('@usernameList', usernameList);
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
async function deleteUserByBusinessNo(businessNo) {
  const query = `DELETE FROM [dbo].[USERS] WHERE businessNo = @businessNo;`;

  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('businessNo', sql.NVarChar, businessNo)
      .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function purge() {
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


async function search(payload) {
  const query = BASE_SQL + 
               `  WHERE businessNo = COALESCE(@businessNo, businessNo)
                  AND username = COALESCE(@username, username)`;
  const businessNo = payload.businessNo;
  const username = payload.username;                 
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('username', sql.VarChar, username)
      .input('businessNo', sql.VarChar, businessNo)
      .query(query);
    return item.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers: getUsers,
  getUsersByProperty: getUsersByProperty,
  getUsersByBusinessNo: getUsersByBusinessNo,  
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  deleteUserByUsernameList: deleteUserByUsernameList,
  deleteUserByBusinessNo: deleteUserByBusinessNo,
  purge: purge,
  search: search,
  findUser: findUser,
}
