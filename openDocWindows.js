const getFileEntry = require("./getFileEntryWindows")
const writeFile = require("./writeFileWindows")
const sanitize = require("sanitize-filename")

module.exports = args => {
  const { name, data } = args

  return getFileEntry("temp", sanitize(name), { create: true }).then(path =>
    writeFile(path, data).then(() => {
      window.require("electron").remote.shell.openItem(path)
    })
  )
}
