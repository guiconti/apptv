/**
 * Decrypt token module
 * @module utils/decryptToken
*/

const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const constants = require('./constants');
const logger = require('../../../tools/logger');

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
 * Decrypt a encrypted user token
 * Takes a token and decrypts it to the user`s data
 *
 * @param {string} token - Users`s token
 * @return {object} - Returns all the user`s data inside the token
 * @throws {integer} - Returns -1 that indicates a fail
 * 
*/
exports.decryptToken = (token) => {
  try {
    if (!token) return -1;

    let decodedJWT = jwt.verify(token, tokenSecretKey);
    let tokenInBytes = crypto.AES.decrypt(decodedJWT.token, dataSecretKey);
    let tokenData = JSON.parse(tokenInBytes.toString(crypto.enc.Utf8));

    return tokenData;
  } catch (err) {
    logger.error(err);
    return -1;
  }        
};