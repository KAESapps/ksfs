const uint8ToBase64 = require("./utils/uint8ToBase64")

module.exports = fileContent =>
  `data:${fileContent.type};base64,${uint8ToBase64(fileContent.data)}`
