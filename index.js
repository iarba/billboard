server = require('./service/server')
database = require('./service/database')

start = () => {
  try{
    database.init()
    .then(() => {
      return server.init();
    })
    .then(() => {
      return server.start();
    })
    .then(() => {
      console.log('Initialisation successful');
    })
  } catch (e) {
    console.error('Encountered error:');
    console.error(e);
    console.error('server will continue working despite error');
  }
}

start();
