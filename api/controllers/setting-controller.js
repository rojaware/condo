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

async function getSettingForAlert() {
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .query("SELECT * from LABELS where name = 'BATCH'");
    return toAlertObject(item.recordsets);
  }
  catch (error) {
    console.log(error);
  }
}

function toAlertObject(recordsets) {
  let alert = {};
  
  recordsets[0].forEach(item => {
    const expr = item.viewValue;
    switch (expr) {
      case 'Hour':
        alert.hour = item.value;
        break;
      case 'Minute':
        alert.minute = item.value;
        break;
      case 'Days':
        alert.days = item.value;
        break;
      case 'Subscriber':
        alert.subscriber = item.value;
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }    
  });
  return alert;
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
        ,[viewValue]
        ,[hint])
    VALUES
        (@name
        ,@value
        ,@viewValue, @hint);
        SELECT  IDENT_CURRENT('labels') as id ;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('name', sql.NVarChar, body.name)
      .input('value', sql.NVarChar, body.value)
      .input('viewValue', sql.NVarChar, body.viewValue)
      .input('hint', sql.NVarChar, body.hint)
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
async function deleteSettingByIdList(idList) {
  const query = `DELETE FROM [dbo].[labels] WHERE id in (@idList);`;

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
            ,[hint] = @hint
        WHERE id = @id;`;
  try {
    let pool = await sql.connect(config);
    let item = await pool.request()
      .input('name', sql.NVarChar, body.name)
      .input('value', sql.NVarChar, body.value)
      .input('viewValue', sql.NVarChar, body.viewValue)
      .input('id', sql.Int, body.id)
      .input('hint', sql.NVarChar, body.hint)
      .query(query);
    return item.rowsAffected;
  }
  catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

module.exports = {
  getSettings: getSettings,
  getSettingByName: getSettingByName,
  addSetting: addSetting,
  deleteSettingById: deleteSettingById,
  deleteSettingByName: deleteSettingByName,
  deleteAllSettings: deleteAllSettings,
  updateSetting: updateSetting,
  getSettingById: getSettingById,
  deleteSettingByIdList: deleteSettingByIdList,
  getSettingForAlert: getSettingForAlert,
}
