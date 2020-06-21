//télécharge un fichier en le streamant dans un fichier temporaire
// puis le déplace à l'emplacement voulu
// et renvoi le fileEntry de l'emplacement final
const writeFile = require("./writeFileHTML5")

module.exports = (url, fileEntry, { onProgress } = {}) => {
  let aborted = false
  const downloadHandler = fetch(url)
    .then((response) => {
      if (!response.ok)
        return Promise.reject(new Error("Fetch error " + response.status))
      const contentLength = +response.headers.get("Content-Length")
      let receivedLength = 0
      let chunks = [] // array of received binary chunks (comprises the body)
      const reader = response.body.getReader()
      const read = () => {
        if (aborted) return Promise.reject(new Error("aborted"))
        return reader.read().then(({ done, value }) => {
          if (done) return
          chunks.push(value)
          receivedLength += value.length
          // console.debug(`Received ${receivedLength} of ${contentLength}`)
          onProgress && onProgress({ receivedLength, contentLength })
          return read()
        })
      }
      return read().then(() => {
        let chunksAll = new Uint8Array(receivedLength)
        let position = 0
        for (let chunk of chunks) {
          chunksAll.set(chunk, position)
          position += chunk.length
        }
        return chunksAll
      })
    })
    .then((data) => {
      return writeFile(fileEntry, data)
    })
  downloadHandler.abort = () => {
    aborted = true
  }
  return downloadHandler
}
