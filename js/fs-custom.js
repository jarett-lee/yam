
const fse = require('fs-extra')
const pathlib = require('path')
const util = require('./util')

const stat = function(varpath) {
  return fse.stat(varpath).then((stat) => {
    stat.fullpath = path.resolve(varpath)
    stat.filename = path.basename(stat.fullpath)
    return stat
  })
}

const statdir = async function(parentPath) {
  let files = await fse.readdir(parentPath)
  files = files.filter((e) => pathlib.extname(e) !== '.yam')
  const childPaths = files.map(file => path.join(parentPath, file))
  const promises = childPaths.map(childPath => stat(childPath))
  const stats = await Promise.all(promises)
  return stats
}

async function readMetadata(path) {
  const f = util.metadataFilename(path)
  let obj;
  try {
    obj = await fse.readJson(f)
  } catch (e) {
    obj = {}
  }
  return obj
}

async function outputMetadata(path, obj) {
  const f = util.metadataFilename(path)
  return await fse.outputJson(f, obj, {
    spaces: 2,
  })
}

module.exports = {
  statdir,
  stat,
  readMetadata,
  outputMetadata,
}
