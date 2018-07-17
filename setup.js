
const fse = require('fs-extra');

function delay(t, v) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, v), t)
  })
}

Promise.resolve().then(() => {
  return fse.remove('test-dir')
}).then(() => {
  return delay(100)
}).then(() => {
  return fse.copy('test-images', 'test-dir')
}).then(() => {
  console.log('Cleaned test dir.')
}).catch(err => {
  console.error(err)
})
