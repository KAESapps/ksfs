const openPdfBrowser = require("./openPdfBrowser")
const saveFileBrowser = require("./saveFileBrowser")

module.exports = args => {
  const { name, data, type } = args
  return type === "application/pdf"
    ? openPdfBrowser(args)
    : saveFileBrowser(args)
}
