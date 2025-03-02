const env = process.env.NODE_ENV;
console.log(env);
const config = env === 'development' && {
  path: './.env.local',
};

require('dotenv').config({
  path: './.env.local',
});
