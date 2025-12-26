const fs = require('fs')
const path = require('path')

const mkdirSync = dirpath => {


  try {
    if (typeof dirpath === 'string') makedirForReal(dirpath)
    else dirpath.forEach(makedirForReal)
    return dirpath
  } catch (err) {
    return { err }
  }
}

const makedirForReal = dir => {
  const dir_path = path.join(__dirname, '..', dir)


  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path, {
      recursive: true
    })
  }
}

module.exports = mkdirSync
