const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")
const path = electronRequire("path")

const electron = electronRequire("electron")

const fsRoots = (fsName) => {
  if (fsName === "external") {
    return Promise.resolve("D:\\")
  } else {
    fsName =
      fsName === ("privateAppData" || fsName === "publicAppData")
        ? "userData"
        : fsName
    //ancienne implmémentation
    if (!electron.ipcRenderer.invoke) {
      return electron.remote.app.getPath(fsName)
    }
    return electron.ipcRenderer.invoke("getPath", fsName)
  }
}

const createDir = (dir) =>
  new Promise(function (resolve, reject) {
    if (!dir) return resolve()
    fs.mkdir(dir, { recursive: true }, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })

const fileExists = (path) =>
  new Promise((resolve) =>
    fs.access(path, fs.constants.F_OK, (err) =>
      err ? resolve(false) : resolve(true)
    )
  )

module.exports = (fsRootName, filePath, opts = {}) => {
  const { create = false, dir = false } = opts

  return fsRoots(fsRootName).then((fsRootPath) => {
    const fullPath = path.join(fsRootPath, filePath)
    const dirPath = dir ? fullPath : path.dirname(fullPath)

    return create
      ? createDir(dirPath).then(() => fullPath)
      : fileExists(fullPath).then((exists) => (exists ? fullPath : null))
  })
}
