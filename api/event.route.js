var express = require("express");
var router = express.Router();
const multer = require('multer');

// Require controller modules.
const propertyController = require('./controllers/property-controller');
const tenantController = require('./controllers/tenant-controller');
const expenseController = require('./controllers/expense-controller');
const homeExpenseController = require('./controllers/home-expense-controller');
const documentsController = require('./controllers/document-controller');
const settingController = require('./controllers/setting-controller');
const mortgageController = require('./controllers/mortgage-controller');
const receiptController = require('./controllers/receipt-controller');
var util = require('./shared/util');

// Home page route.
router.get("/", function (req, res) {
  res.send("Condo Management API Server");
});

// // About page route.
// router.get("/about", function (req, res) {
//   res.send("About this Condo Management");
// });
router.use((request, response, next) => {
  console.log('ho ho...');
  next();
})

router.route('/properties').get((request, response) => {
  propertyController.getProperties().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      result[0] = util.toManyArrayOfString(result[0], 'owner')
      response.json(result[0]);
    }
  })
})

router.route('/properties/:name').get((request, response) => {

  propertyController.getProperty(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      result[0] = util.toArrayOfString(result[0], 'owner')
      response.status(201).json(result[0]);
    }
  })
})

router.route('/propertiesLeaseEnding/:days').get((request, response) => {

  propertyController.getPropertyLeaseEnding(request.params.days).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {      
      response.status(201).json(result[0]);
    }
  })
})

router.route('/properties/:id').delete((request, response) => {

  propertyController.deleteProperty(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      // result[0] = util.toArrayOfString(result[0], 'owner')
      response.status(201).json(result[0]);
    }
  })
})


router.route('/properties').post((request, response) => {

  let property = { ...request.body };
  property = util.toJoinedString(property, 'owner');

  propertyController.createProperty(property).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/properties').put((request, response) => {

  let property = { ...request.body }
  property = util.toJoinedString(property, 'owner');

  propertyController.updateProperty(property).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/propertiesLeaseDates').get((request, response) => {
  propertyController.getLeaseDates().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })
})
//############### tenants api... ########################

router.route('/tenants').get((request, response) => {

  tenantController.getTenants().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })
})

