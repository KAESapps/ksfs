module.exports = fileEntry =>
  new Promise((resolve, reject) =>
    fileEntry.remove(
      resolve, // ok
      reject, // error deleting file
      resolve // file does not exist
    )
  )
