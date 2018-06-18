const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")

module.exports = fileEntry => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileEntry, function(err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
