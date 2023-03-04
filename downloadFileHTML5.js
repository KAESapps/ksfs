//télécharge un fichier en le streamant dans un fichier temporaire
// puis le déplace à l'emplacement voulu
// et renvoi le fileEntry de l'emplacement final
const writeBatchSize = 1024 * 1024 * 1 // 1 MB
const moveFile = require("./moveFile")
const getFileEntry = require("./getFileEntry")
const deleteFile = require("./deleteFile")
const createFileWriter = (fileEntry) =>
  new Promise((resolve, reject) => {
    fileEntry.createWriter(resolve, reject)
  })

module.exports = (url, dirEntry, name, { onProgress } = {}) => {
  let aborted = false
  let tempFileEntry
  let fileWriter
  const downloadHandler = getFileEntry("temp", name, { create: true })
    .then((fe) => {
      tempFileEntry = fe
      return deleteFile(tempFileEntry) // s'assure qu'il n'y a pas de fichier partiellement écrit
    })
    .then(() => {
      return createFileWriter(tempFileEntry)
    })
    .then((fw) => {
      fileWriter = fw
      return fetch(url)
    })
    .then((response) => {
      if (!response.ok)
        return Promise.reject(new Error("Fetch error " + response.status))
      const contentLength = +response.headers.get("Content-Length")
      let receivedLength = 0
      let chunks = [] // array of received binary chunks
      let chunksLength = 0
      const write = () =>
        new Promise((resolve, reject) => {
          fileWriter.onwriteend = () => {
            chunks = []
            chunksLength = 0
            resolve()
          }
          fileWriter.onerror = reject
          let chunksAll = new Uint8Array(chunksLength)
          let position = 0
          for (let chunk of chunks) {
            chunksAll.set(chunk, position)
            position += chunk.length
          }
          fileWriter.write(new Blob([chunksAll]))
        })
      const reader = response.body.getReader()
      const read = () => {
        if (aborted) {
          return deleteFile(tempFileEntry).then(() =>
            Promise.reject(new Error("aborted"))
          )
        }
        return reader.read().then(({ done, value }) => {
          if (done) return write()
          chunks.push(value)
          chunksLength += value.length
          receivedLength += value.length
          // console.debug(`Received ${receivedLength} of ${contentLength}`)
          onProgress && onProgress({ receivedLength, contentLength })
          if (chunksLength >= writeBatchSize) return write().then(read)
          return read()
        })
      }
      return read()
    })
    .then(() => {
      return moveFile(tempFileEntry, dirEntry)
    })
  downloadHandler.abort = () => {
    aborted = true
  }
  return downloadHandler
}
