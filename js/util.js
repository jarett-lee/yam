
const pathlib = require('path');

function metadataFilename(path) {
  return pathlib.resolve(path) + '.yam'
}

module.exports = {
  metadataFilename,
}
