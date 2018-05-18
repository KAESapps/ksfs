// return window.require if running in electron or fake function
module.exports = window.require || function() {}
