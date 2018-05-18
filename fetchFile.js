module.exports = (url, opts) =>
  fetch(url, opts).then(response => {
    if (response.ok) {
      return response.blob()
    } else {
      return response.text().then(err => {
        throw new Error(err)
      })
    }
  })
