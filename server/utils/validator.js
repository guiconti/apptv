const logger = require('../../tools/logger');
const constants = require('./constants');

exports.isValidEmail = email => {
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

exports.isValidPassword = password => {
  try{
    return typeof password === 'string' && 
      password.length >= constants.values.MIN_PASSWORD_LENGTH && 
      password.length <= constants.values.MAX_STRING_LENGTH;
  } catch(err) {
    logger.error(err);
    return false;
  }  
};

exports.isValidString = stringToValidate => {
  try{
    return typeof stringToValidate === 'string' && 
      stringToValidate.trim().length >= 0 && 
      stringToValidate.trim().length <= constants.values.MAX_STRING_LENGTH;
  } catch(err) {
    logger.error(err);
    return false;
  }
};

