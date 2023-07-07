const sanitize = require("sanitize-filename")
const writeFile = require("./writeFileWindows")
const electronRequire = require("./utils/electronRequire")

module.exports = (args) => {
  const { name, dir, data } = args

  const defaultPath = electronRequire("path").format({
    dir,
    base: sanitize(name),
  })

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
