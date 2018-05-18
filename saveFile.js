// abstraction multiplateforme pour enregistrer un fichier en demandant le chemin d'accès à l'utilisateur

const implementations = {
  browser: require("./saveFileBrowser"),
  android: require("./saveFileAndroid"),
  windows: require("./saveFileWindows"),
}
module.exports = implementations[process.env.PLATFORM || "browser"]
