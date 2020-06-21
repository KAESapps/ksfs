//télécharge un fichier en le streamant dans un fichier temporaire
// puis le déplace à l'emplacement voulu
// et renvoi le fileEntry de l'emplacement final
//TODO: ecrire dans un fichier temporaire

const writeFile = require("./writeFileHTML5")
const createFileWriter = (fileEntry) =>
  new Promise((resolve, reject) => {
    fileEntry.createWriter(resolve)
  })

module.exports = (url, fileEntry, { onProgress } = {}) => {
  let aborted = false
  const downloadHandler = Promise.all([
    fetch(url),
    createFileWriter(fileEntry),
  ]).then(([response, fileWriter]) => {
    if (!response.ok)
      return Promise.reject(new Error("Fetch error " + response.status))
    // return response.arrayBuffer()
    const contentLength = +response.headers.get("Content-Length")
    let receivedLength = 0
    const write = (data) =>
      new Promise((resolve, reject) => {
        fileWriter.onwriteend = resolve
        fileWriter.onerror = reject
        fileWriter.write(new Blob([data]))
      })
    const reader = response.body.getReader()
    const read = () => {
      if (aborted) return Promise.reject(new Error("aborted"))
      return reader.read().then(({ done, value }) => {
        if (done) return
        receivedLength += value.length
        // console.debug(`Received ${receivedLength} of ${contentLength}`)
        onProgress && onProgress({ receivedLength, contentLength })
        return write(value).then(read)
      })
    }
    return read()
  })
  downloadHandler.abort = () => {
    aborted = true
  }
  return downloadHandler
}
