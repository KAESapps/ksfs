const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")
const path = electronRequire("path")

module.exports = filePath => {
  return new Promise(function(resolve, reject) {
    fs.unlink(filePath, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
