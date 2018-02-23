const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const signUp = require('./signUp');
const signIn = require('./signIn');
const generateApiKey = require('./generateApiKey');

//  Internal API
router.post('/create/api_key', generateApiKey);

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;