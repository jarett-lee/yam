
const path = require('path')

const fsc = require('./js/fs-custom')
const display = require('./js/display')

function showDir(parentPath) {
  parentPath = path.normalize(parentPath)
  display.clear()

  const promises = []

  promises[0] = fsc.stat(path.join(parentPath, '..'))
  promises[1] = fsc.statdir(parentPath)

  return Promise.all(promises).then((values) => {
    const parentStat = values[0]
    const childStats = values[1]

    display.displayPath(parentStat, '..')
    childStats.forEach(stat => display.displayPath(stat))
  })
}

showDir('test-images').catch((err) => {
  console.error(err);
})
