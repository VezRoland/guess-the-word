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