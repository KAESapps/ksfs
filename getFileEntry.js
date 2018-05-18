module.exports = {
  browser: require("./getFileEntryBrowser"),
  android: require("./getFileEntryAndroid"),
  windows: require("./getFileEntryBrowser"),
}[process.env.PLATFORM]
