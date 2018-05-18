module.exports = new Promise(resolve =>
  document.addEventListener("deviceready", resolve, false)
)
