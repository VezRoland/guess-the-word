export const store = (initValue, callback) => {
  let value = initValue
  callback(value)

  const get = () => value

  function set(newValue) {
    value = newValue
    callback(value)
    return value
  }

  function increase() {
    value += parseInt(arguments[0]) || 1
    callback(value)
    return value
  }

  return { get, set, increase }
}

export function formatTime(mSeconds) {
  let minutes = Math.floor(mSeconds / 60000)
  mSeconds -= minutes * 60000

  let seconds = Math.floor(mSeconds / 1000)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}