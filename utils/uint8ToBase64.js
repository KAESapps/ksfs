module.exports = function uint8ToBase64(buffer) {
  var binary = ""
  var len = buffer.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  return window.btoa(binary)
}
