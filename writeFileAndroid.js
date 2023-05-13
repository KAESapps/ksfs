const isString = require("lodash/isString")

const writeFile = (fileEntry, data, append) => {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function (e) {
        resolve()
      }

      fileWriter.onerror = reject

      // If we are appending data to file, go to the end of the file.
      if (append) {
        try {
          fileWriter.seek(fileWriter.length)
        } catch (e) {
          reject("file doesn't exist!")
        }
      }

      fileWriter.write(data)
    }, reject)
  })
}

const chunkSize = 1024 * 1024 //1MB est la taille optimale sous cordova
const writeBinaryFileByChunk = async (fileEntry, blob) => {
  const blobSize = blob.size
  let startIndex = 0
  while (startIndex < blobSize) {
    const endIndex = Math.min(startIndex + chunkSize, blobSize)
    await writeFile(fileEntry, blob.slice(startIndex, endIndex), startIndex > 0)
    startIndex = endIndex
  }
}

const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}
const writeTextFileByChunk = async (fileEntry, txt) => {
  const chunks = chunkSubstr(txt, chunkSize)
  for (let i = 0; i < chunks.length; i++) {
    await writeFile(fileEntry, chunks[i], i > 0)
  }
}

module.exports = (fileEntry, data) => {
  if (isString(data)) return writeTextFileByChunk(fileEntry, data)
  if (data instanceof Uint8Array) {
    data = new Blob([data])
  }
  return writeBinaryFileByChunk(fileEntry, data)
}
