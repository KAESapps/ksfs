const sanitize = require("sanitize-filename")

module.exports = (args) => {
  let urlCreator = window.URL || window.webkitURL
  const { name, data } = args
  const blob = new File([data], name, { type: "application/pdf" })
  let url = urlCreator.createObjectURL(blob)
  const win = window.open(url, "_blank")
  if (!win)
    return Promise.reject(
      new Error("La prévisualisation du pdf a été bloquée par votre navigateur")
    )
  return Promise.resolve()
}
