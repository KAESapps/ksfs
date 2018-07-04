module.exports = dirEntry => {
  const dirReader = dirEntry.createReader()
  return new Promise((resolve, reject) => {
    let fullList = []

    // read entries retrieve only a number of results
    // call recursively to get all results
    const readNextEntries = () =>
      dirReader.readEntries(fileEntries => {
        if (fileEntries.length === 0) {
          resolve(fullList)
        } else {
          fullList = fullList.concat(fileEntries.map(f => f.name))
          readNextEntries()
        }
      }, reject)

    // start reading entries
    readNextEntries()
  })
}
