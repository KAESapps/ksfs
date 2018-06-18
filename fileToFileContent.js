const identityPromise = f => Promise.resolve(f)

const implementations = {
  browser: identityPromise,
  android: identityPromise,
  windows: require("./utils/fileToUint8Array"),
}
module.exports = implementations[process.env.PLATFORM]
