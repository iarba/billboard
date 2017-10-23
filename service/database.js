const Sequelize = require('sequelize')

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPass = process.env.DBPASS;
const dbHost = process.env.DBHOST;
const dbType = process.env.DBTYPE;

let sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbType,
  logging: console.log,
  operatorsAliases: false
});

let post = sequelize.define('information', {
  request: {type: Sequelize.STRING},
  reward: {type: Sequelize.STRING},
  contact: {type: Sequelize.STRING},
  realm: {type: Sequelize.STRING}     
},{
  timestamps:false
});

const tables = { post: post };

function init(){
  return sequelize.authenticate()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    console.log('database init success');
  });
}

module.exports = { tables: tables, init };
