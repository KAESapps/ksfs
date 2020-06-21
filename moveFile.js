const implementations = {
  browser: require("./moveFileHTML5"),
  android: require("./moveFileHTML5"),
  windows: null,
}
module.exports = implementations[process.env.PLATFORM]
