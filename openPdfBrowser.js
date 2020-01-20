const sanitize = require("sanitize-filename")


module.exports = args => {
  const { name, data } = args
  const blob = new File([data], name, { type: "application/pdf" })

  return new Promise((resolve, reject) => {
    try {
      let win = window.open("", "_blank")
      if (win === null) {
        throw new Error("Open PDF in new window blocked by browser")
      }
      let urlCreator = window.URL || window.webkitURL
      let url = urlCreator.createObjectURL(blob)
      win.location.href = url
      resolve()
    } catch (e) {
      win.close()
      reject(e)
    }
  })
}
