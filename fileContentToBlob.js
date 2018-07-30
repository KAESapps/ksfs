module.exports = fileContent =>
  new Blob([fileContent.data], { type: fileContent.type })
