module.exports = (fileEntry, dirEntry, name) =>
  new Promise((resolve, reject) => {
    fileEntry.moveTo(dirEntry, name, resolve, reject)
  })
