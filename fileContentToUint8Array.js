const implementations = {
  browser: require("./fileContentToUint8ArrayHTML5"),
  android: require("./fileContentToUint8ArrayHTML5"),
  windows: require("./fileContentToUint8ArrayWindows"),
}
module.exports = implementations[process.env.PLATFORM]
