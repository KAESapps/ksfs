const isString = require("lodash/isString")

module.exports = (fileEntry, data) => {
  if (isString(data)) {
    data = new Blob([new TextEncoder().encode(data)])
  }
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        resolve()
      }

      fileWriter.onerror = reject

      fileWriter.write(data)
    }, reject)
  })
}
