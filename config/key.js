if(process.env.NODE_ENV === 'prov') {
  module.exports = require('./prod');

} else {
  module.exports = require('./dev');
}