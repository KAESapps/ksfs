const electronRequire = require('./electronRequire')
const path = electronRequire('path')

module.exports = function(path1, path2) {
  return path.join(path1, path2)
}
