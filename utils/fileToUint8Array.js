module.exports = file =>
  new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onloadend = function() {
      resolve(new Uint8Array(this.result))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
