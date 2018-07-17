
const fse = require('fs-extra');
const pathlib = require('path');

const stat = function(varpath) {
  return fse.stat(varpath).then((stat) => {
    stat.fullpath = path.resolve(varpath)
    stat.filename = path.basename(stat.fullpath)
    return stat
  })
}

const statdir = function(parentPath) {
  let files, len, childPaths

  return Promise.resolve().then(() => {
    return fse.readdir(parentPath)
  }).then((mfiles) => {
    files = mfiles
    len = files.length
    childPaths = files.map(file => path.join(parentPath, file))
    const promises = childPaths.map(childPath => stat(childPath))
    return Promise.all(promises)
  })
}

module.exports = {
  statdir,
  stat,
}
