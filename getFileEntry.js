module.exports = {
  browser: require("./getFileEntryBrowser"),
  android: require("./getFileEntryAndroid"),
  windows: require("./getFileEntryWindows"),
}[process.env.PLATFORM]
