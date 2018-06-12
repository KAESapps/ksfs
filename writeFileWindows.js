const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")

module.exports = (fileDesc, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileDesc, data, function(err) {
      if (err) return reject(err)
      resolve()
    })
  })
}
