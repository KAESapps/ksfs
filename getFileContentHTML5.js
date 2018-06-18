const promisify = require("./utils/promisify");

module.exports = fileEntry => promisify(fileEntry, "file")();
