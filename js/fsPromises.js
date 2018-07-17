
const fs = require('fs')

function stat(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(error, result) {
      if (error) {
        reject(error)
        return
      }

      resolve(result)
      return
    })
  })
}

module.exports = {
  stat,
}
