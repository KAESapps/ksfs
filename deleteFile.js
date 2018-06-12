// abstraction multiplateforme pour lister les fichiers d'un dossier

const implementations = {
  browser: require("./deleteFileHTML5"),
  android: require("./deleteFileHTML5"),
  windows: require("./deleteFileWindows"),
}
module.exports = implementations[process.env.PLATFORM || "browser"]
