// abstraction multiplateforme pour ouvrir un pdf ou xls ou autre document dans une appli tierce

const implementations = {
  browser: require("./saveFileBrowser"),
  android: require("./openDocAndroid"),
  windows: require("./openDocWindows"),
}
module.exports = implementations[process.env.PLATFORM || "browser"]
