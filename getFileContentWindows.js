const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")
const mime = require("mime/lite")

module.exports = fileEntry => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileEntry, function(err, data) {
      if (err) return reject(err)
      resolve({
        data: new Uint8Array(data),
        type: mime.getType(fileEntry),
      })
    })
  })
}
