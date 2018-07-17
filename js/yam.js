
const fs = require('fs')

fs.readdir('.', (err, files) => {
  if (err) {
    throw err
  }

  fileList = document.getElementById('fileList')
  for (file of files) {
    const li = document.createElement("li")
    li.innerText = file
    fileList.append(li)
  }
})
