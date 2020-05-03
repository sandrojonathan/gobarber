import * as config from './config.json';

export default {
  jwt: {
    secret: config.secret,
    expiresIn: '1d',
  },
};
