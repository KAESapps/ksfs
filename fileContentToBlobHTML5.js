const fileToUint8Array = require("./utils/fileToUint8Array")
module.exports = fileContent =>
  fileToUint8Array(fileContent).then(
    arr => new Blob([arr], { type: fileContent.type })
  )
