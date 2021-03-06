/**
 * Module to encrypt data
 * @module utils/encryptor
 */
const crypto = require('crypto-js');
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
    if(!decryptedData) return -1;
    let encryptedData = crypto.AES.encrypt(JSON.stringify(decryptedData), key).toString();
    return encryptedData;  
  } catch (err){
    logger.error(err);
    return -1;
  }   
};