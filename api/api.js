const propertyController = require('./controllers/property-controller');
const tenantController = require('./controllers/tenant-controller');
const expenseController = require('./controllers/expense-controller');
const documentsController = require('./controllers/document-controller');

const multer = require('multer');
var express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

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
            response.status(201).json(result[0]);
        }
    })
})

router.route('/properties/:name').delete((request, response) => {

    propertyController.deleteProperty(request.params.name).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
        }
    })
})


router.route('/properties/:name?').delete((request, response) => {

    propertyController.deleteProperty(request.params.name).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
        }
    })
})

router.route('/properties').post((request, response) => {

    let property = { ...request.body }

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

router.route('/tenantsByName/:name').get((request, response) => {

    tenantController.getTenantByName(request.params.name).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
        }
    })
})

router.route('/tenants/:primaryName/:propertyName').delete((request, response) => {
    const params = request.params;
    tenantController.deleteTenant(params.primaryName, params.propertyName).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
        }
    })
})

router.route('/tenantsPurge/:propertyName').delete((request, response) => {
    const params = request.params;
    tenantController.purgeTenants(params.propertyName).then(result => {
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

    let tenant = { ...request.body }

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

router.route('/expenses/:propertyName/:year/:month?').get((request, response) => {
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

router.route('/expenses/:propertyName/:year?/:month?').delete((request, response) => {
    const params = request.params;
    expenseController.deleteExpense(params.propertyName, params.year, params.month).then(result => {
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
    expenseController.addExpense(expense).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
        }
    })
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

router.route('/documentsByName/:name').get((request, response) => {
    documentsController.getDocByName(request.params.name).then(result => {
        if (!result) {
            console.log("no data...");
            response.status(404).send('no data')
        } else {
            response.status(201).json(result[0]);
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
router.route('/documents/:idList').delete((request, response) => {
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




var port = process.env.PORT || 8090;
app.listen(port);
console.log('property API is runnning at ' + port);
