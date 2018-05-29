module.exports = file =>
  new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = function() {
      resolve(this.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
