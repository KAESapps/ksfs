const getFileEntry = require("./getFileEntryWindows")
const writeFile = require("./writeFileWindows")
const sanitize = require("sanitize-filename")

module.exports = args => {
  const { name, content } = args

  return getFileEntry("temp", sanitize(name), { create: true }).then(path =>
    writeFile(path, content).then(() => {
      window.require("electron").remote.shell.openItem(path)
    })
  )
}
