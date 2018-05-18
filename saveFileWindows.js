const sanitize = require("sanitize-filename")
const writeFile = require("./writeFileWindows")

module.exports = args => {
  const { name, dir, content } = args

  const defaultPath = window.require("path").format({
    dir,
    base: sanitize(name),
  })

  return new Promise(function(resolve, reject) {
    const remote = window.require("electron").remote
    const path = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      defaultPath,
    })

    if (!path) {
      reject(new Error("canceledByUser"))
    }

    writeFile({ name: path, content })
      .then(() => resolve({ path }))
      .catch(reject)
  })
}
