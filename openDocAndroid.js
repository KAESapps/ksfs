const { openFile } = require("./cordovaFile")
const getFileContent = require("./getFileContent")
const getFileEntry = require("./getFileEntry")
const writeFile = require("./writeFile")

module.exports = ({ name, content, type }) => {
  if (!(content instanceof Blob || content instanceof File)) {
    content = new Blob([content], { type })
  }
  return getFileEntry("temp", name, { create: true })
    .then(fileEntry => writeFile(fileEntry, content).then(() => fileEntry))
    .then(fileEntry =>
      (type
        ? Promise.resolve(type)
        : getFileContent(fileEntry).then(file => file.type)
      ).then(type =>
        openFile({
          path: fileEntry.toInternalURL(),
          type,
        })
      )
    )
}
