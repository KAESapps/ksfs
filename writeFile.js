// abstraction multiplateforme pour enregistrer un fichier en demandant le chemin d'accès à l'utilisateur

const implementations = {
  browser: require("./writeFileHTML5"),
  android: require("./writeFileHTML5"),
  // TODO: harmoniser les APIs, writeFileWindows n'a pas la même API pour le moment
}
module.exports = implementations[process.env.PLATFORM || "browser"]
