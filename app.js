const {create} = require('./create')

module.exports = app => {
  app.addSingleton('bog', create)
}
