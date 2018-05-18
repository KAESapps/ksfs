module.exports = fileContent =>
  new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onloadend = function() {
      const data = new Uint8Array(this.result)
      const blob = new Blob([data], { type: fileContent.type })
      resolve(blob)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(fileContent)
  })
