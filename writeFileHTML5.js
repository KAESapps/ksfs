module.exports = (fileEntry, fileBlob) => {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        resolve()
      }

      fileWriter.onerror = reject

      fileWriter.write(fileBlob)
    }, reject)
  })
}
