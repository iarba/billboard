const Sequelize = require('sequelize')

const dbName = '';
const dbUser = '';
const dbPass = '';
const dbHost = '';
const dbType = '';

let sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbType,
  logging: console.log,
  operatorsAliases: false
});

let post = sequelize.define('information', {
  request: {type: Sequelize.STRING}
  reward: {type: Sequelize.STRING}
  contact: {type: Sequelize.STRING}
  realm: {type: Sequelize.STRING}     
});

const tables = { post: post };

function init(){
  return sequelize.authenticate()
  .then(() => {
    sequelize.sync();
  })
  .then(() => {
    console.log('database init success');
  });
}

module.exports = { tables: tables, init };
