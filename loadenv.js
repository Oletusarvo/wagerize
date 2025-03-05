const env = process.env.NODE_ENV;
const config =
  (env === 'development' && {
    path: './.env.local',
  }) ||
  undefined;

require('dotenv').config(config);
