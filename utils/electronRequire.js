// return window.require if running in electron or fake function
module.exports = global.require || function () {}
