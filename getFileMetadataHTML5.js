module.exports = (fileEntry) =>
  new Promise((resolve, reject) => {
    fileEntry.getMetadata(resolve, reject)
  })
