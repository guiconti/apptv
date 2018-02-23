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
      INVALID_USERNAME: 'Username must have at least 4 characters.',
      INVALID_EMAIL: 'Your email must be in the format user@provider.region',
      INVALID_PASSWORD: 'Password must have at least 6 characters.',
      NO_ACCESS_TO_API_KEY: 'You need a valid API key to access this feature.',
      UNEXPECTED: 'An unexpected error occurred while trying to access your info. Please try again.',
    }
  },
  values: {
    MIN_USERNAME_LENGTH: 4,
    MIN_PASSWORD_LENGTH: 6,
    MAX_STRING_LENGTH: 255,
    MIN_NAME_LENGTH: 1,
    MIN_DESCRIPTION_LENGTH: 4,
    TOKEN_EXPIRATION_TIME: (60 * 60 * 24 * 30)
  },
  encryptation: {
    PASSWORD_HASH_KEY: process.env.PASSWORD_HASH_KEY,
  }
};
