const implementations = {
  browser: require("./writeFileHTML5"),
  android: require("./writeFileAndroid"),
  windows: require("./writeFileWindows"),
}
module.exports = implementations[process.env.PLATFORM]
