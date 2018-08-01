const sanitize = require("sanitize-filename")

const saveAs = require("file-saver").saveAs

module.exports = args => {
  const { name, data, type } = args
  const fileName = sanitize(name)
  const blobContent = new Blob([data], { type })

  return saveAs(blobContent, fileName)
}
