
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
    });
    span.classList.add('dir')
  } else if (stat.isFile()) {
    span.classList.add('file')
  } else {
    throw new Error('Unexpected file type');
  }

  const li = document.createElement('li')
  li.append(span)

  display.append(li)
}

module.exports = {
  clear,
  displayPath,
}
