const electronRequire = require("./utils/electronRequire")

module.exports = (dir) => {
  return new Promise(function (resolve, reject) {
    electronRequire("fs").readdir(dir, function (err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}
