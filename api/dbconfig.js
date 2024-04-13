const  config = {
    user:  'sa', // sql user
    password:  '1', //sql user password
    server:  '127.0.0.1', // if it does not work try- localhost
    database:  'condo_db', // 'demo_db', //
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false,
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'  // SQL Server instance name,      
    },
    trustServerCertificate: true,
    port:  1433
  }
  
  module.exports = config;
  