const implementations = {
  browser: require("./getFileMetadataHTML5"),
  android: require("./getFileMetadataHTML5"),
  windows: null,
}
module.exports = implementations[process.env.PLATFORM]
