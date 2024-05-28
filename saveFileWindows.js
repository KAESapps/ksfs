const sanitize = require("sanitize-filename")
const writeFile = require("./writeFileWindows")
const electronRequire = require("./utils/electronRequire")

module.exports = (args) => {
  const { name, dir, data } = args

  const defaultPath = electronRequire("path").format({
    dir,
    base: sanitize(name),
  })

  let dialog
  try {
    dialog = electronRequire("@electron/remote").dialog
  } catch (err) {
    console.debug("using old electron saveFile implementation")
  }

  //ancienne implémentation electron
  if (!dialog) {
    return new Promise(function (resolve, reject) {
      const remote = electronRequire("electron").remote
      const path = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
        defaultPath,
      })

      if (!path) {
        reject(new Error("canceledByUser"))
      }

      writeFile(path, data)
        .then(() => resolve(path))
        .catch(reject)
    })
  }

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
