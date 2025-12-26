const fs = require('fs')

const unlinkSync = filepath => {
  try {
    if (typeof filepath === 'string') unlinkForReal(filepath)
    else filepath.forEach(unlinkForReal)
    return filepath
  } catch (err) {
    return { err }
  }
}

const unlinkForReal = file => {

  if (fs.existsSync(file)) fs.unlinkSync(file)
}

module.exports = unlinkSync
