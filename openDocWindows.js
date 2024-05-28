const getFileEntry = require("./getFileEntryWindows")
const writeFile = require("./writeFileWindows")
const sanitize = require("sanitize-filename")
const electronRequire = require("./utils/electronRequire")

module.exports = (args) => {
  const { name, data } = args

  return getFileEntry("temp", sanitize(name), { create: true }).then((path) =>
    writeFile(path, data).then(() => {
      electronRequire("electron").shell.openPath(path)
    })
  )
}
