module.exports = dirEntry => {
  const dirReader = dirEntry.createReader()
  return new Promise((resolve, reject) =>
    dirReader.readEntries(
      fileEntries => resolve(fileEntries.map(f => f.name)),
      reject
    )
  )
}
