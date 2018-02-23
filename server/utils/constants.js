/**
 * All project constants
 * @module utils/constants
*/
const path = require('path');
module.exports = {
  messages: {
    info: {
      USER_CREATED: 'User created',
      USER_CONNECTED: 'Welcome ',
    },
    error: {
      INVALID_EMAIL: 'Your email must be in the format user@provider.region',
      INVALID_PASSWORD: 'Password must have at least 6 characters.',
      INVALID_NAME: 'You must send a name to sign up.',
      USER_EXISTS: 'This email was taken by another user.',
      INVALID_USER: 'The username or password you are logging in does not correspond to a valid user.',
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
  regex: {
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  },
  encryptation: {
    PASSWORD_HASH_KEY: process.env.PASSWORD_HASH_KEY,
    USER_DATA_ENCRYPTATION: process.env.USER_DATA_ENCRYPTATION,
    TOKEN_ENCRYPTATION: process.env.TOKEN_ENCRYPTATION
  }
};
