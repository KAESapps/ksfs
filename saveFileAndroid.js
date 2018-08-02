const getFileEntryAndroid = require("./getFileEntryAndroid")

module.exports = args => {
  const { name, data } = args
  return getFileEntry("home", name, { create: true }).then(fileEntry =>
    writeFile(fileEntry, data)
  )
}
