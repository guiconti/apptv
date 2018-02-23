/**
 * Create users module
 * @module signUp
*/

const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../utils/validator');
const createHash = require('../../utils/createHash');
const tokenManager = require('../utils/tokenManager');
const constants = require('../utils/constants');

/**
 * Create a new user API
 * Get users info and create a new user on the database
 *
 * @param {string} req.body.username - User to be created username
 * @param {string} req.body.email - User to be created email
 * @param {string} req.body.password - User to be created password
 * @return {json} - Returns a success message to the user
 * @throws {json} - Throws a title and body with the error info
 * 
*/
module.exports = (req, res) => {
  let {username, email, password} = req.body;
  if (!validator.isValidUsername(username)) 
    return res.status(400).json({
      msg: constants.message.error.INVALID_USERNAME
    });
  if (!validator.isValidEmail(email)) 
    return res.status(400).json({
      msg: constants.message.error.INVALID_EMAIL
    });
  if (!validator.isValidPassword(password)) 
    return res.status(400).json({
      msg: constants.message.error.INVALID_PASSWORD
    });

  let userInfo = {
    username: username.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: encryptation.passwordEncrypt(password)
  };

  if (userInfo.password == -1) 
    return res.status(500).json({
      msg: constants.message.error.UNEXPECTED
    });

  database.user.findOne({
    where: {
      $or: [{username: userInfo.username}, {email: userInfo.email}]
    }
  }).then(existingUser => {
    if (existingUser) 
      return res.status(400).json({
        msg: constants.message.error.USER_EXISTS
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
        let token = tokenManager.generateToken(userData);
        res.cookie('session', token);
        return res.status(201).json({
          msg: constants.message.info.USER_CREATED
        });
      })
      .catch(err => {
        logger.error(err);
        return res.status(500).json({
          msg: constants.message.error.UNEXPECTED
        });
      });
  });
};
