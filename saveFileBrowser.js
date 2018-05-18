const sanitize = require("sanitize-filename")

const saveAs = require("file-saver").saveAs

module.exports = args => {
  const { name, content, type } = args
  const fileName = sanitize(name)
  const blobContent = new Blob([content], { type })

  return saveAs(blobContent, fileName)
}
