
const fs = require('fs')
const path = require('path')

const fsPromises = require('./js/fsPromises')

parentDir = '.'


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

    for (let i = 0; i < len; i++) {
      file = files[i]
      stat = stats[i]

      const li = document.createElement("li")
      li.innerText = file
      li.class = file
      ul.append(li)
    }
  })

})
