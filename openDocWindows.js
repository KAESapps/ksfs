const writeFile = require("./writeFileWindows")
const sanitize = require("sanitize-filename")

module.exports = args => {
  const { name, content } = args

  const getPath = window.require("electron").remote.app.getPath
  const dir = getPath("temp")

  return writeFile({ name: sanitize(name), content, dir }).then(({ path }) => {
    window.require("electron").remote.shell.openItem(path)
  })
}
