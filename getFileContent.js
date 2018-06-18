const implementations = {
  browser: require("./getFileContentHTML5"),
  android: require("./getFileContentHTML5"),
  windows: require("./getFileContentWindows"),
}
module.exports = implementations[process.env.PLATFORM]
