const sanitize = require("sanitize-filename")
const writeFile = require("./writeFileWindows")
const electronRequire = require("./utils/electronRequire")

module.exports = (args) => {
  const { name, dir, data } = args

  const defaultPath = electronRequire("path").format({
    dir,
    base: sanitize(name),
  })

  const dialog = electronRequire("@electron/remote").dialog

  return dialog
    .showSaveDialog({
      defaultPath,
    })
    .then(({ canceled, filePath }) => {
      if (canceled || !filePath) {
        throw new Error("canceledByUser")
      }

      return writeFile(filePath, data).then(() => filePath)
    })
}
