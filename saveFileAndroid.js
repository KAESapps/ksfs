const { getFile, getDir, writeFile } = require("./cordovaFile")
const joinPath = require("./joinPathAndroid")

module.exports = args => {
  const { name, content, type } = args
  return getDir(joinPath(cordova.file.externalRootDirectory, "apinfor"))
    .then(dir =>
      getFile({
        dir,
        name,
      })
    )
    .then(fileEntry =>
      writeFile({
        fileEntry,
        content,
        type,
      })
    )
}