router.route('/tenantsByProperty/:name').get((request, response) => {

  tenantController.getTenantByProperty(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenantsById/:id').get((request, response) => {

  tenantController.getTenantById(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenants/:id').delete((request, response) => {
  const params = request.params;
  tenantController.deleteTenantById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenantsByProperty/:propertyName').delete((request, response) => {
  const params = request.params;
  tenantController.deleteTenantByProperty(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenants').delete((request, response) => {
  const params = request.params;
  tenantController.deleteAllTenants(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenants').post((request, response) => {
  let tenant = { ...request.body }
  tenantController.createTenant(tenant).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/tenants').put((request, response) => {

  let tenant = { ...request.body };
  tenantController.updateTenant(tenant).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
// ######### Expense API .... ############### 

router.route('/expensesByProperty/:propertyName').get((request, response) => {
  expenseController.getExpenses(request.params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/expenses/:id').get((request, response) => {
  const params = request.params;
  expenseController.getExpenseById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/expensesByPropertyYearMonth/:propertyName/:year/:month?').get((request, response) => {
  const params = request.params;
  expenseController.getExpenseByYearMonth(params.propertyName, params.year, params.month).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(200).json([])
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/expenses/:id').delete((request, response) => {
  const params = request.params;
  expenseController.deleteExpenseById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/expensesByPropertyYearMonth/:propertyName/:year?/:month?').delete((request, response) => {
  const params = request.params;
  expenseController.deleteExpenseByPropertyYearMonth(params.propertyName, params.year, params.month).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/expenses').delete((request, response) => {
  const params = request.params;
  expenseController.purge().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/expenses').post((request, response) => {
  let expense = { ...request.body }
  expenseController.insertExpense(expense).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/expensesBulk').post((request, response) => {
  let expenses = { ...request.body }
  expenseController.upsertBulk(expenses).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  }, 
  err => response.status(404).send('Error' + err.message))
})

router.route('/expenses').put((request, response) => {
  let expense = { ...request.body }
  expenseController.updateExpense(expense).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

// ######### Home Expense API .... ############### 

router.route('/homeExpensesByProperty/:propertyName').get((request, response) => {
  homeExpenseController.getExpenses(request.params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/homeExpenses/:id').get((request, response) => {
  const params = request.params;
  homeExpenseController.getExpenseById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/homeExpensesByPropertyYearMonth/:propertyName/:year/:month?').get((request, response) => {
  const params = request.params;
  homeExpenseController.getExpenseByYearMonth(params.propertyName, params.year, params.month).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(200).json([])
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/homeExpenses/:id').delete((request, response) => {
  const params = request.params;
  homeExpenseController.deleteExpenseById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/homeExpensesByPropertyYearMonth/:propertyName/:year?/:month?').delete((request, response) => {
  const params = request.params;
  homeExpenseController.deleteExpenseByPropertyYearMonth(params.propertyName, params.year, params.month).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/homeExpenses').delete((request, response) => {
  const params = request.params;
  homeExpenseController.purge().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/homeExpenses').post((request, response) => {
  let expense = { ...request.body }
  homeExpenseController.insertExpense(expense).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/homeExpensesBulk').post((request, response) => {
  let expenses = { ...request.body }
  homeExpenseController.upsertBulk(expenses).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  }, 
  err => response.status(404).send('Error' + err.message))
})

router.route('/homeExpenses').put((request, response) => {
  let expense = { ...request.body }
  homeExpenseController.updateExpense(expense).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

//############### Documents API ########################

router.route('/documents').get((request, response) => {
  documentsController.getDocs().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })
})

router.route('/documentsByPropertyOrTenant/:name').get((request, response) => {
  console.log(' request.params.name => ' + request.params.name)
  documentsController.getDocsByPropertyOrTenant(request.params.name).then(result => {
    if (!result) {
      console.log("documentsByPropertyOrTenant > no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/documentsById/:id').get((request, response) => {
  documentsController.getDocById(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      const blobData = result[0].data;
      response.status(201).send(blobData);
    }
  })
})

// Configure Multer for file uploads
// Set up Multer with memory storage to hook up buffer into table...
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/documents').post(upload.single('file'), (request, response) => {
  try {
    let document = request.body;
    // Access the uploaded file buffer
    const fileBuffer = request.file.buffer;
    document.name = request.file.originalname;
    documentsController.addDoc(document, fileBuffer).then(result => {
      if (!result) {
        console.log("no data...");
        response.status(404).send('no data')
      } else {
        response.status(201).json(result[0]);
      }
    })
  } catch (error) {

    console.error('Error uploading file:', error);
    response.status(500).send('Error uploading file.');
  }
})

/**
 * Delete documents by tenant name or property name. 
 * @param {*} name 
 * @returns 
 */
router.route('/documentsByPropertyOrTenant/:propertyNameOrTenantName').delete((request, response) => {
  const params = request.params;
  documentsController.deleteDocsByName(params.propertyNameOrTenantName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

/**
 * delete a doc by id
 */
router.route('/documents/:id').delete((request, response) => {
  const params = request.params;
  documentsController.deleteDoc(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
/**
 * delete docs by id list
 */
router.route('/documentsByIdList/:idList').delete((request, response) => {
  const params = request.params;
  documentsController.deleteDocByIdList(params.idList).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/documents').delete((request, response) => {
  documentsController.deleteAllDocs().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/documents').put((request, response) => {

  let tenant = { ...request.body }

  documentsController.updateDoc(tenant).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

/******************** Settings Controller API *****************/

router.route('/settings').get((request, response) => {

  settingController.getSettings().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })
})

router.route('/settingsByName/:name').get((request, response) => {

  settingController.getSettingByName(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/settingsById/:id').get((request, response) => {

  settingController.getSettingById(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/settings').post((request, response) => {
  let setting = { ...request.body }
  settingController.addSetting(setting).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/settings/:id').delete((request, response) => {
  const params = request.params;
  settingController.deleteSettingById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/settingsByIdList/:idList').delete((request, response) => {
  const params = request.params;
  settingController.deleteSettingByIdList(params.idList).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/settingsByName/:name').delete((request, response) => {
  const params = request.params;
  settingController.deleteSettingByName(params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/settings').delete((request, response) => {
  const params = request.params;
  settingController.deleteAllSettings(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})


router.route('/settings').put((request, response) => {

  let setting = { ...request.body };
  settingController.updateSetting(setting).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/settingsAlert').get((request, response) => {

  settingController.getSettingForAlert().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result);
    }
  })
})

router.route('/settingsLandlord/:owner').get((request, response) => {
  settingController.getLandlordContact(request.params.owner).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result);
    }
  })
})
/***************** End of Settings API */

//############### Mortgages api... ########################

router.route('/mortgages').get((request, response) => {

  mortgageController.getMortgages().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })  
})
router.route('/mortgagesByProperty/:name').get((request, response) => {

  mortgageController.getMortgageByProperty(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/mortgagesById/:id').get((request, response) => {

  mortgageController.getMortgageById(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/mortgages').post((request, response) => {
  let mortgage = { ...request.body }
  mortgageController.createMortgage(mortgage).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/mortgages/:id').delete((request, response) => {
  const params = request.params;
  mortgageController.deleteMortgageById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/mortgagesByProperty/:propertyName').delete((request, response) => {
  const params = request.params;
  mortgageController.deleteMortgageByProperty(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/mortgages').delete((request, response) => {
  const params = request.params;
  mortgageController.deleteAllMortgages(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/mortgages').put((request, response) => {

  let mortgage = { ...request.body };
  mortgageController.updateMortgage(mortgage).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

//############### END of mortgages api... ########################/
//############### RECEIPTS API... ################################/

router.route('/receipts').get((request, response) => {

  receiptController.getReceipts().then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404)
      response.send('no data')
    } else {
      response.json(result[0]);
    }
  })
})

router.route('/receiptsByProperty/:name').get((request, response) => {

  receiptController.getReceiptByProperty(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/receiptsByTenant/:name').get((request, response) => {

  receiptController.getReceiptByTenant(request.params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/receiptsSearch').post((request, response) => {
  let payload = { ...request.body }
  
  receiptController.search(payload).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/receiptsById/:id').get((request, response) => {

  receiptController.getReceiptById(request.params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/receipts').post((request, response) => {
  let receipt = { ...request.body }
  receiptController.addReceipt(receipt).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/receipts').put((request, response) => {

  let receipt = { ...request.body };
  receiptController.updateReceipt(receipt).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/receipts/:id').delete((request, response) => {
  const params = request.params;
  receiptController.deleteReceiptById(params.id).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})

router.route('/receiptsByIdList/:idList').delete((request, response) => {
  const params = request.params;
  receiptController.deleteReceiptByIdList(params.idList).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/receiptsByProperty/:name').delete((request, response) => {
  const params = request.params;
  receiptController.deleteReceiptByProperty(params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/receiptsByProperty/:name').delete((request, response) => {
  const params = request.params;
  receiptController.deleteReceiptByTenant(params.name).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})
router.route('/receipts').delete((request, response) => {
  const params = request.params;
  receiptController.deleteAllReceipts(params.propertyName).then(result => {
    if (!result) {
      console.log("no data...");
      response.status(404).send('no data')
    } else {
      response.status(201).json(result[0]);
    }
  })
})


/***************** End of Receipts API */



module.exports = router;