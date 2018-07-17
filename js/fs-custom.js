
const fse = require('fs-extra');
const pathlib = require('path');

const stat = function(varpath) {
  return fse.stat(varpath).then((stat) => {
    stat.fullpath = path.resolve(varpath)
    stat.filename = path.basename(stat.fullpath)
    return stat
  })
}

const statdir = async function(parentPath) {
  const files = await fse.readdir(parentPath)
  const childPaths = files.map(file => path.join(parentPath, file))
  const promises = childPaths.map(childPath => stat(childPath))
  const stats = await Promise.all(promises)
  return stats
}

module.exports = {
  statdir,
  stat,
}
