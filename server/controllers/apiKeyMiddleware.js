/**
 * Middleware to access restricted APIs
 * @module controllers/apiKeyMiddleware
*/

const apiKeyManager = require('../utils/apiKeyManager');
const decryptor = require('../utils/decryptor');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const database = require('../models/database');
const logger = require('../../tools/logger');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.API_KEY - User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
*/
module.exports = function (req, res, next){
  const api_key = req.headers["api-key"];
  if (!validator.isValidString(api_key))
    return res.status(401).json({
      data: constants.messages.error.NO_ACCESS_TO_API_KEY 
    });

  let userData = decryptor(api_key, constants.encryptation.API_KEY_ENCRYPTATION);
  database.api_user.findById(userData.id)
    .then(apiUser => {
      if (!apiUser)
        return res.status(401).json({
          data: constants.messages.error.NO_ACCESS_TO_API_KEY 
        });
      req.apiUser = apiUser;
      return next();
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    });
};