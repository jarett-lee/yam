
const fse = require('fs-extra');

Promise.resolve().then(() => {
  return fse.remove('test-dir')
}).then(() => {
  return fse.copy('test-images', 'test-dir')
}).then(() => {
  console.log('Cleaned test dir.')
}).catch(err => {
  console.error(err)
})
