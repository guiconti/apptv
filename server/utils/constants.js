/**
 * All project constants
 * @module utils/constants
*/
const path = require('path');
module.exports = {
  messages: {
    info: {
      WALLET_REGISTERED: 'Wallet registered.',
    },
    error: {
      NO_ACCESS_TO_API_KEY: 'You need a valid API key to access this feature.',
      UNEXPECTED: 'An unexpected error occurred while trying to access your info. Please try again.',
    }
  },
  encryptation: {
    PASSWORD_HASH_KEY: process.env.PASSWORD_HASH_KEY,
  }
};
