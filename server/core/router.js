const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const auth = require('../controllers/auth/router');

router.use('/auth', auth);

router.get('/', (req, res) => {
  res.status(200).json({
    data: 'Hi'
  });
});

module.exports = router;