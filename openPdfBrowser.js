const sanitize = require("sanitize-filename")

const openWindow = () => {
  // we have to open the window immediately and store the reference
  // otherwise popup blockers will stop us
  let win = window.open("", "_blank")
  if (win === null) {
    throw new Error("Open PDF in new window blocked by browser")
  }
  return win
}

module.exports = args => {
  const { name, data } = args
  const blob = new File([data], name, { type: "application/pdf" })

  return new Promise((resolve, reject) => {
    try {
      win = openWindow()
      let urlCreator = window.URL || window.webkitURL
      let url = urlCreator.createObjectURL(blob)
      win.location.href = url
      //TODO: filename
      resolve()
    } catch (e) {
      win.close()
      reject(e)
    }
  })
}
