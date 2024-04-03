const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {

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
  
  router.route('/properties/:id').get((request, response) => {
  
    propertyController.getProperty(request.params.id).then(result => {
      if (!result) {
        console.log("no data...");
        response.status(404).send('no data')
      } else {
        result[0] = util.toArrayOfString(result[0], 'owner')
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
        response.status(201).json(result[0]);
      }
    })
  })
  
  
  router.route('/propertiesByName/:name?').delete((request, response) => {
  
    propertyController.deleteProperty(request.params.name).then(result => {
      if (!result) {
        console.log("no data...");
        response.status(404).send('no data')
      } else {
        result[0] = util.toArrayOfString(result[0], 'owner')
        response.status(201).json(result[0]);
      }
    })
  })
  
  router.route('/properties').post((request, response) => {
  
    let property = { ...request.body };
    property = util.toJoinedString(property, 'owner');
  
    propertyController.addProperty(property).then(result => {
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
    tenantController.addTenant(tenant).then(result => {
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
  
  router.route('/expenses').get((request, response) => {
    expenseController.getExpenses().then(result => {
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
        response.status(404).send('no data')
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
  
  
  
  

  app.use(router);
};

module.exports = routes;
