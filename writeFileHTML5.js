const isString = require("lodash/isString")

module.exports = (fileEntry, data) => {
  // pas besoin de convertir les strings en binaire, normalement on peut les écrire directement
  // if (isString(data)) {
  //   // string to UInt8Array
  //   data = new TextEncoder().encode(data)
  // }
  if (data instanceof Uint8Array) {
    data = new Blob([data])
  }
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function (e) {
        resolve()
      }

      fileWriter.onerror = reject

      fileWriter.write(data)
    }, reject)
  })
}
