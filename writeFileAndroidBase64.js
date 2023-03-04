// implementation non fonctionnelle
/* 
l'idée est de palier le problème de perf de cordova  https://github.com/apache/cordova-plugin-file/issues/364
en faisant la convertion en base64 avec readAsDataURL
mais le problème c'est qu'il n'y a pas d'API pour écrire du base64 en binaire... donc on se retrouve avec un fichier texte en base64
donc c'est pour référence uniquement.. ou si on accepte d'avoir un base64 au lieu du binaire... ce qui est plus lourd
*/
const isString = require("lodash/isString")

const convertToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    const realFileReader = reader["_realReader"]
    if (realFileReader) {
      reader = realFileReader
    }
    reader.onerror = (err) => {
      console.log(err)
      reject()
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}

const convertToBase64Chunks = async (blob, size, writeChunk) => {
  const chunkSize = 1024 * 1024 * size
  const blobSize = blob.size
  while (blob.size > chunkSize) {
    const value = await convertToBase64(blob.slice(0, chunkSize))
    await writeChunk(
      blobSize === blob.size ? value : value.split(",")[1],
      blobSize === blob.size
    )
    blob = blob.slice(chunkSize)
  }
  const lastValue = await convertToBase64(blob.slice(0, blob.size))
  await writeChunk(lastValue.split(",")[1], blobSize === blob.size)
  blob = blob.slice(blob.size)
}

const writeFile = (fileEntry, data, isAppend) => {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function (e) {
        resolve()
      }

      fileWriter.onerror = reject

      // If we are appending data to file, go to the end of the file.
      if (isAppend) {
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

module.exports = (fileEntry, data) => {
  if (data instanceof Uint8Array) {
    data = new Blob([data])
  }
  return convertToBase64Chunks(data, 1, async (value, first) => {
    if (first) {
      await writeFile(fileEntry, value, false)
    } else {
      await writeFile(fileEntry, value, true)
    }
  })
}
