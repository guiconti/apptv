/**
 * Login on website
 * @module auth/signIn
*/

const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const createHash = require('../../utils/createHash');
const generateToken = require('../../utils/generateToken');
const constants = require('../../utils/constants');

/**
 * Try to log in a user
 * Get users info and check if authenticates
 *
 * @param {string} req.body.email - User sign in email
 * @param {string} req.body.password - User to sign in password
 * @return {json} - Redirect to main page logged in or show fail to authenticate message
 * @throws {json} - Throws a title and body with the error info
 * 
*/
module.exports = (req, res) => {
  let {email, password} = req.body;
  if (!validator.isValidEmail(email)) 
    return res.status(401).json({
      data: constants.messages.error.INVALID_EMAIL
    });
  if (!validator.isValidPassword(password)) 
    return res.status(401).json({
      data: constants.messages.error.INVALID_PASSWORD
    });

  email = email.trim().toLowerCase();

  database.user.findOne({
    where: {email: email},
    attributes:['id', 'password', 'name']
  })
    .then(user => {
      if (!user) 
        return res.status(401).json({
          data: constants.messages.error.INVALID_USER
        });
      if (user.oAuth) 
        return res.status(401).json({
          data: constants.messages.error.INVALID_USER
        });
      if (user.password !== createHash(password, constants.encryptation.PASSWORD_HASH_KEY))
        return res.status(401).json({
          data: constants.messages.error.INVALID_USER
        });

      //  Create token
      let userInfo = {
        email: user.email,
        id: user.id
      };
      let token = generateToken(userInfo);
      res.cookie('session', token);
      return res.status(200).json({
        data: constants.messages.info.USER_CONNECTED + user.name
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.message.error.UNEXPECTED
      });
    });
};
