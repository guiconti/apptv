/**
 * Module to encrypt data
 * @module utils/encryptor
*/
const crypto = require('crypto-js');
const constants = require('./constants');
const logger = require('../../tools/logger');

/**
 * Encrypt a decrypted data
 *
 * @param {string} decryptedData - Data to be encrypted
 * @param {string} key - Key to encrypt the data
 * @return {object} - Returns the data encrypted
 * @throws {object} - Returns -1 that indicates a fail
 * 
*/
module.exports = (decryptedData, key) => {
  try {
    if(!decryptedData || !key) return -1;
    let hashedData = crypto.HmacSHA256(decryptedData, key);
    return hashedData;  
  } catch (err){
    logger.error(err);
    return err;
  }   
};
