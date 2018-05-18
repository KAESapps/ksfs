const fsRoots = {
  default: window.PERSISTENT,
  temp: window.TEMPORARY,
}

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
  return new Promise((resolve, reject) => {
    ;(window.requestFileSystem || window.webkitRequestFileSystem)(
      fsRoots[fsRootName],
      0,
      function(fs) {
        const getFileEntry = () => {
          fs.root[dir ? "getDirectory" : "getFile"](
            path,
            opts,
            fileEntry => {
              console.debug("getFile: ok", path, fileEntry, fileEntry.toURL())
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
          return createDirHierarchy(fs.root, path.split("/").slice(0, -1)).then(
            getFileEntry
          )
        } else {
          getFileEntry()
        }
      },
      reject
    )
  })
}
