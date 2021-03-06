const getFileContent = require("./getFileContent")
const getFileEntry = require("./getFileEntry")
const writeFile = require("./writeFile")

module.exports = ({ name, data, type }) =>
  getFileEntry("temp", name, { create: true }).then(fileEntry =>
    writeFile(fileEntry, data).then(() =>
      (type
        ? Promise.resolve(type)
        : getFileContent(fileEntry).then(file => file.type)
      ).then(
        // open file
        type =>
          new Promise((success, error) => {
            cordova.plugins.fileOpener2.open(fileEntry.toInternalURL(), type, {
              error,
              success,
            })
          })
      )
    )
  )
