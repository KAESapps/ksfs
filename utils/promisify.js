module.exports = function(obj, method) {
  return function() {
    const args = Array.prototype.slice(arguments);
    return new Promise((resolve, reject) => {
      obj[method].apply(obj, args.concat([resolve, reject]));
    });
  };
};
