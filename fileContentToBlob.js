const implementations = {
  browser: require("./fileContentToBlobHTML5"),
  android: require("./fileContentToBlobHTML5"),
  windows: require("./fileContentToBlobWindows"),
}
module.exports = implementations[process.env.PLATFORM]
