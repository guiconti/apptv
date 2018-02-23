/**
 * Create users module
 * @module signUp
*/

const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const createHash = require('../../utils/createHash');
const generateToken = require('../../utils/generateToken');
const constants = require('../../utils/constants');

/**
 * Create a new user API
 * Get users info and create a new user on the database
 *
 * @param {string} req.body.email - User to be created email
 * @param {string} req.body.password - User to be created password
 * @param {string} req.body.name - User to be created name
 * @return {json} - Returns a success message to the user
 * @throws {json} - Throws a title and body with the error info
 * 
*/
module.exports = (req, res) => {
  let {email, password, name} = req.body;
  if (!validator.isValidEmail(email)) 
    return res.status(400).json({
      data: constants.messages.error.INVALID_EMAIL
    });
  if (!validator.isValidPassword(password)) 
    return res.status(400).json({
      data: constants.messages.error.INVALID_PASSWORD
    });
  if (!validator.isValidString(name)) 
    return res.status(400).json({
      data: constants.messages.error.INVALID_NAME
    });
  let userInfo = {
    email: email.trim().toLowerCase(),
    password: createHash(password, constants.encryptation.PASSWORD_HASH_KEY),
    name: name.trim()
  };

  if (userInfo.password == -1) 
    return res.status(500).json({
      data: constants.messages.error.UNEXPECTED
    });

  let newUser = database.user.build(userInfo);
  newUser
    .save()
    .then(createdUser => {
      //  Create token
      let userData = {
        username: createdUser.username,
        id: createdUser.id
      };
      let token = generateToken(userData);
      res.cookie('session', token);
      return res.status(201).json({
        data: constants.messages.info.USER_CREATED
      });
    })
    .catch(database.Sequelize.UniqueConstraintError, err => {
      return res.status(400).json({
        data: constants.messages.error.USER_EXISTS
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    });
};
