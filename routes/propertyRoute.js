const express = require('express');

const router = express.Router();
const cors = require('cors');

const {addProperty, getProperty, getPropertyById, updateProperty, deleteProperty} = require('../controllers/propertyController');

router.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

router.post('/add', addProperty);
router.get('/view', getProperty);
router.get('/view/:id', getPropertyById);
router.put('/update/:id', updateProperty);
router.delete('/delete/:id', deleteProperty);


module.exports = router;