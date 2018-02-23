const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const signUp = require('./signup');

router.post('/signup', signUp);

module.exports = router;