const memoize = require("lodash/memoize")
const cordovaReady = require("./utils/cordovaReady")

const getFsRoot = memoize(fsName => {
  if (fsName === "external") {
    return new Promise((resolve, reject) =>
      // demande la permission d'accéder au stockage externe, nécessaire pour le getExternalSdCardDetails (Android 6+)
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(
        function() {
          cordova.plugins.diagnostic.getExternalSdCardDetails(
            // onSuccess
            function(details) {
              if (details.length > 0) {
                details.forEach(function(detail) {
                  if (detail.canWrite && detail.type === "application") {
                    resolve(detail.filePath)
                  }
                })
              }
              // error if cannot find one
              reject()
            },
            reject // onError
          )
        },
        reject
      )
    )
  } else
    return Promise.resolve(
      {
        default: cordova.file.dataDirectory,
        home: cordova.file.externalRootDirectory,
        temp: cordova.file.externalCacheDirectory,
      }[fsName]
    )
})

const getDirectory = (rootDirEntry, dirName, opts) =>
  new Promise((resolve, reject) => {
    rootDirEntry.getDirectory(dirName, opts, resolve, reject)
  })

function createDirHierarchy(rootDirEntry, directories) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (directories[0] == "." || directories[0] == "") {
    directories = directories.slice(1)
  }
  if (directories.length === 0) {
    return Promise.resolve()
  }

  return getDirectory(rootDirEntry, directories[0], {
    create: true,
  }).then(function(dirEntry) {
    // Recursively add subdirectories
    return createDirHierarchy(dirEntry, directories.slice(1))
  })
}

module.exports = (fsRootName, path, opts = {}) => {
  const { create = false, dir = false } = opts
  return cordovaReady.then(() =>
    getFsRoot(fsRootName).then(
      fsRoot =>
        new Promise((resolve, reject) => {
          window.resolveLocalFileSystemURL(
            fsRoot,
            function(fs) {
              const getFileEntry = () => {
                fs[dir ? "getDirectory" : "getFile"](
                  path,
                  opts,
                  fileEntry => {
                    console.debug(
                      "getFile: ok",
                      path,
                      fileEntry,
                      fileEntry.toURL()
                    )
                    resolve(fileEntry)
                  },
                  err => {
                    if (err.name === "NotFoundError" || err.code === 1) {
                      console.debug("getFile: not found", path)
                      resolve(null)
                    } else {
                      console.error(err)
                      reject(err)
                    }
                  }
                )
              }

              if (create) {
                // create directory hierarchy then get file
                return createDirHierarchy(
                  fs,
                  path.split("/").slice(0, -1)
                ).then(getFileEntry)
              } else {
                getFileEntry()
              }
            },
            reject
          )
        })
    )
  )
}
