
const fs = require('fs')
const path = require('path')

const fsPromises = require('./js/fsPromises')

function showDir(parentDir) {
  parentDir = path.normalize(parentDir)

  const ul = document.getElementById('fileList')
  ul.innerHTML = ''

  fs.readdir(parentDir, (err, files) => {
    if (err) {
      throw err
    }

    const len = files.length

    const promises = files.map((file) => {
      const fullFilePath = path.join(parentDir, file)
      return fsPromises.stat(fullFilePath)
    })
    Promise.all(promises).then((stats) => {
      const ul = document.getElementById('fileList')

      // Add link to parent directory
      const span = document.createElement('span')
      span.innerText = '..'
      span.addEventListener('click', (event) => {
        showDir(path.join(parentDir, '..'))
      });
      span.classList.add('dir')

      const li = document.createElement('li')
      li.append(span)

      ul.append(li)

      for (let i = 0; i < len; i++) {
        file = files[i]
        stat = stats[i]
        const fullFilePath = path.join(parentDir, file)

        const span = document.createElement('span')
        span.innerText = file

        if (stat.isDirectory()) {
          span.addEventListener('click', (event) => {
            showDir(fullFilePath)
          });
          span.classList.add('dir')
        } else if (stat.isFile()) {
          span.classList.add('file')
        } else {
          throw new Error('Unexpected file type');
        }

        const li = document.createElement('li')
        li.append(span)

        ul.append(li)
      }
    })
  })
}

showDir('.')
