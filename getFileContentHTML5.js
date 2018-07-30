const promisify = require("./utils/promisify")
const fileToUint8Array = require("./utils/fileToUint8Array")

module.exports = fileEntry =>
  promisify(fileEntry, "file")().then(file =>
    fileToUint8Array(file).then(uint8Arr => ({
      data: uint8Arr,
      type: file.type,
    }))
  )
