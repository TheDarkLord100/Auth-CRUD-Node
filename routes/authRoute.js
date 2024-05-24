const express = require('express');

const router = express.Router();
const cors = require('cors');

const { test, registerNewUser, loginUser, getSeller} = require('../controllers/authController');

router.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

router.get('/', test);
router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post('/getSeller', getSeller);

module.exports = router;