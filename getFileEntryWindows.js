const electronRequire = require("./utils/electronRequire")
const fs = electronRequire("fs")
const path = electronRequire("path")
const mkdirp = electronRequire("mkdirp")

const electron = electronRequire("electron")

const fsRoots = fsName => {
  if (fsName === "external") {
    return "D:\\"
  } else
    return electron.remote.app.getPath(
      fsName === "privateAppData" || fsName === "publicAppData"
        ? "userData"
        : fsName
    )
}

const createDir = dir =>
  new Promise(function(resolve, reject) {
    if (!dir) return resolve()
    mkdirp(dir, function(err) {
      if (err) return reject(err)
      resolve()
    })
  })

const fileExists = path =>
  new Promise(resolve =>
    fs.access(
      path,
      fs.constants.F_OK,
      err => (err ? resolve(false) : resolve(true))
    )
  )

module.exports = (fsRootName, filePath, opts = {}) => {
  const { create = false, dir = false } = opts

  const fullPath = path.join(fsRoots(fsRootName), filePath)
  const dirPath = dir ? fullPath : path.dirname(fullPath)

  return create
    ? createDir(dirPath).then(() => fullPath)
    : fileExists(fullPath).then(exists => (exists ? fullPath : null))
}
