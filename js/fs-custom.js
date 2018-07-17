
const fse = require('fs-extra');
const path = require('path');

const statdir = function(parentPath) {
  let files, len, childPaths

  return Promise.resolve().then(() => {
    return fse.readdir(parentPath)
  }).then((mfiles) => {
    files = mfiles
    len = files.length
    childPaths = files.map(file => path.join(parentPath, file))
    const promises = childPaths.map(childPath => fse.stat(childPath))
    return Promise.all(promises)
  }).then((stats) => {
    for (let i = 0; i < stats; i++) {
      const stat = stats[i]
      stat.filename = files[i]
      stat.fullpath = childPaths[i]
    }
    return stats
  })
}

module.exports = {
  statdir,
}
