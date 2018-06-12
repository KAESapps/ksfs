// abstraction multiplateforme pour lister les fichiers d'un dossier

const implementations = {
  browser: require("./listFilesHTML5"),
  android: require("./listFilesHTML5"),
  windows: require("./listFilesWindows"),
}
module.exports = implementations[process.env.PLATFORM || "browser"]
