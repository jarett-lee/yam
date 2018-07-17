
const util = require('./util')

const display = document.getElementById('fileList')

function clear() {
  display.innerHTML = ''
}

function displayPath(stat, filename) {
  filename = filename || stat.filename

  const span = document.createElement('span')
  span.innerText = filename

  if (stat.isDirectory()) {
    span.addEventListener('click', (event) => {
      showDir(stat.fullpath)
    })
    span.classList.add('dir')
  } else if (stat.isFile()) {
    span.addEventListener('click', (event) => {
      openFile(stat)
    })
    span.classList.add('file')
  } else {
    throw new Error('Unexpected file type')
  }

  const li = document.createElement('li')
  li.append(span)

  display.append(li)
}

function openFile(stat) {

  Promise.resolve().then(() => {
    return fsc.readMetadata(stat.fullpath)
  }).then((metadata) => {
    metadata.test = true

    return fsc.outputMetadata(stat.fullpath, metadata)
  }).then(() => {
    console.log('good')
  })
}

module.exports = {
  clear,
  displayPath,
}
