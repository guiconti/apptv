/**
 * Encrypt token module
 * @module utils/decryptToken
*/

const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const constants = require('./constants');
const logger = require('../../tools/logger');

/**
 * User's data encrypt and decrypt key
 * @readonly
 * @const {string}
*/
const dataSecretKey = constants.encryptation.USER_DATA_ENCRYPTATION;

/**
 * Token encrypt and decrypt key
 * @readonly
 * @const {string}
*/
const tokenSecretKey = constants.encryptation.TOKEN_ENCRYPTATION;

/**
 * Generates a encrypted token
 * Receive user's information and generate a new token
 *
 * @param {object} userData - User data
 * @return {string} - Returns a encryptated hash that will be used as the user`s token
 * @throws {integer} - Returns -1 that indicates a fail
 * 
*/
module.exports = (userData) => {
  try {
    if(!userData) return -1;

    let encryptedUserData = crypto.AES.encrypt(JSON.stringify(userData), dataSecretKey).toString();
    // Get our token encrypted data 
    let token = jwt.sign({
        token: encryptedUserData
    }, tokenSecretKey, {
      expiresIn: constants.values.TOKEN_EXPIRATION_TIME
    });

    return token;  

  } catch (err){
    logger.error(err);
    return -1;
  }   
};