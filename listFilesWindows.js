module.exports = (dir) => {
  return new Promise(function(resolve, reject) {
    window.require('fs').readdir(dir, function(err, files) {
      if (err) {
        reject(err)
      }
      else {
        resolve(files)
      }
    })
  })
}
