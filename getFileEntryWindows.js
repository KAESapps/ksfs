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
      fsName === "default" ? "documents" : fsName
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

module.exports = (fsRootName, filePath, opts = {}) => {
  const { create = false, dir = false } = opts

  const fullPath = path.join(fsRoots(fsRootName), filePath)
  const dirPath = dir ? fullPath : path.dirname(fullPath)

  return Promise.resolve()
    .then(() => {
      if (create) return createDir(dirPath)
    })
    .then(() => fullPath)
}
