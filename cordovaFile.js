const sanitize = require("sanitize-filename")

const getFs = (exports.getFs = fsType =>
  new Promise((resolve, reject) =>
    window.resolveLocalFileSystemURL(fsType, resolve, reject)
  ))

exports.getFile = args => {
  const { dir, name } = args
  return new Promise((resolve, reject) => {
    dir.getFile(
      sanitize(name),
      { create: true, exclusive: false },
      resolve,
      reject
    )
  })
}

function createDir(rootDirEntry, folders) {
  return new Promise((resolve, reject) => {
    rootDirEntry.getDirectory(
      folders[0],
      { create: true, exclusive: false },
      function(dirEntry) {
        // Recursively add the new subfolder (if we still have another to create).
        const foldersRest = folders.slice(1)
        if (foldersRest.length) {
          createDir(dirEntry, foldersRest)
            .then(resolve)
            .catch(reject)
        } else {
          resolve(dirEntry)
        }
      },
      reject
    )
  })
}

exports.getDir = absolutePath => {
  const splitPath = absolutePath.split(":/")
  const root = splitPath[0] + ":/"
  const dirs = splitPath[1].split("/")

  return getFs(root).then(root => {
    return createDir(root, dirs)
  })
}

exports.writeFile = args => {
  const { fileEntry, content, type } = args
  const blobContent = new Blob([content], { type })

  return new Promise(function(resolve, reject) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = resolve
      fileWriter.onerror = reject
      fileWriter.write(blobContent)
    })
  }).then(() => fileEntry)
}

exports.readFile = fileEntry => {
  return new Promise(fileEntry.file.bind(fileEntry)).then(
    file =>
      new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onloadend = function() {
          resolve(this.result)
        }
        reader.onerror = reject
        reader.readAsText(file)
      })
  )
}

exports.openFile = args => {
  const { path, type } = args
  return new Promise((success, error) => {
    cordova.plugins.fileOpener2.open(path, type, { error, success })
  })
}
