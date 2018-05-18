const electronRequire = require("./utils/electronRequire");
const fs = electronRequire("fs");
const path = electronRequire("path");
const mkdirp = electronRequire("mkdirp");

const createDir = dir =>
  new Promise(function(resolve, reject) {
    if (!dir) return resolve();
    mkdirp(dir, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });

module.exports = ({ name, content, dir }) => {
  return createDir(dir).then(
    () =>
      new Promise((resolve, reject) => {
        const filePath = dir ? path.join(dir, name) : name;
        fs.writeFile(filePath, content, function(err) {
          if (err) return reject(err);
          resolve({ path: filePath });
        });
      })
  );
};
