const implementations = {
  browser: require("./downloadFileHTML5"),
  android: require("./downloadFileHTML5"),
  windows: null,
}
module.exports = implementations[process.env.PLATFORM]
