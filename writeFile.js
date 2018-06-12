const implementations = {
  browser: require("./writeFileHTML5"),
  android: require("./writeFileHTML5"),
  windows: require("./writeFileWindows"),
}
module.exports = implementations[process.env.PLATFORM]
