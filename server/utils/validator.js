const logger = require('../../tools/logger');
const constants = require('./constants');

exports.isValidUsername = (username) => {
  try{
    return typeof username === 'string' && 
      username.trim().length >= constants.values.MIN_USERNAME_LENGTH && 
      username.trim().length <= constants.values.MAX_STRING_LENGTH;
  } catch(err) {
    logger.error(err);
    return false;
  }
};

exports.isValidEmail = (email) => {
  try{
    return typeof email === 'string' && 
      email.trim().length > 0 && 
      email.trim().length <= constants.values.MAX_STRING_LENGTH && 
      constants.regex.EMAIL.test(email);
  } catch(err) {
    logger.error(err);
    return false;
  }
};

exports.isValidPassword = (password) => {
  try{
    return typeof password === 'string' && 
      password.length >= constants.values.MIN_PASSWORD_LENGTH && 
      password.length <= constants.values.MAX_STRING_LENGTH;
  } catch(err) {
    logger.error(err);
    return false;
  }  
};

