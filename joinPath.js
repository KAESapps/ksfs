// abstraction multiplateforme pour fusionner deux fragments de chemin

const implementations = {
  browser: require('./joinPathBrowser'),
  android: require('./joinPathAndroid'),
  windows: require('./joinPathWindows'),
}
module.exports = implementations[process.env.PLATFORM || 'browser']
